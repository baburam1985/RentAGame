# US-014: Admin layout and auth gate

- **Epic:** Admin Dashboard
- **Priority:** 14
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Create /admin route group with sidebar navigation (Overview, Inventory, Orders, Settings). Auth gate: redirect to /login if not admin. admin@rentagame.com gets admin:true on login.

## Acceptance Criteria

- [ ] /admin route group renders with a sidebar layout
- [ ] Sidebar has navigation links: Overview, Inventory, Orders, Settings
- [ ] Non-admin users are redirected to /login when accessing /admin
- [ ] Logging in as admin@rentagame.com sets admin:true on the user in localStorage
- [ ] Sidebar styling is consistent with the site's color palette
- [ ] Active sidebar link is visually highlighted

