# US-043: Step progress indicator in the multi-step checkout wizard

- **Epic:** Checkout & Payments
- **Priority:** 43
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

Baymard research shows checkout abandonment drops measurably when customers can see remaining steps. The planned 3-step rental checkout wizard (US-006) should include a visible step progress indicator at the top of the wizard — showing step label and current position (e.g. 'Step 2 of 3 — Contact Info'). Removing completion uncertainty is one of the highest-ROI checkout optimisations. This story depends on US-006 being complete before it can be implemented.

## Acceptance Criteria

- [ ] A step progress indicator renders at the top of the multi-step checkout wizard showing the current step number, total steps, and a descriptive step label (e.g. 'Step 1 of 3 — Cart Review', 'Step 2 of 3 — Contact Info', 'Step 3 of 3 — Confirm Order')
- [ ] The progress indicator uses a visual representation (e.g. filled/outlined circles connected by a line, or a step bar) built with Tailwind CSS only — no external progress/stepper libraries
- [ ] Completed steps are visually differentiated from the current step and upcoming steps (e.g. filled circle vs outlined circle, checkmark icon)
- [ ] The progress indicator is accessible: each step node has an `aria-label` describing its state (e.g. 'Step 1 of 3 – Cart Review, completed') and the overall component has an appropriate `aria-label` such as 'Checkout progress'
- [ ] At 375px viewport width the progress indicator fits within the screen width without overflow or truncation
- [ ] A unit test verifies that the progress indicator renders the correct current step label and marks prior steps as completed when given a `currentStep` prop

## Dev Notes

Create a new `web/src/components/CheckoutProgress.tsx` client component that accepts `currentStep: number` and `steps: { label: string }[]` as props. Render a horizontal step strip with numbered circles and labels. Import and render inside the checkout wizard page created for US-006. This story must be implemented after US-006 is dev-complete — add a note in the story file that US-006 is a prerequisite.
