# US-023: Add 'No hidden fees' trust statement near rental form CTA

- **Epic:** Checkout & Payments
- **Priority:** 23
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-023-no-hidden-fees-trust-statement
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a single-line trust statement 'No hidden fees — total shown before you confirm' near the rental form submit button. Per PRODUCT.md design principle: pricing must always be visible before checkout and trust signals matter. Addresses the #1 reason customers abandon rental bookings.

## Acceptance Criteria

- [x] A 'No hidden fees — total shown before you confirm' line renders visually near the form submit button
- [x] The statement is visible without scrolling on both desktop and mobile (375px) layouts
- [x] The statement uses an appropriate trust icon (e.g. shield or checkmark) alongside the text
- [x] The statement does not interfere with form submission or tab order
- [x] Text is accessible: sufficient colour contrast (WCAG AA) and not conveyed by colour alone
- [x] Statement renders correctly whether or not a game is pre-selected in the form

## Dev Notes

Added trust statement div below the "Send Rental Request" submit button in `RentalForm.tsx`. Uses `data-testid="trust-statement"` wrapper, a `verified_user` Material Symbols icon (aria-hidden), and the text "No hidden fees — total shown before you confirm". Styled with `text-xs text-gray-500` for WCAG AA contrast. All 6 new tests pass, existing RentalForm tests unaffected.

## Files Changed

- `web/src/components/RentalForm.tsx` — added trust statement div below submit button
- `web/src/components/RentalFormTrust.test.tsx` — new test file (RED commit)

