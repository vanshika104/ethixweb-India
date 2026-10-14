import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { usePage } from "../hooks/usePage";
import { HEADLINE_SERVICES, PROCESS, SITE, STATS, WHY, WORK } from "../lib/content";
const CHAT = [
  { from: "out", text: "Namaste! Kal shaam 4 baje dental checkup ka slot milega?" },
  { from: "in", text: "Namaste 🙏 Kal 4:00 PM khaali hai. Aapka naam aur mobile number bata dein?" },
  { from: "out", text: "Rohan Mehta, 98765 43210" },
  { from: "in", text: "Kal 4:00 PM, Dr. Sharma. Reminder aur location WhatsApp par bhej diya hai.", tick: true },
  { from: "out", text: "Shukriya!" },
];
export default function Home() {
  usePage("Ethixweb India | We run the tech. You run the business.", "Ethixweb India manages your digital operation: AI receptionists on WhatsApp, websites, CRM integrations, SEO and ads for growing Indian businesses.");
  return (<>
    {/* Hero */}
    <section aria-labelledby="hero-title" className="bg-[radial-gradient(60rem_30rem_at_85%_-10%,var(--color-brand-tint),transparent_70%)] py-10 md:py-20">
    <div className="wrap grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div>
      <h1 id="hero-title" className="h-xl max-w-[12ch]">We run the tech. You run the business.</h1>
      <p lang="hi" className="mt-4 font-hindi text-xl font-medium text-brand-deep">तकनीक हम संभालेंगे, कारोबार आप।</p>
      <p className="lead mt-5">
        Ethixweb is the senior digital operations team for growing Indian businesses: AI receptionists on
        WhatsApp and phone, fast websites, CRM integrations, SEO and ads that pay back in rupees.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/contact" className="btn btn-primary">Get a free consultation</Link>
        <a href={SITE.bookingUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
      </div>
      <ul aria-label="Ethixweb at a glance" className="mt-9 flex flex-wrap gap-x-7 gap-y-2 border-t border-line pt-6 text-[0.95rem] text-ink-soft">
        <li><strong className="mr-1.5 font-display text-lg text-ink">50+</strong>projects delivered</li>
        <li><strong className="mr-1.5 font-display text-lg text-ink">&lt;1 hr</strong>average response</li>
        <li><strong className="mr-1.5 font-display text-lg text-ink">4.0/5</strong>on Trustpilot</li>
      </ul>
      </div>

      <div className="w-full max-w-sm justify-self-center">
      <div role="img" aria-label="Example WhatsApp conversation in which an AI receptionist books a dental appointment in Hinglish" className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_30px_60px_-30px_rgba(161,15,31,0.35)]">
        <div className="flex items-center gap-3 bg-brand px-4.5 py-4 text-white">
        <span className="grid size-10 place-items-center rounded-full bg-white font-display text-sm font-bold text-brand" aria-hidden="true">AI</span>
        <div className="leading-tight">
          <b className="block text-[0.98rem]">Clinic receptionist</b>
          <span className="text-[0.8rem] opacity-90">Replies in Hindi, English or Hinglish</span>
        </div>
        </div>
        <div aria-hidden="true" className="grid min-h-[22rem] content-start gap-2.5 bg-wash p-4.5">
        {CHAT.map((m, i) => (<p key={i} style={{ animationDelay: `${[0.3, 1.3, 2.4, 3.5, 4.4][i]}s` }} className={`max-w-[84%] animate-pop rounded-2xl px-3.5 py-2.5 text-[0.95rem] leading-snug opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 ${m.from === "in"
        ? "justify-self-start rounded-tl-sm border border-line bg-white"
        : "justify-self-end rounded-tr-sm border border-[#f6c9ce] bg-brand-tint"}`}>
          {"tick" in m && m.tick && <span className="font-bold text-ok">Booked ✓ </span>}
          {m.text}
          </p>))}
        </div>
      </div>
      <p className="mt-3.5 text-center text-sm text-ink-soft">
        Illustrative conversation. Your agent is trained on your services and timings.
      </p>
      </div>
    </div>
    </section>

    {/* Services */}
    <section id="services" aria-labelledby="services-title" className="section-pad">
    <div className="wrap">
      <div className="mb-10 grid max-w-3xl gap-4 md:mb-14">
      <h2 id="services-title" className="h-lg">Senior operators for the systems that grow your business.</h2>
      <p className="lead">Eight things we run for Indian businesses every day, from first enquiry to monthly reporting.</p>
      </div>
      <ul className="border-t border-ink">
      {HEADLINE_SERVICES.map((s) => (<li key={s.name} className="group grid gap-1.5 border-b border-line py-6 md:grid-cols-[18rem_1fr] md:items-baseline md:gap-8 md:py-7">
        <h3 className="text-2xl font-semibold transition-colors md:group-hover:text-brand">{s.name}</h3>
        <p className="max-w-xl text-ink-soft">{s.text}</p>
        </li>))}
      </ul>
      <Link to="/services" className="mt-8 inline-flex font-semibold text-brand-deep underline underline-offset-4">See all 22 services</Link>
    </div>
    </section>

    {/* Process */}
    <section id="process" aria-labelledby="process-title" className="section-pad bg-wash">
    <div className="wrap">
      <div className="mb-10 grid max-w-3xl gap-4 md:mb-14">
      <h2 id="process-title" className="h-lg">One process from first call to monthly results.</h2>
      <p className="lead">Strategy, design, development, launch and support under one roof, so nothing falls between vendors.</p>
      </div>
      <ol className="grid lg:grid-cols-5 lg:gap-6">
      {PROCESS.map((p, i) => (<li key={p.title} className="relative ml-[1.15rem] border-l-2 border-line pb-8 pl-14 last:border-l-transparent last:pb-0 lg:ml-0 lg:border-t-2 lg:border-l-0 lg:pt-13 lg:pb-0 lg:pl-0 lg:last:border-t-line">
        <span aria-hidden="true" className="absolute top-0 -left-[1.2rem] grid size-9 place-items-center rounded-full bg-brand font-display font-bold text-white lg:-top-[1.15rem] lg:left-0">
          {i + 1}
        </span>
        <h3 className="mb-1.5 text-xl font-semibold">{p.title}</h3>
        <p className="max-w-[30rem] text-ink-soft lg:text-[0.98rem]">{p.text}</p>
        </li>))}
      </ol>
    </div>
    </section>

    {/* Featured work */}
    <section id="work" aria-labelledby="work-title" className="section-pad">
    <div className="wrap">
      <div className="mb-10 grid max-w-3xl gap-4 md:mb-14">
      <h2 id="work-title" className="h-lg">A clear before and after, every time.</h2>
      <p className="lead">Recent Ethixweb projects. We bring the same approach to Indian clinics, schools, shops and services.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr]">
      {WORK.map((w, i) => {
      const feature = i === 0;
      return (<a key={w.name} href={w.href} target="_blank" rel="noopener noreferrer" className={`flex flex-col justify-between gap-8 rounded-[14px] border p-7 no-underline transition-colors ${feature
          ? "border-brand bg-brand text-white hover:bg-brand-deep md:row-span-2 md:p-9"
          : "border-line bg-wash hover:border-brand"}`}>
          <div>
          <span className={`text-sm ${feature ? "text-white" : "text-ink-soft"}`}>{w.tag}</span>
          <h3 className={`mt-1.5 mb-3 font-semibold ${feature ? "text-3xl md:text-4xl" : "text-2xl"}`}>{w.name}</h3>
          <p className={feature ? "text-white" : "text-ink-soft"}>{w.text}</p>
          </div>
          <div className={`flex flex-wrap items-baseline gap-3 border-t pt-5 ${feature ? "border-white/35" : "border-line"}`}>
          <b className={`font-display leading-none font-bold tracking-tighter ${feature ? "text-5xl text-white md:text-6xl" : "text-3xl text-brand"}`}>{w.stat}</b>
          <span className={`text-[0.95rem] ${feature ? "text-white" : "text-ink-soft"}`}>{w.statLabel}</span>
          </div>
          <span className="sr-only">(opens ethixweb.com case study in a new tab)</span>
        </a>);
    })}
      </div>
    </div>
    </section>

    {/* Why Ethixweb */}
    <section id="why" aria-labelledby="why-title" className="section-pad bg-wash">
    <div className="wrap">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="grid max-w-3xl content-start gap-4 lg:sticky lg:top-24 lg:self-start">
        <h2 id="why-title" className="h-lg">Why growing Indian businesses choose Ethixweb.</h2>
        <p className="lead">Tired of being account number 200 at a big agency? Work with a team that knows your business by name.</p>
      </div>
      <ul className="grid gap-8">
        {WHY.map((w) => (<li key={w.title} className="border-l-[3px] border-brand pl-5">
          <h3 className="text-xl font-semibold">{w.title}</h3>
          <p className="mt-1.5 max-w-[34rem] text-ink-soft">{w.text}</p>
        </li>))}
      </ul>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-10 md:mt-20 lg:grid-cols-4">
      {STATS.map((s) => (<li key={s.label}>
        <b className="block font-display text-[clamp(2rem,4vw,3rem)] leading-none font-bold tracking-tighter text-brand">{s.value}</b>
        <span className="mt-2 block max-w-56 text-[0.95rem] text-ink-soft">{s.label}</span>
        </li>))}
      </ul>
    </div>
    </section>

    <CtaBand />
  </>);
}
