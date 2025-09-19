import express from "express";
import UserRouter from "./modules/user/user.route";
import { Response } from "express";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middlewares/error-handler";
import {
  bodyParser,
  cookieParserMiddleware,
  corsMiddleware,
} from "./middlewares/middlewares";
import AuthenticationRouter from "./modules/authentication/routers/authentication.route";

// define the express app
const app = express();
app.use(bodyParser);
app.use(corsMiddleware);
app.use(cookieParserMiddleware);

// mounting routers to express app
app.use("/users", UserRouter);
app.use("/auth", AuthenticationRouter);

// Handle all not found routes
app.use(notFoundHandler);

// Handle any Error in the server as global Handler
app.use(globalErrorHandler);
export default app;
