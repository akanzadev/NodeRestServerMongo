import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { error } from "../config/response";
export const validateImg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const { url } = await cloudinary.uploader.upload(req.file.path);
      req.body.img = url;
      next();
    } else {
      next();
    }
  } catch (err) {
    error(req, res, "Error al cargar archivos a Cloudinary", 500, err);
  }
};
