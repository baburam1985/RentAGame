# US-011: User profile page

- **Epic:** User Accounts
- **Priority:** 11
- **Status:** dev-complete
- **Passes:** false
- **Branch:** feat/US-011-user-profile-page
- **PR:** #16
- **QA Attempts:** 1

## Description

Create /profile page (auth-gated). Show avatar (initial-based), name, email, member since. Edit name inline. Log out button clears localStorage and redirects to /.

## Acceptance Criteria

- [ ] /profile page renders for authenticated users
- [ ] Unauthenticated users are redirected to /login
- [ ] Avatar shows user's initial as a colored circle
- [ ] Name, email, and member since date are displayed
- [ ] Clicking name enables inline editing; saving on blur or Enter key
- [ ] Updated name persists to localStorage
- [ ] Log out button clears the user from localStorage
- [ ] Log out redirects to /

## QA Feedback (Attempt 1)

- **Classification:** env-failure
- **Job:** E2E Tests
- **Error:** `catalog.spec.ts` — "clicking Lawn Games filter shows only lawn games" fails: `cards.locator("text=Lawn Games")` finds 0 elements inside `.group` cards because `GameCard.tsx` does not render a category badge after commit `88e076e` ("fix: restore Kinetic Games UI") removed it. Systemic failure affecting all open PRs.
- **Fix needed:** CI-Fix agent must add `<span>{game.category}</span>` back to `GameCard.tsx` so the E2E assertion passes.
- **Next step:** After CI-Fix restores green E2E, rebase branch on main and re-queue for QA.

## Dev Notes

Env-failure resolved: GameCard.tsx category badge was restored by CI-Fix agent. Branch rebased on main. All 53 unit tests pass. TypeScript clean. Branch force-pushed.

## Files Changed

- web/src/app/profile/page.tsx
