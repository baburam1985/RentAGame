# US-028: Skeleton loading state for game grid

- **Epic:** Discovery
- **Priority:** 28
- **Status:** in-progress
- **Passes:** false
- **Branch:** feat/US-028-skeleton-loading
- **PR:** (none)
- **QA Attempts:** 0

## Description

Replace the flash of unstyled content on initial page load with a CSS pulsing skeleton loader. Render 8 grey card placeholders while JS hydrates. Required by PRODUCT.md design principle 5: no layout shift on load.

## Acceptance Criteria

- [ ] 8 skeleton card placeholders render on initial page load before games are displayed
- [ ] Skeleton cards use a pulsing grey animation (CSS only, no external library)
- [ ] Skeleton cards match the approximate dimensions of real GameCards to prevent layout shift
- [ ] Real game cards replace skeleton cards without visible flash or layout shift
- [ ] Skeleton loader is removed entirely once games are ready to render
- [ ] Skeleton state is accessible: aria-busy='true' on the grid container while loading

