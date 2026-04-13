# US-011: User profile page

- **Epic:** User Accounts
- **Priority:** 11
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Create /profile page (auth-gated). Show avatar (initial-based), name, email, member since. Edit name inline. Log out button clears localStorage and redirects to /.

## Acceptance Criteria

- [ ] /profile page renders for authenticated users
- [ ] Unauthenticated users are redirected to /login
- [ ] Avatar shows user's initial as a colored circle
- [ ] Name, email, and member since date are displayed
- [ ] Clicking name enables inline editing; saving on blur or Enter key
- [ ] Updated name persists to localStorage
- [ ] Log out button clears the user from localStorage
- [ ] Log out redirects to /

