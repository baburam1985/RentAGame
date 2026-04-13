# US-052: HTML autocomplete attributes on rental form fields

- **Epic:** Checkout & Payments
- **Priority:** 52
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

The rental form contact fields are missing HTML `autocomplete` attributes. Adding `autocomplete="name"`, `autocomplete="email"`, and `autocomplete="tel"` enables browsers to auto-fill these fields for returning customers, significantly reducing mobile form completion time and friction.

## Acceptance Criteria

- [ ] The name input has `autocomplete="name"`
- [ ] The email input has `autocomplete="email"`
- [ ] The phone input has `autocomplete="tel"`
- [ ] The form element itself has `autocomplete="on"`
- [ ] No visual or behavioral changes to the form beyond the HTML attribute additions

## Dev Notes

