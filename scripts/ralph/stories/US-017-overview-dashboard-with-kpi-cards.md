# US-017: Overview dashboard with KPI cards

- **Epic:** Admin Dashboard
- **Priority:** 17
- **Status:** ci-pending
- **Passes:** false
- **Branch:** feat/US-017-admin-overview-dashboard
- **PR:** #23
- **QA Attempts:** 0

## Description

At /admin, show 4 KPI stat cards, a CSS/SVG bar chart of orders per game, and a Recent Orders table (last 5). Auto-refreshes every 30 seconds.

## Acceptance Criteria

- [x] /admin overview renders 4 KPI cards: Total Revenue, Active Rentals, Total Customers, Most Popular Game
- [x] KPI values are derived from localStorage order and user data
- [x] Bar chart renders orders per game using only CSS or SVG (no external chart library)
- [x] Recent Orders table shows the last 5 orders with a link to /admin/orders
- [x] Page auto-refreshes data every 30 seconds without a full page reload
- [x] All data sourced from localStorage

## Dev Notes

Implemented AdminOverview client component at /admin. Reads from rg_orders (orders) and rg_users (user count) localStorage keys. 4 KPI cards: Total Revenue, Active Rentals (pending + confirmed), Total Customers, Most Popular Game. CSS-only horizontal bar chart for orders per game (no canvas, no SVG, no external chart library). Recent Orders table shows last 5 orders sorted by createdAt descending, with link to /admin/orders. Auto-refreshes via setInterval every 30 seconds. All 10 unit tests pass.

## Files Changed

- web/src/app/admin/AdminOverview.tsx
- web/src/app/admin/AdminOverview.test.tsx
- web/src/app/admin/page.tsx
