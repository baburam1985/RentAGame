# US-009: Availability calendar per game

- **Epic:** Checkout & Payments
- **Priority:** 9
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-009-availability-calendar
- **PR:** #14
- **QA Attempts:** 3

## Description

Add an availability calendar to GameModal. Show a month calendar with unavailable dates highlighted. Hard-code a few unavailable date ranges per game in games.ts. Date picker in checkout blocks unavailable dates.

## Acceptance Criteria

- [ ] games.ts includes an unavailableDates field (string[][] of date ranges) for each game
- [ ] GameModal renders a month calendar view
- [ ] Unavailable dates are highlighted in red on the calendar
- [ ] Checkout date picker prevents selection of unavailable dates
- [ ] Selecting an unavailable date shows an inline error message
- [ ] Calendar shows the current month by default with prev/next navigation

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass. TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/data/games.ts
- web/src/components/GameModal.tsx
- web/src/components/AvailabilityCalendar.tsx (or similar)
