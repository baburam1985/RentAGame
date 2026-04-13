# US-022: Descriptive alt text for all game images

- **Epic:** Discovery
- **Priority:** 22
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Game images in GameCard and GameModal use only the game name as alt text. Replace with descriptive alt text that conveys scene content for screen reader users. Alt text stored in games.ts as a required imageAlt field. Required for WCAG 2.1 AA compliance.

## Acceptance Criteria

- [ ] Game type in games.ts gains a required imageAlt string field
- [ ] All 8 games have descriptive imageAlt values describing the visual scene (20–80 chars)
- [ ] GameCard passes game.imageAlt to the Image alt attribute
- [ ] GameModal passes game.imageAlt to any game images displayed
- [ ] Alt text describes the scene, not just the product name
- [ ] TypeScript compiles cleanly with imageAlt as a required non-optional field

