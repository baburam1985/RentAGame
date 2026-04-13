# US-006: Multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 6
- **Status:** pending
- **Passes:** false
- **Branch:** (not started)
- **PR:** (none)
- **QA Attempts:** 0

## Description

Replace the single RentalForm with a 3-step wizard: Step 1 — Date selection. Step 2 — Contact info. Step 3 — Review & confirm. Progress indicator at top. Back/Next buttons. Form state persists between steps.

## Acceptance Criteria

- [ ] Wizard renders 3 steps: Date Selection, Contact Info, Review & Confirm
- [ ] Progress indicator at top shows current step number
- [ ] Next button advances to the next step; Back button returns to the previous step
- [ ] Form state (dates, contact info) persists when navigating between steps
- [ ] Step 1 computes rental days and total price from start/end dates
- [ ] Step 3 shows full order summary before submit
- [ ] Place Order CTA on Step 3 submits the order

