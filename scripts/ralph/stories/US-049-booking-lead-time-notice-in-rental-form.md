# US-049: Booking lead time notice near rental form date fields

- **Epic:** Checkout & Payments
- **Priority:** 49
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

Customers booking for imminent events need to know if same-day or next-day rental is possible before filling the entire form. Without a lead time statement, they complete the form only to discover their requested date cannot be accommodated. A clear notice near the date inputs sets expectations proactively and prevents wasted submissions. Source research item: R-046.

## Acceptance Criteria

- [ ] A notice reading 'We require at least 24 hours notice for all rentals' appears near the start/end date fields in RentalForm
- [ ] The notice is styled as a subtle info callout (e.g. blue-tinted background or an info icon) — not an error state
- [ ] The notice is visible before the customer interacts with the date fields (always shown, not conditional)
- [ ] The notice text is concise — one line, no more than 12 words
- [ ] The start date input's min attribute is set to tomorrow's date so past dates and today are not selectable

## Dev Notes

## QA Feedback
