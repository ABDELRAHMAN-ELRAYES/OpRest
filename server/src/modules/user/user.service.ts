import { IUser } from './Interfaces/IUser';
import { generateUserId } from '../../utils/user-data-handler';
import { hash } from '../../utils/hashing-handler';
import UserRepository from './user.repository';
import { NextFunction } from 'express';
import AppError from '../../utils/app-error';
import { convertToIsoString } from '../../utils/date-time';

const userRepository = new UserRepository();

class UserService {
  /*
   * Create User
   */
  static async saveUser(userData: any) {
    const { userType, name, email, birthDate, password, role } = userData;
    const userId = generateUserId(userType);
    const hashedPassword = await hash(password);
    const data: IUser = {
      id: userId,
      email,
      password: hashedPassword,
      name,
      birthDate: convertToIsoString(birthDate),
      role: role || 'user',
    };
    return userRepository.addUser(data);
  }
  /*
   * Update User
   */
  static async updateUser(updatedData: any, next: NextFunction) {
    const { userId, ...newData } = updatedData;
    const user = await this.getUser(userId, next);
    if (!user) return;
    const userData: IUser = {
      ...user,
      ...newData,
    };
    return userRepository.updateUser(userData);
  }
  /*
   * Delete User
   */
  static async deleteUser(userId: string, next: NextFunction) {
    const user = await this.getUser(userId, next);
    if (!user) return;
    return userRepository.deleteUser(userId);
  }
  /*
   * Get all users
   */
  static async getAllUsers() {
    return userRepository.getAllUsers();
  }
  /*
   * Get user by ID
   */
  static async getUser(userId: string, next: NextFunction) {
    const user = await userRepository.getUser(userId);
    if (!user) {
      next(
        new AppError(
          404,
          `User with ID : ${userId} does no longer exist, try again!`
        )
      );
      return;
    }
    return user;
  }
  /*
   * Get user by email or username
   */
  static async getUserByUsernameOrEmail(
    usernameOrEmail: string,
    next: NextFunction
  ) {
    const user = await userRepository.getUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      next(
        new AppError(
          401,
          `User with provided : ${usernameOrEmail} or Password is not correct, Try again!`
        )
      );
      return;
    }
    return user;
  }
  static async isUserEmailExisted(email: string, next: NextFunction) {
    const user = await userRepository.getUserByUsernameOrEmail(email);
    if (user) {
      next(
        new AppError(
          400,
          `This provided email: ${email}  is already existed,Choose a valid one and Try again!`
        )
      );
      return;
    }
    return user;
  }
  static async updateUserPasswordByEmail(email: string, password: string) {
    return userRepository.updateUserPasswordByEmail(email, password);
  }
  // Check if the user found by his email if not create a new user
  static async findOrCreateUserByEmail(data: IUser) {
    return userRepository.findOrCreateUserByEmail(data);
  }
}
export default UserService;
