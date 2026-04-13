# US-007: Order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 7
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-007-order-confirmation-page
- **PR:** (none)
- **QA Attempts:** 0

## Description

After 'Place Order', navigate to /order-confirmation. Show order reference, game name, rental dates, total price, and customer email. Include a 'Browse More Games' link back to /.

## Acceptance Criteria

- [x] /order-confirmation route exists and renders
- [x] Page shows a unique 8-character alphanumeric order reference number
- [x] Page shows game name, rental start date, rental end date, and total price
- [x] Page shows the customer email from checkout
- [x] 'Browse More Games' link navigates back to /
- [x] Page styling is consistent with the rest of the site

## Dev Notes

Created `app/order-confirmation/page.tsx` as a client component that reads `rg_last_order` from localStorage on mount. Order data schema: `{ reference, games, eventDate, returnDate, totalPrice, email }`. Updated `RentalForm.tsx` to generate an 8-char alphanumeric reference (`Math.random().toString(36).slice(2,10).toUpperCase()`), compute totalPrice (rentalDays × $35 default), write to `rg_last_order`, and call `router.push("/order-confirmation")` on valid submit. Added `vi.mock("next/navigation")` to `RentalForm.test.tsx` to fix the test suite (5 pre-existing tests). All 53 tests pass.

## Files Changed

- `web/src/app/order-confirmation/page.tsx` (new page)
- `web/src/app/order-confirmation/OrderConfirmationPage.test.tsx` (7 new tests)
- `web/src/components/RentalForm.tsx` (add router navigation + localStorage write)
- `web/src/components/RentalForm.test.tsx` (add next/navigation mock)
