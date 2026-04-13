# US-083: Occasion tags on games with occasion filter on catalog

- **Epic:** Discovery
- **Priority:** 83
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Customers searching for "wedding games" or "corporate team building" cannot currently filter by occasion — only by category. Add 2–3 occasion tags per game stored in games.ts (e.g. Cornhole: Wedding, BBQ, Corporate), displayed on game cards and detail pages as small pills. An "Occasion" filter on the catalog page rounds out the discovery experience, mirroring what leading competitors (Triangle Lawn Games, Wonderfly Games) offer as a primary navigation path.

## Acceptance Criteria

- [ ] The `Game` type in `games.ts` gains an optional `occasions: string[]` field (values: "Wedding", "Corporate", "Kids Party", "BBQ", "Birthday")
- [ ] All 12 games have at least one occasion tag populated in `games.ts`
- [ ] Game cards display occasion tags as small pill labels below the game name (max 2 pills shown to avoid card overflow; remaining count shown as "+N more" if applicable)
- [ ] Game detail pages (/games/[id]) display all occasion tags for the game
- [ ] The catalog filter bar includes an "Occasion" filter section with chips for each occasion; selecting one shows only games tagged with that occasion
- [ ] The occasion filter composes correctly with category, player count, and search filters (AND logic)
- [ ] Occasion filter chips follow the existing ARIA radio group keyboard navigation pattern
