import { Link } from "react-router-dom";
import { NAV, SITE } from "../lib/content";
import { Logo } from "./Logo";
const h = "mb-3.5 font-display text-base font-semibold text-white";
const a = "hover:text-white hover:underline";
export function Footer() {
  return (<footer className="bg-ink pt-14 text-[#e9e0dd] md:pt-20">
    <div className="wrap grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
    <div>
      <Logo light/>
      <p className="mt-4 max-w-[22rem] text-[0.98rem] text-[#bfb2af]">
      Digital operations for growing Indian businesses: AI receptionists, websites, CRM, SEO and ads, run by one
      accountable team.
      </p>
    </div>
    <div>
      <h2 className={h}>Explore</h2>
      <ul className="grid gap-2 text-[0.98rem] text-[#bfb2af]">
      {NAV.map((n) => (<li key={n.to}><Link className={a} to={n.to}>{n.label}</Link></li>))}
      </ul>
    </div>
    <div>
      <h2 className={h}>Talk to us</h2>
      <ul className="grid gap-2 text-[0.98rem] text-[#bfb2af]">
      <li><a className={a} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
      <li>{SITE.hours}</li>
      <li><a className={a} href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a></li>
      </ul>
    </div>
    <div>
      <h2 className={h}>Company</h2>
      <ul className="grid gap-2 text-[0.98rem] text-[#bfb2af]">
      {[...SITE.policies, ...SITE.socials].map((l) => (<li key={l.href}><a className={a} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>))}
      </ul>
    </div>
    </div>
    <div className="wrap mt-12 flex flex-wrap justify-between gap-3 border-t border-[#3a2f32] py-6 text-sm text-[#bfb2af]">
    <span>© 2026 Ethixweb. All rights reserved.</span>
    <a className={a} href={SITE.global} target="_blank" rel="noopener noreferrer">Visit the global site</a>
    </div>
  </footer>);
}
