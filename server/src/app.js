import path from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { env, isProd } from "./env.js";
import { errorHandler, notFoundApi } from "./middleware/errors.js";
import { requireJson, sameOriginOnly } from "./middleware/security.js";
import { adminRouter } from "./routes/admin.js";
import { leadsRouter } from "./routes/leads.js";
export function createApp() {
  const app = express();
  app.set("trust proxy", env.TRUST_PROXY);
  app.disable("x-powered-by");
  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      // Allow plain-http localhost when testing a production build locally.
      directives: isProd ? {} : { "upgrade-insecure-requests": null },
    },
  }));
  app.use(compression());
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });
  app.use("/api", sameOriginOnly, requireJson);
  app.use("/api/leads", leadsRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api", notFoundApi);
  // In production the same Express service serves the built React app.
  if (isProd) {
    const dist = fileURLToPath(new URL("../../client/dist", import.meta.url));
    app.use("/assets", express.static(path.join(dist, "assets"), { immutable: true, maxAge: "1y", index: false }));
    app.use(express.static(dist, { maxAge: "1h", index: false }));
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD")
        return next();
      if (req.path.startsWith("/admin"))
        res.setHeader("X-Robots-Tag", "noindex, nofollow");
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(dist, "index.html"));
    });
  }
  app.use(errorHandler);
  return app;
}
