export interface IUserLoginData {
  usernameOrEmail: string;
  password: string;
}
export interface IUserSignupData {
  name: string;
  password: string;
  email: string;
  birthDate: string;
}
export interface ISignupVerificationData {
  otp: string;
  signupVerificationId: string;
}
