import { EnquiryForm } from "../components/EnquiryForm";
import { usePage } from "../hooks/usePage";
import { SITE } from "../lib/content";
export default function Contact() {
  usePage("Contact | Ethixweb India", "Tell Ethixweb about your project. A senior team member replies within the hour on working days.");
  const row = "grid gap-0.5";
  return (<>
    <section className="bg-[radial-gradient(50rem_22rem_at_90%_-20%,var(--color-brand-tint),transparent_70%)] pt-12 pb-8 md:pt-24 md:pb-12">
    <div className="wrap">
      <h1 className="h-page">Start a project.</h1>
      <p className="lead mt-5">Tell us where the friction is and we will tell you how we would fix it. No pitch deck, no pressure.</p>
    </div>
    </section>

    <div className="wrap grid gap-12 pt-4 pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:pb-28">
    <div>
      <h2 className="text-[1.6rem] font-bold">Prefer to talk?</h2>
      <dl className="mt-6 grid gap-6">
      <div className={row}>
        <dt className="font-semibold">Email</dt>
        <dd className="text-ink-soft"><a className="text-brand-deep underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
      </div>
      <div className={row}>
        <dt className="font-semibold">Working hours</dt>
        <dd className="text-ink-soft">{SITE.hours}</dd>
      </div>
      <div className={row}>
        <dt className="font-semibold">Book a call</dt>
        <dd className="text-ink-soft"><a className="text-brand-deep underline underline-offset-4" href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">Pick a 30-minute slot</a></dd>
      </div>
      <div className={row}>
        <dt className="font-semibold">Response time</dt>
        <dd className="text-ink-soft">Usually within the hour on working days.</dd>
      </div>
      </dl>
    </div>
    <EnquiryForm />
    </div>
  </>);
}
