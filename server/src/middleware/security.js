import { HttpError } from "./errors.js";
const SAFE = new Set(["GET", "HEAD", "OPTIONS"]);
/** Blocks cross-site state-changing requests. Requests with no Origin header (curl, server-to-server)
 *  fall through to validation, honeypot and rate limits. */
export const sameOriginOnly = (req, _res, next) => {
  if (SAFE.has(req.method))
    return next();
  const origin = req.get("origin");
  if (!origin)
    return next();
  try {
    if (new URL(origin).host === req.get("host"))
      return next();
  }
  catch {
    /* fall through */
  }
  next(new HttpError(403, "Request blocked."));
};
export const requireJson = (req, _res, next) => {
  if (SAFE.has(req.method) || req.is("application/json"))
    return next();
  next(new HttpError(415, "Content-Type must be application/json."));
};
