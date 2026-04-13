# US-063 — Back navigation on game detail pages

**Epic:** Discovery
**Priority:** 63
**Status:** pending

## Description

The `/games/[id]` detail page has no breadcrumb or "Back to catalog" navigation. Customers who land directly via a shared link or bookmark are stranded — the only way back to the catalog is via browser history or the Navbar. A simple "Back to catalog" text link at the top of the detail page, using Next.js `Link` to `/`, resolves this orientation issue and matches standard e-commerce navigation conventions.

## Acceptance Criteria

1. A "← Back to catalog" (or equivalent) text link appears at the top of the `/games/[id]` detail page, above the game title and gallery.
2. Clicking or activating the link navigates the user to the homepage (`/`) where the game catalog is displayed.
3. The link is keyboard accessible, has a visible focus ring, and meets WCAG AA colour contrast requirements.
4. The link is responsive and displays correctly at 375px (mobile) and 1024px (desktop) widths.
5. No protected components (Navbar, Hero, Footer, CartContext, cart page, globals.css) are modified.
6. A Vitest unit test confirms the "Back to catalog" link renders on the game detail page and points to the correct href.

## Out of Scope

- Do not implement a full breadcrumb trail (single back link only)
- Do not modify the game detail page gallery, sticky CTA, or how-to-play section beyond adding the back link
- No changes to CartContext or checkout flow
