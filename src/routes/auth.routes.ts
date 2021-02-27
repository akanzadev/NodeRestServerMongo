import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller";

const router = Router();
const path = "/api/auth/";

router.post(`${path}signin`, signIn);
export default router;
