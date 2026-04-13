# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** ci-pending
- **Passes:** false
- **Branch:** feat/US-006-multi-step-checkout-wizard
- **PR:** #11
- **QA Attempts:** 1

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

## QA Feedback (Attempt 1)

- **Classification:** env-failure
- **Job:** E2E Tests
- **Error:** `catalog.spec.ts` — "clicking Lawn Games filter shows only lawn games" fails: `cards.locator("text=Lawn Games")` finds 0 elements inside `.group` cards because `GameCard.tsx` does not render a category badge after commit `88e076e` ("fix: restore Kinetic Games UI") removed it. Systemic failure affecting all open PRs.
- **Fix needed:** CI-Fix agent must add `<span>{game.category}</span>` back to `GameCard.tsx` so the E2E assertion passes.
- **Next step:** After CI-Fix restores green E2E, rebase branch on main and re-queue for QA.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes 7 CheckoutWizard tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/components/CheckoutWizard.tsx
- web/src/components/CheckoutWizard.test.tsx
- web/src/app/page.tsx
- web/e2e/modal.spec.ts
