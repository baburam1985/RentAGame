# US-034: Testimonials with star ratings and location for authenticity

- **Epic:** Discovery
- **Priority:** 34
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

The current testimonials section shows 3 hardcoded reviews with no star rating or location, making them look generic. Add a star rating (1–5) and a city/state string to each testimonial data object so cards display '★★★★★ — Sarah M., Austin TX'. This increases perceived authenticity and trust.

## Acceptance Criteria

- [ ] Each testimonial data object gains a 'rating' number (1–5) and a 'location' string field
- [ ] All 3 existing testimonials have rating: 5 and a realistic city, state value
- [ ] Testimonial cards render star icons corresponding to the rating value
- [ ] Star icons use filled vs outline style to represent the rating visually
- [ ] Location string is displayed below the reviewer name (e.g. 'Austin, TX')
- [ ] Star icons and location text meet WCAG AA colour contrast requirements

