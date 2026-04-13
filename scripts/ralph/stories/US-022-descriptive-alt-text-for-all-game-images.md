# US-022: Descriptive alt text for all game images

- **Epic:** Discovery
- **Priority:** 22
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-022-descriptive-alt-text
- **PR:** (none)
- **QA Attempts:** 0

## Description

Game images in GameCard and GameModal use only the game name as alt text. Replace with descriptive alt text that conveys scene content for screen reader users. Alt text stored in games.ts as a required imageAlt field. Required for WCAG 2.1 AA compliance.

## Acceptance Criteria

- [x] Game type in games.ts gains a required imageAlt string field
- [x] All 8 games have descriptive imageAlt values describing the visual scene (20–80 chars)
- [x] GameCard passes game.imageAlt to the Image alt attribute
- [x] GameModal passes game.imageAlt to any game images displayed
- [x] Alt text describes the scene, not just the product name
- [x] TypeScript compiles cleanly with imageAlt as a required non-optional field

## Dev Notes

Added `imageAlt: string` as a required field to the `Game` type in `games.ts`. Added descriptive scene-based alt text (20–80 chars each) to all 12 games in the catalog. Updated `GameCard.tsx` and `GameModal.tsx` to use `game.imageAlt` instead of `game.name` for image alt attributes. Updated existing test mocks in `GameCard.test.tsx` and `GameModal.test.tsx` to include `imageAlt` (required by TypeScript strict mode). All 54 unit tests pass, TypeScript compiles cleanly.

## Files Changed

- `web/src/data/games.ts` — added `imageAlt` to Game type; added imageAlt values for all 12 games
- `web/src/components/GameCard.tsx` — img alt changed from `game.name` to `game.imageAlt`
- `web/src/components/GameModal.tsx` — Image alt changed from `game.name` to `game.imageAlt`
- `web/src/components/GameCard.test.tsx` — added imageAlt to mock; updated alt assertion
- `web/src/components/GameModal.test.tsx` — added imageAlt to mock
- `web/src/components/GameAltText.test.tsx` — new test file (RED commit)

