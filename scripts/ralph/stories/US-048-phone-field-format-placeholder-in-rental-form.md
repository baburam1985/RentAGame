# US-048: Phone field format placeholder in rental form

- **Epic:** Checkout & Payments
- **Priority:** 48
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

The phone number field in the rental form has no format guidance. Baymard Institute research shows format hints reduce phone-field errors by 31%. Without a placeholder like '(555) 555-5555', customers enter formats that fail validation without understanding why. Adding placeholder text and a format hint label prevents avoidable form errors. Source research item: R-045.

## Acceptance Criteria

- [ ] The phone input in RentalForm has placeholder text '(555) 555-5555'
- [ ] A small helper text beneath the phone field reads 'Format: (555) 555-5555' in muted styling
- [ ] The placeholder disappears when the user starts typing (standard HTML placeholder behavior)
- [ ] The format hint does not interfere with existing on-blur validation (US-026) — both coexist correctly
- [ ] The phone field visually integrates with the existing RentalForm styling without changing surrounding layout

## Dev Notes

## QA Feedback
