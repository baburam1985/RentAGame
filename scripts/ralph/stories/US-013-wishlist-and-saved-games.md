# US-013: Wishlist and saved games

- **Epic:** User Accounts
- **Priority:** 13
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-013-wishlist-saved-games
- **PR:** (none)
- **QA Attempts:** 0

## Description

Add a heart toggle on GameCard and GameModal. Logged-in users can wishlist games (localStorage). Logged-out users see a prompt. Saved Games tab on /profile.

## Acceptance Criteria

- [x] Heart icon renders on GameCard and GameModal
- [x] Logged-in users can toggle heart to save/unsave a game
- [x] Wishlist persists in localStorage
- [x] Heart icon shows filled state for wishlisted games
- [x] Logged-out users clicking heart see a 'Log in to save games' tooltip or toast
- [ ] 'Saved Games' tab renders on /profile (deferred — profile page not in main)
- [ ] Saved Games tab shows wishlisted games as a mini grid (deferred)
- [ ] Remove button on each saved game card removes it from the wishlist (deferred)

## Dev Notes

- `web/src/components/WishlistButton.tsx`: Standalone heart toggle button; reads/writes `rg_wishlist` (string[] of game IDs) in localStorage; checks `rg_user` for logged-in state; shows tooltip "Log in to save games" for 2.5s if logged-out; uses Material Symbols Outlined `favorite` icon with FILL variation
- `web/src/components/GameCard.tsx`: Added WishlistButton import and rendered next to Add to Cart button
- `web/src/components/GameModal.tsx`: Added WishlistButton import and rendered next to game name/category header
- Note: Saved Games profile tab ACs deferred — /profile is implemented in US-011 (separate feature branch, not yet merged to main)
- 5 unit tests in WishlistButton.test.tsx
