# US-058 — Empty cart 'Browse games' CTA

**Epic:** Checkout & Payments
**Priority:** 58
**Status:** pending

## Description

When a customer removes the last item from their cart, the cart page shows an empty state with no call to action. Per PRODUCT.md design principle 3 ("empty states always include a CTA — never a dead end"), the empty cart state must show a friendly message and a prominent "Browse games" button linking back to the catalog. This mirrors the empty-state pattern already applied to the game grid (US-018) and ensures customers are never stranded.

## Acceptance Criteria

1. When the cart is empty (zero items), the cart page displays a friendly empty-state message (e.g. "Your cart is empty — let's find some games!") instead of a blank area.
2. A clearly labelled "Browse Games" button is present in the empty state and navigates the user to the homepage catalog section (`/#games` or `/`).
3. The empty state is visually consistent with the existing cart page design — same background, typography, and spacing conventions.
4. The empty state is responsive and renders correctly at 375px (mobile) and 1024px (desktop) widths.
5. A Vitest unit test verifies that the empty-state message and CTA button render when the cart context contains zero items.

## Out of Scope

- Do not modify CartContext's addItem/removeItem/updateDays API
- No changes to checkout flow, payment logic, or order confirmation
- Do not modify Navbar, Hero, or Footer
