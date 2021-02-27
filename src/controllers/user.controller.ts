import { Request, Response } from "express";
import User from "../models/user.model";
import cloudinary from "../config/cloudinary";
import { success, error } from "../config/response";
import { IUser } from "../interfaces/user.interface";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ state: true }).skip(1).limit(20);
    const documents = await User.countDocuments({ state: true });
    return res.status(200).json({
      ok: true,
      error: false,
      documents,
      message: "Listado de usuarios",
      results: users,
    });
  } catch (e) {
    error(req, res, "Error al listar usuarios activos", 500, e);
  }
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
  // Recogiendo el nombre, correo y contraseña
  const { name, email, password } = req.body as IUser;
  // Creando el usuario
  const user = new User({ name, email, password });
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
    // Eliminando archivo de cloudinary si no es el default
    if (user?.cloudinary_id !== "defaultImage") {
      await cloudinary.uploader.destroy(user?.cloudinary_id || "", {
        resource_type: "image",
      });
    }
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
