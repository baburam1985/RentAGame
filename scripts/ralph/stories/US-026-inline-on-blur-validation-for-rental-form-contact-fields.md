# US-026: Inline on-blur validation for rental form contact fields

- **Epic:** Checkout & Payments
- **Priority:** 26
- **Status:** tests-written
- **Passes:** false
- **Branch:** feat/US-026-inline-blur-validation
- **PR:** (none)
- **QA Attempts:** 0

## Description

The rental form contact fields (name, email, phone) currently only validate on submit. Add inline on-blur validation: name required, email valid format, phone valid format (optional field). Show inline green/red feedback so customers correct errors as they go rather than at the end.

## Acceptance Criteria

- [ ] Name field shows an inline error 'Name is required' on blur if left empty
- [ ] Email field shows an inline error 'Enter a valid email address' on blur if format is invalid
- [ ] Phone field (optional) shows an inline error 'Enter a valid phone number' on blur if a non-empty value has invalid format
- [ ] Valid fields show a green indicator (border or icon) on blur to confirm correct input
- [ ] Error messages disappear in real time as the user corrects the field value
- [ ] Each error message is linked to its input via aria-describedby for screen reader users
- [ ] Form submission is blocked while any required field has an active validation error

