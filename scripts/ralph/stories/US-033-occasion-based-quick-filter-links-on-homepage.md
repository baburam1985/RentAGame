# US-033: Occasion-based quick-filter links on homepage

- **Epic:** Discovery
- **Priority:** 33
- **Status:** tests-written
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add 3 occasion-based quick-filter buttons above the game grid (Wedding, Corporate, Kids Party) so customers can find relevant games by use case instead of scrolling through category chips. Each button pre-applies a tag-based filter derived from game data. Implemented entirely client-side.

## Acceptance Criteria

- [ ] Three occasion buttons render above the game grid: 'Wedding', 'Corporate', 'Kids Party'
- [ ] Clicking an occasion button filters the game grid to games tagged for that occasion
- [ ] Occasion tags are stored as an optional string[] field on the Game type in games.ts
- [ ] All 8 games have appropriate occasion tags assigned
- [ ] Active occasion button is visually highlighted; clicking it again deselects and restores all games
- [ ] Occasion filter combines with existing category, search, and price filters (AND logic)
- [ ] Occasion filter buttons are keyboard accessible with ARIA pressed state

