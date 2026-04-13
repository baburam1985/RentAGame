# US-046: Booking reference number on order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 46
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

After submitting a rental order, customers see a confirmation message but have no reference number. A unique alphanumeric booking reference (e.g. 'KG-20260413-7F3B') generated at order creation and stored in the localStorage order gives customers proof their booking was registered and a way to reference it in follow-up questions. Source research item: R-048.

## Acceptance Criteria

- [ ] Each order stored in rg_orders has a unique bookingRef field (format: 'KG-YYYYMMDD-XXXX' where XXXX is 4 random alphanumeric chars)
- [ ] The order confirmation page prominently displays the booking reference number (e.g. 'Your booking reference: KG-20260413-7F3B')
- [ ] The booking reference is visually distinct (larger font, bold, or boxed) so customers can easily screenshot or write it down
- [ ] No two orders in localStorage have the same bookingRef (collision-resistant generation)
- [ ] The bookingRef appears in the order history page (US-012) alongside each order

## Dev Notes

## QA Feedback
