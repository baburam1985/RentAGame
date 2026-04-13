# US-053: Search bar type-ahead suggestions dropdown

- **Epic:** Discovery
- **Priority:** 53
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

As the customer types in the search bar, a dropdown list of up to 5 matching game names appears below the input. Clicking (or pressing Enter on) a suggestion sets the search text to that game's name and closes the dropdown. The matching is client-side against `games.ts` — no backend required.

## Acceptance Criteria

- [ ] Typing 2 or more characters in the search bar shows a dropdown of up to 5 game name matches (case-insensitive prefix or substring match)
- [ ] Clicking a suggestion sets the search input value to that game's name and closes the dropdown
- [ ] Pressing Escape closes the dropdown without changing the search text
- [ ] Pressing ArrowDown / ArrowUp navigates through suggestions; pressing Enter selects the highlighted suggestion
- [ ] The dropdown closes when the input loses focus
- [ ] No suggestions are shown when the input has fewer than 2 characters or when no games match

## Dev Notes

