# US-042: Navbar active page indicator

- **Epic:** User Accounts
- **Priority:** 42
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

With routes like /profile, /admin, and /order-confirmation being added to the app, the Navbar currently applies no visual treatment to distinguish the active page. Users lose orientation context, especially on mobile. Active nav links should receive a distinct underline or colour treatment using Next.js `usePathname`. This is a small, high-value navigation improvement that keeps users oriented as the route set grows.

## Acceptance Criteria

- [ ] The Navbar uses Next.js `usePathname()` from `next/navigation` to detect the current route
- [ ] The nav link matching the current pathname receives a distinct visual active indicator (e.g. an underline, bold weight, or contrasting text colour) using Tailwind utility classes — no custom CSS or inline styles
- [ ] The active indicator does not apply to links whose `href` is `/` when the user is on a sub-route (e.g. `/profile`) — only exact or prefix-matched links are highlighted
- [ ] All non-active nav links retain their existing appearance (no unintended style changes to the yellow background, brand name, or cart icon)
- [ ] The active indicator is keyboard-accessible and does not affect the existing focus ring on nav links
- [ ] A unit test verifies that the correct nav link receives the active class when `usePathname` returns a matching route (mock `usePathname` in the test)

## Dev Notes

`Navbar.tsx` is a protected component — make the minimum change required. Add `"use client"` to `Navbar.tsx` (if not already present) to use `usePathname`. Map over nav link definitions and conditionally add an active Tailwind class (e.g. `underline font-semibold`) when `pathname === href`. Keep all existing styles, brand, and cart icon logic untouched. The story explicitly authorises touching `Navbar.tsx` for this single addition.
