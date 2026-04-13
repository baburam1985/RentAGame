# US-067: Preserve filters and scroll position on catalog back-navigation

- **Epic:** Discovery
- **Priority:** 67
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

When a customer applies filters (category, player count, search query, sort) and clicks a game card to view the detail page, then presses Back, all filters reset and scroll returns to the top. Fix by persisting filter state and scroll position in sessionStorage so the user returns to exactly where they left off.

## Acceptance Criteria

- [ ] Navigating back from a game detail page restores the previously active category filter
- [ ] Navigating back restores the previously active player count filter chips
- [ ] Navigating back restores the previously active search query in the search bar
- [ ] Navigating back restores the previously active sort selection
- [ ] The catalog page scroll position is restored to where it was before navigating away
- [ ] Filter state is cleared when the user navigates to the homepage fresh (not via back button)
