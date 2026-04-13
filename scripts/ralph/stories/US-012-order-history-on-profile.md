# US-012: Order history on profile

- **Epic:** User Accounts
- **Priority:** 12
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-012-order-history-profile
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add an Order History section to /profile. Store completed orders in localStorage on checkout. Display as a table: Order #, Game, Dates, Total, Status.

## Acceptance Criteria

- [x] Order History section renders on /profile
- [x] Completed orders are stored in localStorage when Place Order is submitted
- [x] Table shows columns: Order #, Game, Dates, Total, Status
- [x] Orders are listed in reverse chronological order
- [x] Empty state renders with a 'Browse Games' CTA when no orders exist
- [x] Status shows 'confirmed' for newly placed orders

## Dev Notes

- `web/src/components/OrderHistory.tsx`: Standalone component reads `rg_orders` from localStorage; sorts in reverse chronological order; shows table (Order #, Game, Dates, Total, Status) or empty state with Browse Games CTA (`href="/"`)
- `web/src/components/RentalForm.tsx`: Modified handleSubmit to save new order to `rg_orders` array in localStorage on successful submission; order includes id (random alphanumeric), game, eventDate, returnDate, total (rentalDays×$35), status:"confirmed", createdAt
- localStorage key: `rg_orders` (array of orders, appended on each submit)
- 5 unit tests in OrderHistory.test.tsx
