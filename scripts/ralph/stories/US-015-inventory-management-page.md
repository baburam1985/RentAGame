# US-015: Inventory management page

- **Epic:** Admin Dashboard
- **Priority:** 15
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

At /admin/inventory, show all games in an editable table. Allow inline price editing and status toggle (available/hidden). Edit side panel for all game fields. Changes persisted in localStorage.

## Acceptance Criteria

- [ ] /admin/inventory renders all games in a table
- [ ] Table columns: Name, Category, Price/day, Players, Status
- [ ] Price/day is editable inline (click cell → input → save on blur/Enter)
- [ ] Status toggle shows available/hidden; toggling hides/shows game on public page
- [ ] Hidden games are excluded from the public game grid
- [ ] Edit button opens a side panel with all game fields editable
- [ ] All changes are persisted to localStorage

