# US-011: User profile page

- **Epic:** User Accounts
- **Priority:** 11
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-011-user-profile-page
- **PR:** #16
- **QA Attempts:** 2

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

## QA Feedback (Attempt 2)

**Check 0 — CI FAILED:**
- Classification: code-failure
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332405953/job/71041092270

**Check 2 — TDD INTEGRITY FAILED:**
`web/src/app/profile/ProfilePage.test.tsx` was modified between the RED commit (`8f5e2cf test: [US-011] RED`) and the GREEN commit (`e26f719 feat: [US-011] GREEN`). Changes: added `waitFor` import, made test functions `async`, wrapped assertions in `waitFor(...)`, added `await waitFor` setup calls before user interactions. These test logic changes must be present in the RED commit, not added during implementation.

**Check 5 — TEST COUNT FAILED:**
7 tests found but 8 acceptance criteria defined. Missing standalone test for AC #1: "/profile page renders for authenticated users". AC #7 and #8 (logout) are tested together in one test.

**Check 9 — SCOPE VIOLATION:**
Out-of-scope E2E files modified:
- `web/e2e/catalog.spec.ts` — networkidle wait added (unrelated)
- `web/e2e/modal.spec.ts` — networkidle wait and selector change (unrelated)
- `web/e2e/rental-form.spec.ts` — networkidle wait and test logic changes (unrelated)

Story scope: `/profile` page, auth gate, avatar, inline name edit, logout only.

**Required fixes:**
1. Rewrite RED commit to include `waitFor`/async structure so tests fail at RED without the component
2. Add standalone test for AC #1: authenticated user sees the profile page render
3. Remove catalog/modal/rental-form E2E spec changes from this branch

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass. TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/profile/page.tsx
