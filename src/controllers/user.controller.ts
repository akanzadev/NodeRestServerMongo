import { Request, Response } from "express";
import User from "../models/user.model";
import cloudinary from "../config/cloudinary";
import { success, error } from "../config/response";

export const getUsers = (req: Request, res: Response) => {
  User.find({ state: true })
    .skip(1)
    .limit(20)
    .then((data) => {
      success(req, res, "Usuarios activos listados", 200, data);
    })
    .catch((e) => error(req, res, "Error al listar usuarios activos", 500, e));
};
export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findById(id)
    .then((data) => {
      success(req, res, "Usuario encontrado", 200, data);
    })
    .catch((e) => error(req, res, "No se encontro usuario", 500, e));
};
export const createdUser = (req: Request, res: Response) => {
  const { body } = req;
  const user = new User(body);
  user
    .save()
    .then((data) => {
      success(req, res, "Usuario creado con exito", 200, data);
    })
    .catch((e) => error(req, res, "Error al crear usuario", 404, e));
};
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  console.log(body);
  User.findByIdAndUpdate(id, body, { new: true })
    .then((data) =>
      success(req, res, "Usuario actualizado con exito", 201, data)
    )
    .catch((e) => {
      error(req, res, "No se encontro usuario", 400, e);
    });
};
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, { state: false }, { new: true })
    .then((data) => success(req, res, "Usuario eliminado con exito", 201, data))
    .catch((e) => {
      error(req, res, "Error al eliminar usuario", 400, e);
    });
};
export const uploadImage = async (req: Request, res: Response) => {
  try {
    // Recogemos el id y la img ya validada
    const { id } = req.params;
    const { img, cloudinary_id } = req.body;
    const user = await User.findById(id);
    // Eliminando archivo de cloudinary
    const elim = await cloudinary.uploader.destroy(user!.cloudinary_id || "", {
      resource_type: "image",
    });
    // Actualizamos el path de la imagen del respectivo usuario
    const data = await User.findByIdAndUpdate(
      id,
      { img, cloudinary_id },
      { new: true }
    );
    success(req, res, "Imagen actualizada con exito", 201, data);
  } catch (e) {
    error(req, res, "No se pudo actualizar imagen", 400, e);
  }
};
