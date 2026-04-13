# US-029: 'Most Popular' and social proof badges on game cards

- **Epic:** Discovery
- **Priority:** 29
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-029-social-proof-badges
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a hardcoded badge field to the Game type in games.ts (e.g. 'Most Popular', 'Fan Favourite', 'Perfect for Weddings'). Assign a badge to 2–3 games. Render the badge as a coloured pill overlay on the GameCard image to reduce decision paralysis.

## Acceptance Criteria

- [x] Game type in games.ts gains an optional 'badge' string field
- [x] 2 to 3 games have badge values assigned (e.g. 'Most Popular', 'Fan Favourite')
- [x] GameCard renders the badge as a pill overlay on the top-left corner of the card image
- [x] Badge pill has sufficient colour contrast (WCAG AA) against the card image
- [x] Games without a badge render with no overlay or extra space
- [x] TypeScript compiles cleanly with 'badge' as an optional field

## Dev Notes

- Added `badge?: string` to Game type in games.ts
- Giant Jenga: `badge: "Most Popular"`, Cornhole Set: `badge: "Fan Favourite"`
- Badge rendered as `<span data-testid="badge-pill">` inside image Link, absolute top-2 left-2 position
- bg-yellow-400 text-gray-900 for WCAG AA contrast
- Conditional on `game.badge &&` — no DOM element rendered for games without badge
- 6 tests in GameCardBadge.test.tsx all pass; 52 total tests pass

