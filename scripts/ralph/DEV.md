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
- Shared state: `/home/user/RentAGame/scripts/ralph/prd.json`
- Base branch: `main`

## Codebase Patterns

Read `progress.txt` (if it exists) for patterns discovered in previous runs
before starting. Key existing patterns:
- Components live in `web/src/components/`
- Data types in `web/src/data/games.ts`
- Pages in `web/src/app/` (Next.js App Router)
- Test files co-located: `ComponentName.test.tsx`
- Testing Library + Vitest — see existing test files for patterns

## Your Task Every Run

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

Read `prd.json`. Pick the **highest priority** story where:
- `status == "qa-failed"` — HIGHEST priority, fix before anything new
- `status == "pending"` — next in queue

If no such story exists, output "No stories available." and STOP.

Note whether the picked story is `qa-failed` or `pending` — this changes Steps 3–5.

### Step 3 — Lock the story

Set `status: "in-progress"` in prd.json and write it back immediately.
This prevents another Dev instance from double-picking the same story.

```bash
git add scripts/ralph/prd.json
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
Checkout the existing branch from the story's `branch` field in prd.json:
```bash
git fetch origin
git checkout feat/US-NNN-short-title
git pull origin feat/US-NNN-short-title
```
Then skip Step 5 entirely and go straight to Step 6.

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

Update prd.json: `status: "tests-written"`, push to main:
```bash
git checkout main
git pull origin main
# edit prd.json status -> "tests-written"
git add scripts/ralph/prd.json
git commit -m "chore: [US-NNN] tests written (RED)"
git push origin main
git checkout feat/US-NNN-short-title
```

### Step 6 — TDD GREEN phase (implement to make tests pass)

Write the minimum implementation to make ALL tests pass.

**If story was `qa-failed`:** Read `qaFeedback` in prd.json first. Fix only
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

When all tests pass locally, run in Docker for a clean-environment check:
```bash
cd /home/user/RentAGame
docker-compose run --rm unit-tests 2>&1 | tail -30
```

Both must be green before committing.

Commit ALL implementation files (not test files — they're already committed):
```bash
cd /home/user/RentAGame
git add web/src/
git commit -m "feat: [US-NNN] GREEN - implementation"
git push origin feat/US-NNN-short-title
```

### Step 7 — Update prd.json

Switch to main, update prd.json, push:

```bash
git checkout main
git pull origin main
```

Edit prd.json for this story:
- `status`: `"dev-complete"`
- `branch`: `"feat/US-NNN-short-title"`
- `devNotes`: brief summary of what was implemented and files changed

```bash
git add scripts/ralph/prd.json
git commit -m "chore: [US-NNN] dev-complete"
git push origin main
```

### Step 8 — Update progress.txt

Append to `/home/user/RentAGame/scripts/ralph/progress.txt`:

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
section at the TOP of progress.txt (create section if it doesn't exist).

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
  (`prd.json`, `progress.txt`) that record pipeline status — never source code.

## Stop Condition

After completing a story:
- If all stories in prd.json have `status: "qa-passed"`, output:
  `<promise>COMPLETE</promise>`
- Otherwise, end your response normally — the next run picks up the next story.
