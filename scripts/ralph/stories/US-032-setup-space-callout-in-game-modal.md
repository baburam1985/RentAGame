# US-032: Setup space callout in game modal

- **Epic:** Discovery
- **Priority:** 32
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Customers booking for events need to know if a game fits their space. The Game type already has a dimensions field but GameModal does not visually highlight it. Add a prominent 'Setup space needed' callout with an icon inside GameModal to answer this pre-booking question.

## Acceptance Criteria

- [ ] GameModal renders a 'Setup space needed' callout displaying the game's dimensions value
- [ ] The callout uses an appropriate icon (e.g. ruler or expand arrows) alongside the dimensions text
- [ ] Callout is positioned clearly before the rental form within the modal
- [ ] Callout is visible without scrolling when the modal first opens on desktop and mobile (375px)
- [ ] Callout text meets WCAG AA colour contrast requirements
- [ ] No new fields are added to games.ts — the existing dimensions field is reused

