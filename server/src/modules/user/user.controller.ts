import {catchAsync} from "../../utils/catch-async";
import UserService from "./user.service";
import { Request, Response, NextFunction } from "express";

/*
 * Create a new user based on user-type(patient, doctor, )
 */
export const saveUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const userData = {
      type: request.body.userType,
      email: request.body.email,
      password: request.body.password,
      name: request.body.name,
      birthDate: request.body.birthDate,
    };
    const user = await UserService.saveUser(userData);
    if (!user) return;
    response.status(201).json({ status: "success", data: { user } });
  }
);
/*
 * Update a user by his id and new provided data
 */
export const updateUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const updatedData = request.body.newData;
    const userId = request.params.id;
    updatedData.userId = userId;
    const user = await UserService.updateUser(updatedData, next);
    if (!user) return;
    response.status(200).json({ status: "success", data: { user } });
  }
);
/*
 * Delete a user by his id
 */
export const deleteUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    const user = await UserService.deleteUser(userId, next);
    if (!user) return;
    response.status(204).json({ status: "success", data: { user } });
  }
);
/*
 * get all users
 */
export const getAllUsers = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await UserService.getAllUsers();
    if (!users.length) return;
    response
      .status(200)
      .json({ status: "success", data: { length: users.length, users } });
  }
);
/*
 * get all users by his id
 */
export const getUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    const user = await UserService.getUser(userId, next);
    if (!user) return;
    response.status(200).json({ status: "success", data: { user } });
  }
);
