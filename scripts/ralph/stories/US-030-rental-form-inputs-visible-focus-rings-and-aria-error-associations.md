# US-030: Rental form inputs: visible focus rings and ARIA error associations

- **Epic:** Discovery
- **Priority:** 30
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Form inputs currently lose their visible focus ring in some browsers due to outline:none. Each input also needs aria-describedby pointing to its associated error message element. Both are required for WCAG 2.1 AA compliance and keyboard usability.

## Acceptance Criteria

- [ ] All rental form inputs have a visible focus ring (2px or greater) when focused via keyboard
- [ ] Focus ring is not suppressed by outline:none or equivalent CSS on any input
- [ ] Each input has an aria-describedby attribute pointing to the ID of its error message element
- [ ] Each error message element has a matching id attribute used by aria-describedby
- [ ] Focus ring style is consistent across all form inputs (name, email, phone, date fields)
- [ ] Focus ring colour meets WCAG AA contrast ratio (3:1 minimum against adjacent colours)

