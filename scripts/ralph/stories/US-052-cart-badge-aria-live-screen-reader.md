# US-052: Cart badge count announced to screen readers via aria-live

- **Epic:** Discovery
- **Priority:** 52
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

When a customer adds a game to cart, the Navbar cart badge count updates visually but there is no announcement for screen reader users. WCAG 2.1 SC 4.1.3 (Status Messages) requires that status changes not conveyed via focus be programmatically determinable. Adding an aria-live='polite' region ensures blind and low-vision users know their cart changed. Source research item: R-053.

## Acceptance Criteria

- [ ] The cart badge in the Navbar has aria-live='polite' so count changes are announced by screen readers without moving focus
- [ ] The aria-label on the cart link/icon includes the current count (e.g. 'Cart, 2 items')
- [ ] When a game is added to cart, the aria-label updates to reflect the new count
- [ ] When a game is removed from cart, the aria-label updates accordingly
- [ ] The live region announcement does not disrupt the user's current reading position (polite, not assertive)

## Dev Notes

## QA Feedback
