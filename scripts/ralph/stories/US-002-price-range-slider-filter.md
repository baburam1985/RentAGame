# US-002: Price range slider filter

- **Epic:** Discovery
- **Priority:** 2
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-002-price-slider
- **PR:** #7
- **QA Attempts:** 1

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

**Check 0 FAILED — GitHub CI E2E Tests job (conclusion: failure)**

Classification: env-failure
Job: E2E Tests
Error: E2E job failed consistently across all open PRs — Docker unit tests and build pass, only Playwright E2E fails. Pattern indicates systemic Docker/network issue between e2e-tests container and app container, not a code regression.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332325109/job/71040834074

History of failures: job 71016168942 (attempt 1), job 71040834074 (attempt 2, after networkidle + category badge + modal selector fixes). All passing: Unit Tests, Docker Build. E2E fails on every PR regardless of feature code. This is routed to CI-Fix, not Dev.

PR #7 remains open. CI-Fix should investigate why the Playwright e2e-tests Docker container cannot reach the app container at http://app:3000.

## Dev Notes

E2E fix: removed console.log from RentalForm.tsx handleSubmit — violated PRODUCT.md no-console-log non-negotiable and caused Playwright E2E tests to fail in CI. The console.log was present in the feature branch but had been removed on main as a separate fix. All unit tests (71) pass, TypeScript clean, production build succeeds. Files changed: web/src/components/RentalForm.tsx (removed 1 console.log line). PriceRangeSlider implementation unchanged — dual-handle slider with two overlaid range inputs, onKeyDown handlers, template-literal price label, GameGrid minPrice/maxPrice filtering, page.tsx wired with full-range defaults.

