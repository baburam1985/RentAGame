# US-041: FAQ accordion section on the homepage

- **Epic:** Discovery
- **Priority:** 41
- **Status:** in-progress
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

Rental service customers consistently ask the same questions before booking: what is included, how delivery works, what happens if it rains, and what the cancellation policy is. A collapsible FAQ accordion section (5–7 questions) near the bottom of the homepage reduces support contact, addresses booking objections at the browsing stage, and increases overall conversion. Competitor sites including bookextraordinary.com and goodshuffle.com use this pattern prominently.

## Acceptance Criteria

- [ ] A new `FAQ` section renders on the homepage (`web/src/app/page.tsx`) below the Testimonials section and above the Footer, containing at least 5 questions and answers relevant to the rental service (e.g. what's included, delivery process, cancellation, rain contingency, damage policy)
- [ ] Each FAQ item is a collapsible accordion: clicking the question toggles the answer open/closed; only one item can be open at a time
- [ ] The accordion is implemented as a new `web/src/components/FAQ.tsx` client component using the `"use client"` directive and React state — no external accordion libraries
- [ ] All interactive accordion toggle buttons have a descriptive `aria-expanded` attribute (true/false) and `aria-controls` pointing to the answer panel id, meeting WCAG 2.1 AA for keyboard users
- [ ] At 375px viewport width the FAQ section is fully readable with no horizontal overflow and each answer wraps correctly
- [ ] A unit test for `FAQ.tsx` verifies that clicking a question toggles its answer from hidden to visible and that clicking a second question closes the first

## Dev Notes

Create `web/src/components/FAQ.tsx` as a `"use client"` component. Use `useState<number | null>` to track the open item index. Render a `<section>` with a heading and a list of `<div>` accordion items. Each item uses a `<button>` with `aria-expanded` and `aria-controls`, and a conditionally rendered `<div id={...}>` for the answer panel. FAQ content (questions and answers) can be a hardcoded array of `{ question: string; answer: string }` objects inside the component. Import and render `<FAQ />` in `web/src/app/page.tsx` after `<Testimonials />` — no other components should be modified.
