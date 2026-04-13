# US-047: Instant confirmation trust badge on rental form

- **Epic:** Checkout & Payments
- **Priority:** 47
- **Status:** tests-written
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

An 'Instant Confirmation' trust badge (icon + label) renders near the rental form submit button to reassure first-time customers that their booking is confirmed immediately — not queued for review. This is a static UI trust signal modelled on Airbnb Experiences and Viator.

## Acceptance Criteria

- [ ] An 'Instant Confirmation' label with a checkmark or lightning-bolt icon is visible near the rental form submit button
- [ ] The badge is visible on both mobile (375px) and desktop
- [ ] The badge does not interfere with form layout or the submit button's tap target
- [ ] The badge uses the existing Tailwind color scheme (no new color variables)
- [ ] The badge is accompanied by a brief sub-label such as 'Your booking is confirmed immediately'

## Dev Notes

