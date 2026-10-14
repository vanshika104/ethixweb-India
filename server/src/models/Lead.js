import { Schema, model } from "mongoose";
import { LEAD_STATUSES } from "../validation.js";
const leadSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
  phone: { type: String, required: true, match: /^\+91[6-9]\d{9}$/ },
  company: { type: String, default: "", maxlength: 100 },
  service: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String, required: true, minlength: 10, maxlength: 2000 },
  status: { type: String, enum: LEAD_STATUSES, default: "new", index: true },
  source: { type: String, default: "website" },
  ipHash: { type: String },
  userAgent: { type: String, maxlength: 300 },
}, { timestamps: true });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1, createdAt: -1 });
export const Lead = model("Lead", leadSchema);
