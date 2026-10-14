import { CtaBand } from "../components/CtaBand";
import { usePage } from "../hooks/usePage";
import { HUBS } from "../lib/content";
const BELIEFS = [
  { title: "Operators, not order-takers", text: "We run your digital stack the way an in-house technology team would, and tell you plainly when something should not be built." },
  { title: "Fast, because small teams are fast", text: "The people who scope a change are the people who ship it. Small fixes take hours, not weeks." },
  { title: "Measured in enquiries and revenue", text: "Pretty is the starting point. We judge a site by the calls, bookings and customers it brings in." },
];
export default function About() {
  usePage("About | Ethixweb India", "Ethixweb is a global digital operations team with a hub in India, now building for Indian businesses that want a senior technology partner.");
  return (<>
    <section className="bg-[radial-gradient(50rem_22rem_at_90%_-20%,var(--color-brand-tint),transparent_70%)] pt-12 pb-8 md:pt-24 md:pb-12">
    <div className="wrap">
      <h1 className="h-page">A global team with a hub in India.</h1>
      <p className="lead mt-5">
      Ethixweb works with businesses across Seattle, Utah, New York, Canada and the UK, with India as one of the
      hubs that keeps work moving across time zones. This site is our commitment to the business owners next door.
      </p>
    </div>
    </section>

    <section aria-labelledby="story-title" className="section-pad">
    <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <h2 id="story-title" className="h-lg">Why India, and why now.</h2>
      <div className="grid max-w-[40rem] gap-5 text-ink-soft">
      <p>
        Indian businesses are some of the most digitally active in the world. Customers find a clinic on Google
        Maps, ask a question on WhatsApp and pay on UPI, often from a mid-range phone on a 4G connection. The
        owners serving them are busy, and most agencies treat them as account number 200.
      </p>
      <p>
        Ethixweb has spent its time building and running websites, automations and AI receptionists for small and
        growing businesses. The India hub is part of how that work gets delivered. Building an India-focused
        practice is the natural next step: the same senior, accountable team, working in your time zone, in your
        languages, with the tools you already use.
      </p>
      <p>
        We are still a small team on purpose. When you write to us, you hear back from someone who has read your
        site and understands your market.
      </p>
      </div>
    </div>
    </section>

    <section aria-labelledby="beliefs-title" className="section-pad bg-wash">
    <div className="wrap">
      <h2 id="beliefs-title" className="h-lg mb-10">How we work.</h2>
      <ul className="grid max-w-3xl gap-8">
      {BELIEFS.map((b) => (<li key={b.title} className="border-l-[3px] border-brand pl-5">
        <h3 className="text-xl font-semibold">{b.title}</h3>
        <p className="mt-1.5 max-w-[34rem] text-ink-soft">{b.text}</p>
        </li>))}
      </ul>
    </div>
    </section>

    <section aria-labelledby="network-title" className="section-pad">
    <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="grid content-start gap-4">
      <h2 id="network-title" className="h-lg">One network across time zones.</h2>
      <p className="lead">A responsive operations layer, so a request sent at the end of your day is already moving.</p>
      </div>
      <ul aria-label="Ethixweb locations" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {HUBS.map((h) => (<li key={h} className={`rounded-xl border px-4.5 py-4 font-semibold ${h === "India" ? "border-brand bg-brand text-white" : "border-line bg-white"}`}>
        {h}
        </li>))}
      </ul>
    </div>
    </section>

    <CtaBand title="Let's build something that brings in customers."/>
  </>);
}
