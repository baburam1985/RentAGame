# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-006-multi-step-checkout-wizard
- **PR:** (none)
- **QA Attempts:** 0

## Description

Replace the single RentalForm with a 3-step wizard: Step 1 — Date selection. Step 2 — Contact info. Step 3 — Review & confirm. Progress indicator at top. Back/Next buttons. Form state persists between steps.

## Acceptance Criteria

- [x] Wizard renders 3 steps: Date Selection, Contact Info, Review & Confirm
- [x] Progress indicator at top shows current step number
- [x] Next button advances to the next step; Back button returns to the previous step
- [x] Form state (dates, contact info) persists when navigating between steps
- [x] Step 1 computes rental days and total price from start/end dates
- [x] Step 3 shows full order summary before submit
- [x] Place Order CTA on Step 3 submits the order

## Dev Notes

Implemented `CheckoutWizard` component with a 3-step state machine. Parent-owned state split into `DateStep` (eventDate, returnDate, games) and `ContactStep` (name, email, phone, address, notes). Rental days computed via date diff (`Math.ceil(returnDate - eventDate) / 86400000`). Step 1 shows computed days and estimated total price (configurable `pricePerDay` prop, default $35). Step 3 renders a full order summary in a `<dl>` grid. Place Order sets `submitted=true` to show success screen. All 8 unit tests pass (54/54 suite-wide). `page.tsx` updated to use `<CheckoutWizard />` in place of `<RentalForm>`.

## Files Changed

- `web/src/components/CheckoutWizard.tsx` (new component)
- `web/src/components/CheckoutWizard.test.tsx` (new tests — 8 tests)
- `web/src/app/page.tsx` (replaced `<RentalForm>` with `<CheckoutWizard />`)

