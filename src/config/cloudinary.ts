import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

cloudinary.config({
  cloud_name: config.cloudinary.domain,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.keySecret,
});

export default cloudinary;
