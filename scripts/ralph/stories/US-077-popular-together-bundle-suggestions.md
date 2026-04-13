# US-077: "Popular Together" bundle suggestions on game detail page

- **Epic:** Discovery
- **Priority:** 77
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Customers planning parties often need multiple games. When viewing a game detail page, show a "Popular Together" section with 2–3 complementary game suggestions to help customers build a complete rental package without extra research.

## Acceptance Criteria

- [ ] Each game detail page (/games/[id]) shows a "Popular Together" section with 2–3 complementary game suggestions
- [ ] Suggestions are hardcoded per game in the games.ts data (a new optional `popularWith: string[]` field with game IDs)
- [ ] Each suggestion card shows the game name, image, price per day, and an "Add to Cart" button
- [ ] The "Add to Cart" on a suggestion card adds that game to the cart with 1-day default duration
- [ ] The section is not displayed if no popularWith entries are defined for the game
- [ ] The section is fully responsive and accessible (keyboard navigable, ARIA labels on buttons)
