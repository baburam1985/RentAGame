# US-024: Keyboard navigation for category filter and player chip groups

- **Epic:** Discovery
- **Priority:** 24
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-024-keyboard-nav-filter-chips
- **PR:** (none)
- **QA Attempts:** 0

## Description

Category filter chips and player count filter chips should follow the ARIA radio group pattern so keyboard-only users can Tab to the group and use arrow keys to change selection. Currently each chip is a separate tab stop, forcing many Tab presses to navigate filters. Required for WCAG 2.1 AA compliance.

## Acceptance Criteria

- [x] Category filter chip group has role='radiogroup' and each chip has role='radio'
- [x] Player count chip group has role='radiogroup' and each chip has role='radio'
- [x] Tab key moves focus into the chip group (to the selected chip or first chip if none selected)
- [x] Arrow keys (left/right or up/down) move focus and selection between chips within the group
- [x] Tab from the last chip in a group moves focus to the next focusable element outside the group
- [x] Active chip is visually distinct and has aria-checked='true'

## Dev Notes

Updated `CategoryFilter.tsx` to use `role="radiogroup"` wrapper div and `role="radio"` + `aria-checked` on each chip. Added arrow key handler via `onKeyDown` that cycles through chips using refs. Created new `PlayerCountFilter.tsx` component with the same radiogroup pattern and arrow key navigation. Updated existing `CategoryFilter.test.tsx` to use `aria-checked` instead of `aria-pressed`. All 58 unit tests pass, TypeScript compiles cleanly.

## Files Changed

- `web/src/components/CategoryFilter.tsx` — radiogroup pattern + arrow key navigation
- `web/src/components/PlayerCountFilter.tsx` — new single-select radiogroup component
- `web/src/components/CategoryFilter.test.tsx` — updated aria-pressed assertions to aria-checked
- `web/src/components/CategoryFilterKeyboard.test.tsx` — new test file (RED commit)

