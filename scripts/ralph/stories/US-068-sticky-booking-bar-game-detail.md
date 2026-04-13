# US-068: Sticky booking bar on game detail page

- **Epic:** Checkout & Payments
- **Priority:** 68
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

On mobile game detail pages, the primary Add to Cart CTA scrolls out of view as users read the gallery and How-to-Play sections. Add a sticky bottom bar that keeps the action reachable at all times on mobile (375px+).

## Acceptance Criteria

- [ ] A sticky bottom bar appears on mobile (max-width: 1023px) on game detail pages
- [ ] The sticky bar displays the game name and price per day
- [ ] The sticky bar contains an 'Add to Cart' button that adds the game with the currently selected days
- [ ] The sticky bar is only visible after the main CTA section is scrolled out of the viewport
- [ ] The sticky bar is hidden on desktop (min-width: 1024px)
- [ ] The sticky bar has sufficient contrast and touch target size (min 44px height per WCAG)
