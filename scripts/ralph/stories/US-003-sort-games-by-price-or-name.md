# US-003: Sort games by price or name

- **Epic:** Discovery
- **Priority:** 3
- **Status:** in-progress
- **Passes:** false
- **Branch:** feat/US-003-sort-games
- **PR:** #6
- **QA Attempts:** 1

## Description

Add a sort dropdown to the filter bar with options: 'Featured' (default order), 'Price: Low to High', 'Price: High to Low', 'Name: A–Z'. Sort applies on top of any active search/category/price filters.

## Acceptance Criteria

- [ ] Sort dropdown renders with 4 options: Featured, Price: Low to High, Price: High to Low, Name: A–Z
- [ ] Default selection is Featured (original games.ts order)
- [ ] Price: Low to High sorts games ascending by pricePerDay
- [ ] Price: High to Low sorts games descending by pricePerDay
- [ ] Name: A–Z sorts games alphabetically by name
- [ ] Sort applies on top of any active search, category, and price filters

## Dev Notes

SortDropdown component (4 options: featured/price-asc/price-desc/name-asc) added. GameGrid updated with optional games and sortOrder props; sort applied after category+search filtering via localeCompare/arithmetic. page.tsx wired with sortOrder state and SortDropdown rendered inline next to SearchBar. Files changed: SortDropdown.tsx (new), GameGrid.tsx (added games+sortOrder props), page.tsx (added SortDropdown+sortOrder state).

## QA Feedback

CI failed: E2E Tests — job 71014550059 (run 24323672030) concluded with failure. The most recent CI run on PR #6 shows E2E Tests failed (conclusion: failure) while Unit Tests and Docker Build passed. The E2E test suite failed on the feat/US-003-sort-games branch. Dev must investigate and fix the Playwright E2E failures, then push a fix to the feature branch to trigger a new CI run.

