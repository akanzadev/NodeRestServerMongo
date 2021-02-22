import { Router } from "express";
import upload from "../middlewares/multer";
import {validateImg} from "../middlewares/validateImg";
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

export default router;
