import jwt, { SignOptions,JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { Response } from 'express';

//? Create a type for ExpiresIn in token options because it needs a string value with a specific type format
type unit = 'd' | 'D' | 'y' | 'Y' | 'W' | 'w' | 'H' | 'h';
type JWTExpiresType = `${number}${unit}`;

export const signJWT = (userId: string, response: Response) => {
  const tokenSecret = config.jwt.secret as string;
  const jwtOptions: SignOptions = {
    expiresIn: config.jwt.expiresIn as JWTExpiresType,
  };

  // Sign a JWT toke
  const token = jwt.sign({ id: userId }, tokenSecret, jwtOptions);

  // Setup a cookie
  const cookieExpiresIn = new Date(
    Date.now() + Number(config.cookies.expiresIn) * 24 * 60 * 60 * 1000
  );
  response.cookie('jwt', token, {
    expires: cookieExpiresIn,
    // secure:true,
    httpOnly: true,
  });

  return token;
};

export const verifyJWT = (token: string):JwtPayload => {
  const tokenSecret = config.jwt.secret as string;
  return jwt.verify(token, tokenSecret) as JwtPayload;
};
