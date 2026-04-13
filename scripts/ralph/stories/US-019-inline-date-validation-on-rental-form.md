# US-019: Inline date validation on rental form

- **Epic:** Checkout & Payments
- **Priority:** 19
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-019-inline-date-validation
- **PR:** #28
- **QA Attempts:** 1

## Description

The rental form currently accepts invalid date combinations — past start dates, end dates before start dates, same-day rentals. Add inline validation: start date ≥ today, end date > start date, with friendly inline error messages on blur and on submit.

## Acceptance Criteria

- [x] Start date input shows an inline error if the selected date is in the past
- [x] End date input shows an inline error if it is before or equal to the start date
- [x] Error messages appear on blur and on submit attempt
- [x] Error messages are friendly: 'Start date must be today or later', 'End date must be after start date'
- [x] Form cannot be submitted while either date field has an active error
- [x] Error messages are linked to inputs via aria-describedby for screen reader users

## Dev Notes

Updated `RentalForm.tsx` to add inline date validation:

- Added `getTodayString()` helper to get today's date as "YYYY-MM-DD" string without external library
- Added `validateEventDate()` — returns error if date is empty or before today
- Added `validateReturnDate()` — returns error if date is empty or `<= eventDate` (same day now fails)
- Added `handleEventDateBlur()` and `handleReturnDateBlur()` for on-blur validation
- Extracted `dateField()` render helper for date inputs with `onBlur`, `aria-describedby`, and scoped error `id`
- Error messages: "Start date must be today or later" and "End date must be after start date"
- Updated existing test "shows date error when return date is before event date" to use new error message

All 54 tests pass (0 failures).

## Files Changed

- `web/src/components/RentalForm.tsx`
- `web/src/components/RentalForm.test.tsx` (updated existing test for new error message)
