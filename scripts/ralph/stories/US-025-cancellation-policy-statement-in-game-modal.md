# US-025: Cancellation policy statement in game modal

- **Epic:** Discovery
- **Priority:** 25
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Display a short cancellation policy line inside GameModal before the rental form, e.g. 'Free cancellation up to 24 hours before your rental start date'. Policy text can be a hardcoded constant shared across all games. Builds customer confidence at the decision stage before they invest time in the form.

## Acceptance Criteria

- [ ] A cancellation policy line renders inside GameModal above the rental enquiry form
- [ ] Policy text is 'Free cancellation up to 24 hours before your rental start date'
- [ ] The statement includes an appropriate icon (e.g. calendar or shield check) for visual emphasis
- [ ] Statement is visible without scrolling when the modal first opens on desktop and mobile (375px)
- [ ] Statement text meets WCAG AA colour contrast requirements
- [ ] Policy text is implemented as a shared constant (not duplicated per game)

