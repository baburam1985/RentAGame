# US-047: Image gallery keyboard navigation and touch swipe on mobile

- **Epic:** Discovery
- **Priority:** 47
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

The 4-image photo gallery inside GameModal only supports click/tap navigation. Two accessibility gaps: (1) keyboard users cannot use arrow keys to cycle through images (WCAG 2.1 SC 2.1.1); (2) mobile users cannot swipe left/right to navigate photos (industry standard). Both gaps cause customers to miss game photos 2–4. Source research items: R-044, R-050.

## Acceptance Criteria

- [ ] Pressing the right arrow key (→) while focus is inside the gallery advances to the next image
- [ ] Pressing the left arrow key (←) while focus is inside the gallery goes to the previous image
- [ ] The currently selected image index is announced via aria-label (e.g. 'Image 2 of 4')
- [ ] Swiping left on a touch device advances to the next image (touchstart + touchend delta ≥ 50px)
- [ ] Swiping right on a touch device goes to the previous image
- [ ] Navigation wraps: swiping/arrowing past the last image returns to image 1, and vice versa

## Dev Notes

## QA Feedback
