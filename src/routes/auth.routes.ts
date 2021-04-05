import { Router } from "express";
import { signIn } from "../controllers/auth.controller";
import passport from "passport";
const router = Router();
const path = "/api/auth/";

router.post(`${path}signin`, signIn);
// Ruta para autenticarse con Google (enlace de login)
router.get("/api/google", passport.authenticate("google"));
// Ruta para autenticarse con Facebook (enlace de login)
router.get("/api/facebook", passport.authenticate("facebook"));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
router.get(
  "/api/google/callback",
  passport.authenticate("twitter", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
router.get(
  "/api/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
export default router;

