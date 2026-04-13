# US-007: Order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 7
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-007-order-confirmation-page
- **PR:** #12
- **QA Attempts:** 1

## Description

A static `/order-confirmation` page that reads the most recent order from `localStorage` (`rg_orders`) and displays its details. Include a link back to `/`.

**Scope is strictly limited to:**
- `web/src/app/order-confirmation/page.tsx` (new file)
- `web/src/app/order-confirmation/OrderConfirmationPage.test.tsx` (new test file)

**Do NOT touch any other files.** In particular, do NOT modify `web/src/components/RentalForm.tsx`, `web/e2e/rental-form.spec.ts`, `web/e2e/catalog.spec.ts`, `web/e2e/modal.spec.ts`, or any other existing file.

## Acceptance Criteria

- [ ] AC-1: A `"use client"` component at `web/src/app/order-confirmation/page.tsx` renders without error when `rg_orders` in `localStorage` contains at least one order with fields `{ id, gameName, startDate, endDate, totalPrice, email }`
- [ ] AC-2: The page displays the value of the `id` field from the most recent order in `rg_orders`
- [ ] AC-3: The page displays the value of the `gameName` field from the most recent order
- [ ] AC-4: A link or button with the exact text `Browse More Games` is present with `href` set to `/`

## TDD Rules — CRITICAL — Read Every Word Before Writing Any Code

1. **RED commit:** Create `OrderConfirmationPage.test.tsx` with exactly **4 tests** — one per AC above. All 4 must fail at RED because `page.tsx` does not exist yet.
   - Include `vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }))` at the top.
   - In each test, populate `localStorage.setItem('rg_orders', JSON.stringify([{ id: 'ABC123', gameName: 'Giant Jenga', startDate: '2026-06-01', endDate: '2026-06-03', totalPrice: 90, email: 'a@b.com' }]))` in `beforeEach`.
   - Use `getByText('ABC123')` for AC-2, `getByText('Giant Jenga')` for AC-3, `getByRole('link', { name: 'Browse More Games' })` for AC-4.
   - Lock these selectors in RED — do NOT change them in GREEN.
2. **GREEN commit:** Create `page.tsx` only. The GREEN commit must contain **zero changes to any test file or existing source file** — not `RentalForm.tsx`, not `rental-form.spec.ts`, not any `*.spec.ts`.
3. **E2E boundary:** Do NOT touch any existing E2E spec. Do NOT create new E2E specs for this story.

## QA Feedback (Attempt 1)

Classification: env-failure
Job: E2E Tests
Error: ALL open PRs fail E2E while unit tests pass — systemic CI E2E environment failure. Local checks 1–7, 9 all pass (4 ACs covered by 4 tests, TypeScript clean, 50 unit tests pass). Branch has correct docker-compose.yml (node healthcheck) and ci.yml (docker inspect exact-equality).
CI run: https://github.com/baburam1985/RentAGame/actions/runs/24342460231/job/71074523142

## Dev Notes

Branch rebuilt from main (fix for qa-failed attempt 4). Previous branch had scope violations — modified rental-form.spec.ts and RentalForm.tsx which are explicitly out of scope. New implementation:
- Test file uses exact story-specified field names: { id, gameName, startDate, endDate, totalPrice, email }
- Selectors pinned per AC: getByText('ABC123'), getByText('Giant Jenga'), getByRole('link', { name: 'Browse More Games' })
- No E2E specs created or modified
- 50 unit tests pass, TypeScript clean

## Files Changed
- web/src/app/order-confirmation/OrderConfirmationPage.test.tsx (new)
- web/src/app/order-confirmation/page.tsx (new)
