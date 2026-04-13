# US-010: Sign up and log in pages

- **Epic:** User Accounts
- **Priority:** 10
- **Status:** ci-pending
- **Passes:** false
- **Branch:** feat/US-010-signup-login-pages
- **PR:** #15
- **QA Attempts:** 1

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

## QA Feedback (Attempt 1)

- **Classification:** env-failure
- **Job:** E2E Tests
- **Error:** `catalog.spec.ts` — "clicking Lawn Games filter shows only lawn games" fails: `cards.locator("text=Lawn Games")` finds 0 elements inside `.group` cards because `GameCard.tsx` does not render a category badge after commit `88e076e` ("fix: restore Kinetic Games UI") removed it. Systemic failure affecting all open PRs.
- **Fix needed:** CI-Fix agent must add `<span>{game.category}</span>` back to `GameCard.tsx` so the E2E assertion passes.
- **Next step:** After CI-Fix restores green E2E, rebase branch on main and re-queue for QA.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 57 unit tests pass (includes auth page tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/signup/page.tsx
- web/src/app/login/page.tsx
- web/src/components/Navbar.tsx
