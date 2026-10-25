---
applyTo: '**'
---

# Tech

## Stack

- TypeScript, React 19, Next.js 16 (App Router), Node.js 20+.
- No CSS framework: hand-written CSS in `src/app/globals.css` (design
  tokens: colors, radii, typography from Figma "MBC Tokens") and
  `src/app/components.css` (component styles).
- `qrcode` package to render the WhatsApp QR code (see `components/QrCode.tsx`).

## Build System

- **npm** (`package-lock.json` is the lockfile — do not switch to
  yarn/pnpm).

## Configs

- `next.config.ts`: `output: "export"` (fully static site),
  `trailingSlash: true`, `images: { unoptimized: true }`. Do not remove
  `output: "export"` without confirming with the user — the whole project is
  designed around static hosting.
- `tsconfig.json`: standard Next.js TS config, path alias `@/*` → `src/*`.
- No `.env` files, no environment variables: the site has no secrets and no
  server-side config.

## Services

- None. No database, no API routes, no auth, no external backend. All
  "dynamic" behavior (pricing, booking state) runs client-side in the
  browser.

## Commands (CRITICAL)

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:3000
npm run build      # static export to /out
npm start           # serve /out locally (npx serve out)
```

- No lint script, no test script, and no test suite currently exist in
  `package.json`. Do not assume Jest/Vitest/ESLint configs are present —
  check `package.json` before suggesting `npm run lint` or `npm test`.

## Testing Strategy

- None present. If tests are requested, confirm the desired framework with
  the user before adding one (nothing is pre-wired).

## Conventions

- Codebase content/comments are in **French**; keep new copy and comments in
  French unless told otherwise.
- All editable content (phone/WhatsApp numbers, nav, vehicles, prices,
  routes, FAQ, testimonials, articles) lives in `src/data/*.ts` — pages
  import from there rather than hardcoding copy. Keep this separation when
  adding content.
- Components are named to mirror the Figma component names (see mapping in
  [README.md](../../README.md)).
- Several values are explicitly provisional/placeholder (WhatsApp number,
  prices, legal text, photos) — see README section 7 before treating them as
  final.

## Deployment

- `npm run build` → deploy the generated `/out` directory as static files to
  any host (Vercel, Netlify, OVH, o2switch, Apache/Nginx, etc.). No
  container or Kubernetes setup exists or is implied for this project.
