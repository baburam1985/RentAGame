# US-066 — 'Cleaned & inspected before every rental' badge on game detail pages

**Epic:** Discovery
**Priority:** 66
**Status:** pending

## Description

Customer research surfaced a hygiene concern as a latent anxiety, particularly for customers booking games for children's events. Adding a small "Cleaned & inspected before every rental" badge with a checkmark icon on each game detail page (`/games/[id]`) directly addresses this concern, builds trust at the decision stage, and differentiates from competitors who do not surface this information. This is a pure UI copy and icon change — no backend required.

## Acceptance Criteria

1. A "Cleaned & inspected before every rental" badge with a checkmark icon (Material Symbols or Tailwind SVG) appears on every `/games/[id]` detail page, positioned below the game title and above the rental form.
2. The badge is visually distinct but subtle — a small green or teal chip/tag style that does not compete with the primary "Rent Now" CTA.
3. The badge is responsive and displays correctly at 375px (mobile) and 1024px (desktop) widths.
4. The badge text meets WCAG AA colour contrast requirements against its background.
5. No protected components (Navbar, Hero, Footer, CartContext, cart page, globals.css) are modified.
6. A Vitest unit test confirms the badge renders on the game detail page with the correct text content.

## Out of Scope

- Do not add this badge to game cards in the grid (detail page only)
- Do not add any backend logic, localStorage keys, or admin toggle for this badge
- No changes to the GameModal component — only the `/games/[id]` page
