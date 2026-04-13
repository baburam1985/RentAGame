# US-011: User profile page

- **Epic:** User Accounts
- **Priority:** 11
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-011-user-profile-page
- **PR:** #16
- **QA Attempts:** 0

## Description

Create a `/profile` page that is auth-gated. Authenticated users see their avatar (initial-based), name, email, and member-since date. They can edit their name inline. A log-out button clears the user from `localStorage` (`rg_user`) and redirects to `/`. Only `web/src/app/profile/` files are in scope — do not modify catalog, modal, or rental-form E2E specs.

## Acceptance Criteria

- [ ] A `"use client"` component at `web/src/app/profile/page.tsx` renders the profile UI when `rg_user` in `localStorage` contains a valid user object (standalone test required for this criterion alone)
- [ ] When no user is found in `rg_user`, the component redirects to `/login` using `router.push('/login')` before rendering any profile content
- [ ] An avatar element displays the first letter of the user's name as uppercase text inside a solid-colored circle (color may be hardcoded or derived from the name)
- [ ] The page displays the user's full name, email address, and member-since date (formatted `YYYY-MM-DD`) read from `rg_user`
- [ ] Clicking the displayed name replaces it with a text input pre-filled with the current name; the input is focused automatically
- [ ] Pressing Enter or blurring the input saves the new name to `rg_user` in `localStorage` and switches back to display mode
- [ ] Clicking the 'Log out' button removes `rg_user` from `localStorage`
- [ ] After logout, the user is redirected to `/` via `router.push('/')`

## TDD Notes

Write 8 tests in `web/src/app/profile/ProfilePage.test.tsx` — one test per acceptance criterion. The RED commit must include `async`/`waitFor` patterns in the test file so all 8 tests fail at RED due to missing implementation only. The GREEN commit must not modify test files. Do not modify `web/e2e/catalog.spec.ts`, `web/e2e/modal.spec.ts`, `web/e2e/rental-form.spec.ts`, or any E2E file outside the profile flow.

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
