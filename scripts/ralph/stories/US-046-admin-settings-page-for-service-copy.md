# US-046: Admin settings page for service copy

- **Epic:** Admin Dashboard
- **Priority:** 46
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

A `/admin/settings` page lets the business owner edit two key customer-facing text values without a code deploy: (1) service area notice and (2) cancellation policy. Both are saved to a `rg_settings` localStorage key and read by the components that display them (Hero service area and GameModal cancellation policy). Requires US-014 (admin auth gate) to be complete first.

## Acceptance Criteria

- [ ] A `/admin/settings` route renders an Admin Settings page with a heading 'Settings'
- [ ] The page has a 'Service Area' text input pre-populated from `rg_settings.serviceArea` (or a default string if not set)
- [ ] The page has a 'Cancellation Policy' textarea pre-populated from `rg_settings.cancellationPolicy` (or a default string if not set)
- [ ] Clicking 'Save Settings' writes both values to `rg_settings` in localStorage and shows a success confirmation
- [ ] On next page load, the saved values are loaded back into the inputs from localStorage
- [ ] The settings page is linked from the admin navigation menu

## Dev Notes

