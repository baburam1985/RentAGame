# RentAGame — Product Specification

**Every agent MUST read this file before doing any work.**
This is the authoritative source of truth for what the product is, what it
does, and what constraints can never be violated. When in doubt, consult this
file. Never invent product decisions not described here.

---

## What RentAGame Is

RentAGame is a **single-vendor, customer-facing web app** for renting outdoor
and lawn games for events, parties, and gatherings. A small business owner
operates the service; customers browse, book, and manage rentals online.

**One-line pitch:** "Browse and rent premium outdoor games for your next event —
delivered to your door."

---

## Target Users

| User | Who they are | Core need |
|------|-------------|-----------|
| **Customer** | Families, event planners, party hosts | Browse games, check availability, book quickly |
| **Admin** | The business owner | Manage inventory, view and update orders |

There are exactly **two user roles**. Do not invent others (no vendors, no
driver accounts, no referral agents, no B2B accounts).

---

## Core User Flows

### Customer Flow
```
Homepage → Browse & filter games → View game details →
Add to cart → Checkout (3 steps) → Order confirmation
```

### Returning Customer Flow
```
Log in → View order history → Rebook or wishlist games
```

### Admin Flow
```
/admin login → Manage inventory → Update order statuses → View KPIs
```

---

## Current Feature Inventory (built and working)

| Feature | Location |
|---------|---------|
| Game catalog grid | `web/src/components/GameGrid.tsx` |
| Category filter (Lawn, Party, Kids, Team, Water) | `web/src/components/CategoryFilter.tsx` |
| Game detail modal | `web/src/components/GameModal.tsx` |
| Rental enquiry form | `web/src/components/RentalForm.tsx` |
| Hero section | `web/src/components/Hero.tsx` |
| How It Works section | `web/src/components/HowItWorks.tsx` |
| Testimonials section | `web/src/components/Testimonials.tsx` |
| Navbar | `web/src/components/Navbar.tsx` |
| Footer | `web/src/components/Footer.tsx` |
| Game data | `web/src/data/games.ts` |

---

## Game Catalog

8 games across 5 categories. The `Game` type is:

```typescript
type Game = {
  id: string;
  name: string;
  category: string;       // one of CATEGORIES
  description: string;
  pricePerDay: number;    // in USD, e.g. 45
  image: string;          // Unsplash URL
  players: string;        // e.g. "2–10 players"
  dimensions: string;     // e.g. "4 ft tall when fully stacked"
}
```

Categories: `"All" | "Lawn Games" | "Party Games" | "Kids Games" | "Team Games" | "Water Games"`

Do NOT add new games or categories without a user story explicitly requesting it.

---

## NON-NEGOTIABLES — Hard Constraints

These rules can NEVER be broken by any agent for any reason.
If a story seems to require violating one, the story must be rewritten.

### Architecture
- **No backend** — there is no server, database, or API. All persistence uses
  `localStorage` only. Never suggest or implement a database, REST API,
  GraphQL endpoint, or server action that writes data.
- **Next.js App Router only** — never use the Pages Router (`pages/` directory).
  All routes live under `web/src/app/`.
- **Client components for interactivity** — use `"use client"` directive. Server
  components are fine for static pages.

### Technology Stack
- **Framework:** Next.js 19 (App Router)
- **Language:** TypeScript — strict mode. `any` is forbidden.
- **Styling:** Tailwind CSS v4 only. No other CSS frameworks (no Bootstrap,
  no MUI, no Chakra, no shadcn).
- **Testing:** Vitest + Testing Library for unit tests. Playwright for E2E.
- **No external UI component libraries** — build all UI from scratch with
  Tailwind. No Radix, no Headless UI, no Flowbite.
- **No external chart libraries** — use CSS or SVG only.
- **No external date/calendar libraries** — build date pickers and calendars
  from scratch.
- **No external slider libraries** — build range sliders from scratch.
- **No payment processors** — checkout is a form, not a real payment flow.
  Never integrate Stripe, PayPal, or similar.

### Data & Auth
- **localStorage only** — user accounts, orders, wishlist, admin settings,
  inventory overrides all live in `localStorage`. No cookies, no sessions,
  no JWT, no OAuth.
- **Mock auth only** — signup/login stores and reads from `localStorage`.
  No real authentication library (no NextAuth, no Clerk, no Auth0).
- **Single admin account** — `admin@rentagame.com`. No multi-admin, no roles
  beyond customer and admin.

### Code Quality
- TypeScript strict — zero `any` types
- All new components must have unit tests
- No `console.log` left in production code
- No hardcoded pixel values — use Tailwind spacing/sizing utilities
- Follow existing file structure and naming conventions

---

## EXPLICITLY OUT OF SCOPE

Never implement, suggest, or accept research items for any of these:

| Out of scope | Why |
|-------------|-----|
| Real payment processing | No backend, mock only |
| Email sending / SMS | No backend |
| Push notifications | No backend |
| Multi-vendor marketplace | Single vendor only |
| Mobile app / React Native | Web only |
| Server-side rendering of dynamic data | No backend |
| Social login (Google, Facebook) | Mock auth only |
| Analytics (GA, Mixpanel, etc.) | Out of scope |
| Internationalisation / multi-language | Out of scope for now |
| Real-time features (WebSockets) | No backend |
| File uploads (game photos) | No backend |
| Delivery tracking / logistics | Out of scope |
| Driver/delivery person accounts | Only customer + admin |
| Discount codes / promo system | Not in current product vision |
| Blog / CMS | Out of scope |

If a research item touches any of the above, PM must reject it.

---

## Design Principles

1. **Mobile-first** — all new UI must be responsive. Test at 375px width.
2. **Minimal cognitive load** — customers should be able to book a game in
   under 3 minutes from landing to confirmation.
3. **Trust signals matter** — pricing must always be visible before checkout.
   No hidden fees, no surprise totals.
4. **Accessibility baseline** — all interactive elements must be keyboard
   accessible and have ARIA labels. Colour contrast must meet WCAG AA.
5. **Fast perceived performance** — no layout shift on load. Use skeleton
   loaders if content takes time to render.

---

## Pricing Model

- Pricing is **per day** (pricePerDay in USD)
- Total = `pricePerDay × numberOfDays`
- No delivery fees, taxes, or add-ons in the current scope
- Admin can override per-game price via the Inventory page (stored in localStorage)

---

## localStorage Key Conventions

All agents must use these exact keys to avoid conflicts:

| Key | Type | Written by | Purpose |
|-----|------|-----------|---------|
| `rg_user` | `User \| null` | Auth pages | Current logged-in user |
| `rg_orders` | `Order[]` | Checkout | All placed orders |
| `rg_cart` | `CartItem[]` | Cart | Current cart contents |
| `rg_wishlist` | `string[]` | Wishlist | Array of game IDs |
| `rg_inventory` | `InventoryOverride[]` | Admin | Price/visibility overrides |

Use the `rg_` prefix for ALL new localStorage keys to namespace them.

---

## Tone & Copy Guidelines

- Brand voice: **friendly, energetic, casual** — not corporate
- CTA labels: "Rent Now", "Add to Cart", "Place Order", "Browse Games"
- Error messages: friendly, not technical — "Something went wrong, please try again"
  not "Error 422: Unprocessable entity"
- Empty states: always include a CTA — never a dead end
