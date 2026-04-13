# US-050: Wishlist toast notifications for add/remove actions

- **Epic:** User Accounts
- **Priority:** 50
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

When a customer adds or removes a game from their wishlist (US-013), a brief toast notification confirms the action: 'Added to wishlist' or 'Removed from wishlist'. The toast auto-dismisses after 2 seconds. This prevents confusion about whether the wishlist toggle registered, especially on mobile where the heart icon is small. Requires US-013 to be complete.

## Acceptance Criteria

- [ ] Toggling a game into the wishlist shows a toast reading 'Added to wishlist'
- [ ] Toggling a game out of the wishlist shows a toast reading 'Removed from wishlist'
- [ ] The toast auto-dismisses after 2 seconds
- [ ] Only one toast is visible at a time (new toast replaces previous if triggered rapidly)
- [ ] The toast is positioned consistently (e.g. bottom-center or top-right) and does not cover the Navbar or game cards
- [ ] The toast is announced to screen readers via an ARIA live region (`role="status"` or `aria-live="polite"`)

## Dev Notes

