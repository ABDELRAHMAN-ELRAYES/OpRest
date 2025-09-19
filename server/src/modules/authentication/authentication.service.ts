import { Request, NextFunction, Response } from 'express';
import {
  IUserLoginData,
  IUserSignupData,
  ISignupVerificationData,
} from './interfaces/user-login-data';
import UserService from '../user/user.service';
import { hash, compare } from '../../utils/hashing-handler';
import AppError from '../../utils/app-error';
import { signJWT, verifyJWT } from '../../utils/jwt';
import { convertToIsoString } from '../../utils/date-time';
import Email from '../../utils/email/email';
import Redis from '../../data server clients/redis-client';
import { generateOTP } from '../../utils/otp-generator';
import config from '../../config/config';
import { generateId, generateRedisKey } from '../../utils/id-generator';
import { IUser } from '../user/Interfaces/IUser';
import { generateUserId } from '../../utils/user-data-handler';
import { Profile } from 'passport';

class AuthenticationService {
  static async login(
    userData: IUserLoginData,
    response: Response,
    next: NextFunction
  ) {
    const { usernameOrEmail, password } = userData;

    // Check if the provided usernmae or email is fourn
    const user = await UserService.getUserByUsernameOrEmail(
      usernameOrEmail,
      next
    );
    if (!user || !user.password) return;
    // Check if the provided password is correct
    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
      next(
        new AppError(
          401,
          `User with provided : ${usernameOrEmail} or Password is not correct, Try again!`
        )
      );
      return;
    }
    // Create jwt token and Add cookie
    const token = signJWT(user.id, response);

    const data = { user, token };

    return data;
  }
  // Verify User before signing up his information
  static async signupInitialization(
    userData: IUserSignupData,
    next: NextFunction
  ) {
    // extract data
    const { name, email, password, birthDate } = userData;

    // Check if the provided email is existed
    const user = await UserService.isUserEmailExisted(email, next);
    if (user) return;
    // Form user Data object which gonna used to create a new user
    const hashedPassword = await hash(password);
    const newUserData = {
      name,
      email,
      password: hashedPassword,
      birthDate: convertToIsoString(birthDate),
    };
    // Cash user data and OTP
    const otp = generateOTP();
    const hashedOTP = await hash(otp);
    const otpExpiresIn = new Date(
      Date.now() + config.otp.expiresIn * 60 * 1000
    ).toISOString();

    const redis = Redis.getRedisClient();

    const cachedData = JSON.stringify({
      user: newUserData,
      otp: { code: hashedOTP, expiresIn: otpExpiresIn },
    });

    const processId = generateId();
    const processKey = generateRedisKey('register-verification', processId);
    redis.set(processKey, cachedData);

    // send verification email
    const emailSender: string = config.mail.defaultFrom as string;
    const emailObj: Email = new Email(emailSender, newUserData.email);
    const templateData = {
      name: newUserData.name,
      email: newUserData.email,
      otp,
      expiresIn: config.otp.expiresIn,
    };
    await emailObj.send(
      'signup-verification',
      'Signup Verification Process',
      templateData
    );

    return {
      user: newUserData,
      processData: { otp, processId },
    };
  }
  static async signupVerification(
    verificationProcessData: ISignupVerificationData,
    response: Response,
    next: NextFunction
  ) {
    // extract data
    const { otp, signupVerificationId } = verificationProcessData;

    // Check if the provided signup process is cached
    const redis = Redis.getRedisClient();
    const processKey = generateRedisKey(
      'register-verification',
      signupVerificationId
    );
    const cachedData: string = (await redis.get(processKey)) as string;
    if (!cachedData) return;
    const processData = JSON.parse(cachedData);
    // Verify OTP and its expiration time
    const { code, expiresIn } = processData.otp;

    // Ensure that OTP is not expired
    const isExpiredOtp = Date.now() > new Date(expiresIn).getTime();
    if (isExpiredOtp) {
      next(new AppError(401, 'Your OTP is Expired!'));
      return;
    }
    // Ensure that OTP is valid
    const isValidOtp = await compare(otp, code);
    if (!isValidOtp) {
      next(
        new AppError(401, 'Your OTP is not correct, Check it and try Again!')
      );
      return;
    }

    // Extract user Data  which is gonna used to create a new user
    const newUserData = processData.user;

    const newUser = await UserService.saveUser(newUserData);
    // Create jwt token and Add cookie
    const token = signJWT(newUser.id, response);

    const data = { user: newUser, token, isVerified: true };
    // send Welcome Email
    const emailSender: string = config.mail.defaultFrom as string;
    const emailObj: Email = new Email(emailSender, newUserData.email);
    const templateData = {
      name: newUser.name,
      email: newUser.email,
    };
    await emailObj.send('welcome', 'Welcome To Healixa', templateData);
    // Delete cashed data
    await redis.del(processKey);
    return data;
  }
  static async protect(request: Request, next: NextFunction) {
    // Extract the jwt from browser cookies
    const jwt = request.cookies.jwt;
    // Check if there is a jwt
    if (!jwt) {
      next(new AppError(401, `You are not logged in, Login and Try again!`));
      return;
    }

    // Extract user id from jwt
    const data = verifyJWT(jwt);
    const { id } = data;
    // Add user data to the response
    const user = await UserService.getUser(id, next);
    if (!user) return;
    // TODO: check if the user changed the password after the token is set (Log him out)

    request.user = user;
    next();
  }
  // Restrict routes to specific roles
  static async restrictsTo(
    availableRoles: string[],
    currentUser: IUser,
    next: NextFunction
  ) {
    // check if there is a user
    if (!currentUser) {
      next(new AppError(401, 'You are not logged in, Login and Try Again!'));
      return;
    }
    const userRole = currentUser.role;

    // Check if the current user role is in available roles
    const hasPermission = availableRoles.some((role) => role === userRole);

    if (!hasPermission) {
      next(
        new AppError(403, "Access denied, You don't have access to this action")
      );
      return;
    }
    next();
  }
  // Send Forget password email
  static async forgetPassword(email: string, next: NextFunction) {
    if (!email) {
      next(new AppError(400, 'Email is required'));
      return;
    }

    // Check if the user exists
    const user = await UserService.getUserByUsernameOrEmail(email, next);
    if (!user) {
      next(new AppError(401, 'Email does not exist!'));
      return;
    }
    // Creae token and expiration date
    const cachedData = {
      user: {
        email: user.email,
      },
      expiresIn: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    };
    // Cach data
    const redis = Redis.getRedisClient();
    const processId = generateId();
    const processKey = generateRedisKey('forget-password', processId);
    await redis.set(processKey, JSON.stringify(cachedData));

    // Send Reset password Email
    const defaultFrom = config.mail.defaultFrom as string;
    const emailObj = new Email(defaultFrom, email);
    // TODO : template data must be modified
    const templateData = {
      name: user.name,
      resetLink: '',
      expirationTime: '',
      requestIp: '',
      email: user.email,
      requestData: '',
    };
    emailObj.send('forget-password', 'Forget Password', templateData);

    return { user, processId };
  }

  // Reset user password
  static async resetPassword(
    processId: string,
    password: string,
    next: NextFunction
  ) {
    if (!processId) {
      next(
        new AppError(
          400,
          'There is no Reset password token, Check it and try again!'
        )
      );
      return;
    }

    if (!password) {
      next(
        new AppError(400, 'New password is required, Check it and try again!')
      );
      return;
    }

    // Generate the process key
    const processKey = generateRedisKey('forget-password', processId);

    // Get Cashed Data
    const redis = Redis.getRedisClient();
    const cashedData = (await redis.get(processKey)) as string;
    const data: {
      user: {
        email: string;
      };
      expiresIn: string;
    } = JSON.parse(cashedData);
    if (!data) {
      next(new AppError(404, 'Sorry, Reset Password token is not found!'));
      return;
    }

    const {
      user: { email },
      expiresIn,
    } = data;
    // Check if the request is expired
    const wasExpired = Date.now() > new Date(expiresIn).getTime();
    if (wasExpired) {
      next(new AppError(401, 'Sorry, Reset Password token is expired!'));
      return;
    }
    // Update user with the new password
    const hashedPassword = await hash(password);
    const user = await UserService.updateUserPasswordByEmail(
      email,
      hashedPassword
    );
    if (!user) {
      next(
        new AppError(
          500,
          'Sorry, something wrong happened while reseting your password!'
        )
      );
      return;
    }

    // Send Reset Email performed successfully mail
    const defaultFrom = config.mail.defaultFrom as string;
    const emailObj = new Email(defaultFrom, email);
    const templateData = {
      name: user.name,
      email: user.email,
      resetData: '',
      isAddress: '',
      deviceInfo: '',
    };
    emailObj.send(
      'reset-password',
      'Password Reset Successfully',
      templateData
    );
    await redis.del(processKey);
    return user;
  }
  static async logout(response: Response) {
    response.cookie('jwt', 'logged-out', {
      expires: new Date(Date.now() + 10),
    });
  }

  static async oAuthHandler(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: (error: any, user?: any) => void
  ) {
    try {
      const { displayName, emails, photos } = profile;
      // create a new user or login if found

      if (!emails || !photos) return callback(null);

      const email = emails[0]?.value;
      const profilePicture = photos[0]?.value;
      const userId = generateUserId('');
      const data: IUser = {
        id: userId,
        name: displayName,
        email,
        password: null,
        profilePicture,
      };
      const user = await UserService.findOrCreateUserByEmail(data);

      // To add user to request
      callback(null, user);
    } catch (error) {
      return callback(new AppError(500, 'O-Authorization failed'));
    }
  }
  static async oAuthorizationHandler(
    request: Request,
    response: Response,
    next: NextFunction,
    OAuthType: string
  ) {
    const user = request.user as IUser;
    if (!user)
      return next(
        new AppError(
          401,
          `There is no user, Something Wrong happened while trying access with your ${OAuthType} accont`
        )
      );
    // Create jwt token and Add cookie
    const token = signJWT(user.id, response);
    const data = { token, user };
    return data;
  }
}

export default AuthenticationService;
