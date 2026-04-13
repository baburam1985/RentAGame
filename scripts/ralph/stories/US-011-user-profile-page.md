# US-011: User profile page

- **Epic:** User Accounts
- **Priority:** 11
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-011-user-profile-page
- **PR:** #16
- **QA Attempts:** 2

## Description

Create a `/profile` page that is auth-gated. Authenticated users see their avatar (initial-based), name, email, and member-since date. They can edit their name inline. A log-out button clears the user from `localStorage` (`rg_user`) and redirects to `/`.

**Scope is strictly limited to:**
- `web/src/app/profile/page.tsx` (new file)
- `web/src/app/profile/ProfilePage.test.tsx` (new test file)

**Do NOT touch any other files.** In particular, `web/e2e/catalog.spec.ts`, `web/e2e/modal.spec.ts`, and `web/e2e/rental-form.spec.ts` must not be modified under any circumstances. Do not modify any file that is not listed above.

## Acceptance Criteria

- [ ] AC-1: A `"use client"` component at `web/src/app/profile/page.tsx` renders the user's name and email when `localStorage.getItem('rg_user')` returns a valid JSON user object `{ name, email, createdAt }`
- [ ] AC-2: When `localStorage.getItem('rg_user')` returns `null`, the component calls `router.push('/login')` — verified by checking the mock router's `push` was called with `'/login'`
- [ ] AC-3: An element displaying the first letter of the user's name as uppercase is visible (the avatar initial)
- [ ] AC-4: The page displays the user's `createdAt` value formatted as `YYYY-MM-DD`
- [ ] AC-5: Clicking the displayed name replaces it with an `<input>` element pre-filled with the current name
- [ ] AC-6: After typing a new name in the input and pressing Enter, `localStorage.getItem('rg_user')` contains the updated name and the input is replaced by the display text showing the new name
- [ ] AC-7: Clicking the 'Log out' button removes `rg_user` from `localStorage` (i.e. `localStorage.getItem('rg_user')` returns `null` after clicking)
- [ ] AC-8: After clicking 'Log out', the component calls `router.push('/')` — verified by checking the mock router's `push` was called with `'/'`

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `ProfilePage.test.tsx` with exactly **8 tests** — one per AC above. AC-7 and AC-8 must be **separate tests**. All 8 tests must fail at RED because `page.tsx` does not exist yet.
   - Include `vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }))` at the top.
   - Import `{ waitFor }` from `"@testing-library/react"` — all tests that check async state changes must be `async` and use `await waitFor(...)`.
   - Populate `localStorage.setItem('rg_user', JSON.stringify({ name: 'Alice', email: 'alice@test.com', createdAt: '2026-01-01' }))` in `beforeEach` for tests that need a logged-in user; clear it for tests that need a logged-out state.
   - Lock all selectors in RED — do NOT change them in GREEN.
2. **GREEN commit:** Create `page.tsx` only. The GREEN commit must contain **zero changes to any test file or existing source file** — not `ProfilePage.test.tsx`, not `catalog.spec.ts`, not `modal.spec.ts`, not `rental-form.spec.ts`, not any other file.
3. **E2E boundary:** You may add a new `web/e2e/profile.spec.ts` if desired. Never modify any existing E2E spec file.

## QA Feedback

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass. TypeScript clean. Branch force-pushed.

**Fix (QA Attempt 2):** Reverted out-of-scope `catalog.spec.ts` modification (trailing newline). RED commit (ff704dc) already had correct 8 tests with `waitFor`, async, and separate AC-7/AC-8. Rebased on main. 54 unit tests pass. Force-pushed.

PM Tier-1 rewrite (run 8): tightened AC wording to be fully explicit about what `localStorage` state to set up and what assertions to make; pinned selector guidance per AC; added explicit `beforeEach` setup guidance; reinforced that E2E spec files must never be touched even for trailing-newline changes.

**Fix (QA Attempt 3 - dev review):** Verified branch state — 8 tests in RED commit covering all ACs (AC-7 and AC-8 separate), no test file changes between RED and GREEN, correct scope (only profile/page.tsx modified), TypeScript clean, 54 unit tests pass. Previous qa-failed was env-failure resolved by CI-Fix. Status reset to dev-complete.

## Files Changed

- `web/src/app/profile/ProfilePage.test.tsx` — 8 unit tests (one per AC)
- `web/src/app/profile/page.tsx` — profile page with auth gate, avatar initial, inline name edit, logout
