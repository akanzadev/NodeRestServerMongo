import {
  StrategyOptions,
  ExtractJwt,
  Strategy as JwtStrategy,
} from "passport-jwt";
import User from "../models/user.model";
import { config } from "../config/config";

// configuracion de las opciones passport
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};
// exportando el objeto Strategy de passport
export default new JwtStrategy(opts, async (decoded, done) => {
  try {
    const user = await User.findById(decoded.id);
    user ? done(null, user) : done(null, false);
  } catch (error) {
    new Error("Error en la autenticacion con passport");
  }
});
