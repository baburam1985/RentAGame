# US-018: Add 'Browse all' CTA to zero-results empty state

- **Epic:** Discovery
- **Priority:** 18
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

When all filters return zero results, the 'No games found' message is a dead end. Add a 'Browse all games' button that clears all active filters and a short prompt 'Try clearing some filters'. Per PRODUCT.md design principle: empty states must always include a CTA.

## Acceptance Criteria

- [ ] Zero-results state shows a 'Browse all games' button below the 'No games found' message
- [ ] Clicking 'Browse all games' resets all filters (search, category) to defaults
- [ ] A short friendly tip ('Try clearing some filters') is shown near the button
- [ ] The button is keyboard accessible and has an accessible label
- [ ] Empty state renders only when filtered results are empty, not when the catalog itself is empty

