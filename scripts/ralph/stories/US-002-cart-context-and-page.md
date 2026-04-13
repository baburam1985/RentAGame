# US-002 — Cart Context & Cart Page

**Epic:** Checkout & Payments
**Priority:** 95
**Status:** pending

## Description

Set up a `CartContext` that persists cart items to `localStorage` under the key `rg_cart`,
and build the `/cart` page where customers can review their cart, adjust rental days,
remove items, and see the order subtotal before proceeding to checkout.

## Acceptance Criteria

1. `CartContext` exposes `items`, `addItem(game, days)`, `removeItem(gameId)`, `updateDays(gameId, days)`, and `clearCart()`.
2. Cart state is persisted to `localStorage` key `rg_cart` and rehydrated on page load.
3. `CartProvider` wraps the root layout so cart state is available app-wide.
4. The `/cart` page lists all cart items with: game image thumbnail, name, days selector (1–14), price per day, line total, and a Remove button.
5. An order summary box shows the subtotal (sum of all line totals) and a "Proceed to Checkout" button.
6. When the cart is empty the page shows a friendly empty-state message and a "Browse Games" link.
7. The Navbar displays the current cart item count as a badge on the cart icon.
8. Unit tests cover: `addItem`, `removeItem`, `updateDays`, `clearCart`, and the empty-state render.

## Notes

- `CartItem` type: `{ gameId: string; gameName: string; pricePerDay: number; days: number; image: string }`.
- No delivery fees, taxes, or discounts — subtotal is the only total shown.
- `localStorage` key: `rg_cart`.
- This story is a prerequisite for US-001's Add to Cart CTA and all checkout stories.
