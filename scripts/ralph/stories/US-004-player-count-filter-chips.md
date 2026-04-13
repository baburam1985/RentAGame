# US-004: Player count filter chips

- **Epic:** Discovery
- **Priority:** 4
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-004-player-count-filter-chips
- **PR:** #8
- **QA Attempts:** 1

## QA Feedback

**Check 0 FAILED — GitHub CI E2E Tests job (conclusion: failure, twice)**

CI runs on PR #8 (2026-04-13 04:26 and 04:29 UTC):
- Unit Tests: SUCCESS (both runs)
- Docker Build: SUCCESS (both runs)
- E2E Tests: FAILURE (both runs, jobs 71020246167 and 71020434164)

**Root cause identified:** `e2e/catalog.spec.ts` has hardcoded game count assertions that no longer match the app:

```
test("shows at least 8 game cards") → expects toHaveCount(8)
test("clicking All pill restores full catalog") → expects toHaveCount(8)
```

The app now has **12 games** in `web/src/data/games.ts`, so both assertions fail (Received: 12, Expected: 8). The E2E tests were written when the catalog had 8 games but main has since been updated to 12.

**Local checks (all pass):**
- TDD integrity: RED (482c92f) before GREEN (00fe2f7) ✓
- Test files unchanged between RED and GREEN ✓
- No skipped tests ✓
- No trivial assertions ✓
- Test count (6 PlayerCountFilter + 12 GameGrid = 18) >= AC count (6) ✓
- TypeScript: pre-existing env issues only, same as main ✓
- Unit tests: 58/58 pass ✓
- Scope: only 5 files changed, all in scope ✓

**Action required:**
1. Update `e2e/catalog.spec.ts` to reflect the current game count (12):
   - Change `await expect(cards).toHaveCount(8)` → `await expect(cards).toHaveCount(12)` (or use `toHaveCountGreaterThan(8)`)
   - Fix both occurrences: "shows at least 8 game cards" test and "clicking All pill restores full catalog" test
2. Push the fix to `feat/US-004-player-count-filter-chips` to trigger a new CI run

Note: No merge conflicts — PR #8 is `mergeable_state: unstable` (CI failure only, no conflicts).

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

