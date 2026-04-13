# US-004: Player count filter chips

- **Epic:** Discovery
- **Priority:** 4
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-004-player-count-filter-chips
- **PR:** #8
- **QA Attempts:** 3

## QA Feedback

Classification: env-failure
Job: E2E Tests
Error: E2E Tests fail on ALL open PRs simultaneously while Unit Tests pass — systemic CI environment failure.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24337817867/job/71058963672


## Dev Notes

Implemented PlayerCountFilter component (chips 2, 4, 6, 8+) with controlled selectedCounts/onCountsChange props. Added parsePlayers() and playerCountMatches() utilities to GameGrid.tsx to parse existing players strings ("2–10 players", "4 players (2v2)", "4–20+ players", etc.) and filter by selected count(s) using OR logic. Wired PlayerCountFilter into page.tsx below SearchBar/SortDropdown row.

## Description

Add a 'Players' filter chip group: 2, 4, 6, 8+. Selecting a chip shows only games whose players range includes that count. Multiple chips can be active (OR logic). Parse existing players strings in games.ts.

## Acceptance Criteria

- [ ] Four filter chips render: 2, 4, 6, 8+
- [ ] Clicking a chip toggles it active/inactive
- [ ] Multiple chips can be active simultaneously (OR logic)
- [ ] Only games whose players string includes the selected count are shown
- [ ] No chips selected shows all games
- [ ] Player filter works simultaneously with other active filters

