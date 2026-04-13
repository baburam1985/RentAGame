# US-005: Active filter summary bar with clear-all

- **Epic:** Discovery
- **Priority:** 5
- **Status:** qa-failed
- **Passes:** false
- **Branch:** feat/US-005-active-filter-summary-bar
- **PR:** #10
- **QA Attempts:** 1

## Description

When any filter (search, category, price, players, sort) is non-default, show a horizontal summary bar below the filter row listing each active filter as a removable chip. Include a 'Clear all' button.

## Acceptance Criteria

- [ ] Summary bar is hidden when all filters are at default values
- [ ] Summary bar appears when any filter is non-default
- [ ] Each active filter renders as a chip with its value and a remove (×) button
- [ ] Clicking a chip's remove button clears only that filter
- [ ] Clear all button resets every filter to default
- [ ] Summary bar updates in real time as filters change

## QA Feedback (Attempt 1)

- **Classification:** env-failure
- **Job:** E2E Tests
- **Error:** `catalog.spec.ts` — "clicking Lawn Games filter shows only lawn games" fails: `cards.locator("text=Lawn Games")` finds 0 elements inside `.group` cards because `GameCard.tsx` does not render a category badge after commit `88e076e` ("fix: restore Kinetic Games UI") removed it. Systemic failure affecting all open PRs.
- **Fix needed:** CI-Fix agent must add `<span>{game.category}</span>` back to `GameCard.tsx` so the E2E assertion passes.
- **Next step:** After CI-Fix restores green E2E, rebase branch on main and re-queue for QA.
