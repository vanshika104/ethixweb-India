import { useEffect, useRef, useState } from "react";
import { ApiError, api } from "../lib/api";
import { BUDGETS, SERVICES, SITE } from "../lib/content";
const label = "text-[0.95rem] font-semibold";
export function EnquiryForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  async function onSubmit(e) {
    e.preventDefault();
    if (status === "submitting")
      return;
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus("submitting");
    setMessage("");
    setErrors({});
    try {
      await api("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: d.get("name"),
          email: d.get("email"),
          phone: d.get("phone"),
          company: d.get("company"),
          service: d.get("service"),
          budget: d.get("budget"),
          message: d.get("message"),
          consent: d.get("consent") === "on",
          website: d.get("website"),
          startedAt: startedAt.current,
        }),
      });
      setFirstName(String(d.get("name") ?? "").split(" ")[0]);
      setStatus("success");
      form.reset();
    }
    catch (err) {
      const apiErr = err instanceof ApiError ? err : null;
      setErrors(apiErr?.fieldErrors ?? {});
      setMessage(apiErr?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
      const first = apiErr?.fieldErrors && Object.keys(apiErr.fieldErrors)[0];
      if (first)
        form.querySelector(`[name="${first}"]`)?.focus();
    }
  }
  if (status === "success") {
    return (<div className="grid justify-items-start gap-4 rounded-[20px] border border-line bg-wash p-8" role="status">
    <h3 className="text-2xl font-semibold">Thank you{firstName ? `, ${firstName}` : ""}. We have your enquiry.</h3>
    <p className="text-ink-soft">
      A senior team member will reply on email or WhatsApp, usually within the hour on working days. If it is
      urgent, email us at {SITE.email}.
    </p>
    <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
      Send another enquiry
    </button>
    </div>);
  }
  const err = (n) => errors[n]?.[0];
  const a11y = (n) => ({
    "aria-invalid": err(n) ? true : undefined,
    "aria-describedby": err(n) ? `${n}-error` : undefined,
  });
  const Err = ({ n }) => err(n) ? <p className="field-error" id={`${n}-error`}>{err(n)}</p> : null;
  return (<form onSubmit={onSubmit} noValidate aria-label="Project enquiry" className="grid gap-4.5 rounded-[20px] border border-line bg-white p-5 shadow-[0_24px_48px_-32px_rgba(28,21,23,0.3)] sm:p-8">
    <div className="grid gap-4.5 sm:grid-cols-2">
    <div className="grid gap-1.5">
      <label className={label} htmlFor="name">Full name</label>
      <input className="input" id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} {...a11y("name")}/>
      <Err n="name"/>
    </div>
    <div className="grid gap-1.5">
      <label className={label} htmlFor="company">Company <span className="font-normal text-ink-soft">(optional)</span></label>
      <input className="input" id="company" name="company" autoComplete="organization" maxLength={100} {...a11y("company")}/>
      <Err n="company"/>
    </div>
    </div>

    <div className="grid gap-4.5 sm:grid-cols-2">
    <div className="grid gap-1.5">
      <label className={label} htmlFor="email">Work email</label>
      <input className="input" id="email" name="email" type="email" autoComplete="email" required maxLength={120} {...a11y("email")}/>
      <Err n="email"/>
    </div>
    <div className="grid gap-1.5">
      <label className={label} htmlFor="phone">Mobile / WhatsApp</label>
      <input className="input" id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="12345 67891" required {...a11y("phone")}/>
      <Err n="phone"/>
    </div>
    </div>

    <div className="grid gap-4.5 sm:grid-cols-2">
    <div className="grid gap-1.5">
      <label className={label} htmlFor="service">What do you need?</label>
      <select className="input" id="service" name="service" required defaultValue="" {...a11y("service")}>
      <option value="" disabled>Choose a service</option>
      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <Err n="service"/>
    </div>
    <div className="grid gap-1.5">
      <label className={label} htmlFor="budget">Budget range</label>
      <select className="input" id="budget" name="budget" required defaultValue="" {...a11y("budget")}>
      <option value="" disabled>Choose a range</option>
      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
      </select>
      <Err n="budget"/>
    </div>
    </div>

    <div className="grid gap-1.5">
    <label className={label} htmlFor="message">Tell us about your project</label>
    <textarea className="input min-h-32 resize-y" id="message" name="message" rows={5} required minLength={10} maxLength={2000} {...a11y("message")}/>
    <Err n="message"/>
    </div>

    {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
    <label htmlFor="website">Leave this field empty</label>
    <input id="website" name="website" tabIndex={-1} autoComplete="off"/>
    </div>

    <div className="grid gap-1.5">
    <label className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
      <input type="checkbox" name="consent" required className="mt-1 size-5 flex-none accent-brand" {...a11y("consent")}/>
      <span>
      I agree to be contacted about my enquiry and accept the{" "}
      <a className="text-brand-deep underline" href="https://www.ethixweb.com/policies/privacy" target="_blank" rel="noopener noreferrer">
        privacy policy
      </a>.
      </span>
    </label>
    <Err n="consent"/>
    </div>

    <div className="flex flex-wrap items-center gap-4">
    <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
      {status === "submitting" ? "Sending…" : "Send enquiry"}
    </button>
    <p className="font-medium text-brand-deep" role="alert">{status === "error" ? message : ""}</p>
    </div>
  </form>);
}
