# US-046: Admin settings page for service copy

- **Epic:** Admin Dashboard
- **Priority:** 46
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-046-admin-settings
- **PR:** 0
- **QA Attempts:** 0

## Description

A `/admin/settings` page lets the business owner edit two key customer-facing text values without a code deploy: (1) service area notice and (2) cancellation policy. Both are saved to a `rg_settings` localStorage key and read by the components that display them (Hero service area and GameModal cancellation policy). Requires US-014 (admin auth gate) to be complete first.

## Acceptance Criteria

- [x] A `/admin/settings` route renders an Admin Settings page with a heading 'Settings'
- [x] The page has a 'Service Area' text input pre-populated from `rg_settings.serviceArea` (or a default string if not set)
- [x] The page has a 'Cancellation Policy' textarea pre-populated from `rg_settings.cancellationPolicy` (or a default string if not set)
- [x] Clicking 'Save Settings' writes both values to `rg_settings` in localStorage and shows a success confirmation
- [x] On next page load, the saved values are loaded back into the inputs from localStorage
- [x] The settings page is linked from the admin navigation menu

## Dev Notes

Implemented `AdminSettings.tsx` as a client component with:
- `useEffect` to load `rg_settings` from localStorage on mount (with fallback defaults)
- Controlled inputs for serviceArea and cancellationPolicy
- `handleSave` writes `rg_settings` to localStorage and shows inline "Settings saved!" confirmation for 3 seconds
- Admin layout.tsx created with sidebar nav including Settings link at /admin/settings
- Admin page.tsx created as overview page to complete routing

## Files Changed

- `web/src/app/admin/settings/AdminSettings.tsx` — main settings component
- `web/src/app/admin/settings/AdminSettings.test.tsx` — 8 tests (all pass)
- `web/src/app/admin/settings/page.tsx` — Next.js page wrapper
- `web/src/app/admin/layout.tsx` — admin sidebar layout with nav links
- `web/src/app/admin/page.tsx` — admin overview placeholder page
