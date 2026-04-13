# US-049: Game comparison panel (select 2-3 games side-by-side)

- **Epic:** Discovery
- **Priority:** 49
- **Status:** tests-written
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Customers can select up to 3 games for side-by-side comparison. A 'Compare' checkbox appears on each GameCard. When 2+ games are selected, a comparison panel slides up from the bottom showing name, price/day, players, and dimensions in a table layout. Client-side only — no backend.

## Acceptance Criteria

- [ ] Each GameCard has a 'Compare' toggle (checkbox or button) that adds/removes the game from a comparison set
- [ ] At most 3 games can be in the comparison set at once; selecting a 4th replaces the oldest selection
- [ ] When 2 or more games are selected, a comparison panel is visible (fixed bottom bar or slide-up panel)
- [ ] The comparison panel shows game name, pricePerDay, players, and dimensions for each selected game in columns
- [ ] A 'Clear' or 'Close' button dismisses the panel and deselects all games
- [ ] Comparison state is not persisted to localStorage (resets on page refresh)

## Dev Notes

