# US-056 — Live result count on filter chips

**Epic:** Discovery
**Priority:** 56
**Status:** pending

## Description

Show the number of matching games next to each category filter chip label (e.g. "Lawn Games (4)") so customers know how many results they will see before clicking. This prevents customers from selecting a filter combination that returns zero results, reducing frustration and empty-state encounters. The count is computed entirely client-side from the `games` array.

## Acceptance Criteria

1. Each category filter chip displays a count in parentheses showing how many games match that category given the current search query and other active filters — e.g. "Lawn Games (4)", "Team Games (3)".
2. The count updates in real time as the search query or other filters change, without a page reload.
3. If a category would yield zero results given the current search/filter state, the chip is visually dimmed (e.g. `opacity-50`) to indicate no results, but remains clickable.
4. The "All" chip shows the total count of currently visible games across all categories.
5. Counts are computed from the local `games` array — no backend calls.
6. Unit tests cover count computation and the dimmed-state logic for zero-result chips.

## Out of Scope

- No backend or API calls
- Do not modify Navbar, Hero, Footer, CartContext, or the cart/detail pages
