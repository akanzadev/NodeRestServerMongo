import multer from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
// Settings
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req: Request, file: any, cb: any) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Solo se aceptan imagenes jpeg and png"), false);
  }
};

// limit load
const limits = 100000;

const upload = multer({ storage, fileFilter, limits: {} });
export default upload.single("img");
