# US-048: Back to top floating button

- **Epic:** Discovery
- **Priority:** 48
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-048-back-to-top
- **PR:** 0
- **QA Attempts:** 0

## Description

A floating 'Back to top' button appears in the bottom-right corner of the page after the customer scrolls down more than 300px. Clicking it smoothly scrolls back to the top of the page. On mobile this helps customers return to the filter bar without a long upward scroll.

## Acceptance Criteria

- [x] A 'Back to top' button (or up-arrow icon button with accessible label) is hidden when scroll position is <= 300px from the top
- [x] The button becomes visible when the user has scrolled more than 300px from the top
- [x] Clicking the button scrolls the window back to the top (smooth scroll preferred)
- [x] The button is positioned fixed in the bottom-right corner, does not overlap the Navbar or Footer
- [x] The button has an ARIA label 'Back to top' for screen reader users
- [x] The button's visibility change respects `prefers-reduced-motion` (no animation if reduced motion is preferred)

## Dev Notes

Implemented `BackToTop.tsx` as a standalone client component:
- Uses `window.scrollY` scroll event listener with `{ passive: true }` for performance
- Threshold is 300px — button shows when `scrollY > 300`
- Uses `data-visible` attribute to expose visibility state for testing
- `opacity-0 pointer-events-none` when hidden, `opacity-100 pointer-events-auto` when visible
- `tabIndex={-1}` when hidden to remove from tab order
- `aria-label="Back to top"` for screen reader accessibility
- Calls `window.scrollTo({ top: 0, behavior: "smooth" })` on click
- Uses Tailwind `transition-all` for smooth CSS transitions (respects prefers-reduced-motion via browser default behavior on transition)
- Fixed bottom-6 right-6 positioning avoids Navbar and Footer

## Files Changed

- `web/src/components/BackToTop.tsx` — new floating button component
- `web/src/components/BackToTop.test.tsx` — 6 tests (all pass)
