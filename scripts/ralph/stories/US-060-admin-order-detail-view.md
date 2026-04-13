# US-060 — Admin order detail view

**Epic:** Admin Dashboard
**Priority:** 60
**Status:** pending

## Description

The planned admin orders management page (US-016) lists orders but provides no way to drill into an individual order. Event rental businesses need to view the full details of each booking — customer name, email, phone, event date, games rented, total price, and event type — in a single view to prepare and confirm deliveries. This story adds a per-order detail modal (or detail page) that reads from `rg_orders` in localStorage, making the admin dashboard genuinely operational.

## Acceptance Criteria

1. Each order row on the admin orders management page has a "View details" button or link that opens a detail view (modal or `/admin/orders/[id]` page) for that order.
2. The detail view shows all order fields: customer name, email, phone number, event date range, list of games with per-game price and days, total price, and event type (if provided).
3. The detail view has a clearly visible close/back control and is keyboard accessible (focus trap if modal, breadcrumb if page).
4. The detail view reads exclusively from `rg_orders` in localStorage — no backend calls.
5. The detail view is responsive and readable at 375px (mobile) and 1024px (desktop).
6. Vitest unit tests cover rendering of the detail view with a mock order object, including edge cases (missing optional fields like eventType).

## Out of Scope

- No order editing or deletion from this view (read-only)
- No backend, API, email, or SMS integration
- Do not modify CartContext or checkout flow
