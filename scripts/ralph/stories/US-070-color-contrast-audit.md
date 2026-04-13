# US-070: Color contrast audit — secondary text must meet WCAG AA 4.5:1

- **Epic:** Discovery
- **Priority:** 70
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Secondary and muted text (game card labels, price, player count, form placeholders) may not meet WCAG AA 4.5:1 contrast ratio against the #fffde1 body background. Audit and fix all failing text elements.

## Acceptance Criteria

- [ ] All game card secondary text (price, player count, category tag) meets 4.5:1 contrast against its background
- [ ] All form placeholder text meets 3:1 contrast ratio (WCAG AA for large-scale text/UI components)
- [ ] All form label text meets 4.5:1 contrast
- [ ] No existing passing elements are changed (only failing ones are updated)
- [ ] The visual design remains consistent with the Kinetic Games brand after the fix
