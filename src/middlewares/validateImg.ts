import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { error } from "../config/response";
import fs from "fs-extra";
export const validateImg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      // Enviando imagen a cloudinary
      const { url, public_id } = await cloudinary.uploader.upload(
        req.file.path
      );
      // Eliminando la imagen que multer guardo localmente
      await fs.unlink(req.file.path);
      // Guardando url de cloudinary en el modelo userx|
      req.body.img = url;
      req.body.cloudinary_id = public_id;
      next();
    } else {
      next();
    }
  } catch (err) {
    error(req, res, "Error al cargar archivos a Cloudinary", 500, err);
  }
};

export const validateImgCloud = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      // Enviando imagen a cloudinary
      const { url, public_id } = await cloudinary.uploader.upload(
        req.file.path
      );
      // Eliminando la imagen que multer guardo localmente
      await fs.unlink(req.file.path);
      // Guardando url de cloudinary en el modelo userx|
      req.body.img = url;
      req.body.cloudinary_id = public_id;
      next();
    } else {
      error(req, res, "Por favor envie la imagen!", 500);
    }
  } catch (err) {
    error(req, res, "Error al cargar archivos a Cloudinary", 500, err);
  }
};
