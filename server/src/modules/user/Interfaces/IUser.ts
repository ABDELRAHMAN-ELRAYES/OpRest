export interface IUser {
  id: string;
  email: string;
  password: string | null;
  name: string;
  birthDate?: string;
  role?: string;
  profilePicture?: string;
}
