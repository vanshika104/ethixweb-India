import bcrypt from "bcryptjs";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { env } from "../env.js";
import { COOKIE_NAME, cookieOptions, issueToken, requireAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/errors.js";
import { Lead } from "../models/Lead.js";
import { LEAD_STATUSES, objectIdSchema, statusSchema } from "../validation.js";
export const adminRouter = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ error: "Too many attempts. Try again in a few minutes." }),
});
adminRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
adminRouter.post("/login", loginLimiter, async (req, res) => {
  const parsed = z.object({ password: z.string().min(1).max(200) }).safeParse(req.body);
  if (!parsed.success)
    throw new HttpError(400, "Enter the admin password.");
  const ok = await bcrypt.compare(parsed.data.password, env.ADMIN_PASSWORD_HASH);
  if (!ok)
    throw new HttpError(401, "Incorrect password.");
  res.cookie(COOKIE_NAME, issueToken(), cookieOptions).json({ ok: true });
});
adminRouter.post("/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined }).json({ ok: true });
});
// Everything below needs a valid admin session.
adminRouter.use(requireAdmin);
adminRouter.get("/me", (_req, res) => {
  res.json({ ok: true });
});
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const listQuery = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  q: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
});
adminRouter.get("/leads", async (req, res) => {
  const parsed = listQuery.safeParse(req.query);
  if (!parsed.success)
    throw new HttpError(400, "Invalid filters.");
  const { status, q, page } = parsed.data;
  const limit = 20;
  const filter = {};
  if (status)
    filter.status = status;
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ name: rx }, { email: rx }, { company: rx }, { phone: rx }, { message: rx }];
  }
  const [leads, total, grouped] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-ipHash -userAgent -__v")
      .lean(),
    Lead.countDocuments(filter),
    Lead.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
  ]);
  const counts = { all: 0 };
  for (const s of LEAD_STATUSES)
    counts[s] = 0;
  for (const g of grouped) {
    counts[g._id] = g.n;
    counts.all += g.n;
  }
  res.json({ leads, total, page, pages: Math.max(1, Math.ceil(total / limit)), counts });
});
adminRouter.get("/leads/export.csv", async (_req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(5000).lean();
  // Prefix risky leading characters so spreadsheets don't run them as formulas.
  const cell = (v) => {
    const s = String(v ?? "");
    return `"${(/^[=+\-@\t\r]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
  };
  const cols = ["createdAt", "name", "email", "phone", "company", "service", "budget", "message", "status", "source"];
  const rows = leads.map((l) => cols.map((c) => cell(c === "createdAt" ? l.createdAt.toISOString() : l[c])).join(","));
  res
    .type("text/csv; charset=utf-8")
    .attachment(`ethixweb-leads-${new Date().toISOString().slice(0, 10)}.csv`)
    .send([cols.join(","), ...rows].join("\n"));
});
adminRouter.patch("/leads/:id", async (req, res) => {
  const id = objectIdSchema.safeParse(req.params.id);
  const body = statusSchema.safeParse(req.body);
  if (!id.success)
    throw new HttpError(400, "Invalid lead id.");
  if (!body.success)
    throw new HttpError(422, "Invalid status.");
  const updated = await Lead.findByIdAndUpdate(id.data, { status: body.data.status }, { new: true }).lean();
  if (!updated)
    throw new HttpError(404, "Lead not found.");
  res.json({ ok: true });
});
adminRouter.delete("/leads/:id", async (req, res) => {
  const id = objectIdSchema.safeParse(req.params.id);
  if (!id.success)
    throw new HttpError(400, "Invalid lead id.");
  const deleted = await Lead.findByIdAndDelete(id.data).lean();
  if (!deleted)
    throw new HttpError(404, "Lead not found.");
  res.json({ ok: true });
});
