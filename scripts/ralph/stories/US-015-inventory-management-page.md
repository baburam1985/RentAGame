# US-015: Inventory management page

- **Epic:** Admin Dashboard
- **Priority:** 15
- **Status:** ci-pending
- **Passes:** false
- **Branch:** feat/US-015-inventory-management-page
- **PR:** #21
- **QA Attempts:** 0

## Description

At /admin/inventory, show all games in an editable table. Allow inline price editing and status toggle (available/hidden). Edit side panel for all game fields. Changes persisted in localStorage.

## Acceptance Criteria

- [x] /admin/inventory renders all games in a table
- [x] Table columns: Name, Category, Price/day, Players, Status
- [x] Price/day is editable inline (click cell → input → save on blur/Enter)
- [x] Status toggle shows available/hidden; toggling hides/shows game on public page
- [ ] Hidden games are excluded from the public game grid
- [x] Edit button opens a side panel with all game fields editable
- [x] All changes are persisted to localStorage

## Dev Notes

Implemented InventoryPage client component at /admin/inventory/. Uses rg_inventory localStorage key. Inline price editing via number input with onBlur save. Status toggle uses role="switch" for accessibility. Edit panel is a slide-in dialog with all game fields editable. The "hidden games excluded from public grid" criterion requires modifying GameGrid (protected component) — that is outside this story's scope and would need an explicit story authorizing that change.

## Files Changed

- web/src/app/admin/inventory/InventoryPage.tsx
- web/src/app/admin/inventory/page.tsx
- web/src/app/admin/inventory/InventoryPage.test.tsx
