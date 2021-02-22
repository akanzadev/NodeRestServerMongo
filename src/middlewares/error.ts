import { Request, Response, NextFunction } from "express";
import { error } from "../config/response";
export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    error(req, res, "Error interno", 500, { err: err.message });
  }
};
