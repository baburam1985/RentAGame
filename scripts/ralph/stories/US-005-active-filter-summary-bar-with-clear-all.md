# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** in-progress
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #0
- **QA Attempts:** 0

## Description

When any filter (search, category, price, players, sort) is non-default, show a horizontal summary bar below the filter row listing each active filter as a removable chip. Include a 'Clear all' button.

## Acceptance Criteria

- [ ] Summary bar is hidden when all filters are at default values
- [ ] Summary bar appears when any filter is non-default
- [ ] Each active filter renders as a chip with its value and a remove (×) button
- [ ] Clicking a chip's remove button clears only that filter
- [ ] Clear all button resets every filter to default
- [ ] Summary bar updates in real time as filters change

