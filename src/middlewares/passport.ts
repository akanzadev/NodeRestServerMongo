import { StrategyOptions, ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/user.model";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SEED,
};

new Strategy(opts, async (decoded, done) => {
  try {
    const user = await User.findById(decoded.id);
    user ? done(null, user) : done(null, false);
  } catch (error) {
    console.log("Error");
  }
});
