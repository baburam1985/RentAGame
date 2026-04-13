# US-014: Admin layout and auth gate

- **Epic:** Admin Dashboard
- **Priority:** 14
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-014-admin-layout
- **PR:** #19
- **QA Attempts:** 1

## Description

Create /admin route group with sidebar navigation (Overview, Inventory, Orders, Settings). Auth gate: redirect to /login if not admin. admin@rentagame.com gets admin:true on login.

## Acceptance Criteria

- [x] /admin route group renders with a sidebar layout
- [x] Sidebar has navigation links: Overview, Inventory, Orders, Settings
- [x] Non-admin users are redirected to /login when accessing /admin
- [x] Logging in as admin@rentagame.com sets admin:true on the user in localStorage
- [x] Sidebar styling is consistent with the site's color palette
- [x] Active sidebar link is visually highlighted

## QA Feedback (Attempt 1)

**Check 0 — CI FAILED:**
- Classification: env-failure (E2E is systemic issue) + code failures below
- Job: E2E Tests (failed), Unit Tests (in-progress at time of check)
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24333132806/job/71043423185

**Check 5 — TEST COUNT FAILED:**
4 tests found in `AdminLayout.test.tsx` but 6 acceptance criteria defined. Missing tests for:
- AC #4: "Logging in as admin@rentagame.com sets admin:true on the user in localStorage"
- AC #6: "Active sidebar link is visually highlighted"

**Check 9 — SCOPE VIOLATION (PROTECTED FILE):**
`web/src/components/GameCard.tsx` is a **protected file** per PRODUCT.md. It was modified in commit `3a25ea2` to add `onSelect` prop and category badge. Story US-014 ("Admin layout and auth gate") does NOT mention or authorize changes to GameCard.tsx.

Additional out-of-scope changes:
- `web/src/components/GameGrid.tsx` — added `onSelect` prop passthrough (unrelated)
- `web/src/app/page.tsx` — added modal state and GameModal import (unrelated)
- `web/e2e/catalog.spec.ts` — networkidle wait (unrelated)
- `web/e2e/modal.spec.ts` — networkidle wait and selector changes (unrelated)
- `web/e2e/rental-form.spec.ts` — test logic changes (unrelated)

Story scope: `/admin` route group with sidebar, auth gate redirecting to `/login`. No authorization for GameCard/GameGrid/page.tsx or E2E catalog/modal/form specs.

**Required fixes:**
1. Remove all changes to `GameCard.tsx`, `GameGrid.tsx`, `app/page.tsx`, and the three E2E specs from this branch
2. Add test for AC #4: admin login sets `admin:true` in localStorage
3. Add test for AC #6: active sidebar link has visual highlight class

## Dev Notes

Fixed all QA-flagged issues:
1. Reverted `web/src/app/page.tsx` to main (hydration state - out of scope)
2. Reverted `web/e2e/catalog.spec.ts`, `modal.spec.ts`, `rental-form.spec.ts` to main (out of scope)
3. Added test for AC#4: verifies admin:true is set when admin@rentagame.com logs in
4. Added test for AC#6: verifies active sidebar link has `bg-yellow-400` highlight class

## Files Changed

- `web/src/app/admin/layout.tsx` — AdminLayout component with sidebar + auth gate
- `web/src/app/admin/AdminLayout.test.tsx` — 6 unit tests (one per AC)
- `web/src/app/admin/page.tsx` — admin overview placeholder page
- `web/src/app/login/page.tsx` — login page that sets admin:true for admin@rentagame.com

