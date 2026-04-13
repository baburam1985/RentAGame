# US-061 — Programmatic label associations for all form inputs (WCAG 1.3.1)

**Epic:** Checkout & Payments
**Priority:** 61
**Status:** pending

## Description

WCAG 2.1 SC 1.3.1 (Info and Relationships) requires every form input to have its label programmatically associated — not just visually adjacent. A screen reader user filling in the rental form needs every field to announce its purpose when focused. Visually adjacent text that lacks a proper `<label htmlFor>` or `aria-label` is an invisible barrier for blind users. This story audits and fixes all forms in the app to use explicit label associations.

## Acceptance Criteria

1. Every `<input>`, `<select>`, and `<textarea>` in the rental enquiry form has either an explicit `<label htmlFor={id}>` pointing to the input's `id`, or an `aria-label` attribute — not just visually adjacent text.
2. Every form input in the sign-up and login pages (US-010) follows the same labelling pattern.
3. Every admin form input (inventory management, settings page) follows the same labelling pattern.
4. No `any` TypeScript types are introduced.
5. A Vitest unit test for each form component asserts that inputs are rendered with a matching `htmlFor`/`id` pair or `aria-label`.
6. Visually, the forms look identical to their current state — this is a structural/semantic change only.

## Out of Scope

- Do not modify CartContext, Navbar, Hero, Footer, or protected layout files
- No visual redesign of any form
- No backend or API integration
