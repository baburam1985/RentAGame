# US-069: Announce cart add/remove actions to screen readers via ARIA live region

- **Epic:** Discovery
- **Priority:** 69
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

When a customer adds or removes a game from the cart, screen reader users receive no feedback — the cart icon count updates visually but nothing is announced. Add an ARIA live region that announces cart state changes for WCAG 4.1.3 compliance.

## Acceptance Criteria

- [ ] An ARIA live region (aria-live="polite") exists in the layout, invisible to sighted users
- [ ] Adding a game to the cart triggers an announcement like "Giant Jenga added to cart. 2 items in cart."
- [ ] Removing a game from the cart triggers an announcement like "Giant Jenga removed from cart. 1 item in cart."
- [ ] The live region message updates correctly when multiple items are in the cart
- [ ] The announcement does not interrupt the user's current reading position (polite, not assertive)
