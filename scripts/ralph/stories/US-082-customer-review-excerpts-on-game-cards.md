# US-082: Customer review excerpts on game cards and detail pages

- **Epic:** Discovery
- **Priority:** 82
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Game cards and detail pages currently show no customer reviews or ratings. Adding a star rating and a short review excerpt per game — stored as static data in games.ts — provides the strongest trust signal for party rental decisions at the point where customers are evaluating individual games.

## Acceptance Criteria

- [ ] Each game in `games.ts` gains two optional fields: `rating: number` (1–5, one decimal place) and `reviewExcerpt: string` (a short realistic customer quote, max 120 chars)
- [ ] When `rating` is present, the game card displays a star rating row (filled/half/empty stars rendered with CSS or SVG — no external library) and the numeric rating (e.g. "4.8")
- [ ] When `reviewExcerpt` is present, the game detail page (/games/[id]) shows the excerpt with the star rating in a "What customers say" section above the rental form
- [ ] At least 8 of the 12 games have rating and reviewExcerpt populated in games.ts with realistic, friendly copy
- [ ] The star rating is accessible: the rating value is conveyed via an aria-label (e.g. "Rated 4.8 out of 5 stars") — not just visual stars
- [ ] The review section does not appear on cards or detail pages for games with no review data
