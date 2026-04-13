# US-080: Event size filter chip (Small / Medium / Large party)

- **Epic:** Discovery
- **Priority:** 80
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Customers searching for games for a 50-person company picnic currently have to check each game's player count manually. Add event-size filter chips ("Small (under 15)", "Medium (15–40)", "Large (40+)") to the catalog filter bar, mapping to the existing `players` field on each Game. This removes decision paralysis for customers who know their guest count but don't know which games accommodate them.

## Acceptance Criteria

- [ ] Three filter chips — "Small (under 15)", "Medium (15–40)", "Large (40+)" — appear in the catalog filter bar alongside existing category and player-count filters
- [ ] Selecting an event-size chip filters the game grid to show only games whose `players` field is compatible with that size range (parsed from existing player string, e.g. "2–10 players")
- [ ] Only one event-size chip can be active at a time; selecting a second deselects the first
- [ ] Selecting the active chip again clears the filter and shows all games
- [ ] The active filter chip is visually distinguished (filled/highlighted) from inactive chips
- [ ] The event-size filter composes correctly with category, player-count, and search filters (AND logic)
- [ ] The chips are keyboard accessible (Tab to group, arrow keys to change selection, per existing ARIA radio group pattern)
