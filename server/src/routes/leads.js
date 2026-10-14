import { createHash } from "node:crypto";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../env.js";
import { HttpError } from "../middleware/errors.js";
import { Lead } from "../models/Lead.js";
import { leadSchema } from "../validation.js";
const MIN_FILL_MS = 2_000; // a human needs longer than this to fill the form
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5, // 5 enquiries per IP per hour
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ error: "Too many enquiries from this network. Please try again later." }),
});
export const leadsRouter = Router();
leadsRouter.post("/", limiter, async (req, res) => {
  const body = req.body;
  // Honeypot: report success so bots learn nothing.
  if (body && typeof body === "object" && body.website) {
    res.status(201).json({ ok: true });
    return;
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(422, "Please fix the highlighted fields.", {
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }
  const lead = parsed.data;
  if (Date.now() - lead.startedAt < MIN_FILL_MS) {
    throw new HttpError(400, "That was quick! Please review your details and send again.");
  }
  // Idempotency: ignore a double-click or retry of the same enquiry.
  const duplicate = await Lead.exists({
    email: lead.email,
    message: lead.message,
    createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
  });
  if (duplicate) {
    res.status(200).json({ ok: true });
    return;
  }
  await Lead.create({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    service: lead.service,
    budget: lead.budget,
    message: lead.message,
    ipHash: createHash("sha256").update(`${env.IP_HASH_SALT}:${req.ip ?? "unknown"}`).digest("hex"),
    userAgent: (req.get("user-agent") ?? "").slice(0, 300),
  });
  res.status(201).json({ ok: true });
});
