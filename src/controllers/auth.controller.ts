import { Request, Response } from "express";
import User from "../models/user.model";
import { success, error } from "../config/response";
import { IUser } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config";

function createToken(user: IUser) {
  const { id, email } = user;
  return jwt.sign({ id, email }, config.jwt.secret, {
    expiresIn: 50000,
  });
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      error(req, res, "Falta ingresar usuario o password", 400);
    }
    const user = await User.findOne({ email }).exec();
    if (user === null) {
      error(req, res, "El usuario no existe", 400);
    } else {
      const isMatch = user.comparePassword(password);
      if (isMatch) {
        success(req, res, "logueado correctamente", 400, {
          token: createToken(user),
        });
      }
      error(req, res, "credenciales incorrectas", 401);
    }
  } catch (e) {
    error(req, res, "El usuario no existe", 400, e);
  }
};
