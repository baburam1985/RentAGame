# US-027: Game modal 'What's included' section

- **Epic:** Discovery
- **Priority:** 27
- **Status:** tests-written
- **Passes:** false
- **Branch:** feat/US-027-whats-included-section
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a 'What's included' bullet list inside GameModal listing setup, accessories, and delivery information for each game. Addresses the key customer barrier of uncertainty about what they're getting. Data stored as an included string array on the Game type in games.ts.

## Acceptance Criteria

- [ ] Game type in games.ts gains a required 'included' string[] field
- [ ] All 8 games have between 2 and 5 included items describing accessories, setup, and delivery
- [ ] GameModal renders a 'What's included' section with the included items as a bullet list
- [ ] Section is visible without scrolling or positioned clearly before the rental form
- [ ] TypeScript compiles cleanly with 'included' as a required non-optional field
- [ ] Section heading and list items meet WCAG AA colour contrast requirements

