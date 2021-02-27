import express, { Application } from "express";
import morgan from "morgan";
import { getConnection } from "../database/connection";
import userRouter from "../routes/user.routes";
import authRouter from "../routes/auth.routes";
import path from "path";
import passport from "passport";
import { handleError } from "../middlewares/error";
import { config } from "./config";
import passportConfig from "../middlewares/passport";
class Server {
  private app: Application;
  constructor() {
    this.app = express();
    this.listen();
    this.middlewares();
    this.connectDB();
    this.routes();
    this.handleError();
  }
  private connectDB() {
    return getConnection();
  }
  private routes() {
    this.app.use(userRouter);
    this.app.use(authRouter);
  }
  private middlewares() {
    // Para leer el body y los form
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // Para mostrar estadisticas de las peticiones hhtp
    this.app.use(morgan("dev"));
    // Archivos publicos
    this.app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "../../uploads"))
    );
    // Autenticación con passport-jwt
    this.app.use(passport.initialize());
    passport.use(passportConfig);
  }
  // Middlewares para capturar errores
  private handleError() {
    this.app.use(handleError);
  }
  private listen() {
    this.app.listen(config.api.port, () => {
      console.log("Servidor corriendo en el puerto ", config.api.port);
    });
  }
}

export default Server;
