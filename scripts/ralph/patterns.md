# Codebase Patterns

Reusable knowledge discovered during development. All agents should read this
before starting work. The Retro agent maintains this file.

## Project Structure
- Components live in `web/src/components/` with co-located test files (`ComponentName.test.tsx`)
- Data types and static data in `web/src/data/games.ts`
- Pages in `web/src/app/` (Next.js App Router, `"use client"` for interactive pages)
- Cart state in `web/src/context/CartContext.tsx`

## Testing
- Vitest + Testing Library with `vi.fn()` for mocks and `userEvent` for interactions
- Components using `useCart` must be wrapped in `<CartProvider>` in tests
- Components using `useRouter` need `vi.mock("next/navigation", ...)`
- Filter components are stateless — parent (page.tsx) owns all filter state via useState
- Sort tests: pass a `games` prop with minimal mock data to GameGrid for deterministic ordering
- Use `getAllByRole("heading", { level: 3 })` to get card names in DOM order
- GameGrid accepts optional `games` override prop — lets tests inject controlled data

## Docker & CI
- Docker test image uses `node:20-bookworm-slim` (Debian), NOT Alpine — Alpine lacks `xvfb`/`udev`
- Per-Dockerfile .dockerignore: `Dockerfile.foo.dockerignore` overrides global `.dockerignore` (BuildKit)
- Always create per-Dockerfile .dockerignore for test images when global .dockerignore excludes test files
- E2E playwright.config.ts: skip `webServer` when `BASE_URL` env var is set (Docker CI uses http://app:3000)
- Playwright system Chromium: set `executablePath: process.env.CHROMIUM_PATH` when present

## Critical Gotchas
- `console.log` in ANY component causes E2E Playwright tests to fail in CI — ALWAYS remove before pushing
- Testing Library `getByText` with regex requires text in a SINGLE DOM text node (no split elements)
- `userEvent.type(input, "{arrowright}")` does NOT fire `change` on range inputs in jsdom — add `onKeyDown` handler
- `[...array].sort(fn)` — never mutate filtered array in-place (affects React re-renders)
- When appending tests to existing file, add new `describe` block — never restructure passing tests

## E2E Test Fragility
- <!-- retro: US-003 --> `catalog.spec.ts` hardcoded `toHaveCount(N)` for game card counts — broke in US-003 and US-004 when the catalog grew from 8 to 12 games. Fixed in PR #9 to use `toBeGreaterThanOrEqual(8)`.
- Use exact `toHaveCount(N)` only when the count is a semantic contract (e.g. "exactly 4 filter chips"). Use `toBeGreaterThanOrEqual(N)` for "at least N cards/items" catalog checks.
- If you change default catalog visibility (new filter, price range, etc.) grep `web/e2e/` for `toHaveCount` before pushing.

## Docker Healthcheck IPv4 Requirement (CRITICAL)
<!-- retro: CI-Fix-PR37-38 -->
- On Alpine Linux, `localhost` resolves to IPv6 (`::1`). Next.js binds HOSTNAME=0.0.0.0 (IPv4 only). Using `localhost` in a Docker healthcheck on Alpine causes ECONNREFUSED — the healthcheck never becomes `healthy`, blocking all E2E tests.
- **Always use `127.0.0.1` (not `localhost`) in Docker healthcheck URLs** to force IPv4 resolution.
- **Always use CMD array form** (not CMD-SHELL) for healthchecks in Alpine containers to avoid `sh` quoting ambiguity.
- Canonical fix applied in PR #38. Root cause: PR #37 introduced the healthcheck correctly but used `localhost`; PR #38 replaced it with `127.0.0.1` and switched to CMD form.
- Symptom: app container never reaches `healthy` status → E2E container never starts → all Playwright tests fail with connection errors.

## CI Health-Wait Pattern (CRITICAL)
<!-- retro: CI-hotfix-2 -->
- NEVER use `grep -q "healthy"` to check Docker health status — the substring "healthy" appears
  inside "(health: starting)" and causes false-positive matches, exiting the wait loop immediately.
- ALWAYS use exact shell equality: `STATUS=$(docker inspect --format='{{.State.Health.Status}}' ...)` then `[ "$STATUS" = "healthy" ]`
- Symptom of the bug: ALL Playwright E2E tests fail with "connection refused" / ECONNREFUSED across every PR simultaneously — unit tests pass.
- Fix: PR #25 replaced `grep -q "healthy"` with `docker inspect --format` + exact `= "healthy"` comparison in `.github/workflows/ci.yml`.
- When ALL PRs fail E2E at once, suspect this pattern before routing any story back to Dev.

## Stale CI Config on Feature Branches (CRITICAL)
<!-- retro: CI-Fix-wget-Alpine -->
- Feature branches do NOT automatically inherit CI config changes merged to main. A branch created before a `docker-compose.yml` or `ci.yml` fix carries the old (broken) config until it is rebased.
- Observed: US-002 and US-004 failed with "wget healthcheck not available on Alpine" at 13:04 even though main had already been fixed (PR #38 replaced wget with node CMD healthcheck). US-013 failed with "old CI config, no healthcheck" — it predated PR #37 entirely.
- **Fix pattern**: after any CI infrastructure fix lands on main, rebase ALL open feature branches immediately (see CI.md Step 2a proactive rebase directive).
- **Dev prevention**: before pushing a feature branch, `grep -A 3 "healthcheck:" docker-compose.yml` to verify the node CMD form is in place. If stale, `git rebase origin/main`.
- Root cause: CI infrastructure changes (PR #37, #38) fix main but leave diverged branches with stale configs — each branch will independently trigger the same env-failure when QA processes it.

## Styling
- Tailwind CSS v4 with `@import "tailwindcss"` — requires `postcss.config.mjs` with `@tailwindcss/postcss`
- CSS vars in `:root` in globals.css, reference via `var()` in components
- Material Symbols icons: `<span className="material-symbols-outlined">icon_name</span>`
- Site accent: `var(--color-accent)` = #F5C518, body bg: #fffde1
