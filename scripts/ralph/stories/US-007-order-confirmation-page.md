# US-007: Order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 7
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-007-order-confirmation-page
- **PR:** #12
- **QA Attempts:** 1

## Description

After 'Place Order', navigate to /order-confirmation. Show order reference, game name, rental dates, total price, and customer email. Include a 'Browse More Games' link back to /.

## Acceptance Criteria

- [ ] /order-confirmation route exists and renders
- [ ] Page shows a unique 8-character alphanumeric order reference number
- [ ] Page shows game name, rental start date, rental end date, and total price
- [ ] Page shows the customer email from checkout
- [ ] 'Browse More Games' link navigates back to /
- [ ] Page styling is consistent with the rest of the site

## QA Feedback (Attempt 1)

- **Classification:** env-failure
- **Job:** E2E Tests
- **Error:** `catalog.spec.ts` — "clicking Lawn Games filter shows only lawn games" fails: `cards.locator("text=Lawn Games")` finds 0 elements inside `.group` cards because `GameCard.tsx` does not render a category badge after commit `88e076e` ("fix: restore Kinetic Games UI") removed it. Systemic failure affecting all open PRs.
- **Fix needed:** CI-Fix agent must add `<span>{game.category}</span>` back to `GameCard.tsx` so the E2E assertion passes.
- **Next step:** After CI-Fix restores green E2E, rebase branch on main and re-queue for QA.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass (includes OrderConfirmationPage tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/order-confirmation/page.tsx
- web/src/app/order-confirmation/OrderConfirmationPage.test.tsx
- web/src/components/RentalForm.tsx
- web/src/components/RentalForm.test.tsx
- web/e2e/rental-form.spec.ts
- web/e2e/modal.spec.ts
