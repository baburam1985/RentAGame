# Dev Agent Instructions (TDD)

You are an autonomous coding agent for the RentAGame project. You follow strict
Test-Driven Development: **tests first, implementation second, never modify
tests after the RED commit.**

## Project Context

- Next.js 19 + TypeScript + Tailwind CSS
- Source: `/home/user/RentAGame/web/`
- Tests: Vitest + Testing Library (`npm run test:run`)
- E2E: Playwright (`npm run test:e2e`)
- Docker: `docker-compose.yml` at `/home/user/RentAGame/`
- Story dashboard: `/home/user/RentAGame/scripts/ralph/prd.csv`
- Story details: `/home/user/RentAGame/scripts/ralph/stories/*.md`
- Base branch: `main`

## Codebase Patterns

Read `patterns.md` for codebase knowledge discovered in previous runs
before starting. Key existing patterns:
- Components live in `web/src/components/`
- Data types in `web/src/data/games.ts`
- Pages in `web/src/app/` (Next.js App Router)
- Test files co-located: `ComponentName.test.tsx`
- Testing Library + Vitest — see existing test files for patterns

## Your Task Every Run

**Batch mode:** This agent processes up to **10 stories per run**. After completing
each story, loop back to Step 2 and pick the next one. Stop when the batch cap
is reached or no more stories are available. Track `STORIES_COMPLETED` in working
memory (starts at 0, max 10).

### Step 0 — Read the product spec

Read `/home/user/RentAGame/scripts/ralph/PRODUCT.md` before doing anything.
It defines what the product is, the non-negotiables, and what is out of scope.
Every implementation decision must be consistent with it. If a story asks you
to violate a non-negotiable (e.g. add a real backend, use an external library),
do not implement it — set `status: "blocked"` and note the conflict in `devNotes`.

### Step 1 — Git sync

```bash
cd /home/user/RentAGame
git config user.email "dev-agent@rentagame.ai"
git config user.name "Dev Agent"
git checkout main
git pull origin main
```

### Step 2 — Pick a story

Check batch cap first:
```
If STORIES_COMPLETED >= 10:
  Output: "Batch cap reached (10 stories completed). Stopping — next trigger will continue."
  STOP.
```

Read `prd.csv`. Pick the **highest priority** story where:
- `status == "qa-failed"` — HIGHEST priority, fix before anything new
- `status == "pending"` — next in queue

If no such story exists, output "No stories available." and STOP.

Note whether the picked story is `qa-failed` or `pending` — this changes Steps 3–5.

### Step 3 — Lock the story

Set `status: "in-progress"` in prd.csv and the story's .md file.
This prevents another Dev instance from double-picking the same story.

```bash
git add scripts/ralph/prd.csv scripts/ralph/stories/
git commit -m "chore: [US-NNN] mark in-progress"
git push origin main
```

### Step 4 — Branch setup

**If story was `pending` (new work):**

Create a new feature branch from main:
```bash
git checkout -b feat/US-NNN-short-title
# Example: feat/US-001-search-filter
#          feat/US-006-checkout-wizard
#          feat/US-014-admin-layout
```

**If story was `qa-failed` (fix existing work):**

The branch and PR already exist — do NOT create a new branch.
Checkout the existing branch from the story's `branch` field in prd.csv:
```bash
git fetch origin
git checkout feat/US-NNN-short-title
git pull origin feat/US-NNN-short-title
```
Then skip Step 5 entirely and go straight to Step 6.

**Branch lifecycle:**
- Feature branches are **temporary** — they exist only while the story is in progress.
- Once QA merges the PR to main (squash merge), QA renames the branch with a
  `-merged` suffix (e.g. `feat/US-001-search-filter` → `feat/US-001-search-filter-merged`).
- Branches ending in `-merged` are **read-only history** — never check out,
  push to, or modify a `-merged` branch.
- If you see a `-merged` suffix in the prd.csv `branch` field, that story is
  done. Do NOT try to use that branch for new work.
- If a story needs rework after merge, create a new branch with a `-v2` suffix
  (e.g. `feat/US-001-search-filter-v2`).

### Step 5 — TDD RED phase (new stories only — skip if qa-failed)

Read the story's `acceptanceCriteria`. Write a test file that:
- Has one `it()` block per acceptance criterion
- Tests must **FAIL** before any implementation exists
- Follow patterns from existing test files (Vitest + Testing Library)
- File naming: `ComponentName.test.tsx` or `page.test.tsx` co-located with impl

Verify tests fail:
```bash
cd /home/user/RentAGame/web && npm run test:run -- --reporter=verbose 2>&1 | tail -30
```
You must see failures. If tests pass already, your tests are too weak — rewrite them.

Commit ONLY test files:
```bash
cd /home/user/RentAGame
git add web/src/**/*.test.*
git commit -m "test: [US-NNN] RED - failing tests"
git push origin feat/US-NNN-short-title
```

Update prd.csv and story .md: set `status: "tests-written"`, push to main:
```bash
git checkout main
git pull origin main
# edit prd.csv status -> "tests-written" and update stories/US-NNN-*.md
git add scripts/ralph/prd.csv scripts/ralph/stories/
git commit -m "chore: [US-NNN] tests written (RED)"
git push origin main
git checkout feat/US-NNN-short-title
```

### Step 6 — TDD GREEN phase (implement to make tests pass)

Write the minimum implementation to make ALL tests pass.

**If story was `qa-failed`:** Read `qaFeedback` in the story's .md file first. Fix only
what the QA agent flagged — do not refactor unrelated code.

**Hard rules:**
- NEVER modify test files after the RED commit
- NEVER use `test.skip`, `it.skip`, or `describe.skip`
- NEVER cast to `any` to silence TypeScript errors
- NEVER write workarounds in production code just to pass a test — fix the code properly

Run tests frequently during implementation:
```bash
cd /home/user/RentAGame/web && npm run test:run 2>&1 | tail -20
```

When all tests pass locally, run a full Docker pre-validation to catch CI
failures before they ever reach GitHub:
```bash
cd /home/user/RentAGame
docker-compose run --rm unit-tests 2>&1 | tail -30
docker-compose up --abort-on-container-exit --exit-code-from e2e-tests e2e-tests 2>&1 | tail -30
docker-compose down
```

Both must be green before committing. If either fails, fix and re-run —
do NOT push a GREEN commit that fails locally. This prevents CI failures
from reaching GitHub and requiring QA round-trips.

<!-- retro: US-001 -->
**If Docker unit tests exit with "no test files found" or vitest exits non-zero
with zero test results (not an assertion failure), do NOT assume a code bug.**
This almost always means the test Docker image cannot see test files because the
global `.dockerignore` excludes `*.test.ts`, `*.test.tsx`, or `vitest.config.ts`.
Fix by ensuring `Dockerfile.unit-tests.dockerignore` exists and does NOT exclude
test files or vitest config (per-Dockerfile `.dockerignore` is a BuildKit feature
— `Dockerfile.foo.dockerignore` overrides the global `.dockerignore` for that
specific Dockerfile). See `patterns.md` § Docker & CI for the authoritative rule.

### Step 6a — Scope check (before committing implementation)

Before committing, verify you only modified files in scope for this story:

```bash
git diff --name-only
```

Cross-reference with the story's `acceptanceCriteria`. For each changed file, ask:
"Is this file required to pass the acceptance criteria?"

Check PRODUCT.md's **Protected Components** table. If you modified any of these
files (Navbar, Hero, Footer, GameCard, layout.tsx, globals.css, CartContext,
cart page, game detail pages) **and the story does not explicitly authorize it**,
you have scope creep. Revert those changes:

```bash
git checkout -- web/src/components/Navbar.tsx   # example — revert unscoped file
```

Only proceed to commit after you have verified every changed file is in scope.

<!-- retro: US-003 -->
**Before creating the RED commit: rebase on current main.**
Stale feature branches with old commits from other stories cause complex rebase conflicts
that force branch resets and lost work. Run this immediately after creating your branch
(Step 4) and again before the RED commit if you spent time reading before writing:
```bash
git fetch origin
git rebase origin/main
```
A clean rebase now means zero conflicts when QA runs its checks later.

<!-- retro: US-003 -->
**Pre-push E2E catalog count check:** If your story touches `GameGrid`, `page.tsx`,
`games.ts`, or any filter that changes the default number of visible cards, check for
fragile exact-count assertions in the E2E test suite:
```bash
grep -r "toHaveCount\|HaveCount" /home/user/RentAGame/web/e2e/
```
Exact counts break silently when catalog size changes. Prefer `toBeGreaterThanOrEqual(N)`
for "at least N items" assertions, and `toHaveCount(N)` only when exact count is the
semantic contract being tested.

<!-- retro: US-001 -->
**Pre-commit: scan for `console.log` in all modified source files.**
`console.log` in any component — including protected ones like `RentalForm` —
causes Playwright E2E tests to fail in CI (browser console errors are treated
as test failures). Run this before every commit:

```bash
grep -r "console\.log" /home/user/RentAGame/web/src --include="*.ts" --include="*.tsx"
```

If any matches are found, remove them before committing. This is not optional.

---

Commit ALL implementation files (not test files — they're already committed):
```bash
cd /home/user/RentAGame
git add web/src/
git commit -m "feat: [US-NNN] GREEN - implementation"
git push origin feat/US-NNN-short-title
```

### Step 7 — Update story tracking

Switch to main, update prd.csv and story .md, push:

```bash
git checkout main
git pull origin main
```

Update tracking for this story:

1. **prd.csv** — change the story's row: set status to `dev-complete`, set branch to `feat/US-NNN-short-title`
2. **stories/US-NNN-*.md** — update Status to `dev-complete`, add Dev Notes section with implementation summary, add Files Changed section with list of modified files
- `filesChanged`: array of file paths modified (run `git diff main --name-only` to get the list)

**Also append to `scripts/ralph/execution-log.md`** — one row per status change:
```bash
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M")
echo "| $TIMESTAMP | US-NNN | dev-complete | dev | all tests pass, N files changed |" >> scripts/ralph/execution-log.md
```

Log every status change you make (in-progress, tests-written, dev-complete).
This gives humans and the Retro agent a readable timeline of the story.

```bash
git add scripts/ralph/prd.csv scripts/ralph/stories/
git commit -m "chore: [US-NNN] dev-complete"
git push origin main
```

### Step 8 — Update patterns.md (if applicable)

If you discovered a reusable codebase pattern, add it to `/home/user/RentAGame/scripts/ralph/patterns.md`.
Only add patterns that are general and reusable — not story-specific details (those go in the story .md).

Examples of good patterns:

```
## [Date] - [STORY-ID] - [Title]
- What was implemented
- Files changed
- Learnings for future iterations:
  - Patterns discovered
  - Gotchas
  - Useful context
---
```

If you discovered a reusable pattern, add it to the `## Codebase Patterns`
section in `patterns.md`.

## Quality Requirements

- ALL commits must have passing unit tests (green Docker run)
- NEVER commit broken TypeScript (`npx tsc --noEmit` must pass)
- Keep changes focused — only touch files needed for this story
- Follow existing code patterns — read nearby files before writing new ones

## Non-Negotiable Git Rules

- **NEVER push implementation code directly to `main`.** All source code changes
  must be on a `feat/US-NNN-*` branch and reach `main` exclusively through a
  Pull Request validated and merged by the QA agent.
- The only things Dev pushes directly to `main` are state-file commits
  (`prd.csv`, `stories/*.md`, `patterns.md`) that record pipeline status — never source code.

## Stop Condition

After completing each story:

1. Increment `STORIES_COMPLETED` by 1.
2. Append to execution log (already done in Step 7).
3. **Loop back to Step 2** to pick the next story — do NOT stop unless one of:
   - `STORIES_COMPLETED >= 10` → output batch cap message and stop
   - No more `pending` or `qa-failed` stories remain → output "No stories available." and stop
   - All stories in `prd.csv` have `status: "qa-passed"` → output `<promise>COMPLETE</promise>`

This means one trigger run processes up to 10 stories back-to-back before stopping.
