# US-050: Admin inventory: Mark as unavailable toggle per game

- **Epic:** Admin Dashboard
- **Priority:** 50
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

When a game is being repaired, cleaned, or is out of stock, the admin has no way to temporarily hide it from customers without a code deploy. An 'Available / Unavailable' toggle in the inventory management page stores the game's availability in the rg_inventory localStorage key and hides it from the catalog until re-enabled. Source research item: R-063.

## Acceptance Criteria

- [ ] Each game row in the Admin Inventory page (US-015) has an 'Available' / 'Unavailable' toggle switch
- [ ] Toggling a game to 'Unavailable' stores the state in rg_inventory under the game's id (e.g. { id: 'giant-jenga', available: false })
- [ ] Games marked unavailable do not appear in the customer-facing game grid or search results
- [ ] The Unavailable toggle is visually distinct (red/grey vs green) so admins can see status at a glance
- [ ] Toggling back to 'Available' immediately restores the game to the customer catalog
- [ ] An unavailable game's count is shown in the admin inventory summary (e.g. '11 available, 1 unavailable')

## Dev Notes

## QA Feedback
