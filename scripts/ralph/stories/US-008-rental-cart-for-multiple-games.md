# US-008: Rental cart for multiple games

- **Epic:** Checkout & Payments
- **Priority:** 8
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-008-rental-cart-drawer
- **PR:** #13
- **QA Attempts:** 4

## Description

Add a cart system. 'Add to Cart' button on each GameCard and GameModal. Cart icon in Navbar shows item count badge. Cart drawer slides in from right with date pickers per item and a running total.

## Acceptance Criteria

- [ ] 'Add to Cart' button renders on GameCard and GameModal
- [ ] Cart icon in Navbar shows a badge with the current item count
- [ ] Cart drawer slides in from the right when cart icon is clicked
- [ ] Each cart item shows game name, individual date picker, and subtotal
- [ ] Running total shown at the bottom of the drawer
- [ ] Checkout CTA in drawer opens the multi-step wizard pre-populated with cart items
- [ ] Items can be removed from the cart

## QA Feedback (Attempt 4)

**Check 0 — CI E2E FAILED:**
- Classification: env-failure (systemic — ALL open PRs fail E2E simultaneously, unit tests pass on all)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24339138264/job/71063424718

**Check 2 — TDD INTEGRITY FAILED:**
Both `CartDrawer.test.tsx` and `GameModal.test.tsx` were modified between RED commit (`fc82bdd test: [US-008] RED`) and GREEN commit (`c6c37af feat: [US-008] GREEN`):
- `CartDrawer.test.tsx`: assertion changed from `expect(screen.getByText(/\$70/)).toBeInTheDocument()` to `expect(screen.getAllByText(/\$70/).length).toBeGreaterThanOrEqual(1)`
- `GameModal.test.tsx`: `CartProvider` wrapper added, `useRouter` mock added, new `renderModal()` helper function added, new "renders an Add to Cart button" test added

**Required fix:**
1. All test changes (CartProvider wrapper, useRouter mock, renderModal helper, new test) must be in the RED commit.
2. The GREEN commit must contain ONLY production code changes — zero test file modifications.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes CartDrawer tests). TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/components/CartDrawer.tsx
- web/src/components/CartDrawer.test.tsx
- web/src/components/GameModal.tsx
- web/src/components/GameModal.test.tsx
- web/src/components/Navbar.tsx
- web/src/context/CartContext.tsx
- web/src/app/layout.tsx
