import {
  IOAuth2StrategyOption,
  OAuth2Strategy as GoogleStrategy,
} from "passport-google-oauth";
import User from "../models/user.model";
import { config } from "../config/config";

// configuracion de las opciones passport
const opts: IOAuth2StrategyOption = {
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: config.jwt.secret,
};
// exportando el objeto Strategy de passport
export default new GoogleStrategy(
  opts,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findById(profile.id);
      user ? done(null, user) : done(null, false);
    } catch (error) {
      new Error("Error en la autenticacion con passport");
    }
  }
);
