# US-039: Game modal mobile scroll affordance (bottom fade shadow)

- **Epic:** Discovery
- **Priority:** 39
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

On 375px screens, the GameModal content (description, dimensions, included items, cancellation policy, rental form) is taller than the viewport. There is no visual cue signalling that more content exists below the visible area. Customers may never scroll down to see the rental form. A bottom-fade gradient overlay at the modal's lower edge signals scrollability, following standard mobile UX convention.

## Acceptance Criteria

- [ ] When the GameModal content is taller than the modal viewport height, a bottom-fade gradient overlay (white-to-transparent or matching the modal background colour) is visible at the lower edge of the modal
- [ ] The fade overlay is implemented using a CSS `pointer-events: none` pseudo-element or absolutely-positioned div so it does not block scroll or tap interactions
- [ ] The fade overlay disappears (or is hidden) when the user has scrolled to the very bottom of the modal content
- [ ] At 375px viewport width, the rental form submit button is reachable by scrolling — confirmed with a Playwright E2E test or unit test snapshot
- [ ] The change is limited to `web/src/components/GameModal.tsx` (and its CSS if needed) — no other components are modified
- [ ] No layout shift or visual regression on desktop (≥768px) where the modal content may fit entirely in the viewport

## Dev Notes

Wrap the scrollable content area of GameModal in a `relative overflow-y-auto` container. Add a sibling `div` with `pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent` inside the same relative parent. Use a scroll event listener (or `IntersectionObserver` on a sentinel element at the bottom of the content) to toggle a CSS class that hides the gradient when scrolled to the bottom. Keep changes within GameModal only.
