import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config/config";

export async function getConnection() {
  const configuration: ConnectOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  try {
    const connection = await mongoose.connect(config.mongo.uri, configuration);
    const con = mongoose.connection;
    con.once("open", () => {
      console.log("Connecion abierta satisfactoriamente");
    });
    console.log("Base de datoss conectada con exito");
    return connection;
  } catch (error) {
    console.log("Error al conectarse a la base de datos");
  }
}
