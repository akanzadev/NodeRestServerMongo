import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { error } from "../config/response";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || "default";
    if(!token) error(req, res, "Token invalido", 401);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SEED || "SEED_DESARROLLO"
    );
    // req.user = decoded
    next();
};
