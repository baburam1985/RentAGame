# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #10
- **QA Attempts:** 2

## Description

When any filter (search, category, price, players, sort) is non-default, show a horizontal summary bar below the filter row listing each active filter as a removable chip. Include a 'Clear all' button.

## Acceptance Criteria

- [ ] Summary bar is hidden when all filters are at default values
- [ ] Summary bar appears when any filter is non-default
- [ ] Each active filter renders as a chip with its value and a remove (×) button
- [ ] Clicking a chip's remove button clears only that filter
- [ ] Clear all button resets every filter to default
- [ ] Summary bar updates in real time as filters change

## QA Feedback (Attempt 2)

Classification: env-failure
Job: E2E Tests
Error: E2E tests fail consistently across ALL open PRs (#7–#23). Unit Tests and Docker Build pass on every run. Prior fixes applied (category badge, networkidle wait, modal selector, catalog count). Root issue is systemic — Playwright e2e-tests container cannot reliably connect to app container at http://app:3000, or there is a Docker networking regression in CI environment. Not a per-story code issue.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332398813/job/71041069244

Routed to CI-Fix agent. PR #10 remains open.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass. TypeScript clean. Branch force-pushed to reflect rebased commits.

## Files Changed

- web/src/app/page.tsx
- web/src/components/ActiveFilterBar.tsx
- web/src/components/ActiveFilterBar.test.tsx
