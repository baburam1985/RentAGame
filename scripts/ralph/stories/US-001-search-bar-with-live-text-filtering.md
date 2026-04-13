# US-001: Search bar with live text filtering

- **Epic:** Discovery
- **Priority:** 1
- **Status:** qa-passed
- **Passes:** true
- **Branch:** feat/US-001-search-filter-merged
- **PR:** #1
- **QA Attempts:** 3

## Description

Add a search input above the game grid. As the user types, filter games by name and description in real time (client-side). Clear button resets the filter. Works in combination with the existing category filter.

## Acceptance Criteria

- [x] Search input renders above the game grid
- [x] Typing filters games by name and description in real time (no submit required)
- [x] Search is case-insensitive
- [x] Clear button resets search input to empty and restores all games
- [x] Search filter works simultaneously with the category filter
- [x] Zero-results state shows a friendly 'No games found' message

## Dev Notes

SearchBar component with controlled text input, clear button, and sr-only label. GameGrid updated with optional searchQuery prop for case-insensitive name+description filtering. page.tsx wires SearchBar above the game grid alongside CategoryFilter. CI fix (true root cause): web/.dockerignore excludes *.test.ts, *.test.tsx, and vitest.config.ts to keep the production image slim — but Docker uses the same .dockerignore for ALL Dockerfiles in the build context, so the test container had no test files or config and vitest exited with error. Fixed by adding Dockerfile.unit-tests.dockerignore and Dockerfile.e2e-tests.dockerignore (per-Dockerfile dockerignore — BuildKit feature) that do NOT exclude test files. Also: test Dockerfiles reverted to npm ci (deterministic lock-file install). Previous musl/glibc binary hypothesis was wrong — Rolldown installs both gnu+musl variants as optional deps and picks the correct one at runtime.

