import { Router } from "express";
import {
  login,
  signupVerification,
  signupInitialization,
  forgetPassword,
  resetPassword,
  logout,
} from "../authentication.controller";
import googleRouter from "./google.route";
import facebookRouter from "./facebook.route";
const AuthenticationRouter = Router();

AuthenticationRouter.route("/login").post(login);
AuthenticationRouter.route("/signup/init").post(signupInitialization);
AuthenticationRouter.route("/signup/verify/:id").post(signupVerification);
AuthenticationRouter.route("/forget-password").post(forgetPassword);
AuthenticationRouter.route("/reset-password/:id").post(resetPassword);
AuthenticationRouter.route("/logout").post(logout);
AuthenticationRouter.use("/google", googleRouter);
AuthenticationRouter.use("/facebook", facebookRouter);

export default AuthenticationRouter;
