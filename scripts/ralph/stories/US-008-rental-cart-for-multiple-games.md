# US-008: Rental cart for multiple games

- **Epic:** Checkout & Payments
- **Priority:** 8
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-008-rental-cart-drawer
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a cart system. 'Add to Cart' button on each GameCard and GameModal. Cart icon in Navbar shows item count badge. Cart drawer slides in from right with date pickers per item and a running total.

## Acceptance Criteria

- [x] 'Add to Cart' button renders on GameCard and GameModal
- [x] Cart icon in Navbar shows a badge with the current item count
- [x] Cart drawer slides in from the right when cart icon is clicked
- [x] Each cart item shows game name, individual date picker, and subtotal
- [x] Running total shown at the bottom of the drawer
- [x] Checkout CTA in drawer opens the multi-step wizard pre-populated with cart items
- [x] Items can be removed from the cart

## Dev Notes

'Add to Cart' was already on GameCard. Added it to GameModal (uses `useCart`, updated GameModal.test.tsx to wrap in CartProvider). CartContext.tsx extended with `isCartOpen`, `openCart`, `closeCart` state. Navbar.tsx: changed cart icon from `<Link href="/cart">` to `<button onClick={openCart}>`. Created `CartDrawer.tsx` — slide-in panel (z-50) that conditionally renders when `isCartOpen=true`, shows items with `<select>` day picker (options: 1,2,3,7), per-item subtotal, running total, remove button, "Proceed to Checkout" CTA → `router.push("/cart")`. Added CartDrawer to `layout.tsx` inside CartProvider. 7 new unit tests in CartDrawer.test.tsx + 1 new test in GameModal.test.tsx. All 54 tests pass.

## Files Changed

- `web/src/context/CartContext.tsx` (add isCartOpen/openCart/closeCart)
- `web/src/components/CartDrawer.tsx` (new component)
- `web/src/components/CartDrawer.test.tsx` (7 new tests)
- `web/src/components/Navbar.tsx` (cart icon: Link → button calling openCart)
- `web/src/app/layout.tsx` (add CartDrawer inside CartProvider)
- `web/src/components/GameModal.tsx` (add Add to Cart button)
- `web/src/components/GameModal.test.tsx` (wrap in CartProvider, add Add to Cart test)
