import { Request, Response } from "express";
// Success and Error para respuestas del servidor
export const success = (
  req: Request,
  res: Response,
  message = "",
  status = 200,
  result: any = {},
  ok = true
):Response => {
  return res.status(status).json({
    ok,
    error: false,
    status,
    body: message,
    result,
  });
};
export const error = (
  req: Request,
  res: Response,
  message = "Internal server error",
  status = 500,
  result = {},
  ok = false
):Response => {
  return res.status(status).json({
    ok,
    error: true,
    status,
    body: message,
    result,
  });
};
