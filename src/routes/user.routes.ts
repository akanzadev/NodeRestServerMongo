import { Router } from "express";
import upload from "../middlewares/multer";
import { validateImgCloud } from "../middlewares/validateImg";
import { uploadImage } from "../controllers/user.controller";
import passport from "passport";
import {
  getUser,
  getUsers,
  createdUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();
const path = "/api/users/";
router.get(
  `${path}`,
  passport.authenticate("jwt", { session: false }),
  getUsers
);
router.get(`${path}:id`, getUser);
router.post(`${path}`, createdUser);
router.put(`${path}:id`, updateUser);
router.delete(`${path}:id`, deleteUser);
// update photo from user
router.put(`${path}upload/:id`, [upload, validateImgCloud], uploadImage);

export default router;
