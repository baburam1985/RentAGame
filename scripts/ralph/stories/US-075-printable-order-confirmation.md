# US-075: Printable order confirmation page

- **Epic:** Checkout & Payments
- **Priority:** 75
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Event hosts frequently need a printed confirmation for their venue coordinator or for their own records. Add a 'Print confirmation' button on the order confirmation page that triggers the browser print dialog with a print-optimized layout.

## Acceptance Criteria

- [ ] The order confirmation page includes a 'Print Confirmation' button
- [ ] Clicking 'Print Confirmation' triggers window.print()
- [ ] A print-specific CSS block (@media print) hides the Navbar, Footer, and the print button itself
- [ ] The printed output shows all order details: game names, dates, totals, and order number
- [ ] The print layout uses black text on white background for legibility
- [ ] The button is accessible (keyboard focusable, has aria-label="Print order confirmation")
