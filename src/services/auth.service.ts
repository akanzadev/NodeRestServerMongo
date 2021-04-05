import { IUser } from "../interfaces/user.interface";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export class AuthService {
  private email: string;
  private password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  public createToken(user: IUser) {
    const { id, email } = user;
    // Extrae el id y el email para crear el token y devolverlo al cliente
    return jwt.sign({ id, email }, config.jwt.secret, {
      // Tiempo de expiracion de token
      expiresIn: config.jwt.expired,
    });
  }
  public signIn() {
    return new Promise(async (resolve, reject) => {
      try {
        // Validando campos vacios
        if (!this.email || !this.password) {
          reject("Usuario o contraseña faltantes");
        }
        const user = await User.findOne({ email: this.email }).exec();
        // Validando existencia de usuario en base de datos
        if (user === null) {
          reject("Usuario o contraseña incorrectos");
        } else {
          // Comparando contraseña hasheada con contraseña de usuario
          const isMatch = user.comparePassword(this.password);
          if (isMatch) {
            // Devolviendo token a usuario
            resolve(this.createToken(user));
          }
          // Si la comparacion es erronea se informa al usuario
          reject("Usuario o contraseña incorrectos");
        }
      } catch (e) {
        // En caso de error del servidor
        reject("Usuario inexistente");
      }
    });
  }
}
