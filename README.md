# Ethixweb India

An India-specific redesign of [ethixweb.com](https://www.ethixweb.com): a premium, mobile-first marketing site with a working lead pipeline.

**Stack:** React 19 (JSX) + Vite + Tailwind CSS 4 (client) · Node + Express 5 (API, plain JavaScript) · MongoDB + Mongoose (database)

## Features

- **Pages:** Home (hero, services, process, featured work, why Ethixweb, CTA), Services, About (India story), Contact, 404
- **Enquiry form** that saves to MongoDB, with server-side validation (Zod), honeypot, time-trap, per-IP rate limiting, duplicate suppression and a same-origin check
- **Protected `/admin`:** password login (bcrypt + signed httpOnly cookie), search, status filter, pagination, status changes, delete, CSV export
- Secrets live only in environment variables; `.env` files are git-ignored

## Project structure

```
client/                 React app (Vite + Tailwind)
  src/pages/            Home, Services, About, Contact, NotFound, admin/{Login,Dashboard} (.jsx)
  src/components/       Header, Footer, Logo, CtaBand, EnquiryForm, Layout
  src/lib/content.js    All site copy and data (no lorem ipsum)
server/                 Express API
  src/routes/           leads.js (public), admin.js (protected)
  src/middleware/       auth, security (origin/JSON guards), errors
  src/models/Lead.js    Mongoose model
  src/validation.js     Zod schemas
```

## Run locally

Requires Node 20.11+ and a MongoDB database (free [MongoDB Atlas](https://www.mongodb.com/atlas) M0 cluster, or local `mongod`).

```bash
npm install

cp server/.env.example server/.env
# 1. set MONGODB_URI
# 2. set JWT_SECRET:  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
# 3. create the admin password hash and paste the printed line into server/.env:
npm run hash-password -- "your long admin passphrase"

npm run dev      # API on :4000, site on http://localhost:5173 (Vite proxies /api to the API)
```

Admin: <http://localhost:5173/admin>

### Production

```bash
npm run build    # builds client/dist
npm start        # Express serves the API and the built React app on one port
```

Deploy as a single Node web service (Render, Railway, Fly.io). Build command `npm install && npm run build`, start command `npm start`. Set the variables from `server/.env.example` in the host's dashboard, with `NODE_ENV=production` and `TRUST_PROXY=1`. In Atlas, allow your host's IP range under Network Access.

## API

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/leads` | public, rate-limited | Save an enquiry |
| POST | `/api/admin/login` | public, rate-limited | Sets the session cookie |
| POST | `/api/admin/logout` | cookie | Clears the session |
| GET | `/api/admin/me` | cookie | Session check |
| GET | `/api/admin/leads?status=&q=&page=` | cookie | List, search and filter leads |
| PATCH | `/api/admin/leads/:id` | cookie | Update lead status |
| DELETE | `/api/admin/leads/:id` | cookie | Delete a lead |
| GET | `/api/admin/leads/export.csv` | cookie | CSV export |

Errors are always JSON: `{ "error": "message", "fieldErrors"?: { field: ["message"] } }` with accurate status codes (400, 401, 403, 404, 413, 415, 422, 429, 500). Unexpected errors are logged server-side and never leak internals to the client.

## Spam protection and security

1. **Validation:** Zod schema on every field, including an Indian mobile-number check (`+91`, `91`, `0` or bare 10 digits, starting 6–9, normalised to `+91XXXXXXXXXX`)
2. **Honeypot field** hidden from people and assistive tech. Bots that fill it get a fake success.
3. **Time-trap:** submissions under 2 seconds after the form loaded are rejected
4. **Rate limit:** 5 enquiries per IP per hour, 5 failed admin logins per 15 minutes
5. **Duplicate suppression:** the same email and message within 10 minutes is ignored
6. **Same-origin and JSON-only** checks on every state-changing API call; `SameSite=Strict` cookie
7. **Helmet** security headers and CSP, 10 KB body limit, no NoSQL operator injection (typed Zod parsing, escaped regex search)
8. Admin password stored only as a bcrypt hash; CSV export neutralises spreadsheet-formula injection

Known limit: rate-limit counters are in memory, so they reset on restart and are per instance. Use a Redis store (`rate-limit-redis`) if you run multiple instances. For heavier abuse, add Cloudflare Turnstile to the form.

## Performance notes (target: PageSpeed 90+ on mobile and desktop)

- No images on the critical path: the hero visual is pure HTML/CSS and the logo is inline SVG
- Self-hosted variable fonts via Fontsource (no third-party font request); the Devanagari font only downloads when Hindi text is rendered
- Admin area is code-split and lazy-loaded; public visitors never download it
- Brotli/gzip compression, immutable one-year caching for hashed assets
- One short entrance animation, disabled under `prefers-reduced-motion`

Run Lighthouse against the production build (`npm run build && npm start`), not the dev server.

## Design rationale

### What makes it India-specific

- **Language:** English-first with a Hindi line in the hero (तकनीक हम संभालेंगे, कारोबार आप।), and AI receptionists positioned for Hindi, English and Hinglish
- **The hero shows how Indian customers actually buy:** a WhatsApp-style chat in which an AI receptionist books a clinic appointment in Hinglish, instead of a generic abstract graphic
- **Rupees, not dollars:** budget ranges in ₹ and lakh, ad spend framed as cost per qualified lead in rupees
- **Indian stack:** WhatsApp Business, UPI/Razorpay/PayU, Zoho and LeadSquared alongside HubSpot and GoHighLevel, Google Business Profile for city-level discovery
- **Indian phone validation** and a "Mobile / WhatsApp" field, since WhatsApp is the primary follow-up channel
- **IST working hours**, and an India story on the About page instead of the US-only framing of the current site
- **Industries** chosen for the Indian SMB market: clinics, coaching, real estate, D2C, exports
- **Mobile-first and low-bandwidth:** light pages, no hero video or heavy imagery

### What improved over the current site

- The current site runs a dark, animated 3D globe and a long looping testimonial carousel. This version is lighter and faster, with a clear light layout and one memorable moment (the chat) rather than many competing effects
- Clear single story per section (services → process → work → why) with one primary CTA repeated, instead of many equal-weight links
- Services are presented as scannable rows and grouped categories rather than a wall of cards
- Real, visible keyboard focus, skip link, semantic landmarks, labelled form fields with inline errors, and reduced-motion support
- Every claim comes from Ethixweb's own site (50+ projects, under 1 hour response, 4.0 Trustpilot, case studies); nothing invented
- A real lead pipeline: the enquiry is stored, triaged in `/admin`, and exportable
