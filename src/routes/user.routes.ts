import { Router } from "express";
import upload from "../middlewares/multer";
import { validateImg, validateImgCloud } from "../middlewares/validateImg";
import { uploadImage } from "../controllers/user.controller";
import {
  getUser,
  getUsers,
  createdUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();
const path = "/api/users/";
router.get(`${path}`, getUsers);
router.get(`${path}:id`, getUser);
router.post(`${path}`, [upload, validateImg], createdUser);
router.put(`${path}:id`, updateUser);
router.delete(`${path}:id`, deleteUser);
// update photo from user
router.put(`${path}upload/:id`, [upload, validateImgCloud], uploadImage);

export default router;
