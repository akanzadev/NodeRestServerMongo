import { Request, Response } from "express";
import User from "../models/user.model";
import { success, error } from "../config/response";
export const getUsers = (req: Request, res: Response) => {
  User.find({ state: true })
    .skip(1)
    .limit(3)
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
