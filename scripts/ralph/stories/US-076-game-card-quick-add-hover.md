# US-076: Game card quick-add button revealed on hover (desktop)

- **Epic:** Discovery
- **Priority:** 76
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

On desktop, customers who already know what they want must navigate into the game detail page just to add a game to the cart. Add a quick-add overlay button that appears on hover for desktop users, reducing friction for repeat visitors.

## Acceptance Criteria

- [ ] On desktop (min-width: 1024px), hovering a GameCard reveals an 'Add to Cart' overlay button
- [ ] The overlay does not appear on mobile/touch devices (hover is not reliable on touch)
- [ ] Clicking the quick-add button adds the game to the cart with 1 day (the default rental duration)
- [ ] The card's primary link navigation still works — clicking outside the button area navigates to the detail page
- [ ] The overlay has sufficient contrast and an ARIA label ("Quick add Giant Jenga to cart")
- [ ] Existing GameCard tests remain passing
