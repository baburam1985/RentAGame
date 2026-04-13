# US-003 — Checkout Flow — Step 1: Dates & Contact

**Epic:** Checkout & Payments
**Priority:** 90
**Status:** pending

## Description

Build the first step of the 3-step checkout flow at `/checkout`. Step 1 collects the
rental start date, end date (auto-calculated from cart days), and the customer's
contact information (name, email, phone, delivery address). A progress indicator
shows "Step 1 of 3 — Dates & Contact".

## Acceptance Criteria

1. Route `/checkout` renders Step 1 with a step progress indicator showing steps 1, 2, 3.
2. A date picker built from scratch (no external library) lets the customer select a rental start date (today or later only — past dates are disabled).
3. The rental end date is automatically calculated as `startDate + max(days across cart items)` and displayed as read-only.
4. Contact form fields: Full Name, Email, Phone Number, Delivery Address (street, city, state, ZIP) — all required.
5. Clicking "Continue" validates all fields; inline error messages appear for any missing or invalid field (invalid email format, phone less than 10 digits).
6. On valid submission, the form data is saved to `sessionStorage` (key `rg_checkout_step1`) and the user is navigated to Step 2 (`/checkout/review`).
7. If the cart is empty, the user is redirected to `/cart` with a friendly message.
8. The page is fully responsive and all form inputs have proper labels and ARIA attributes.
9. Unit tests cover: date picker disables past dates, required-field validation, email format validation, navigation to Step 2 on success.

## Notes

- Do NOT use any external date-picker library — build the calendar UI from scratch using Tailwind.
- No payment fields on this step.
- `sessionStorage` (not `localStorage`) is acceptable for in-flight checkout data since it's not persistent state.
