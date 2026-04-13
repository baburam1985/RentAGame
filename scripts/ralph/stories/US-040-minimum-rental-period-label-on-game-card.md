# US-040: Display minimum rental period label on each game card

- **Epic:** Discovery
- **Priority:** 40
- **Status:** tests-written
- **Passes:** false
- **Branch:** feat/US-040-min-rental-period-label
- **PR:** 
- **QA Attempts:** 0

## Description

Competitors like Upstate Jamboree and Triangle Lawn Games display minimum rental periods (e.g. '1-day minimum') directly on game listings. Customers wanting a shorter rental will abandon before reaching checkout if this expectation is not set upfront. A short 'Min. 1 day' label on the GameCard sets accurate expectations, prevents wasted form completions, and reduces checkout abandonment.

## Acceptance Criteria

- [ ] Each GameCard displays a 'Min. 1 day' label beneath or alongside the price-per-day display, using existing Tailwind text utilities — no custom CSS or hardcoded pixel values
- [ ] The label is visually distinct from the price (e.g. smaller text, muted colour such as `text-gray-500`) so it does not compete with the primary price display
- [ ] The label text is driven by a `minRentalDays` field added to the `Game` type in `web/src/data/games.ts`; all 12 existing games must have `minRentalDays: 1` set
- [ ] The label renders correctly on all 4 game category views (Lawn, Party, Kids, Team) and on the All view
- [ ] At 375px viewport width the label does not cause layout overflow or text truncation on any game card
- [ ] A unit test verifies that a GameCard rendered with `minRentalDays: 1` includes the text 'Min. 1 day' in the output

## Dev Notes

Add `minRentalDays: number` to the `Game` type in `web/src/data/games.ts` and set it to `1` for all 12 games. In `GameCard.tsx`, render `<span className="text-xs text-gray-500">Min. {game.minRentalDays} day</span>` (pluralise when `> 1`) below the price line. Keep changes to `games.ts` and `GameCard.tsx` only — GameCard is a protected component, so touch only the minimum required to add this display-only label without breaking the cart-aware button or Link to /games/[id].
