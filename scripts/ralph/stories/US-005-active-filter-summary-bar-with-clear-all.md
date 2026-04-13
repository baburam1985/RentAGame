# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #10
- **QA Attempts:** 3

## Description

When any filter (search, category, price, players, sort) is non-default, show a horizontal summary bar below the filter row listing each active filter as a removable chip. Include a 'Clear all' button.

## Acceptance Criteria

- [ ] Summary bar is hidden when all filters are at default values
- [ ] Summary bar appears when any filter is non-default
- [ ] Each active filter renders as a chip with its value and a remove (×) button
- [ ] Clicking a chip's remove button clears only that filter
- [ ] Clear all button resets every filter to default
- [ ] Summary bar updates in real time as filters change

## QA Feedback

Classification: env-failure
Job: E2E Tests
Error: E2E Tests fail on ALL open PRs simultaneously while Unit Tests pass — systemic CI environment failure.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24337820539/job/71058966971


## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass. TypeScript clean. Branch force-pushed to reflect rebased commits.

## Files Changed

- web/src/app/page.tsx
- web/src/components/ActiveFilterBar.tsx
- web/src/components/ActiveFilterBar.test.tsx
