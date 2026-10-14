import { z } from "zod";
export const SERVICES = [
  "AI receptionist (WhatsApp / voice)",
  "AI automation",
  "Website design & development",
  "Web application",
  "CRM integration",
  "SEO",
  "Google / Meta ads",
  "Maintenance & support",
  "Not sure yet",
];
export const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹2 lakh",
  "₹2 – ₹5 lakh",
  "₹5 lakh and above",
  "Not sure yet",
];
export const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost"];
/** Normalises an Indian mobile number to +91XXXXXXXXXX, or returns null. */
export function normalizeIndianPhone(input) {
  const digits = input.replace(/[\s\-().]/g, "");
  const m = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return m ? `+91${m[1]}` : null;
}
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  email: z.string().trim().toLowerCase().max(120, "Email is too long").email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => {
    const n = normalizeIndianPhone(v);
    if (!n) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid 10-digit Indian mobile number" });
      return z.NEVER;
    }
    return n;
  }),
  company: z.string().trim().max(100, "Company name is too long").default(""),
  service: z.enum(SERVICES, { errorMap: () => ({ message: "Choose a service" }) }),
  budget: z.enum(BUDGETS, { errorMap: () => ({ message: "Choose a budget range" }) }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000, "Keep it under 2,000 characters"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number().int().positive(), // time-trap
});
export const statusSchema = z.object({ status: z.enum(LEAD_STATUSES) });
export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");
