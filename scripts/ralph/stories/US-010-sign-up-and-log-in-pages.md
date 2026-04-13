# US-010: Sign up and log in pages

- **Epic:** User Accounts
- **Priority:** 10
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-010-signup-login-pages
- **PR:** #15
- **QA Attempts:** 4

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

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339174263/job/71063543849

**Check 2 — TDD INTEGRITY FAILED:**
`web/src/components/Navbar.test.tsx` was modified between RED commit (`f09f20b test: [US-010] RED`) and GREEN commit (`3d8fa3a feat: [US-010] GREEN`). Zero changes to test files are permitted between RED and GREEN.

**Required fix:**
1. Include the Navbar.test.tsx changes in the RED commit (the tests for the auth state display must be failing in RED).
2. The GREEN commit must contain ONLY production code changes — no test file modifications.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 57 unit tests pass (includes auth page tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/signup/page.tsx
- web/src/app/login/page.tsx
- web/src/components/Navbar.tsx
