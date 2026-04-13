# US-025: Cancellation policy statement in game modal

- **Epic:** Discovery
- **Priority:** 25
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-025-cancellation-policy-modal
- **PR:** (none)
- **QA Attempts:** 0

## Description

Display a short cancellation policy line inside GameModal before the rental form, e.g. 'Free cancellation up to 24 hours before your rental start date'. Policy text can be a hardcoded constant shared across all games. Builds customer confidence at the decision stage before they invest time in the form.

## Acceptance Criteria

- [x] A cancellation policy line renders inside GameModal above the rental enquiry form
- [x] Policy text is 'Free cancellation up to 24 hours before your rental start date'
- [x] The statement includes an appropriate icon (e.g. calendar or shield check) for visual emphasis
- [x] Statement is visible without scrolling when the modal first opens on desktop and mobile (375px)
- [x] Statement text meets WCAG AA colour contrast requirements
- [x] Policy text is implemented as a shared constant (not duplicated per game)

## Dev Notes

Added `export const CANCELLATION_POLICY` constant to `GameModal.tsx` and rendered it in a green-tinted callout div with a `event_available` Material Symbols icon, positioned before the Price + CTA section. Also added `imageAlt?: string` as optional to the Game type for TypeScript compatibility with the test mock. All 52 unit tests pass.

## Files Changed

- `web/src/components/GameModal.tsx` — added CANCELLATION_POLICY constant and rendered callout
- `web/src/data/games.ts` — added optional `imageAlt` to Game type (TypeScript compatibility)
- `web/src/components/GameModalCancellation.test.tsx` — new test file (RED commit)

