# US-031: Service area notice in hero section

- **Epic:** Discovery
- **Priority:** 31
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Customers landing on the site do not know if the service covers their area, causing wasted time on bookings that cannot be fulfilled. Add a short 'Serving [City/Region] and surrounding areas' line in the hero section as a static configurable constant.

## Acceptance Criteria

- [ ] A service area line renders visibly in the Hero section below or near the hero subtitle
- [ ] Service area text is implemented as a named constant (e.g. SERVICE_AREA) in a shared constants file, not hardcoded inline
- [ ] The line is visible without scrolling on both desktop and mobile (375px) layouts
- [ ] Service area text meets WCAG AA colour contrast requirements against the hero background
- [ ] The line includes a location pin icon or similar visual affordance alongside the text
- [ ] No delivery tracking or logistics functionality is implied or implemented

