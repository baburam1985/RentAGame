# US-078: Expected guest count field in rental form

- **Epic:** Checkout & Payments
- **Priority:** 78
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Add an optional "How many guests?" number input to the rental form so customers can tell the business owner their event size. This helps the admin prepare appropriately and reduces post-booking mismatches between game capacity and actual guest count.

## Acceptance Criteria

- [ ] The rental form includes an optional "How many guests?" number input field, placed logically near other event-detail fields
- [ ] The field accepts positive integers only; the form does not block submission if the field is left empty
- [ ] When provided, the guest count is stored in the order object under `rg_orders` in localStorage alongside other booking details
- [ ] The field has a visible label programmatically associated via `htmlFor` (WCAG 1.3.1)
- [ ] The field has a helpful placeholder (e.g., "e.g. 25") and is keyboard accessible
- [ ] Existing rental form tests remain passing
