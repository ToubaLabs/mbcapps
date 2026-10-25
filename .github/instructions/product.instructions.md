---
applyTo: '**'
---

# Product

## Summary

Monaco Black Car is the marketing and booking website for a private chauffeur
service in Monaco. It is a fully static Next.js site generated from Figma
designs ("Monaco Black Car — Website Redesign"). Visitors configure a trip,
see a fixed price, pick a vehicle, and finalize the booking on WhatsApp — no
backend, account, or database is involved. Primary users are tourists and
residents booking airport transfers, event transport, or hourly chauffeur
hire; secondary user is whoever edits content via the `src/data/*.ts` files.

## Capabilities

- Trip quote entry (from / to / date / time / passengers / bags) with a
  fixed price shown before booking.
- Vehicle selection step, filtered by passenger/bag capacity.
- Final step: pre-filled WhatsApp message + QR code + "open WhatsApp" button.
- Fleet listing (`/flotte/`) with filters, sorting and an empty state; vehicle
  detail page (`/flotte/[slug]/`) with gallery, pricing and reviews.
- Services pages: airport transfers, mise à disposition (hourly hire),
  events (with a quote-request form that also hands off to WhatsApp).
- Pricing page, FAQ page, Journal (blog) with article detail pages.
- Static/legal pages: à propos, contact, mentions légales, CGV,
  confidentialité, 404 (`not-found.tsx`).
- Cookie consent banner (stores choice in `localStorage`), floating WhatsApp
  button, accessible header/footer with mobile nav.

## Inputs / Outputs

- **Input:** trip/booking details are carried entirely in the URL's query
  string between `/reserver/*` steps (no form POST, no server, no storage).
- **Output:** a `https://wa.me/<number>?text=<message>` deep link (see
  `src/lib/whatsapp.ts`) that opens WhatsApp with the request pre-filled.
- **Build output:** `npm run build` produces a static `/out` folder (HTML,
  CSS, JS, images only) deployable to any static host.
