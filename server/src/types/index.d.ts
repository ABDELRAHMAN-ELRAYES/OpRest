import { IUser } from '../modules/user/Interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    //   locals: {
    //     user?: IUser;
    //   };
    }
  }
}
