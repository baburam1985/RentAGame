# US-037: Rental form submit button loading and disabled state

- **Epic:** Checkout & Payments
- **Priority:** 37
- **Status:** dev-complete
- **Passes:** true
- **Branch:** feat/US-037-submit-button-loading
- **PR:** 
- **QA Attempts:** 0

## Description

The rental form submit button has no loading or disabled state. On a slow device or a double-tap, customers can submit the form multiple times, creating duplicate order entries in localStorage. The button must be disabled after first click and show a spinner while submission is processing, then re-enable on success or error.

## Acceptance Criteria

- [ ] After the submit button is clicked, it is immediately disabled so a second click has no effect
- [ ] A loading spinner (CSS-only, Tailwind animate-spin) replaces or accompanies the button label during processing
- [ ] The button label changes to "Submitting…" (or shows spinner) while the form is being processed
- [ ] After successful submission the button re-enables (or the form navigates/resets as per existing flow)
- [ ] If validation fails before submission the button stays enabled and no spinner is shown
- [ ] Unit test confirms: (a) button is disabled after first click, (b) duplicate click does not fire the submit handler a second time
- [ ] No duplicate orders appear in localStorage when the form is submitted twice in quick succession

## Dev Notes

In `web/src/components/RentalForm.tsx`, add a `isSubmitting` boolean state (default `false`). On form submit: set `isSubmitting = true`, run the submission logic, then set `isSubmitting = false` in a finally block. Pass `disabled={isSubmitting}` and render a spinner conditionally on the button. Use `animate-spin` Tailwind class for the spinner icon (a simple SVG circle arc or a text placeholder such as a rotating border on a small div).
