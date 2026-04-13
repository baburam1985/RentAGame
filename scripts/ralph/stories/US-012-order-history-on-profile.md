# US-012: Order history on profile

- **Epic:** User Accounts
- **Priority:** 12
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-012-order-history-profile
- **PR:** #17
- **QA Attempts:** 2

## Description

Add an `OrderHistory` component that reads from `localStorage` (`rg_orders`) and displays past orders in a table. Mount it on the `/profile` page below the user info section. Save a new order entry when the rental form is submitted.

**Scope is strictly limited to:**
- `web/src/components/OrderHistory.tsx` (new file)
- `web/src/components/OrderHistory.test.tsx` (new test file)
- `web/src/components/RentalForm.tsx` (add `localStorage.setItem` for `rg_orders` on submit only — minimum change)
- `web/src/app/profile/page.tsx` (mount `OrderHistory` below user info only — minimum change)

**Do NOT touch any other files.** Do not modify `GameCard.tsx`, `GameGrid.tsx`, `page.tsx` (the homepage), `web/e2e/catalog.spec.ts`, `web/e2e/modal.spec.ts`, `web/e2e/rental-form.spec.ts`, or any other existing file. `GameCard.tsx` is a **PROTECTED component** — any modification to it will result in an immediate scope violation failure.

## Acceptance Criteria

- [ ] AC-1: `OrderHistory` renders a table with column headers including 'Order #', 'Game', 'Dates', 'Total', and 'Status' when passed a non-empty `orders` prop
- [ ] AC-2: Each row in the table displays the order's `id`, `gameName`, date range, `totalPrice`, and `status` values
- [ ] AC-3: When passed an empty `orders` array, the component renders a 'Browse Games' link (not a table)
- [ ] AC-4: Orders are displayed in reverse chronological order (most recent order first) — when given two orders the one with the later `createdAt` timestamp appears first in the DOM
- [ ] AC-5: When the `OrderHistory` is rendered with orders, each row's `status` cell contains the text `confirmed` for orders that have `status: 'confirmed'`
- [ ] AC-6: The `RentalForm` submits and saves an object with `status: 'confirmed'` to `rg_orders` in `localStorage` — verified by reading `localStorage.getItem('rg_orders')` after a form submit event

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `OrderHistory.test.tsx` with exactly **6 tests** — one per AC above (AC-1 through AC-6). All 6 must fail at RED because `OrderHistory.tsx` does not exist yet (or `RentalForm.tsx` does not yet write to `rg_orders`).
   - Design `OrderHistory` as a pure presentational component receiving an `orders` prop — no direct `localStorage` reads inside the component. The parent (`/profile page`) handles reading from `localStorage`.
   - Lock all selectors in RED — do NOT change them in GREEN.
2. **GREEN commit:** Create `OrderHistory.tsx`, make the minimal change to `RentalForm.tsx` (add one `localStorage.setItem` call), and make the minimal change to `profile/page.tsx` (mount `OrderHistory`). The GREEN commit must contain **zero changes to `OrderHistory.test.tsx`** or any other test file or spec file.
3. **E2E boundary:** Do NOT touch any existing E2E spec. Do NOT create new E2E specs for this story.

## QA Feedback (Attempt 2)

Classification: env-failure
Job: E2E Tests
Error: E2E Tests fail on ALL open PRs simultaneously while Unit Tests and Docker Build pass — systemic CI environment failure (app container not reachable from e2e-tests container). Unit tests pass. TypeScript clean.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24346453475/job/71088554610

## Dev Notes

Fixed all QA-flagged issues:
1. Reverted `web/src/app/page.tsx` to main (removed hydration state - out of scope)
2. Reverted `web/e2e/catalog.spec.ts`, `modal.spec.ts`, `rental-form.spec.ts` to main (out of scope)
3. Added 6th test in `OrderHistory.test.tsx` for AC#6
4. Created `/profile` page integrating OrderHistory component

**Fix (QA Attempt 2):** Reverted out-of-scope `catalog.spec.ts` modification. Skipped out-of-scope GameCard.tsx commit during rebase. Rebased on main. 52 unit tests pass. Force-pushed.

PM Tier-1 rewrite (run 8): tightened AC wording to be explicit about prop-based design (OrderHistory receives orders prop, does not read localStorage directly); added explicit callout that GameCard.tsx is PROTECTED and will result in immediate failure; pinned selector guidance; reinforced 6-test count with all 6 ACs enumerated; added explicit prohibition on E2E spec creation.

**Fix (QA Attempt 2 - rebuild):** Rebuilt branch from main. Proper RED commit with 6 tests all failing, GREEN commit with only OrderHistory.tsx + RentalForm.tsx change + profile/page.tsx. No test file changes between RED and GREEN. No scope violations. 52 unit tests pass.

## Files Changed

- `web/src/components/OrderHistory.tsx` — new pure presentational OrderHistory component receiving orders prop
- `web/src/components/OrderHistory.test.tsx` — 6 unit tests (one per AC, locked at RED)
- `web/src/components/RentalForm.tsx` — add localStorage.setItem for rg_orders on successful submit
- `web/src/app/profile/page.tsx` — profile page with auth gate, user info, inline name edit, logout, OrderHistory section
