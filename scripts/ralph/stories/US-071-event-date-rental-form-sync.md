# US-071: Event date field in rental form syncs with availability calendar

- **Epic:** Checkout & Payments
- **Priority:** 71
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

The rental form and the availability calendar (US-009) are currently disconnected. Add an Event Date date-input field at the top of the rental form that pre-populates the rental start date, mirroring the booking UX pattern where "When is your event?" is the first question.

## Acceptance Criteria

- [ ] The rental form includes an 'Event Date' date input field near the top of the form
- [ ] Selecting a date in the 'Event Date' field pre-fills the rental start date in the form
- [ ] The event date field respects the same min-date constraint as the availability calendar (today or later)
- [ ] The field has a proper accessible label ("Event Date") associated via htmlFor
- [ ] The field shows inline validation error if a past date is entered (on blur)
- [ ] The rental form retains all existing fields and functionality
