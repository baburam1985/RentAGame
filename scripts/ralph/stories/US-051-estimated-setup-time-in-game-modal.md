# US-051: Estimated setup time in game modal

- **Epic:** Discovery
- **Priority:** 51
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

Event planners managing minute-by-minute timelines for parties and weddings need to know how long game setup takes. Adding a setup time estimate as a prominent badge or callout in the GameModal directly answers a top pre-booking question and helps planners coordinate their event schedule. Source research item: R-059.

## Acceptance Criteria

- [ ] Each game in games.ts has a new setupTime: string field (e.g. '~5 min', '~15 min', '~10 min')
- [ ] The GameModal displays a 'Setup time: ~5 min' callout alongside the existing dimensions/players info
- [ ] The callout uses a clock or setup icon (from Material Symbols already loaded in the app) for visual clarity
- [ ] All 12 existing games have appropriate setupTime values populated in games.ts
- [ ] The setupTime field is optional (to maintain backward compatibility) and the callout is not rendered if the value is absent

## Dev Notes

## QA Feedback
