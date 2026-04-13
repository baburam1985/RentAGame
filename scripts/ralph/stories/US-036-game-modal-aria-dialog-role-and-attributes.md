# US-036: Game modal ARIA dialog role and attributes

- **Epic:** Discovery
- **Priority:** 36
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

The GameModal component is missing the ARIA attributes required for screen readers (NVDA, VoiceOver) to recognise it as a dialog. Without `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal title, screen reader users receive no dialog context and cannot use dialog-specific navigation shortcuts.

## Acceptance Criteria

- [ ] The GameModal container element has `role="dialog"` and `aria-modal="true"`
- [ ] The modal container has `aria-labelledby` pointing to the `id` of the game name heading inside the modal
- [ ] The game name heading inside the modal has a unique `id` attribute used as the `aria-labelledby` value
- [ ] The close button has a descriptive `aria-label` (e.g. `aria-label="Close game details"`)
- [ ] Unit test verifies that the modal element has the correct `role`, `aria-modal`, and `aria-labelledby` attributes when rendered
- [ ] No existing functionality or layout is changed — purely additive ARIA annotation

## Dev Notes

Edit `web/src/components/GameModal.tsx`. Add `role="dialog"` and `aria-modal="true"` to the modal container div. Add `id="game-modal-title"` to the game name `<h2>` (or equivalent heading). Add `aria-labelledby="game-modal-title"` to the container. Add `aria-label="Close game details"` to the close button. This is a protected component — only modify these attributes, do not change layout, styles, or logic.
