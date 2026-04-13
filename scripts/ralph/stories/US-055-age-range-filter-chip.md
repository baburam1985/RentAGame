# US-055 — Age-range filter chip

**Epic:** Discovery
**Priority:** 55
**Status:** pending

## Description

Add an "Age Group" filter chip group above the game grid so customers can narrow games by the age range of their guests. Parents booking children's parties and corporate event planners have very different needs — this filter reduces scrolling and decision paralysis for these distinct segments. Implemented as a new optional `ageGroup` field on the `Game` type and a client-side filter, with no backend required.

## Acceptance Criteria

1. A new "Age Group" filter row appears above the game grid (below the existing category and player-count filters) with at least three chips: "Kids (5+)", "Family (All Ages)", "Adults".
2. Each game in `web/src/data/games.ts` has an `ageGroup` field (one of `"kids"`, `"family"`, `"adults"`) added to the `Game` type in TypeScript with no `any` types.
3. Selecting an age-group chip filters the displayed games to only those matching the selected `ageGroup`; selecting the same chip again (or an "All" chip) clears the filter.
4. The age-group filter composes correctly with the existing category filter, player-count filter, and search query — only games matching ALL active filters are shown.
5. The filter chip row is horizontally scrollable on mobile (375px) and keyboard-navigable using the ARIA radio group pattern (Tab to group, arrow keys to change selection).
6. All new components have Vitest unit tests covering the filter logic and chip rendering.

## Out of Scope

- No backend or API calls
- Do not modify Navbar, Hero, Footer, CartContext, or the cart/detail pages
