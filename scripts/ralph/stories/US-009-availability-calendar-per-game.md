# US-009: Availability calendar per game

- **Epic:** Checkout & Payments
- **Priority:** 9
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-009-availability-calendar
- **PR:** #14
- **QA Attempts:** 0

## Description

A standalone `AvailabilityCalendar` component that displays a month calendar and highlights unavailable dates. Takes `unavailableDates` (an array of `YYYY-MM-DD` strings) and `month` (a `Date`) as props.

**Scope is strictly limited to:**
- `web/src/components/AvailabilityCalendar.tsx` (new file)
- `web/src/components/AvailabilityCalendar.test.tsx` (new test file)

**Do NOT touch any other files.** Do not modify `games.ts`, `GameModal.tsx`, `GameModal.test.tsx`, or any E2E spec file.

## Acceptance Criteria

- [ ] AC-1: `AvailabilityCalendar` renders the name of the month and year passed in the `month` prop (e.g. `June 2026`)
- [ ] AC-2: A date cell that matches an entry in `unavailableDates` has the CSS class `unavailable` applied to it
- [ ] AC-3: A date cell that does NOT match any entry in `unavailableDates` does NOT have the CSS class `unavailable`
- [ ] AC-4: The component renders exactly the correct number of day cells for the given month (e.g. 30 cells for June)

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `AvailabilityCalendar.test.tsx` with exactly **4 tests** — one per AC above. All 4 must fail at RED because `AvailabilityCalendar.tsx` does not exist yet.
   - Use `getByText('June 2026')` for AC-1; use `document.querySelector('.unavailable')` or `container.querySelector('.unavailable')` for AC-2; check that a specific available date cell lacks `.unavailable` for AC-3; check `container.querySelectorAll('.day').length === 30` for AC-4.
   - Lock these selectors in RED — do NOT change them in GREEN.
2. **GREEN commit:** Create `AvailabilityCalendar.tsx` only. The GREEN commit must contain **zero changes to any test file or existing source file**.
3. **E2E boundary:** Do NOT touch any existing E2E spec. Do NOT create new E2E specs for this story.

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339168503/job/71063525432

**Check 2 — TDD INTEGRITY FAILED:**
`AvailabilityCalendar.test.tsx` assertion changed from `getByText(/unavailable/i)` to `getByRole("alert")` between RED and GREEN. Zero test file changes are permitted between RED and GREEN.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass. TypeScript clean. Branch force-pushed.

PM Tier-2 rewrite (run 8): stripped to a pure presentational component receiving props only; removed games.ts data changes, GameModal integration, checkout date picker blocking, and prev/next navigation; reduced to 4 trivially verifiable ACs about rendering; pinned exact selector strategies; scope reduced to 2 new files only.
