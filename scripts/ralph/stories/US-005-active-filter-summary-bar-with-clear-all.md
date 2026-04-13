# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #0
- **QA Attempts:** 0

## Description

When any filter (search, category, price, players, sort) is non-default, show a horizontal summary bar below the filter row listing each active filter as a removable chip. Include a 'Clear all' button.

## Acceptance Criteria

- [x] Summary bar is hidden when all filters are at default values
- [x] Summary bar appears when any filter is non-default
- [x] Each active filter renders as a chip with its value and a remove (×) button
- [x] Clicking a chip's remove button clears only that filter
- [x] Clear all button resets every filter to default
- [x] Summary bar updates in real time as filters change

## Dev Notes

Implemented `ActiveFilterBar` component with stateless chip-based design. Parent (page.tsx) owns all filter state. Component returns `null` when all filters are at default values. Chips are generated from non-default filter values: search query, category (when not "All"), and sort order (when not "featured"). SORT_LABELS maps sort values to human-readable labels. `onClearAll` resets all three filter states.

## Files Changed

- `web/src/components/ActiveFilterBar.tsx` (new component)
- `web/src/app/page.tsx` (wired ActiveFilterBar with all filter props and onClearAll handler)

