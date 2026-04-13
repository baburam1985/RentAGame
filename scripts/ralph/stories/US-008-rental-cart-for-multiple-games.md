# US-008: Rental cart for multiple games

- **Epic:** Checkout & Payments
- **Priority:** 8
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-008-rental-cart-drawer
- **PR:** #13
- **QA Attempts:** 2

## Description

Add a cart system. 'Add to Cart' button on each GameCard and GameModal. Cart icon in Navbar shows item count badge. Cart drawer slides in from right with date pickers per item and a running total.

## Acceptance Criteria

- [ ] 'Add to Cart' button renders on GameCard and GameModal
- [ ] Cart icon in Navbar shows a badge with the current item count
- [ ] Cart drawer slides in from the right when cart icon is clicked
- [ ] Each cart item shows game name, individual date picker, and subtotal
- [ ] Running total shown at the bottom of the drawer
- [ ] Checkout CTA in drawer opens the multi-step wizard pre-populated with cart items
- [ ] Items can be removed from the cart

## QA Feedback

env-failure fixed by CI-Fix PR #25 (2026-04-13). Root cause: grep -q "healthy" in CI wait loop matched "(health: starting)" prematurely. Fixed with docker inspect exact status check. Status reset to dev-complete for QA re-pick.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes CartDrawer tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/components/CartDrawer.tsx
- web/src/components/CartDrawer.test.tsx
- web/src/components/GameModal.tsx
- web/src/components/GameModal.test.tsx
- web/src/components/Navbar.tsx
- web/src/context/CartContext.tsx
- web/src/app/layout.tsx
