import { NextFunction, Request, Response, Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
} from "./user.controller";
import {
  protect,
  restrictsTo,
} from "../authentication/authentication.controller";
import upload from "../../middlewares/file-upload";

const UserRouter = Router();

UserRouter.route("/")
  .post(saveUser)
  .get(protect, restrictsTo("user", "admin", "manager"), getAllUsers);
UserRouter.route("/:id").get(getUser).delete(deleteUser).put(updateUser);
UserRouter.route("/upload").post(
  upload.array("files"),
  (request: Request, response: Response, next: NextFunction) => {
    response.json({
      message: "hello world",
    });
  }
);

export default UserRouter;
