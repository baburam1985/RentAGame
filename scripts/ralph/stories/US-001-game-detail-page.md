# US-001 — Game Detail Page

**Epic:** Discovery
**Priority:** 100
**Status:** pending

## Description

When a customer clicks a game card from the catalog, they should be taken to a dedicated
game detail page at `/games/[id]`. The page shows full game info: a photo gallery,
description, players, dimensions, price per day, how-to-play steps, and a sticky
"Add to Cart" CTA with a day-count selector.

## Acceptance Criteria

1. Route `/games/[id]` exists and renders a page for each game ID from `games.ts`.
2. The page displays the game name, category badge, price per day, player count, and dimensions.
3. A photo gallery shows the game's `images` array; clicking a thumbnail swaps the main image.
4. A "How to Play" section lists all steps from `howToPlay[]`.
5. A sticky bottom bar (mobile) or sidebar (desktop) shows a number-of-days selector (min 1, max 14) and an "Add to Cart" button that calls `addItem` from `CartContext`.
6. Navigating to a non-existent game ID shows a friendly 404 message with a "Browse Games" link back to the homepage.
7. The page is fully responsive (375 px mobile through 1280 px desktop).
8. All interactive elements have ARIA labels and are keyboard accessible.
9. Unit tests cover: gallery thumbnail swap, day selector range, Add to Cart button invocation.

## Notes

- Game data comes from `web/src/data/games.ts` — no API call.
- `CartContext` must be set up before this story is complete (US-002 may need to come first or be done simultaneously).
- Use `"use client"` for the interactive gallery and cart CTA.
- Static metadata (`generateMetadata`) should include the game name in the page title.
