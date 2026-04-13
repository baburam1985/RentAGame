# US-021: Live total price calculation in rental form

- **Epic:** Checkout & Payments
- **Priority:** 21
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

After a customer selects start and end dates in the rental form, show a live calculated total price (pricePerDay × numberOfDays) updating in real time. Display prominently above the submit button.

## Acceptance Criteria

- [ ] Total price updates in real time as start or end date changes
- [ ] Total displays as '$X for N days' showing both total and per-day rate
- [ ] Total only shows when both dates are valid (start < end)
- [ ] If no game is pre-selected, price area shows a friendly placeholder
- [ ] Total price is visually prominent with larger or bolder styling
- [ ] Minimum rental is 1 day; same-day selection triggers date validation error

