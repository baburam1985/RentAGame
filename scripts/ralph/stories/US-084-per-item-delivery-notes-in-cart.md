# US-084: Per-item delivery notes in cart

- **Epic:** Checkout & Payments
- **Priority:** 84
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Allow customers to leave a short delivery note (up to 100 characters) for each item in their cart. Notes are stored in `localStorage` as part of the cart item under `rg_cart` and are included in the order object when the rental form is submitted. This reduces post-booking phone calls by capturing setup requirements upfront.

**Scope:**
- Add an optional `note` field to the `CartItem` type in `CartContext.tsx`
- Add a text input (max 100 chars) per cart item on the cart page at `web/src/app/cart/page.tsx`
- Persist the note to `rg_cart` when changed
- Include the note in the order saved to `rg_orders` on form submit

## Acceptance Criteria

- [ ] AC-1: Each item on the cart page renders a text input with placeholder 'Delivery note (optional)' and a `maxLength` of 100
- [ ] AC-2: Typing in the delivery note input and blurring the field updates the `note` field of that cart item in `localStorage` under `rg_cart`
- [ ] AC-3: When the cart is reloaded (component re-mounts with existing `rg_cart` data), the previously entered note is pre-filled in the input
- [ ] AC-4: When the rental form is submitted, the saved order object in `rg_orders` includes the `note` value for each item that has one
- [ ] AC-5: If no note is entered for an item, the `note` field is either absent or an empty string in the stored cart/order data — no error is thrown

## TDD Rules

1. **RED commit:** Write failing tests covering the 5 ACs above. All tests must fail at RED.
2. **GREEN commit:** Implement the feature. Zero test file changes in GREEN.
3. Do not modify any E2E spec files.
