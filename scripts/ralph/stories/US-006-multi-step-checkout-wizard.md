# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-006-multi-step-checkout-wizard
- **PR:** #11
- **QA Attempts:** 1

## Description

A standalone `CheckoutWizard` component with 2 steps: Step 1 — contact form (name, email, phone). Step 2 — review summary and place order. A step label at the top shows the active step. Back/Next navigate between steps.

**Scope is strictly limited to:**
- `web/src/components/CheckoutWizard.tsx` (new component)
- `web/src/components/CheckoutWizard.test.tsx` (new test file)
- `web/src/app/page.tsx` (replace RentalForm with CheckoutWizard)

**Do NOT touch any other files.** Do not modify `web/e2e/modal.spec.ts`, `web/e2e/catalog.spec.ts`, `web/e2e/rental-form.spec.ts`, or any other existing file.

## Acceptance Criteria

- [ ] AC-1: On initial render the wizard displays the text 'Step 1 of 2'
- [ ] AC-2: Step 1 renders three inputs: one with placeholder 'Name', one with placeholder 'Email', one with placeholder 'Phone'
- [ ] AC-3: Clicking the 'Next' button on Step 1 renders the text 'Step 2 of 2'
- [ ] AC-4: On Step 2, clicking the 'Back' button renders the text 'Step 1 of 2' again

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `CheckoutWizard.test.tsx` with exactly **4 tests** — one per AC above. All 4 tests must fail at RED because `CheckoutWizard.tsx` does not exist yet.
   - Choose your selectors once and lock them in: use `getByText('Step 1 of 2')` for AC-1 and AC-4; use `getByPlaceholderText('Name')` for AC-2; use `getByText('Step 2 of 2')` for AC-3. These exact selectors must be in both RED and GREEN unchanged.
   - Do NOT import from files that do not yet exist — the RED commit must compile (tests fail at runtime, not at import).
2. **GREEN commit:** Create `CheckoutWizard.tsx` and update `page.tsx`. The GREEN commit must contain **zero changes to any test file** — not `CheckoutWizard.test.tsx`, not `Navbar.test.tsx`, not any `*.spec.ts`. If you need to change a test to make it pass, that is a RED commit fix, not a GREEN fix — stop and restart.
3. **E2E boundary:** Do NOT touch any existing E2E spec file. Do NOT create new E2E spec files for this story.

## QA Feedback

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 54 unit tests pass (includes 7 CheckoutWizard tests). TypeScript clean. Branch force-pushed.

PM Tier-2 rewrite (run 7): reduced from 3-step to 2-step wizard; removed date selection step, price calculation step, and calendar integration; simplified to 5 ACs covering only contact entry and review flow; added explicit TDD selector guidance to prevent RED→GREEN test drift.

PM Tier-2 rewrite (run 8): reduced to 4 ACs (removed Place Order AC which caused side-effects); pinned exact selector strings in ACs; added CRITICAL TDD rule: any test change must be a RED commit fix, never a GREEN fix; removed all E2E spec creation from scope.
