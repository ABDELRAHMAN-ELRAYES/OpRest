import { catchAsync } from '../../utils/catch-async';
import { Request, Response, NextFunction } from 'express';
import {
  IUserLoginData,
  IUserSignupData,
  ISignupVerificationData,
} from './interfaces/user-login-data';
import AuthenticationService from './authentication.service';
import { IUser } from '../user/Interfaces/IUser';

// login user with username or email
export const login = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const userData: IUserLoginData = {
      usernameOrEmail: request.body.usernameOrEmail,
      password: request.body.password,
    };

    const data = await AuthenticationService.login(userData, response, next);
    if (!data) return;
    const { user, token } = data;
    response.status(200).json({
      status: 'success',
      data: {
        message: 'Your are logged in successfully!',
        token,
        user,
      },
    });
  }
);
// Verify user registration process using OTP
export const signupInitialization = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    // gather siging up information :first name, last name, date of birth, email, password
    const userData: IUserSignupData = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      birthDate: request.body.birthDate,
    };
    // Verify User with OTP across his gmail
    const data = await AuthenticationService.signupInitialization(
      userData,
      next
    );

    if (!data) return;
    const {
      user,
      processData: { otp, processId },
    } = data;
    response.status(200).json({
      status: 'success',
      data: {
        message:
          'Signup verification email is sent now, please check your email box!',
        otp,
        user,
        processId,
      },
    });
  }
);
// Signup user after verification
export const signupVerification = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    // Extract otp from request body
    const otp = request.body.otp;
    const signupVerificationId = request.params.id;
    const verificationData: ISignupVerificationData = {
      otp,
      signupVerificationId,
    };

    // use the verification data for user verification and signup if verified
    const data = await AuthenticationService.signupVerification(
      verificationData,
      response,
      next
    );
    if (!data) return;

    response.status(200).json({
      status: 'success',
      data: {
        message: 'You are signed up successfully',
        otp,
        verificationData,
        data,
      },
    });
  }
);
// Protect specific routes from unlogged users
export const protect = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    AuthenticationService.protect(request, next);
  }
);

// Restrict routes to specific users roles
export const restrictsTo = (...availableRoles: string[]) =>
  catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      const allowedRoles: string[] = availableRoles;
      const currentUser: IUser = request.user as IUser;
      AuthenticationService.restrictsTo(allowedRoles, currentUser, next);
    }
  );
// Respond to the user action to change his password and send reset password mail
export const forgetPassword = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    // Take the user email for sending password reset mail
    const email: string = request.body.email;

    const data = await AuthenticationService.forgetPassword(email, next);
    if (!data?.user) return;

    response.status(200).json({
      status: 'Success',
      data,
    });
  }
);
// Reset user password
export const resetPassword = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const processId = request.params.id;
    const password = request.body.password;

    const user = await AuthenticationService.resetPassword(
      processId,
      password,
      next
    );
    if (!user) return;

    response.status(200).json({
      status: 'success',
      message: 'your password is reset successfully!',
      data: { user },
    });
  }
);

// Logout the current user
export const logout = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    AuthenticationService.logout(response);
    response.status(200).json({
      status: 'success',
      message: 'You logged out successfully',
    });
  }
);
// Handle user login or signup using OAuth account (facebook, google)
export const oAuthorizationHandler = (provider: 'google' | 'facebook') =>
  catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      const data = await AuthenticationService.oAuthorizationHandler(
        request,
        response,
        next,
        provider
      );
      response.status(200).json({
        status: 'success',
        message: `You logged in using ${provider} successfully`,
        data,
      });
    }
  );
