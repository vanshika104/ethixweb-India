import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { usePage } from "../hooks/usePage";
import { INDIA_STACK, INDUSTRIES, SERVICE_GROUPS } from "../lib/content";
export default function Services() {
  usePage("Services | Ethixweb India", "22 digital services for Indian businesses: AI receptionists, websites, CRM integrations, SEO, ads, analytics, accessibility and support.");
  return (<>
    <section className="bg-[radial-gradient(50rem_22rem_at_90%_-20%,var(--color-brand-tint),transparent_70%)] pt-12 pb-8 md:pt-24 md:pb-12">
    <div className="wrap">
      <h1 className="h-page">22 services, one accountable team.</h1>
      <p className="lead mt-5">
      From website builds to AI receptionists, ad campaigns, reporting and ongoing support. Every capability we
      run, grouped by what it does for your business.
      </p>
    </div>
    </section>

    <section id="what-we-offer" aria-label="Service catalogue" className="pt-8 pb-16 md:pb-24">
    <div className="wrap">
      {SERVICE_GROUPS.map((g) => (<div key={g.name} className="grid gap-6 border-t border-line py-10 md:grid-cols-[18rem_1fr] md:gap-12">
        <div>
        <h2 className="text-[1.9rem] font-bold">{g.name}</h2>
        <p className="mt-2 max-w-xs text-ink-soft">{g.blurb}</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
        {g.items.map(([name, text]) => (<li key={name} className="rounded-xl bg-wash px-5 py-4.5">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-1 text-[0.98rem] text-ink-soft">{text}</p>
          </li>))}
        </ul>
      </div>))}
    </div>
    </section>

    <section aria-labelledby="stack-title" className="section-pad bg-wash">
    <div className="wrap">
      <div className="mb-10 grid max-w-3xl gap-4">
      <h2 id="stack-title" className="h-lg">Built for the Indian stack.</h2>
      <p className="lead">The tools your customers and your team already use, connected properly.</p>
      </div>
      <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {INDIA_STACK.map(([name, text]) => (<li key={name} className="bg-white px-6 py-5.5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-[0.98rem] text-ink-soft">{text}</p>
        </li>))}
      </ul>
    </div>
    </section>

    <section aria-labelledby="industries-title" className="section-pad">
    <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="grid gap-4">
      <h2 id="industries-title" className="h-lg">Where we do our best work.</h2>
      <p className="lead">
        Businesses that win on trust and speed of response. Not on the list?{" "}
        <Link to="/contact" className="text-brand-deep underline underline-offset-4">Tell us about yours.</Link>
      </p>
      </div>
      <ul aria-label="Industries" className="flex flex-wrap content-start gap-2.5">
      {INDUSTRIES.map((i) => (<li key={i} className="rounded-full border border-line bg-white px-4 py-2 font-medium">{i}</li>))}
      </ul>
    </div>
    </section>

    <CtaBand />
  </>);
}
