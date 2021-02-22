import { Request, Response } from "express";
import User from "../models/user.model";
import { success, error } from "../config/response";
import { IUser } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

function createToken(user: IUser) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SEED || "",
    {
      expiresIn: 86400,
    }
  );
}

export const loginUser = (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    error(req, res, "Falta ingresar usuario o password", 400);
  }
  const user = User.findOne({ email: req.body.email })
    .then((data) => data)
    .catch((e) => error(req, res, "Error en Login", 404, e));
};
