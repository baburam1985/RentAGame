# US-054: Featured game recommendations in empty cart state

- **Epic:** Checkout & Payments
- **Priority:** 54
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

When the cart is empty, instead of a dead-end 'Your cart is empty' message, show a section with 3-4 featured/popular games with 'Add to Cart' buttons. This keeps customers in the booking funnel and eliminates the empty-state dead end per PRODUCT.md design principle 3.

## Acceptance Criteria

- [ ] When the cart contains zero items, a 'Featured Games' or 'Popular picks' section renders below the empty cart message
- [ ] Exactly 3 game cards are shown, selected from the games with the highest priority (first 3 in the games.ts array or tagged as featured)
- [ ] Each card has an 'Add to Cart' button that adds the game to the cart
- [ ] The section heading reads 'You might like' or 'Browse popular games'
- [ ] When the cart is non-empty, the featured section is not shown
- [ ] A 'Browse all games' link takes the customer back to the homepage

## Dev Notes

