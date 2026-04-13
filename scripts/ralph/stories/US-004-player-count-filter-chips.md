# US-004: Player count filter chips

- **Epic:** Discovery
- **Priority:** 4
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-004-player-count-filter-chips-v2
- **PR:** #36
- **QA Attempts:** 5

## QA Feedback


## Dev Notes

Rebuilt on fresh branch from main (feat/US-004-player-count-filter-chips-v2) to resolve systemic E2E env-failure. Added parsePlayers() and playerCountMatches() utilities to GameGrid.tsx, PlayerCountFilter component with 4 chips (2, 4, 6, 8+), OR logic, aria-pressed state. Wired into page.tsx. All 58 unit tests pass. TypeScript clean.

## Files Changed

- `web/src/components/PlayerCountFilter.tsx` — new chip filter component
- `web/src/components/GameGrid.tsx` — added selectedPlayerCounts prop + parse/match utilities
- `web/src/app/page.tsx` — wired PlayerCountFilter with state management

## Description

Add a 'Players' filter chip group: 2, 4, 6, 8+. Selecting a chip shows only games whose players range includes that count. Multiple chips can be active (OR logic). Parse existing players strings in games.ts.

## Acceptance Criteria

- [ ] Four filter chips render: 2, 4, 6, 8+
- [ ] Clicking a chip toggles it active/inactive
- [ ] Multiple chips can be active simultaneously (OR logic)
- [ ] Only games whose players string includes the selected count are shown
- [ ] No chips selected shows all games
- [ ] Player filter works simultaneously with other active filters

