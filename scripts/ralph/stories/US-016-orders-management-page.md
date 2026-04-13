# US-016: Orders management page

- **Epic:** Admin Dashboard
- **Priority:** 16
- **Status:** in-progress
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

At /admin/orders, list all orders from localStorage. Status dropdown per row. Filter by status and date range. Export as CSV. Aggregate stats at top.

## Acceptance Criteria

- [ ] /admin/orders renders all orders from localStorage
- [ ] Table columns: Order #, Customer, Game, Dates, Total, Status, Created at
- [ ] Status dropdown per row: pending → confirmed → fulfilled → cancelled
- [ ] Status changes persist to localStorage
- [ ] Filter bar filters by status and date range
- [ ] Export button downloads all orders as a CSV file
- [ ] Aggregate stats shown at top: Total Orders, Total Revenue, Pending Count
