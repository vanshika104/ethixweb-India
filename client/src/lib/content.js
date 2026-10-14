export const SITE = {
  email: "info@ethixweb.com",
  hours: "Mon–Fri, 9:00 AM – 5:00 PM IST",
  bookingUrl: "https://calendly.com/ethixweb-agency/30min",
  global: "https://www.ethixweb.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ethixweb/" },
    { label: "Instagram", href: "https://www.instagram.com/ethix.web/" },
    { label: "Facebook", href: "https://www.facebook.com/ethixweb" },
  ],
  policies: [
    { label: "Privacy Policy", href: "https://www.ethixweb.com/policies/privacy" },
    { label: "Terms & Conditions", href: "https://www.ethixweb.com/policies/terms" },
    { label: "Cancellation & Refunds", href: "https://www.ethixweb.com/policies/refunds" },
  ],
};
export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
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
export const HEADLINE_SERVICES = [
  { name: "AI receptionists", text: "Voice and chat agents that answer calls and WhatsApp messages in Hindi, English or Hinglish, qualify the enquiry and book the appointment." },
  { name: "AI automation", text: "Workflow automation, data syncs and internal copilots that take repetitive work off your team." },
  { name: "Websites", text: "Fast, mobile-first sites with sharp positioning, clear conversion paths and SEO foundations built in." },
  { name: "Web applications", text: "Customer portals, dashboards, booking flows and internal tools engineered for daily operations." },
  { name: "CRM integrations", text: "Forms, calls, calendars and payments connected to HubSpot, GoHighLevel, Zoho or LeadSquared in one pipeline." },
  { name: "SEO", text: "Technical and local SEO, including Google Business Profile, that compounds into steady enquiries." },
  { name: "Ads", text: "Google and Meta campaigns planned in rupees and judged on cost per qualified lead, not clicks." },
  { name: "Maintenance & support", text: "Fast fixes, uptime care, updates and reporting from a team that answers within the hour." },
];
export const PROCESS = [
  { title: "Understand", text: "We map how customers find you today: search, ads, calls, WhatsApp. Then we find where enquiries leak." },
  { title: "Design", text: "Positioning, structure and interface designed mobile-first, with your real customers and languages in mind." },
  { title: "Build", text: "Senior engineers build the site, integrations and automations. You review working software, not slides." },
  { title: "Launch", text: "Tracking, speed checks and a rollback plan are in place before go-live, so launch day is uneventful." },
  { title: "Run", text: "We stay on as your tech team: fixes, SEO, ads, reporting and improvements every month." },
];
export const WORK = [
  { name: "All Phase Plumbing", tag: "Web design · 2026", text: "The new site finally matched the reputation. All Phase Plumbing went from invisible online to fully booked in 90 days.", stat: "90 days", statLabel: "from invisible to fully booked", href: "https://www.ethixweb.com/our-work/all-phase-plumbing" },
  { name: "Gary's Pipelining & Drain Cleaning", tag: "Web design · 2026", text: "An old, underperforming site replaced by one built to turn specialist search traffic into calls from homeowners and contractors.", stat: "2 paths", statLabel: "homeowner and contractor enquiries", href: "https://www.ethixweb.com/our-work/garys-pipeline" },
  { name: "Preventive Home Solutions", tag: "Web design · 2026", text: "A trust-first, branded site that moves a stressed homeowner to a booked inspection in one step, on phone, tablet and desktop.", stat: "1 step", statLabel: "from worry to booked inspection", href: "https://www.ethixweb.com/our-work/preventive-home-solutions" },
  { name: "Catching Chrome", tag: "Web design · 2026", text: "A cleaner, more credible site that makes the next step obvious and books more guided trips from anglers researching on their phones.", stat: "Mobile first", statLabel: "for visitors researching on phones", href: "https://www.ethixweb.com/our-work/catching-chrome" },
];
export const WHY = [
  { title: "Built for how India buys", text: "Enquiries start on WhatsApp, payments finish on UPI, and many customers prefer Hindi or a regional language. We design for that from day one." },
  { title: "A senior team that knows your name", text: "You work with experienced operators, not account number 200 at a large agency. Changes ship quickly because the people who plan them also build them." },
  { title: "Growth tied to revenue", text: "SEO, ads, forms, calls and CRM data are wired together, so you can see which rupee spent brought which customer." },
  { title: "Global standards, local hours", text: "Ethixweb operates across Seattle, Utah, New York, Canada, the UK and India. Your India-hours support comes with the discipline of a global delivery team." },
];
export const STATS = [
  { value: "50+", label: "websites, apps and automations delivered" },
  { value: "<1 hr", label: "average response time" },
  { value: "24/7", label: "global availability" },
  { value: "4.0/5", label: "client rating on Trustpilot" },
];
export const SERVICE_GROUPS = [
  { name: "Website", blurb: "Fast, premium sites that turn visitors into enquiries.", items: [
      ["Redesigns", "Rebuild an ageing site around clear positioning and a faster, mobile-first experience."],
      ["Headless builds", "Decoupled front ends for speed, security and easy content editing."],
      ["Landing pages", "Focused pages for campaigns, launches and festive offers that convert."],
      ["Ongoing maintenance", "Updates, backups, uptime monitoring and quick fixes."],
    ] },
  { name: "AI", blurb: "Agents and automation that work while your team sleeps.", items: [
      ["AI receptionists", "Voice and chat agents that answer, qualify, route and book, in Hindi, English or Hinglish."],
      ["Chatbots", "Website and WhatsApp assistants that handle common questions and capture leads."],
      ["Workflow automation", "Connect your tools so data and follow-ups move without manual work."],
      ["CRM integrations", "HubSpot, GoHighLevel, Zoho and LeadSquared connected to forms, calls and calendars."],
    ] },
  { name: "Growth", blurb: "SEO, ads, social and email working as one engine.", items: [
      ["SEO", "Technical SEO and content systems that build durable demand."],
      ["Local SEO", "Google Business Profile, local pages and reviews for city-level discovery."],
      ["Google ads", "Search and performance campaigns with budgets planned in rupees."],
      ["Meta ads", "Facebook and Instagram campaigns built around lead quality."],
      ["Social media", "Consistent, on-brand presence managed by a real team."],
      ["Email marketing", "Lifecycle and campaign emails connected to your CRM."],
    ] },
  { name: "Data", blurb: "Know what is working, in one place.", items: [
      ["Live dashboards", "Leads, calls and spend across every channel on a single screen."],
      ["Analytics", "Clean tracking and conversion measurement you can trust."],
      ["Monthly reporting", "Plain-language reports that say what changed and what to do next."],
    ] },
  { name: "Accessibility", blurb: "Sites that work for everyone.", items: [
      ["Accessibility improvements", "Fixes for contrast, keyboard use, labels and structure."],
      ["Accessibility testing", "Reviews against recognised standards, with a clear action list."],
    ] },
  { name: "Support", blurb: "A real team when something needs attention.", items: [
      ["Technical support", "Fast answers and fixes from people who know your stack."],
      ["Content updates", "Text, image and page changes handled for you."],
      ["API maintenance", "Keep integrations and third-party connections healthy."],
    ] },
];
export const INDIA_STACK = [
  ["WhatsApp Business", "Enquiry capture, templates and AI replies where your customers already are."],
  ["UPI and payment gateways", "Razorpay, PayU and UPI flows wired into booking and checkout."],
  ["Hindi and regional languages", "Interfaces, copy and voice agents that speak your customer's language."],
  ["Indian CRMs and tools", "Zoho, LeadSquared, Tally exports and GST-ready invoicing workflows."],
  ["Google Business Profile", "City and neighbourhood discovery for clinics, schools, shops and services."],
  ["Mobile-first, low-bandwidth", "Light pages that load quickly on mid-range phones and 4G networks."],
];
export const HUBS = ["Seattle", "Utah", "New York", "Canada", "United Kingdom", "India"];
export const INDUSTRIES = [
  "Clinics and healthcare",
  "Coaching and education",
  "Real estate",
  "D2C and retail",
  "Manufacturing and exports",
  "Professional services",
];
