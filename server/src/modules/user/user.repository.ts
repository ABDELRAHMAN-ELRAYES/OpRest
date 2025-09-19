import Prisma from '../../data server clients/prisma-client';
import { PrismaClient } from '@prisma/client';
import { IUser } from './Interfaces/IUser';

class UserRepository {
  private prisma: PrismaClient;
  constructor() {
    // initialize a prisma client to perform interactions with DB
    this.prisma = Prisma.getPrismaClient();
  }

  addUser(userData: IUser) {
    return this.prisma.user.create({ data: userData });
  }
  getAllUsers() {
    return this.prisma.user.findMany();
  }
  getUser(userId: string) {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }
  updateUser(userData: IUser) {
    const { id } = userData;
    return this.prisma.user.update({ where: { id }, data: userData });
  }
  deleteUser(userId: string) {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  getUserByUsernameOrEmail(usernameOrEmail: string) {
    // TODO : username must be added after enable it in user model
    return this.prisma.user.findFirst({
      where: {
        email: { contains: usernameOrEmail },
      },
    });
  }
  updateUserPasswordByEmail(email: string, password: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  }
  // Check if the user found by his email if not create a new user
  async findOrCreateUserByEmail(data: IUser) {
    const { email } = data;
    let user = await this.getUserByUsernameOrEmail(email);
    if (!user) {
      user = await this.addUser(data);
    }
    return user;
  }
}
export default UserRepository;
