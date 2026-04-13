# US-010: Sign up and log in pages

- **Epic:** User Accounts
- **Priority:** 10
- **Status:** in-progress
- **Passes:** false
- **Branch:** feat/US-010-signup-login-pages
- **PR:** (none)
- **QA Attempts:** 0

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

