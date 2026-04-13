# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-006-multi-step-checkout-wizard
- **PR:** #11
- **QA Attempts:** 2

## Description

Replace the single RentalForm with a 3-step wizard: Step 1 — Date selection. Step 2 — Contact info. Step 3 — Review & confirm. Progress indicator at top. Back/Next buttons. Form state persists between steps.

## Acceptance Criteria

- [ ] Wizard renders 3 steps: Date Selection, Contact Info, Review & Confirm
- [ ] Progress indicator at top shows current step number
- [ ] Next button advances to the next step; Back button returns to the previous step
- [ ] Form state (dates, contact info) persists when navigating between steps
- [ ] Step 1 computes rental days and total price from start/end dates
- [ ] Step 3 shows full order summary before submit
- [ ] Place Order CTA on Step 3 submits the order

## QA Feedback

env-failure fixed by CI-Fix PR #25 (2026-04-13). Root cause: grep -q "healthy" in CI wait loop matched "(health: starting)" prematurely. Fixed with docker inspect exact status check. Status reset to dev-complete for QA re-pick.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes 7 CheckoutWizard tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/components/CheckoutWizard.tsx
- web/src/components/CheckoutWizard.test.tsx
- web/src/app/page.tsx
- web/e2e/modal.spec.ts
