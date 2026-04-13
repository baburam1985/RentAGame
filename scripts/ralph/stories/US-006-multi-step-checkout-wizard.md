# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-006-multi-step-checkout-wizard
- **PR:** #11
- **QA Attempts:** 4

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

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339138264/job/71063424718

**Check 2 — TDD INTEGRITY FAILED:**
`web/src/components/CheckoutWizard.test.tsx` was modified between the RED commit (`aef1478 test: [US-006] RED`) and the GREEN commit (`f7b4d10 feat: [US-006] GREEN`). Three assertions were changed from `getByText()` to `getByRole("heading", ...)`. Zero changes to test files are permitted between RED and GREEN.

**Required fix:**
1. Ensure the test assertions in the RED commit match the implementation. If `getByRole("heading", ...)` is needed to pass, include that selector in the RED commit.
2. No test file modifications between RED and GREEN — move any test fixes to the RED commit.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes 7 CheckoutWizard tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/components/CheckoutWizard.tsx
- web/src/components/CheckoutWizard.test.tsx
- web/src/app/page.tsx
- web/e2e/modal.spec.ts
