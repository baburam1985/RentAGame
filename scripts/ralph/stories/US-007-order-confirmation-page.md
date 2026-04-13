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

**Check 0 — CI FAILED:**
- Classification: code-failure
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332401616/job/71041077897

**Check 2 — TDD INTEGRITY FAILED:**
`web/src/components/RentalForm.test.tsx` was modified between the RED commit (`9306a2b test: [US-007] RED`) and the GREEN commit (`ce3a85c feat: [US-007] GREEN`). Test files must not change after the RED commit. Specifically, a `vi.mock("next/navigation", ...)` import and useRouter mock were added in the GREEN commit. The test mock must be present in the RED commit, not added during implementation.

**Check 9 — SCOPE VIOLATION:**
The following E2E spec files were modified but are out of scope for a story about `/order-confirmation`:
- `web/e2e/catalog.spec.ts` — added `networkidle` wait (unrelated to this story)
- `web/e2e/modal.spec.ts` — added `networkidle` wait and changed `.h3` selector (unrelated to this story)

Story scope: `/order-confirmation` route, order details display, Browse More Games link. Changes to catalog and modal E2E specs are not authorized by this story.

**Required fixes:**
1. Move `vi.mock("next/navigation", ...)` into the RED commit's test file so tests fail at RED without the implementation
2. Remove `catalog.spec.ts` and `modal.spec.ts` changes from this branch (these belong on main or a separate branch)

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass (includes OrderConfirmationPage tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/order-confirmation/page.tsx
- web/src/app/order-confirmation/OrderConfirmationPage.test.tsx
- web/src/components/RentalForm.tsx
- web/src/components/RentalForm.test.tsx
- web/e2e/rental-form.spec.ts
- web/e2e/modal.spec.ts
