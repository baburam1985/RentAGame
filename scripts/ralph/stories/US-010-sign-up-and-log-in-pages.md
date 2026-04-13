# US-010: Sign up and log in pages

- **Epic:** User Accounts
- **Priority:** 10
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-010-signup-login-pages
- **PR:** #15
- **QA Attempts:** 2

## Description

Create /signup and /login pages with email+password forms. Store mock user in localStorage. Validate email format and password min 8 chars. Navbar shows user's first name when logged in.

## Acceptance Criteria

- [ ] /signup page renders with name, email, and password fields
- [ ] /login page renders with email and password fields
- [ ] Email field validates correct format; shows inline error if invalid
- [ ] Password field requires minimum 8 characters; shows inline error if too short
- [ ] Successful signup stores user object (name, email, createdAt) in localStorage
- [ ] Successful login reads user from localStorage and authenticates
- [ ] Navbar shows 'Log in / Sign up' link when logged out
- [ ] Navbar shows user's first name when logged in
- [ ] Both forms redirect to / on success

## QA Feedback

env-failure fixed by CI-Fix PR #25 (2026-04-13). Root cause: grep -q "healthy" in CI wait loop matched "(health: starting)" prematurely. Fixed with docker inspect exact status check. Status reset to dev-complete for QA re-pick.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 57 unit tests pass (includes auth page tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/signup/page.tsx
- web/src/app/login/page.tsx
- web/src/components/Navbar.tsx
