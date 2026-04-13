# US-085: Multi-day rental value label on game cards and detail pages

- **Epic:** Checkout & Payments
- **Priority:** 85
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

Show a small 'Best value for multi-day rentals' label or 'Rent 3+ days — best value' callout on game cards and game detail pages. This anchors customers on the per-day cost model and reduces price anxiety for longer bookings. The label is static copy — no pricing logic change required.

**Scope:**
- Add the label to `web/src/components/GameCard.tsx` (a non-structural text addition)
- Add the label to `web/src/app/games/[id]/GameDetailClient.tsx` near the price display

**Note:** `GameCard.tsx` is a protected component. Only add the label text — do not change card layout, buttons, Link, or any existing styles.

## Acceptance Criteria

- [ ] AC-1: Each `GameCard` renders a text element containing the phrase 'best value' (case-insensitive) visible alongside the price
- [ ] AC-2: The game detail page (`/games/[id]`) renders a text element containing the phrase 'best value' (case-insensitive) visible near the price
- [ ] AC-3: The label renders for all 12 games in the catalog (no game is excluded)
- [ ] AC-4: Adding the label does not break any existing `GameCard` unit tests — all pre-existing tests must still pass unchanged

## TDD Rules

1. **RED commit:** Write failing tests for AC-1 and AC-2. All tests must fail at RED.
2. **GREEN commit:** Add the static label text to both files. Zero test file changes in GREEN.
3. Do not modify any E2E spec files.
