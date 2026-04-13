# US-010: Sign up and log in pages

- **Epic:** User Accounts
- **Priority:** 10
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-010-signup-login-pages
- **PR:** #15
- **QA Attempts:** 2

## Description

Create a `/signup` page with a form. On submit, store a mock user object in `localStorage` under `rg_user` and redirect to `/`. The page requires only name, email, and password fields.

**Scope is strictly limited to:**
- `web/src/app/signup/page.tsx` (new file)
- `web/src/app/signup/SignupPage.test.tsx` (new test file)

**Do NOT touch any other files.** Do not modify `Navbar.tsx`, `Navbar.test.tsx`, `login/page.tsx`, or any E2E spec file.

## Acceptance Criteria

- [ ] AC-1: A `"use client"` component at `web/src/app/signup/page.tsx` renders a form with a `Name` input, an `Email` input, and a `Password` input
- [ ] AC-2: Submitting the form with valid values stores an object `{ name, email, createdAt }` in `localStorage` under the key `rg_user`
- [ ] AC-3: If the email field value is not a valid email format (does not contain `@`), an inline error message is shown and the form is not submitted
- [ ] AC-4: If the password field value is fewer than 8 characters, an inline error message is shown and the form is not submitted

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `SignupPage.test.tsx` with exactly **4 tests** — one per AC above. All 4 must fail at RED because `page.tsx` does not exist yet.
   - Include `vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }))` at the top.
   - Use `getByPlaceholderText('Name')` or `getByLabelText('Name')` for AC-1 (pick one and keep it); use `localStorage.getItem('rg_user')` in the AC-2 test to verify storage; check for an error message element for AC-3 and AC-4.
   - Lock these selectors in RED — do NOT change them in GREEN.
2. **GREEN commit:** Create `page.tsx` only. The GREEN commit must contain **zero changes to any test file or existing source file** — not `Navbar.tsx`, not `Navbar.test.tsx`, not any `*.spec.ts`.
3. **E2E boundary:** Do NOT touch any existing E2E spec. Do NOT create new E2E specs for this story.

## QA Feedback (Attempt 2)

Classification: env-failure
Job: E2E Tests
Error: E2E Tests fail on ALL open PRs simultaneously while Unit Tests and Docker Build pass — systemic CI environment failure (app container not reachable from e2e-tests container). Unit tests pass. TypeScript clean.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24342720989/job/71075410147

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 57 unit tests pass (includes auth page tests). TypeScript clean. Branch force-pushed.

PM Tier-2 rewrite (run 8): stripped scope to signup page only (removed login page and Navbar auth display); reduced to 4 ACs covering form rendering, localStorage write, and inline validation; explicitly prohibited Navbar.tsx and Navbar.test.tsx modifications; pinned selector strategies; scope reduced to 2 new files only.
