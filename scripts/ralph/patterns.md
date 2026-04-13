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

## Styling
- Tailwind CSS v4 with `@import "tailwindcss"` — requires `postcss.config.mjs` with `@tailwindcss/postcss`
- CSS vars in `:root` in globals.css, reference via `var()` in components
- Material Symbols icons: `<span className="material-symbols-outlined">icon_name</span>`
- Site accent: `var(--color-accent)` = #F5C518, body bg: #fffde1
