# US-021: Live total price calculation in rental form

- **Epic:** Checkout & Payments
- **Priority:** 21
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-021-live-price-calculation
- **PR:** #30
- **QA Attempts:** 1

## Description

After a customer selects start and end dates in the rental form, show a live calculated total price (pricePerDay × numberOfDays) updating in real time. Display prominently above the submit button.

## Acceptance Criteria

- [x] Total price updates in real time as start or end date changes
- [x] Total displays as '$X for N days' showing both total and per-day rate
- [x] Total only shows when both dates are valid (start < end)
- [x] If no game is pre-selected, price area shows a friendly placeholder
- [x] Total price is visually prominent with larger or bolder styling
- [x] Minimum rental is 1 day; same-day selection triggers date validation error

## Dev Notes

Added `pricePerDay?: number` prop to RentalForm. Computes `days` from eventDate/returnDate diff. Shows live `$total for N days` and `$X / day` when days > 0. Falls back to "Select dates to see total" placeholder otherwise. Added same-day validation: returnDate === eventDate → "Minimum rental is 1 day." error.

## Files Changed

- web/src/components/RentalForm.tsx
