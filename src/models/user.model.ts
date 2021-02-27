import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "El nombre es necesario"],
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "El correo es necesario"],
      unique: true,
    },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/akanza/image/upload/v1614397179/defaultImage.jpg",
      required: false,
    },
    cloudinary_id: {
      type: String,
      required: false,
      default: "defaultImage",
    },
    state: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", function (next) {
  const user = this;
  // Saltos de encriptado
  const salt = bcrypt.genSaltSync(10);
  // Encriptando contraseña
  const hash = bcrypt.hashSync(user.password, salt);
  // Enviando password con hash
  user.password = hash;
  next();
});

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  // Extraemos el user sin el __v y sin la password
  return user;
};

userSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
