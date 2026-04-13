# US-065 — Navbar focus indicators (WCAG 2.4.11)

**Epic:** Discovery
**Priority:** 65
**Status:** pending

## Description

WCAG 2.2 SC 2.4.11 (Focus Appearance) requires focus indicators to have a minimum area and contrast ratio. The Navbar links currently rely on the browser default focus ring, which Tailwind's base CSS resets via `outline: none` in some configurations. Explicitly adding `focus-visible:` ring classes to all Navbar links and the logo ensures keyboard and switch-access users can always see where focus is — a WCAG AA requirement as of 2024.

## Acceptance Criteria

1. All interactive elements in the Navbar (logo link, all nav links, cart icon button) have an explicit `focus-visible:outline` or `focus-visible:ring` Tailwind class that renders a visible focus indicator with sufficient contrast (at least 3:1 against the yellow navbar background).
2. The focus indicator is visible in all major browsers (Chrome, Firefox, Safari) when navigating by keyboard (Tab key).
3. The Navbar's visual appearance is unchanged when elements are not focused — only the focused state is affected.
4. No other Navbar properties (yellow background, "Kinetic Games" brand text, cart icon, nav link labels) are modified.
5. A Vitest unit test asserts that Navbar interactive elements include a `focus-visible` Tailwind class in their className.

## Out of Scope

- Do not change any other Navbar styles, layout, or content
- Do not add focus-visible classes to non-Navbar components in this story (each component is addressed separately)
- No changes to CartContext or any page outside the Navbar component
