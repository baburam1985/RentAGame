# US-007: Order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 7
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-007-order-confirmation-page
- **PR:** #12
- **QA Attempts:** 2

## Description

After 'Place Order', navigate to /order-confirmation. Show order reference, game name, rental dates, total price, and customer email. Include a 'Browse More Games' link back to /.

## Acceptance Criteria

- [ ] /order-confirmation route exists and renders
- [ ] Page shows a unique 8-character alphanumeric order reference number
- [ ] Page shows game name, rental start date, rental end date, and total price
- [ ] Page shows the customer email from checkout
- [ ] 'Browse More Games' link navigates back to /
- [ ] Page styling is consistent with the rest of the site

## QA Feedback (Attempt 2)

Classification: env-failure
Job: E2E Tests
Error: E2E tests fail consistently across ALL open PRs (#7–#23). Unit Tests and Docker Build pass on every run. Prior fixes applied (category badge, networkidle wait, modal selector, catalog count). Root issue is systemic — Playwright e2e-tests container cannot reliably connect to app container at http://app:3000, or there is a Docker networking regression in CI environment. Not a per-story code issue.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332401616/job/71041077897

Routed to CI-Fix agent. PR #12 remains open.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass (includes OrderConfirmationPage tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/order-confirmation/page.tsx
- web/src/app/order-confirmation/OrderConfirmationPage.test.tsx
- web/src/components/RentalForm.tsx
- web/src/components/RentalForm.test.tsx
- web/e2e/rental-form.spec.ts
- web/e2e/modal.spec.ts
