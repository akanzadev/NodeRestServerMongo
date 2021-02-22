import dotenv from "dotenv";
dotenv.config();
export const config = {
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/cafe",
  },
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "akanza",
  },
  cloudinary: {
    domain: process.env.CLOUD_NAME || "none",
    key: process.env.CLOUD_KEY || "0",
    keySecret: process.env.CLOUD_KEY_SECRET || "none",
  },
};
