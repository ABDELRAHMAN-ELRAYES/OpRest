import { IUser } from '../modules/user/Interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      uploadedType?: string;

    //   locals: {
    //     user?: IUser;
    //   };
    }
    interface User extends IUser {}
  }
}
