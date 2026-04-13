# US-002: Price range slider filter

- **Epic:** Discovery
- **Priority:** 2
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-002-price-slider
- **PR:** #7
- **QA Attempts:** 2

## Description

Add a dual-handle price range slider (min/max) in the filter bar. Games outside the selected range are hidden. Default: full range. Show the selected range as '$X – $Y / day'. No external slider library — build with two range inputs overlaid.

## Acceptance Criteria

- [ ] Dual-handle price slider renders in the filter bar
- [ ] Min and max handles are independently draggable
- [ ] Games outside selected price range are hidden
- [ ] Selected range displays as '$X – $Y / day'
- [ ] Default state shows full price range (min to max of all games)
- [ ] Price filter works simultaneously with search and category filters

## QA Feedback

**Check 0 FAILED — GitHub CI E2E Tests job (conclusion: failure)**

CI run on PR #7 HEAD commit `959d893` (2026-04-13 03:25 UTC):
- Unit Tests: SUCCESS
- Docker Build: SUCCESS
- E2E Tests: FAILURE (job ID 71016168942)

The console.log removal in commit 959d893 did NOT fix the E2E failure. The CI ran after that fix and E2E still failed. The feature branch also has **merge conflicts** with main (PR mergeable_state: "dirty"):

1. `web/src/app/page.tsx` — conflict between US-002 PriceRangeSlider wiring and the current main (which has a restructured page.tsx from US-003 squash-merge plus additional features like CartProvider, Link to /games routes, etc.)
2. `web/src/components/GameGrid.test.tsx` — conflict between the US-002 test file (no CartProvider) and main's version (uses CartProvider + next/navigation mock)
3. `scripts/ralph/prd.json` — deleted in main but modified in feature branch

**Action required:**
1. Rebase `feat/US-002-price-slider` on top of current `main` to resolve conflicts
2. Update GameGrid.test.tsx to use CartProvider and next/navigation mock (matching main's test helpers) while keeping the US-002 price-filter tests
3. Update `web/src/app/page.tsx` to integrate PriceRangeSlider into the current main version (which already has SortDropdown, Link/cart routing, etc.)
4. Investigate why E2E Playwright tests still fail after the console.log fix — run E2E locally against a Docker build to confirm which specific test fails and why
5. Push the rebased branch to trigger a new CI run

PR #7 remains open. Push fixes to `feat/US-002-price-slider`.

## Dev Notes

E2E fix: removed console.log from RentalForm.tsx handleSubmit — violated PRODUCT.md no-console-log non-negotiable and caused Playwright E2E tests to fail in CI. The console.log was present in the feature branch but had been removed on main as a separate fix. All unit tests (71) pass, TypeScript clean, production build succeeds. Files changed: web/src/components/RentalForm.tsx (removed 1 console.log line). PriceRangeSlider implementation unchanged — dual-handle slider with two overlaid range inputs, onKeyDown handlers, template-literal price label, GameGrid minPrice/maxPrice filtering, page.tsx wired with full-range defaults.

