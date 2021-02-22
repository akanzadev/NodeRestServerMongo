import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "El nombre es necesario"],
    },
    email: {
      type: String,
      required: [true, "El correo es necesario"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    state: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", function (next) {
  const user = this;
  // Saltos de encriptado
  const salt = bcrypt.genSaltSync(10);
  // Encriptando contraseña
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  // Extraemos el user sin el __v y sin la password
  return user;
};

const User = model<IUser>("User", UserSchema);

export default User;
