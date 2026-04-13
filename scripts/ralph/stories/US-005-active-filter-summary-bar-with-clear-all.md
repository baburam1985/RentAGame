# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #10
- **QA Attempts:** 0

## Description

Show a 'Clear all filters' button below the filter row whenever any filter (search text, category, or player count) is non-default. Clicking it resets all filters to their defaults.

**Scope is strictly limited to:**
- `web/src/components/ActiveFilterBar.tsx` (new or existing file)
- `web/src/components/ActiveFilterBar.test.tsx` (new or existing test file)
- `web/src/app/page.tsx` (wire up the component only)

**Do NOT touch any other files.** In particular, do not modify any E2E spec files.

## Acceptance Criteria

- [ ] AC-1: A 'Clear all filters' button is visible when any filter is non-default (search text is non-empty, category is not 'All', or player count is not 'Any')
- [ ] AC-2: The 'Clear all filters' button is NOT visible when all filters are at their default values (empty search, category 'All', player count 'Any')
- [ ] AC-3: Clicking 'Clear all filters' resets search text to empty, category to 'All', and player count to 'Any'

## TDD Rules — Read Before Writing Any Code

1. **RED commit:** Create `ActiveFilterBar.test.tsx` with exactly **3 tests** — one per AC above. All 3 tests must fail at RED because the component does not exist yet.
2. **GREEN commit:** Implement the component and wire it into `page.tsx`. Do NOT change `ActiveFilterBar.test.tsx` at all between RED and GREEN. Zero test file changes in GREEN.
3. **E2E boundary:** Do NOT modify any existing E2E spec files (`catalog.spec.ts`, `modal.spec.ts`, `rental-form.spec.ts`, etc.).

## QA Feedback (Attempt 4)

env-failure resolved by CI-Fix agent (PR #37): Added Docker healthcheck to app service and updated ci.yml to use docker inspect exact-equality health status wait. Branch rebased on main. Ready for re-QA.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass. TypeScript clean. Branch force-pushed to reflect rebased commits.

PM Tier-2 rewrite (run 7): stripped to MVP — removed per-filter chip rendering and individual chip remove buttons; replaced with a single 'Clear all filters' button and 3 simple ACs; reduced TDD test count from 6 to 3.

## Files Changed

- web/src/app/page.tsx
- web/src/components/ActiveFilterBar.tsx
- web/src/components/ActiveFilterBar.test.tsx
