# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** qa-failed
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

## QA Feedback (Attempt 2)

Classification: env-failure
Job: E2E Tests
Error: E2E tests fail consistently across ALL open PRs (#7–#23). Unit Tests and Docker Build pass on every run. Prior fixes applied (category badge, networkidle wait, modal selector, catalog count). Root issue is systemic — Playwright e2e-tests container cannot reliably connect to app container at http://app:3000, or there is a Docker networking regression in CI environment. Not a per-story code issue.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332400512/job/71041074314

Routed to CI-Fix agent. PR #11 remains open.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes 7 CheckoutWizard tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/components/CheckoutWizard.tsx
- web/src/components/CheckoutWizard.test.tsx
- web/src/app/page.tsx
- web/e2e/modal.spec.ts
