# US-028: Skeleton loading state for game grid

- **Epic:** Discovery
- **Priority:** 28
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-028-skeleton-loading
- **PR:** (none)
- **QA Attempts:** 0

## Description

Replace the flash of unstyled content on initial page load with a CSS pulsing skeleton loader. Render 8 grey card placeholders while JS hydrates. Required by PRODUCT.md design principle 5: no layout shift on load.

## Acceptance Criteria

- [x] 8 skeleton card placeholders render on initial page load before games are displayed
- [x] Skeleton cards use a pulsing grey animation (CSS only, no external library)
- [x] Skeleton cards match the approximate dimensions of real GameCards to prevent layout shift
- [x] Real game cards replace skeleton cards without visible flash or layout shift
- [x] Skeleton loader is removed entirely once games are ready to render
- [x] Skeleton state is accessible: aria-busy='true' on the grid container while loading

## Files Changed

- `web/src/components/GameGridSkeleton.tsx` — new skeleton component with 8 animate-pulse grey cards
- `web/src/components/GameGridSkeleton.test.tsx` — 6 unit tests (one per AC)
- `web/src/components/GameGrid.tsx` — uses requestAnimationFrame to show skeleton until hydration
- `web/src/components/GameGrid.test.tsx` — updated to use waitFor for new async loading behavior

## Dev Notes

RED commit: 6 failing tests. GREEN commit: GameGridSkeleton component renders 8 animate-pulse cards with aria-busy=true. GameGrid uses requestAnimationFrame to defer games render (not flushed by act() in tests). GameGrid.test.tsx updated with waitFor to support the new loading state. 52 unit tests pass. TypeScript clean.
