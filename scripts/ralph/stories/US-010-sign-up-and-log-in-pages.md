# US-010: Sign up and log in pages

- **Epic:** User Accounts
- **Priority:** 10
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-010-signup-login-pages
- **PR:** (none)
- **QA Attempts:** 0

## Description

Create /signup and /login pages with email+password forms. Store mock user in localStorage. Validate email format and password min 8 chars. Navbar shows user's first name when logged in.

## Acceptance Criteria

- [x] /signup page renders with name, email, and password fields
- [x] /login page renders with email and password fields
- [x] Email field validates correct format; shows inline error if invalid
- [x] Password field requires minimum 8 characters; shows inline error if too short
- [x] Successful signup stores user object (name, email, createdAt) in localStorage
- [x] Successful login reads user from localStorage and authenticates
- [x] Navbar shows 'Log in / Sign up' link when logged out
- [x] Navbar shows user's first name when logged in
- [x] Both forms redirect to / on success

## Dev Notes

- `web/src/app/signup/page.tsx`: SignupPage with name/email/password fields, email regex validation, password min 8 check, stores `{name, email, createdAt}` in `rg_user`, redirects to /
- `web/src/app/login/page.tsx`: LoginPage with email/password fields, validates email format and password length, reads `rg_user` from localStorage and checks email match, redirects to /
- `web/src/components/Navbar.tsx`: Added `useEffect` reading `rg_user` on mount; shows "Hi, {firstName}" span when logged in, or "Log in / Sign up" Link to /login when logged out
- Both pages mock `next/navigation` in tests; tests use `userEvent.setup()` pattern
- 16 unit tests added (4 SignupPage + 5 LoginPage + 7 Navbar including 2 new auth tests)
