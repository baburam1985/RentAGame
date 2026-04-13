# US-035: Game modal focus trap for keyboard navigation

- **Epic:** Discovery
- **Priority:** 35
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

When the GameModal is open, pressing Tab moves focus out of the modal and into the background page content, violating WCAG 2.1 SC 2.1.2. Focus must be trapped inside the modal while it is open and must return to the triggering game card button when the modal is closed.

## Acceptance Criteria

- [ ] When GameModal is open, Tab and Shift+Tab cycle focus only through focusable elements inside the modal (close button, form fields, submit button)
- [ ] Focus does not escape to background page elements while the modal is open
- [ ] When the modal is closed (via close button or Escape key), focus returns to the game card button that opened the modal
- [ ] Focus trap is implemented without any external focus-management library — pure DOM/ref logic in TypeScript
- [ ] Unit test confirms that the focus trap effect attaches and the first focusable element receives focus on modal open
- [ ] Keyboard-only walkthrough at 375px confirms no focus escape

## Dev Notes

Use a `useEffect` in GameModal that queries all focusable elements (`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`) inside the modal ref, intercepts Tab/Shift+Tab keydown events, and wraps focus from last to first and vice versa. Store the triggering element in a ref before opening and call `.focus()` on it when the modal unmounts.
