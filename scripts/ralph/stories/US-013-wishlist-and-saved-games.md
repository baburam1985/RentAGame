# US-013: Wishlist and saved games

- **Epic:** User Accounts
- **Priority:** 13
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-013-wishlist-saved-games
- **PR:** #18
- **QA Attempts:** 2

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

## QA Feedback (Attempt 2)

**Check 5 — TEST COUNT FAILED (code-failure):**
5 tests found in `WishlistButton.test.tsx` but story has 8 acceptance criteria. Need at least 8 tests — one per AC. Missing tests for: AC-5 (logged-out user sees 'Log in to save games' prompt), AC-6 (Saved Games tab on /profile), AC-7 (saved games mini grid), AC-8 (remove button removes from wishlist). Add 3 more tests to cover ACs 5-8.

~~**Check 0 — CI env-failure:** FIXED by CI agent: replaced HTTP polling healthcheck with node CMD healthcheck in docker-compose.yml and updated ci.yml to use docker inspect exact-equality health-wait. Reset to dev-complete.~~

