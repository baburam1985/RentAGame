# US-012: Order history on profile

- **Epic:** User Accounts
- **Priority:** 12
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-012-order-history-profile
- **PR:** #17
- **QA Attempts:** 1

## Description

Add an Order History section to /profile. Store completed orders in localStorage on checkout. Display as a table: Order #, Game, Dates, Total, Status.

## Acceptance Criteria

- [ ] Order History section renders on /profile
- [ ] Completed orders are stored in localStorage when Place Order is submitted
- [ ] Table shows columns: Order #, Game, Dates, Total, Status
- [ ] Orders are listed in reverse chronological order
- [ ] Empty state renders with a 'Browse Games' CTA when no orders exist
- [ ] Status shows 'confirmed' for newly placed orders

## QA Feedback (Attempt 1)

**Check 0 — CI FAILED:**
- Classification: code-failure
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332406136/job/71041092901

**Check 5 — TEST COUNT FAILED:**
5 tests found in `OrderHistory.test.tsx` but 6 acceptance criteria defined. Missing test for AC #6: "Status shows 'confirmed' for newly placed orders".

**Check 9 — SCOPE VIOLATION (PROTECTED FILE):**
`web/src/components/GameCard.tsx` is a **protected file** per PRODUCT.md. It was modified in commit `8cfb9e7` to add `onSelect` prop and a category badge span. The story US-012 ("Order history on profile") does NOT mention or authorize changes to GameCard.tsx.

Additional out-of-scope changes:
- `web/src/components/GameGrid.tsx` — added `onSelect` prop passthrough (unrelated to order history)
- `web/src/app/page.tsx` — added modal state, `handleRentNow`, and GameModal import (unrelated to order history)
- `web/e2e/catalog.spec.ts` — networkidle wait (unrelated)
- `web/e2e/modal.spec.ts` — networkidle wait and selector change (unrelated)
- `web/e2e/rental-form.spec.ts` — test logic changes (unrelated)

Story scope: OrderHistory component on /profile, localStorage order storage in RentalForm. No authorization for GameCard/GameGrid/page.tsx or catalog/modal/form E2E changes.

**Required fixes:**
1. Remove all changes to `GameCard.tsx`, `GameGrid.tsx`, `app/page.tsx`, and the three E2E specs from this branch
2. Add a test for AC #6: "Status shows 'confirmed' for newly placed orders"
