import jwt from "jsonwebtoken";
import { env, isProd } from "../env.js";
export const COOKIE_NAME = "ew_admin";
const MAX_AGE_MS = 8 * 60 * 60 * 1000;
export const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "strict",
  path: "/",
  maxAge: MAX_AGE_MS,
};
export function issueToken() {
  return jwt.sign({ role: "admin" }, env.JWT_SECRET, { algorithm: "HS256", expiresIn: "8h" });
}
export const requireAdmin = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] });
    if (typeof payload === "object" && payload.role === "admin")
      return next();
  }
  catch {
    /* invalid or missing token */
  }
  res.status(401).json({ error: "Unauthorised" });
};
