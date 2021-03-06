import { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  password: string;
  img?: string;
  cloudinary_id?: string;
  state?: boolean;
  comparePassword: (password: string) => boolean;
}
