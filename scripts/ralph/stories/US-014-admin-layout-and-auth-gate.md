# US-014: Admin layout and auth gate

- **Epic:** Admin Dashboard
- **Priority:** 14
- **Status:** in-progress
- **Passes:** false
- **Branch:** feat/US-014-admin-layout
- **PR:** #19
- **QA Attempts:** 1

## Description

Create /admin route group with sidebar navigation (Overview, Inventory, Orders, Settings). Auth gate: redirect to /login if not admin. admin@rentagame.com gets admin:true on login.

## Acceptance Criteria

- [ ] /admin route group renders with a sidebar layout
- [ ] Sidebar has navigation links: Overview, Inventory, Orders, Settings
- [ ] Non-admin users are redirected to /login when accessing /admin
- [ ] Logging in as admin@rentagame.com sets admin:true on the user in localStorage
- [ ] Sidebar styling is consistent with the site's color palette
- [ ] Active sidebar link is visually highlighted

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

