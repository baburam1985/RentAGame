# US-009: Availability calendar per game

- **Epic:** Checkout & Payments
- **Priority:** 9
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-009-availability-calendar
- **PR:** #14
- **QA Attempts:** 4

## Description

Add an availability calendar to GameModal. Show a month calendar with unavailable dates highlighted. Hard-code a few unavailable date ranges per game in games.ts. Date picker in checkout blocks unavailable dates.

## Acceptance Criteria

- [ ] games.ts includes an unavailableDates field (string[][] of date ranges) for each game
- [ ] GameModal renders a month calendar view
- [ ] Unavailable dates are highlighted in red on the calendar
- [ ] Checkout date picker prevents selection of unavailable dates
- [ ] Selecting an unavailable date shows an inline error message
- [ ] Calendar shows the current month by default with prev/next navigation

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339168503/job/71063525432

**Check 2 — TDD INTEGRITY FAILED:**
`AvailabilityCalendar.test.tsx` was modified between RED commit (`b611968 test: [US-009] RED`) and GREEN commit (`fecc22d feat: [US-009] GREEN`). The assertion was changed from `expect(screen.getByText(/unavailable/i)).toBeInTheDocument()` to `expect(screen.getByRole("alert")).toBeInTheDocument()`. Zero test file changes are permitted between RED and GREEN.

**Required fix:**
1. In the RED commit, write the tests using the correct assertions (using `getByRole("alert")`) that match the intended implementation.
2. The GREEN commit must contain ONLY production code changes.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass. TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/data/games.ts
- web/src/components/GameModal.tsx
- web/src/components/AvailabilityCalendar.tsx (or similar)
