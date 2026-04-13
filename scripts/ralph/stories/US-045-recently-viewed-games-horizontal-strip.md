# US-045: Recently viewed games horizontal strip

- **Epic:** Discovery
- **Priority:** 45
- **Status:** tests-written
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

A 'Recently Viewed' horizontal scrollable strip of game cards (max 4) renders below the main game grid when the customer has viewed at least one game. Viewing a game detail page (or opening its modal) records the game ID in the `rg_recent_views` localStorage key. Games appear in most-recently-viewed order.

## Acceptance Criteria

- [ ] A 'Recently Viewed' section with a heading is visible below the game grid when `rg_recent_views` has at least one game ID
- [ ] The section is hidden when `rg_recent_views` is empty or absent
- [ ] Viewing a game (opening modal or navigating to detail page) adds its ID to `rg_recent_views`, keeping only the last 4 unique game IDs
- [ ] The strip shows GameCard components in most-recently-viewed order (newest first)
- [ ] The strip is horizontally scrollable on mobile (single row, no wrap)
- [ ] Duplicate views do not create duplicate entries — re-viewing a game moves it to front of list

## Dev Notes

