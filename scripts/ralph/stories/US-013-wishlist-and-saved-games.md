# US-013: Wishlist and saved games

- **Epic:** User Accounts
- **Priority:** 13
- **Status:** qa-failed
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

**Check 0 — CI env-failure:**
Branch has old docker-compose.yml with HTTP polling healthcheck instead of `node` CMD healthcheck. Fix: update docker-compose.yml to use `node -e "require('http').get('http://127.0.0.1:3000', r => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"` and add `depends_on: app: condition: service_healthy` for e2e-tests service.

