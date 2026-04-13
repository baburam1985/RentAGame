# US-002: Price range slider filter

- **Epic:** Discovery
- **Priority:** 2
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-002-price-slider-v2
- **PR:** #35
- **QA Attempts:** 4

## Description

Add a dual-handle price range slider (min/max) in the filter bar. Games outside the selected range are hidden. Default: full range. Show the selected range as '$X – $Y / day'. No external slider library — build with two range inputs overlaid.

## Acceptance Criteria

<!-- PM Tier-1 rewrite: criteria made more explicit after 2 QA failures due to merge conflicts and E2E test mismatches -->
- [ ] A PriceRangeSlider component renders below the SearchBar row and above the game grid; it has a min-price handle and a max-price handle
- [ ] Moving the min handle to value X immediately hides all games whose pricePerDay is less than X from the grid (no form submit required)
- [ ] Moving the max handle to value Y immediately hides all games whose pricePerDay is greater than Y from the grid
- [ ] A text label reading '$[min] – $[max] / day' updates in real time as either handle moves
- [ ] On initial render, min defaults to the lowest pricePerDay across all games and max defaults to the highest pricePerDay across all games
- [ ] With price range set, the category filter, search text, and player-count filter all continue to work simultaneously (AND logic across all active filters)
- [ ] Branch is rebased on current main before pushing — all unit tests and E2E tests pass in Docker locally before the PR is updated

## QA Feedback

Classification: env-failure
Job: E2E Tests
Error: E2E Tests fail on ALL open PRs simultaneously while Unit Tests and Docker Build pass — systemic CI environment failure (app container not reachable from e2e-tests container). Unit tests: 59/59 pass. TypeScript: clean.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24345333222/job/71084524411


## Dev Notes

Rebuilt on fresh branch from main (feat/US-002-price-slider-v2) to resolve systemic E2E env-failure. Old branch had 96 divergent commits that couldn't be rebased. New TDD cycle: RED commit (PriceRangeSlider.test.tsx + GameGrid.test.tsx price range tests) followed by GREEN implementation. All 59 unit tests pass, TypeScript clean. Files changed: PriceRangeSlider.tsx (new component), GameGrid.tsx (minPrice/maxPrice props), page.tsx (wired slider with useState).

## Files Changed

- `web/src/components/PriceRangeSlider.tsx` — new dual-handle slider component
- `web/src/components/GameGrid.tsx` — added minPrice/maxPrice filter props
- `web/src/app/page.tsx` — wired PriceRangeSlider with state management

