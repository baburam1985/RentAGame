# US-011: User profile page

- **Epic:** User Accounts
- **Priority:** 11
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-011-user-profile-page
- **PR:** (none)
- **QA Attempts:** 0

## Description

Create /profile page (auth-gated). Show avatar (initial-based), name, email, member since. Edit name inline. Log out button clears localStorage and redirects to /.

## Acceptance Criteria

- [x] /profile page renders for authenticated users
- [x] Unauthenticated users are redirected to /login
- [x] Avatar shows user's initial as a colored circle
- [x] Name, email, and member since date are displayed
- [x] Clicking name enables inline editing; saving on blur or Enter key
- [x] Updated name persists to localStorage
- [x] Log out button clears the user from localStorage
- [x] Log out redirects to /

## Dev Notes

- `web/src/app/profile/page.tsx`: ProfilePage reads `rg_user` from localStorage on mount; redirects to /login if missing; shows avatar (colored circle with first initial), name (clickable for inline edit), email, member since date, and Log Out button
- Inline editing: clicking name shows a textbox (`aria-label="Edit name"`); saves on blur or Enter key, cancels on Escape
- Log out: removes `rg_user` from localStorage and calls `router.push("/")`
- `useEffect` uses `[]` dependency (not `[router]`) to prevent infinite re-render in tests when mock router returns new object each call
- Tests use `waitFor` for all assertions dependent on useEffect completing
- 7 unit tests covering all 8 ACs
