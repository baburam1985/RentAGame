# US-059 — 'What's this event for?' optional field on rental form

**Epic:** Checkout & Payments
**Priority:** 59
**Status:** pending

## Description

Add an optional "Event type" dropdown to the rental enquiry form, allowing customers to self-identify their occasion (Wedding, Birthday, Corporate, Backyard BBQ, Other). This low-friction field helps the admin prepare appropriately and enables the order confirmation message to be personalized (e.g. "Perfect for your Birthday party!"). The selected event type is stored in the order object under `rg_orders` in localStorage — no backend required.

## Acceptance Criteria

1. A clearly labelled optional dropdown ("What's this event for? (optional)") appears in the rental form between the contact fields and the submit button, with options: Wedding, Birthday, Corporate, Backyard BBQ, School/Community, Other.
2. The field is not required — the form submits successfully whether or not an event type is selected.
3. When an event type is selected, the order confirmation message personalizes the event type (e.g. "Thanks! Your games are booked for your [Wedding].").
4. The selected event type is persisted in the order object stored under `rg_orders` in localStorage (the `Order` type gains an optional `eventType?: string` field).
5. The dropdown uses Tailwind-only styling with no external component libraries; it is keyboard accessible and has a visible focus ring.
6. Vitest unit tests cover: form submission with and without eventType selected, and localStorage order persistence including the eventType field.

## Out of Scope

- No backend, API, or email integration
- Do not modify CartContext, Navbar, Hero, or Footer
- No payment processing logic
