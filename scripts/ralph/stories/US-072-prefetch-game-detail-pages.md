# US-072: Prefetch game detail pages on hover/focus for instant navigation

- **Epic:** Discovery
- **Priority:** 72
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Game card navigation to detail pages has a noticeable delay on slower connections. Use Next.js Link prefetch behavior to pre-fetch detail pages when a user hovers or focuses a game card link, making navigation feel instant.

## Acceptance Criteria

- [ ] GameCard component uses Next.js Link with prefetch enabled (default behavior or explicit prefetch={true})
- [ ] The prefetch only triggers on hover/focus, not on page load (lazy prefetch)
- [ ] No visible UI change — prefetching is a background-only behavior
- [ ] TypeScript compiles clean with no errors in the modified component(s)
- [ ] Existing GameCard tests still pass
