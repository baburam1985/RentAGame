# US-020: Category filter chips horizontally scrollable on mobile

- **Epic:** Discovery
- **Priority:** 20
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-020-mobile-scroll-category-filter
- **PR:** #29
- **QA Attempts:** 1

## Description

On 375px mobile screens the 6 category pills overflow their container. Implement a horizontally scrollable single-row pill bar with hidden scrollbar on desktop and touch scrolling on mobile.

## Acceptance Criteria

- [x] All category pills render in a single horizontal row on all screen sizes
- [x] On 375px screens the pill row is horizontally scrollable with touch swipe
- [x] Scrollbar is hidden (no visible scrollbar on desktop or mobile)
- [x] Category filter works correctly after scrolling
- [x] No pills wrap to a second row at any viewport width ≥ 320px
- [x] A fade gradient on the right edge indicates more pills are scrollable

## Dev Notes

Updated `CategoryFilter.tsx` structure:

- Outer `<div>` now has `relative w-full` for positioning the gradient overlay
- Scroll wrapper `<div>` has `overflow-x-auto scrollbar-hide` for touch scrolling with hidden scrollbar
- Pills remain in flex row with `whitespace-nowrap` and `min-w-max` to prevent wrapping
- Added `data-fade-gradient` div: absolutely positioned right-side fade overlay (`from-[#fffde1]` matching body bg, `pointer-events-none`, `aria-hidden`)

All 51 tests pass (0 failures).

## Files Changed

- `web/src/components/CategoryFilter.tsx`

## QA Feedback

Classification: env-failure
Job: E2E Tests
Error: E2E Tests fail on ALL open PRs simultaneously while Unit Tests pass — systemic CI environment failure.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24337719536/job/71058626149
