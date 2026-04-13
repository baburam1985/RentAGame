# US-017: Overview dashboard with KPI cards

- **Epic:** Admin Dashboard
- **Priority:** 17
- **Status:** in-progress
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

At /admin, show 4 KPI stat cards, a CSS/SVG bar chart of orders per game, and a Recent Orders table (last 5). Auto-refreshes every 30 seconds.

## Acceptance Criteria

- [ ] /admin overview renders 4 KPI cards: Total Revenue, Active Rentals, Total Customers, Most Popular Game
- [ ] KPI values are derived from localStorage order and user data
- [ ] Bar chart renders orders per game using only CSS or SVG (no external chart library)
- [ ] Recent Orders table shows the last 5 orders with a link to /admin/orders
- [ ] Page auto-refreshes data every 30 seconds without a full page reload
- [ ] All data sourced from localStorage
