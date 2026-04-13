# US-013: Wishlist and saved games

- **Epic:** User Accounts
- **Priority:** 13
- **Status:** qa-failed
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

## QA Feedback (Attempt 1)

Classification: env-failure
Job: E2E Tests
Error: E2E tests fail consistently across ALL open PRs (#7–#23). Unit Tests and Docker Build pass on every run. Prior fixes applied (category badge, networkidle wait, modal selector). Root issue is systemic — Playwright e2e-tests container cannot reliably connect to app container at http://app:3000, or there is a Docker networking regression in CI environment. Not a per-story code issue.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332405648/job/71041091216

Routed to CI-Fix agent. PR #18 remains open.

