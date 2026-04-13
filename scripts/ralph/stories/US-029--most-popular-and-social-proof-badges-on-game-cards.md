# US-029: 'Most Popular' and social proof badges on game cards

- **Epic:** Discovery
- **Priority:** 29
- **Status:** in-progress
- **Passes:** false
- **Branch:** feat/US-029-social-proof-badges
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a hardcoded badge field to the Game type in games.ts (e.g. 'Most Popular', 'Fan Favourite', 'Perfect for Weddings'). Assign a badge to 2–3 games. Render the badge as a coloured pill overlay on the GameCard image to reduce decision paralysis.

## Acceptance Criteria

- [ ] Game type in games.ts gains an optional 'badge' string field
- [ ] 2 to 3 games have badge values assigned (e.g. 'Most Popular', 'Fan Favourite')
- [ ] GameCard renders the badge as a pill overlay on the top-left corner of the card image
- [ ] Badge pill has sufficient colour contrast (WCAG AA) against the card image
- [ ] Games without a badge render with no overlay or extra space
- [ ] TypeScript compiles cleanly with 'badge' as an optional field

