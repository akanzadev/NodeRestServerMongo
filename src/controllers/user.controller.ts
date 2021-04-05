import { Request, Response } from "express";
import { success, error } from "../config/response";
import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";

export const getUsers = (req: Request, res: Response) => {
  const userService = new UserService();
  userService
    .getUsers()
    .then(({ users, documents }) => {
      return res.status(200).json({
        ok: true,
        error: false,
        documents,
        message: "Listado de usuarios",
        results: users,
      });
    })
    .catch((e) => error(req, res, "Error al listar usuarios", 400, e));
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const userService = new UserService();
  userService
    .getUser(id)
    .then((userFind) => success(req, res, "Usuario encontrado", 200, userFind))
    .catch((e) => error(req, res, "No se encontro usuario", 400, e));
};

export const createdUser = (req: Request, res: Response) => {
  // Recogiendo el nombre, correo y contraseña
  const { name, email, password } = req.body as IUser;
  const userService = new UserService();
  userService
    .createdUser(name, email, password)
    .then((user) => success(req, res, "Usuario creado con exito", 200, user))
    .catch((e) => error(req, res, "Error al crear usuario", 404, e));
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const userService = new UserService();
  userService
    .updateUser(id, body)
    .then((result) =>
      success(req, res, "Usuario actualizado con exito", 201, result)
    )
    .catch((e) => error(req, res, "Error al actualizar usuario", 400, e));
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const userService = new UserService();
  userService
    .deleteUser(id)
    .then((result) =>
      success(req, res, "Usuario eliminado con exito", 201, result)
    )
    .catch((e) => error(req, res, "Error al eliminar usuario", 400, e));
};

export const uploadImage = async (req: Request, res: Response) => {
  // Recogemos el id y la img ya validada
  const { id } = req.params;
  const { img, cloudinary_id } = req.body;
  const userService = new UserService();
  userService
    .uploadImage(id, img, cloudinary_id)
    .then((result) =>
      success(req, res, "Imagen actualizada con exito", 201, result)
    )
    .catch((e) => error(req, res, "No se pudo actualizar imagen", 400, e));
};
