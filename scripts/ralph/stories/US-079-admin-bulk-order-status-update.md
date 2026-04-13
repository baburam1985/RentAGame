# US-079: Admin bulk order status update

- **Epic:** Admin Dashboard
- **Priority:** 79
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

The admin orders page currently updates one order at a time. For operators processing multiple weekend bookings, add a bulk-select mechanism so multiple orders can be updated to the same status in a single action.

## Acceptance Criteria

- [ ] Each row in the admin orders table has a checkbox for selection
- [ ] A "Select all" checkbox in the table header selects or deselects all visible rows
- [ ] When one or more orders are selected, a bulk-action bar appears with a status dropdown (Confirmed, Fulfilled, Cancelled) and an "Apply to selected" button
- [ ] Clicking "Apply to selected" updates all selected orders to the chosen status in `rg_orders` localStorage and refreshes the table
- [ ] The bulk-action bar is dismissed (and checkboxes deselected) after a successful bulk update
- [ ] All bulk-action controls are keyboard accessible and have appropriate ARIA labels
