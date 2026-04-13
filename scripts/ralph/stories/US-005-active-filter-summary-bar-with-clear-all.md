# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #10
- **QA Attempts:** 4

## Description

When any filter (search, category, price, players, sort) is non-default, show a horizontal summary bar below the filter row listing each active filter as a removable chip. Include a 'Clear all' button.

## Acceptance Criteria

- [ ] Summary bar is hidden when all filters are at default values
- [ ] Summary bar appears when any filter is non-default
- [ ] Each active filter renders as a chip with its value and a remove (×) button
- [ ] Clicking a chip's remove button clears only that filter
- [ ] Clear all button resets every filter to default
- [ ] Summary bar updates in real time as filters change

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously at same timestamps, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339120198/job/71063367020
- Local checks 1–6 and 9 all pass. Branch needs CI E2E to pass before QA can approve.
- Route to CI-Fix to investigate systemic E2E failure.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass. TypeScript clean. Branch force-pushed to reflect rebased commits.

## Files Changed

- web/src/app/page.tsx
- web/src/components/ActiveFilterBar.tsx
- web/src/components/ActiveFilterBar.test.tsx
