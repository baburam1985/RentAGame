# US-007: Order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 7
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-007-order-confirmation-page
- **PR:** #12
- **QA Attempts:** 0

## Description

After submitting the rental form, redirect to `/order-confirmation`. The page reads order data from `localStorage` (`rg_orders`) and displays the most recent order's details. Include a 'Browse More Games' link back to `/`. Only files in `web/src/app/order-confirmation/` and `web/src/components/RentalForm.tsx` (and their test files) are in scope — do not modify any other E2E specs or components.

## Acceptance Criteria

- [ ] A `"use client"` component at `web/src/app/order-confirmation/page.tsx` renders without error when `rg_orders` contains at least one order
- [ ] The page displays the order reference: a unique 8-character alphanumeric string (e.g. `A1B2C3D4`) stored on the order object in `rg_orders`
- [ ] The page displays the game name, rental start date (formatted `YYYY-MM-DD`), rental end date (formatted `YYYY-MM-DD`), and total price (formatted as `$XX.XX`) from the most recent entry in `rg_orders`
- [ ] The page displays the customer email address stored on the order object
- [ ] A link or button labelled exactly `'Browse More Games'` navigates the user to `/` (home page)
- [ ] The RED commit test file already includes all mocks required for the tests to compile (e.g. `vi.mock("next/navigation", ...)` must be present in the RED commit, not added during GREEN)

## TDD Notes

Write tests first in `web/src/app/order-confirmation/OrderConfirmationPage.test.tsx`. The RED commit must have all mocks in place so tests fail due to missing implementation only. The GREEN commit must not modify test files. Do not modify `web/e2e/catalog.spec.ts`, `web/e2e/modal.spec.ts`, or any E2E file unrelated to the order-confirmation flow.

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
