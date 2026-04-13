# US-047: Instant confirmation trust badge on rental form

- **Epic:** Checkout & Payments
- **Priority:** 47
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-047-trust-badge
- **PR:** 0
- **QA Attempts:** 0

## Description

An 'Instant Confirmation' trust badge (icon + label) renders near the rental form submit button to reassure first-time customers that their booking is confirmed immediately — not queued for review. This is a static UI trust signal modelled on Airbnb Experiences and Viator.

## Acceptance Criteria

- [x] An 'Instant Confirmation' label with a checkmark or lightning-bolt icon is visible near the rental form submit button
- [x] The badge is visible on both mobile (375px) and desktop
- [x] The badge does not interfere with form layout or the submit button's tap target
- [x] The badge uses the existing Tailwind color scheme (no new color variables)
- [x] The badge is accompanied by a brief sub-label such as 'Your booking is confirmed immediately'

## Dev Notes

Added an 'Instant Confirmation' trust badge directly after the submit button in `RentalForm.tsx`:
- Uses Material Symbols `verified` icon in green-600
- Shows "Instant Confirmation" label in green-700 (bold) with "Your booking is confirmed immediately" sub-label in gray-500
- Centered below the submit button, flex layout with icon + text
- No new CSS variables or color tokens used — all Tailwind utilities
- Tests appended to existing RentalForm.test.tsx in a new describe block

## Files Changed

- `web/src/components/RentalForm.tsx` — trust badge added near submit button
- `web/src/components/RentalForm.test.tsx` — 3 new tests in new describe block
