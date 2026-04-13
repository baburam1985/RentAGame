# US-019: Inline date validation on rental form

- **Epic:** Checkout & Payments
- **Priority:** 19
- **Status:** in-progress
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

The rental form currently accepts invalid date combinations — past start dates, end dates before start dates, same-day rentals. Add inline validation: start date ≥ today, end date > start date, with friendly inline error messages on blur and on submit.

## Acceptance Criteria

- [ ] Start date input shows an inline error if the selected date is in the past
- [ ] End date input shows an inline error if it is before or equal to the start date
- [ ] Error messages appear on blur and on submit attempt
- [ ] Error messages are friendly: 'Start date must be today or later', 'End date must be after start date'
- [ ] Form cannot be submitted while either date field has an active error
- [ ] Error messages are linked to inputs via aria-describedby for screen reader users

