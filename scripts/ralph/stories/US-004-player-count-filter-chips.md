# US-004: Player count filter chips

- **Epic:** Discovery
- **Priority:** 4
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-004-player-count-filter-chips
- **PR:** #8
- **QA Attempts:** 2

## QA Feedback

**Check 0 FAILED — GitHub CI E2E Tests job (conclusion: failure)**

Classification: env-failure
Job: E2E Tests
Error: E2E job fails consistently across all open PRs (US-002 through US-017). Unit Tests and Docker Build pass on every run. The failure pattern — same E2E outcome across all feature branches regardless of their changes — indicates a systemic Docker networking or Playwright startup issue, not a per-story code regression.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332345339/job/71040896976

Prior attempts (jobs 71020246167, 71020434164, 71040896976) all show same pattern. catalog.spec.ts count fix and networkidle wait have already been applied to branch; root issue is infrastructure. Routed to CI-Fix agent.

PR #8 remains open.

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

