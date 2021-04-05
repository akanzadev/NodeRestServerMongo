import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import cloudinary from "../config/cloudinary";

interface IGetUsers {
  users: {};
  documents: number;
}

export class UserService {
  public getUsers() {
    return new Promise<IGetUsers>(async (resolve, reject) => {
      try {
        const users = await User.find({ state: true }).skip(1).limit(20);
        const documents = await User.countDocuments({ state: true });
        resolve({ users, documents });
      } catch (e) {
        reject(e);
      }
    });
  }
  public getUser(id: string) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        const user = await User.findById(id);
        if (user !== null) {
          resolve(user);
        } else {
          reject("Usuario no encontrado");
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  public createdUser(name: string, email: string, password: string) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        // Creando el usuario
        const user = new User({ name, email, password });
        const userSave = await user.save();
        resolve(userSave);
      } catch (e) {
        reject(e);
      }
    });
  }
  public updateUser(id: string, body: {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(id, body, { new: true });
        // Validar si el usuario realiza algun cambio o no
        if (user !== null) {
          if (Object.entries(body).length === 0) {
            resolve("No se detecto ningun cambio");
          } else {
            resolve(user);
          }
        } else {
          resolve("Usuario no encontrado");
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  public deleteUser(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { state: false },
          { new: true }
        );
        if (user !== null) {
          resolve(user);
        } else {
          resolve("Usuario no encontrado");
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  public uploadImage(id: string, img: string, cloudinary_id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(id).exec();
        if (user !== null) {
          if (user.cloudinary_id !== "defaultImage") {
            await cloudinary.uploader.destroy(user.cloudinary_id || "", {
              resource_type: "image",
            });
          }
          const data = await User.findByIdAndUpdate(
            id,
            { img, cloudinary_id },
            { new: true }
          );
          resolve(data);
        }
        reject("Usuario no econtrado");
      } catch (e) {
        reject(e);
      }
    });
  }
}
