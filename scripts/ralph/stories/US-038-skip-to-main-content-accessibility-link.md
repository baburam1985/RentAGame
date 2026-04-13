# US-038: Skip to main content accessibility link

- **Epic:** Discovery
- **Priority:** 38
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-038-skip-to-main-content
- **PR:** 
- **QA Attempts:** 0

## Description

Keyboard and screen reader users must Tab through all Navbar links on every page before reaching the main content area. A visually-hidden "Skip to main content" anchor link as the very first focusable element in the layout satisfies WCAG 2.1 AA SC 2.4.1 (Bypass Blocks) and dramatically reduces navigation effort for assistive-technology users.

## Acceptance Criteria

- [ ] A "Skip to main content" link is the first focusable element in `web/src/app/layout.tsx`, placed before the Navbar
- [ ] The link is visually hidden by default (using Tailwind `sr-only` or equivalent) but becomes visible and styled when focused (using `focus:not-sr-only focus:absolute focus:top-4 focus:left-4` or equivalent Tailwind utilities)
- [ ] The link's `href` points to `#main-content`
- [ ] The main content area (the `<main>` element wrapping page content in the layout) has `id="main-content"` and `tabIndex={-1}` so it can receive programmatic focus
- [ ] Pressing Tab on any page reveals the skip link before reaching any Navbar element
- [ ] Pressing Enter on the skip link moves keyboard focus directly to the main content area, bypassing all Navbar links
- [ ] Unit test confirms the skip link element is present in the DOM and has the correct `href` and focus behaviour

## Dev Notes

Edit `web/src/app/layout.tsx`. Before the `<Navbar />` render, add: `<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow">Skip to main content</a>`. Then wrap the `{children}` in `<main id="main-content" tabIndex={-1}>`. This is a protected file — only add the skip link and the id/tabIndex to main; do not change CartProvider, font loading, or any other layout logic.

## Implementation Notes

Added skip link before Navbar in layout.tsx and wrapped children in `<main id="main-content" tabIndex={-1}>`. 6 tests all pass. Only layout.tsx changed.

## Files Changed

- `web/src/app/layout.tsx` — skip link before Navbar, main element with id and tabIndex
- `web/src/app/layout.test.tsx` — 6 unit tests (one per AC)
