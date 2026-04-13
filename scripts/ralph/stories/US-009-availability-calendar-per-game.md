# US-009: Availability calendar per game

- **Epic:** Checkout & Payments
- **Priority:** 9
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-009-availability-calendar
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add an availability calendar to GameModal. Show a month calendar with unavailable dates highlighted. Hard-code a few unavailable date ranges per game in games.ts. Date picker in checkout blocks unavailable dates.

## Acceptance Criteria

- [x] games.ts includes an unavailableDates field (string[][] of date ranges) for each game
- [x] GameModal renders a month calendar view
- [x] Unavailable dates are highlighted in red on the calendar
- [x] Checkout date picker prevents selection of unavailable dates
- [x] Selecting an unavailable date shows an inline error message
- [x] Calendar shows the current month by default with prev/next navigation

## Dev Notes

Added `unavailableDates?: string[][]` (optional) to the `Game` type in `games.ts`. Hardcoded 2–3 unavailable date ranges for the first 3 games (Giant Jenga, Cornhole Set, Bocce Ball Set). Created `AvailabilityCalendar.tsx` — a pure React calendar with: month grid, prev/next navigation, red highlighting for unavailable days (per isDateUnavailable range check), click-to-error on unavailable dates, role="alert" error message, and an "Available/Unavailable" legend. Updated `GameModal.tsx` to render `<AvailabilityCalendar unavailableDates={game.unavailableDates} />` when the field is present. 7 new unit tests in AvailabilityCalendar.test.tsx. All 53 tests pass.

## Files Changed

- `web/src/data/games.ts` (add unavailableDates? type + data for 3 games)
- `web/src/components/AvailabilityCalendar.tsx` (new component)
- `web/src/components/AvailabilityCalendar.test.tsx` (7 new tests)
- `web/src/components/GameModal.tsx` (show AvailabilityCalendar when available)
