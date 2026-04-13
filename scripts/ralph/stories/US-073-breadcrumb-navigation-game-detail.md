# US-073: Breadcrumb navigation on game detail pages

- **Epic:** Discovery
- **Priority:** 73
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Game detail pages (/games/[id]) have no breadcrumb, leaving users who arrive from external links or search with no orientation. Add a breadcrumb bar showing the path Home > [Category] > [Game Name] to help users navigate back to filtered results.

## Acceptance Criteria

- [ ] A breadcrumb appears at the top of every game detail page
- [ ] The breadcrumb shows: Home > [Game Category] > [Game Name]
- [ ] 'Home' links to the homepage (/)
- [ ] The category segment links to the homepage with the appropriate category pre-filtered
- [ ] The current page (Game Name) is not a link (aria-current="page")
- [ ] The breadcrumb uses a nav element with aria-label="breadcrumb" for accessibility
