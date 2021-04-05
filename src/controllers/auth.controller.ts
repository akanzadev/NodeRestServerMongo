import { Request, Response } from "express";
import { success, error } from "../config/response";
import { AuthService } from "../services/auth.service";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const auth = new AuthService(email, password);
  auth
    .signIn()
    .then((token) =>
      success(req, res, "Ingreso satisfactorio", 200, {
        token,
      })
    )
    .catch((e) => error(req, res, "Error al intentar Ingresar", 500, e));
};
