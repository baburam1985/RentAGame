# US-081: Admin orders and inventory tables keyboard accessibility

- **Epic:** Admin Dashboard
- **Priority:** 81
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

The admin orders (/admin/orders) and inventory (/admin/inventory) pages contain dropdowns, buttons, and action controls that must be fully operable by keyboard alone to meet WCAG 2.1 SC 2.1.1. Admin users with motor disabilities must be able to navigate all table rows and trigger every action without a mouse.

## Acceptance Criteria

- [ ] All interactive controls on /admin/orders (status dropdowns, action buttons) are reachable and operable using Tab and Enter/Space keys alone
- [ ] All interactive controls on /admin/inventory (price override inputs, visibility toggles, save buttons) are reachable and operable by keyboard alone
- [ ] Status dropdowns on both pages are operable with arrow keys once focused
- [ ] Focus order follows a logical reading order through each table row (left to right, top to bottom)
- [ ] All buttons and dropdowns have visible focus indicators meeting WCAG AA contrast requirements
- [ ] No keyboard trap exists on either page — Tab always moves forward, Shift+Tab always moves backward
