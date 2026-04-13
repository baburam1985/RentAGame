# US-045: Guest checkout — continue as guest without account creation

- **Epic:** Checkout & Payments
- **Priority:** 45
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** #0
- **QA Attempts:** 0

## Description

26% of users abandon checkout when forced to create an account (Baymard Institute, 2025). The multi-step checkout wizard (US-006) must offer a 'Continue as Guest' option so customers can complete a booking without signing up. The order is stored in localStorage as usual. After order confirmation, prompt the customer to optionally create an account to track their booking. Source research item: R-047.

## Acceptance Criteria

- [ ] The first step of the multi-step checkout wizard shows a 'Continue as Guest' button alongside 'Sign In / Create Account'
- [ ] Selecting 'Continue as Guest' allows the customer to proceed through all checkout steps without creating an account
- [ ] The completed guest order is saved to localStorage (rg_orders key) with a guestOrder: true flag
- [ ] The order confirmation page shows the completed order details for guest customers
- [ ] After order confirmation, a prompt appears: 'Create an account to track your booking' with a link to the signup page
- [ ] Existing logged-in customers are not affected — their flow continues as before

## Dev Notes

## QA Feedback
