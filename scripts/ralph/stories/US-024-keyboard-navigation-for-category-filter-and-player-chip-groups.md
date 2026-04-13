# US-024: Keyboard navigation for category filter and player chip groups

- **Epic:** Discovery
- **Priority:** 24
- **Status:** in-progress
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Category filter chips and player count filter chips should follow the ARIA radio group pattern so keyboard-only users can Tab to the group and use arrow keys to change selection. Currently each chip is a separate tab stop, forcing many Tab presses to navigate filters. Required for WCAG 2.1 AA compliance.

## Acceptance Criteria

- [ ] Category filter chip group has role='radiogroup' and each chip has role='radio'
- [ ] Player count chip group has role='radiogroup' and each chip has role='radio'
- [ ] Tab key moves focus into the chip group (to the selected chip or first chip if none selected)
- [ ] Arrow keys (left/right or up/down) move focus and selection between chips within the group
- [ ] Tab from the last chip in a group moves focus to the next focusable element outside the group
- [ ] Active chip is visually distinct and has aria-checked='true'

