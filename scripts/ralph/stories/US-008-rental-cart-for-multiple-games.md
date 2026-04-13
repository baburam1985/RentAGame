# US-008: Rental cart for multiple games

- **Epic:** Checkout & Payments
- **Priority:** 8
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-008-rental-cart-drawer
- **PR:** #13
- **QA Attempts:** 0

## Description

A `CartDrawer` component that slides in from the right showing items added to the cart with a running total. Uses the existing `CartContext` (`rg_cart` in `localStorage`).

**Scope is strictly limited to:**
- `web/src/components/CartDrawer.tsx` (new file)
- `web/src/components/CartDrawer.test.tsx` (new test file)

**Do NOT touch any other files.** Do not modify `GameModal.tsx`, `GameModal.test.tsx`, `Navbar.tsx`, `CartContext.tsx`, `layout.tsx`, or any E2E spec file.

## Acceptance Criteria

- [ ] AC-1: `CartDrawer` renders a list of items when passed a non-empty `items` prop (array of `{ gameName: string, pricePerDay: number, days: number }`)
- [ ] AC-2: Each item in the list displays the `gameName`
- [ ] AC-3: `CartDrawer` displays a total that equals the sum of `pricePerDay × days` across all items
- [ ] AC-4: Clicking the 'Remove' button on an item calls the `onRemove` callback prop with that item's index

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `CartDrawer.test.tsx` with exactly **4 tests** — one per AC above. All 4 must fail at RED because `CartDrawer.tsx` does not exist yet.
   - Design `CartDrawer` as a pure presentational component receiving `items`, `onRemove`, and `isOpen` props — no `CartContext` dependency in the component itself. This makes it trivially testable.
   - Use `getByText('Giant Jenga')` for AC-2, `getByText(/\$70/)` for AC-3 (total = 2 items × $35/day × 1 day), `getAllByRole('button', { name: /remove/i })[0]` for AC-4.
   - Lock these selectors in RED — do NOT change them in GREEN.
2. **GREEN commit:** Create `CartDrawer.tsx` only. The GREEN commit must contain **zero changes to any test file or existing source file**.
3. **E2E boundary:** Do NOT touch any existing E2E spec. Do NOT create new E2E specs for this story.

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339138264/job/71063424718

**Check 2 — TDD INTEGRITY FAILED:**
Both `CartDrawer.test.tsx` and `GameModal.test.tsx` were modified between RED and GREEN commits. Zero test file changes are permitted between RED and GREEN.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass. TypeScript clean. Branch force-pushed.

PM Tier-2 rewrite (run 8): stripped to a pure presentational CartDrawer component receiving props (not reading CartContext directly); removed all Navbar badge, GameCard button, and multi-step wizard integration from scope; reduced to 4 simple ACs; pinned exact selector strings; scope reduced to 2 new files only.
