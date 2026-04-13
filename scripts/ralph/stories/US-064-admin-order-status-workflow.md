# US-064 — Admin order status workflow (Confirmed / Delivered / Returned)

**Epic:** Admin Dashboard
**Priority:** 64
**Status:** pending

## Description

The admin orders page currently shows order data but has no lifecycle status. Every event rental business needs to track whether an order has been confirmed, delivered, and returned after the event. This story adds a `status` field to the order object (stored in `rg_orders`) with three transitions: Confirmed → Delivered → Returned. The admin can toggle the status from the orders list or the order detail view, making the admin dashboard genuinely operational for day-to-day use.

## Acceptance Criteria

1. The `Order` type in localStorage (`rg_orders`) gains a `status` field typed as `"pending" | "confirmed" | "delivered" | "returned"` — defaulting to `"pending"` for new orders placed by customers.
2. Each order row on the admin orders page shows the current status with a distinct colour badge (e.g. grey for pending, blue for confirmed, green for delivered, yellow for returned).
3. The admin can advance an order to the next status via a clearly labelled button or dropdown (e.g. "Confirm", "Mark Delivered", "Mark Returned"); status changes persist immediately to `rg_orders` in localStorage.
4. Status cannot be reversed (one-way forward: pending → confirmed → delivered → returned) to prevent accidental rollbacks.
5. The status badge and controls are responsive at 375px (mobile) and 1024px (desktop).
6. Vitest unit tests cover: order status transitions, localStorage persistence of status updates, and rendering of the status badge for each status value.

## Out of Scope

- No email or SMS notifications on status change (no backend)
- Do not modify CartContext, checkout flow, or customer-facing order history (US-012) to show admin status
- No multi-admin or role-based access control
