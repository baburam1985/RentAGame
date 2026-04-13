# US-004 — Checkout Flow — Step 2: Review Order

**Epic:** Checkout & Payments
**Priority:** 85
**Status:** pending

## Description

Build Step 2 of checkout at `/checkout/review`. The customer sees a full read-only
summary of their order: items, dates, contact info, and the final total. They can
go back to edit Step 1 or place the order.

## Acceptance Criteria

1. Route `/checkout/review` renders Step 2 with the progress indicator showing Step 2 active.
2. The page displays all cart items with name, days, price per day, and line total.
3. The rental start and end dates from Step 1 are shown.
4. The delivery address and contact info from Step 1 are shown in a read-only summary block.
5. An order total (sum of all line totals) is shown prominently.
6. A "Back" button navigates to `/checkout` (Step 1) without losing form data.
7. A "Place Order" button is present and enabled (payment is mock — no real payment).
8. Clicking "Place Order" creates an `Order` object, saves it to `localStorage` key `rg_orders` (appending to existing array), clears the cart, and navigates to `/checkout/confirmation`.
9. If Step 1 data is missing from `sessionStorage`, the user is redirected to `/checkout`.
10. Unit tests cover: order data display, Place Order saves to localStorage and clears cart, back-navigation.

## Notes

- `Order` type: `{ id: string; placedAt: string; items: CartItem[]; startDate: string; endDate: string; contact: ContactInfo; total: number; status: 'pending' }`.
- Generate `id` as a timestamp-based string (e.g., `Date.now().toString()`).
- `rg_orders` key stores an array of all orders.
