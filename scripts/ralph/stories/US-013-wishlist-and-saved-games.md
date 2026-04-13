# US-013: Wishlist and saved games

- **Epic:** User Accounts
- **Priority:** 13
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-013-wishlist-saved-games
- **PR:** #18
- **QA Attempts:** 1

## Description

Add a heart toggle on GameCard and GameModal. Logged-in users can wishlist games (localStorage). Logged-out users see a prompt. Saved Games tab on /profile.

## Acceptance Criteria

- [ ] Heart icon renders on GameCard and GameModal
- [ ] Logged-in users can toggle heart to save/unsave a game
- [ ] Wishlist persists in localStorage
- [ ] Heart icon shows filled state for wishlisted games
- [ ] Logged-out users clicking heart see a 'Log in to save games' tooltip or toast
- [ ] 'Saved Games' tab renders on /profile
- [ ] Saved Games tab shows wishlisted games as a mini grid
- [ ] Remove button on each saved game card removes it from the wishlist

## QA Feedback

env-failure fixed by CI-Fix PR #25 (2026-04-13). Root cause: grep -q "healthy" in CI wait loop matched "(health: starting)" prematurely. Fixed with docker inspect exact status check. Status reset to dev-complete for QA re-pick.

