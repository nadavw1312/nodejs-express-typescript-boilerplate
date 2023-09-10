import * as jwt from "jsonwebtoken";
import config from "../config/config";

class JwtUtils {
  getSecret() {
    return config.jwtSecret;
  }

  generateToken(req, res, payload) {
    const maxAge = 3 * 60 * 60; // 3hrs in sec
    const token = jwt.sign(payload, this.getSecret(), {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });
  }
}
const jwtUtils = new JwtUtils();

export { jwtUtils };