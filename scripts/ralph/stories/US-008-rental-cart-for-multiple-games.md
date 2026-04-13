# US-008: Rental cart for multiple games

- **Epic:** Checkout & Payments
- **Priority:** 8
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-008-rental-cart-drawer
- **PR:** #13
- **QA Attempts:** 2

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

## QA Feedback (Attempt 2)

Classification: env-failure
Job: E2E Tests
Error: E2E tests fail consistently across ALL open PRs (#7–#23). Unit Tests and Docker Build pass on every run. Prior fixes applied (category badge, networkidle wait, modal selector, catalog count). Root issue is systemic — Playwright e2e-tests container cannot reliably connect to app container at http://app:3000, or there is a Docker networking regression in CI environment. Not a per-story code issue.
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332400853/job/71041075370

Routed to CI-Fix agent. PR #13 remains open.

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
