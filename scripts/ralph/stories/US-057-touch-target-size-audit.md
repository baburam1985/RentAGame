# US-057 — Touch target size audit (WCAG 2.5.5)

**Epic:** Discovery
**Priority:** 57
**Status:** pending

## Description

WCAG 2.2 Success Criterion 2.5.5 requires all interactive touch targets to be at least 44×44 CSS pixels. Small icon buttons throughout the app — the cart icon in the Navbar, the modal close button, filter chip pills on 375px screens — are likely below this threshold. This story audits and fixes all interactive elements to meet the minimum target size using Tailwind's `min-h-11 min-w-11` utilities (44px = 2.75rem), significantly improving usability for motor-impaired users and on touchscreen devices.

## Acceptance Criteria

1. Every interactive button and link in the app has a minimum rendered touch area of 44×44 CSS pixels; use Tailwind `min-h-11 min-w-11` (or equivalent `p-` padding expansion) to achieve this without changing the visual icon size.
2. The Navbar cart icon button, the GameModal close button, and all filter chip pills at 375px viewport width each meet the 44×44px minimum.
3. No existing visual layout is broken — icons and labels remain the same size; only the clickable area expands via padding.
4. A Vitest unit test (or Playwright accessibility check) asserts that key interactive elements have the required minimum dimensions.
5. All changes are Tailwind-only — no hardcoded pixel values in inline styles.

## Out of Scope

- Do not modify the visual design or brand colours of any protected component
- No changes to CartContext, cart page flow, or checkout logic
