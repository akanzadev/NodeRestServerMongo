import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";

const router = Router();
const path = "/api/auth/";

router.post(`${path}`, [], loginUser);

export default router;
