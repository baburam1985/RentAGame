# US-014: Admin layout and auth gate

- **Epic:** Admin Dashboard
- **Priority:** 14
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-014-admin-layout
- **PR:** (none)
- **QA Attempts:** 0

## Description

Create /admin route group with sidebar navigation (Overview, Inventory, Orders, Settings). Auth gate: redirect to /login if not admin. admin@rentagame.com gets admin:true on login.

## Acceptance Criteria

- [x] /admin route group renders with a sidebar layout
- [x] Sidebar has navigation links: Overview, Inventory, Orders, Settings
- [x] Non-admin users are redirected to /login when accessing /admin
- [x] Logging in as admin@rentagame.com sets admin:true on the user in localStorage
- [x] Sidebar styling is consistent with the site's color palette
- [x] Active sidebar link is visually highlighted

## Dev Notes

- `web/src/app/admin/layout.tsx`: Client component reads `rg_user` on mount; checks `user.admin === true`; redirects to /login if missing or not admin; renders sidebar with Overview/Inventory/Orders/Settings links using `usePathname` for active state
- `web/src/app/admin/page.tsx`: Basic overview placeholder page
- `web/src/app/login/page.tsx`: Login page with admin detection — email `admin@rentagame.com` sets `{name:"Admin", email, createdAt, admin:true}` in localStorage and redirects to /admin
- `useEffect` uses `[]` dependency to prevent router identity re-render loop
- 4 unit tests in AdminLayout.test.tsx
