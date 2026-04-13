# US-017: Overview dashboard with KPI cards

- **Epic:** Admin Dashboard
- **Priority:** 17
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-017-admin-overview-dashboard
- **PR:** #23
- **QA Attempts:** 1

## Description

At /admin, show 4 KPI stat cards, a CSS/SVG bar chart of orders per game, and a Recent Orders table (last 5). Auto-refreshes every 30 seconds.

## Acceptance Criteria

- [x] /admin overview renders 4 KPI cards: Total Revenue, Active Rentals, Total Customers, Most Popular Game
- [x] KPI values are derived from localStorage order and user data
- [x] Bar chart renders orders per game using only CSS or SVG (no external chart library)
- [x] Recent Orders table shows the last 5 orders with a link to /admin/orders
- [x] Page auto-refreshes data every 30 seconds without a full page reload
- [x] All data sourced from localStorage

## QA Feedback (Attempt 1)

**Check 0 — CI FAILED:**
- Classification: env-failure (E2E) + code-failure (Check 4)
- Job: E2E Tests
- CI run: https://github.com/baburam1985/RentAGame/actions/runs/24332461327/job/71041268584

**Check 4 — TRIVIAL ASSERTION FOUND:**
File: `web/src/app/admin/AdminOverview.test.tsx`, line 140:
```
expect(ordersLink).toBeDefined();
```
`ordersLink` is a DOM element from `links.find(...)`. Calling `.toBeDefined()` on an element that is always defined (elements are objects, never `undefined` unless not found — but here `find` returns `undefined` if not found, which `.toBeDefined()` catches poorly). This should be:
```
expect(ordersLink).toBeInTheDocument();
```
or better:
```
expect(screen.getByRole("link", { name: /view all orders/i })).toHaveAttribute("href", "/admin/orders");
```

**Local checks (Checks 1–3, 5–9): ALL PASS**
- Check 1: RED (`23b8cf8`) before GREEN (`f9fb865`) ✓
- Check 2: No test files modified between RED and GREEN ✓
- Check 3: No skipped tests ✓
- Check 5: 10 tests ≥ 6 acceptance criteria ✓
- Check 6: TypeScript clean ✓
- Check 7: All 10 unit tests pass locally ✓
- Check 9: Only `AdminOverview.tsx`, `AdminOverview.test.tsx`, `page.tsx` changed ✓

**Required fix:**
Replace `expect(ordersLink).toBeDefined()` with `expect(ordersLink).toBeInTheDocument()` in `AdminOverview.test.tsx` line 140.

## Dev Notes

Implemented AdminOverview client component at /admin. Reads from rg_orders (orders) and rg_users (user count) localStorage keys. 4 KPI cards: Total Revenue, Active Rentals (pending + confirmed), Total Customers, Most Popular Game. CSS-only horizontal bar chart for orders per game (no canvas, no SVG, no external chart library). Recent Orders table shows last 5 orders sorted by createdAt descending, with link to /admin/orders. Auto-refreshes via setInterval every 30 seconds. All 10 unit tests pass.

## Files Changed

- web/src/app/admin/AdminOverview.tsx
- web/src/app/admin/AdminOverview.test.tsx
- web/src/app/admin/page.tsx
