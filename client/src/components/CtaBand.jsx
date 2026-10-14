import { Link } from "react-router-dom";
import { SITE } from "../lib/content";
export function CtaBand({ title = "Tell us where the friction is. We'll tell you how we'd fix it.", text = "No pitch deck, no pressure. Share your goal and a senior team member replies within the hour on working days.", }) {
  return (<section className="bg-brand py-12 text-white md:py-20" aria-labelledby="cta-title">
    <div className="wrap grid items-center gap-8 md:grid-cols-[1fr_auto]">
    <div>
      <h2 id="cta-title" className="max-w-[24ch] text-[clamp(1.75rem,3vw+0.5rem,2.6rem)] font-bold">{title}</h2>
      <p className="mt-3 max-w-xl opacity-95">{text}</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <Link to="/contact" className="btn btn-light">Start a project</Link>
      <a href={SITE.bookingUrl} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer">
      Book a 30-minute call
      </a>
    </div>
    </div>
  </section>);
}
