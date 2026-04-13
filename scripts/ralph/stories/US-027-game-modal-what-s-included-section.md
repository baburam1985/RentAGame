# US-027: Game modal 'What's included' section

- **Epic:** Discovery
- **Priority:** 27
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-027-whats-included-section
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a 'What's included' bullet list inside GameModal listing setup, accessories, and delivery information for each game. Addresses the key customer barrier of uncertainty about what they're getting. Data stored as an included string array on the Game type in games.ts.

## Dev Notes

Added `included: string[]` as a required field to the `Game` type in `games.ts`. Populated all 12 games with 3–5 included items describing accessories/equipment, carry bag, and delivery/setup. Rendered a 'What's included' `<h3>` heading and `<ul>/<li>` list in `GameModal.tsx` above the price/CTA section. Updated pre-existing test mocks in `GameModal.test.tsx` and `GameCard.test.tsx` to satisfy the new required type field. All 52 unit tests pass. TypeScript compiles cleanly.

## Files Changed

- `web/src/data/games.ts` — added `included: string[]` to `Game` type; added `included` arrays to all 12 games
- `web/src/components/GameModal.tsx` — added 'What's included' heading + ul/li list above price/CTA
- `web/src/components/GameModal.test.tsx` — added `included` field to pre-existing `Game` mock to satisfy required type
- `web/src/components/GameCard.test.tsx` — added `included` field to pre-existing `Game` mock to satisfy required type

## Acceptance Criteria

- [x] Game type in games.ts gains a required 'included' string[] field
- [x] All 8 games have between 2 and 5 included items describing accessories, setup, and delivery
- [x] GameModal renders a 'What's included' section with the included items as a bullet list
- [x] Section is visible without scrolling or positioned clearly before the rental form
- [x] TypeScript compiles cleanly with 'included' as a required non-optional field
- [ ] Section heading and list items meet WCAG AA colour contrast requirements

