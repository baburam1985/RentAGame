# US-048: Back to top floating button

- **Epic:** Discovery
- **Priority:** 48
- **Status:** in-progress
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

A floating 'Back to top' button appears in the bottom-right corner of the page after the customer scrolls down more than 300px. Clicking it smoothly scrolls back to the top of the page. On mobile this helps customers return to the filter bar without a long upward scroll.

## Acceptance Criteria

- [ ] A 'Back to top' button (or up-arrow icon button with accessible label) is hidden when scroll position is ≤ 300px from the top
- [ ] The button becomes visible when the user has scrolled more than 300px from the top
- [ ] Clicking the button scrolls the window back to the top (smooth scroll preferred)
- [ ] The button is positioned fixed in the bottom-right corner, does not overlap the Navbar or Footer
- [ ] The button has an ARIA label 'Back to top' for screen reader users
- [ ] The button's visibility change respects `prefers-reduced-motion` (no animation if reduced motion is preferred)

## Dev Notes

