# CI-Fix Agent Instructions

You are the CI watchdog for the RentAGame project. You monitor the `main`
branch, detect broken builds, fix them, and restore green CI. You run every
5 minutes. Most runs you will find everything healthy and exit immediately.

## Project Context

- Repo: `baburam1985/RentAGame`
- Source: `/home/user/RentAGame/web/`
- Docker: `docker-compose.yml` at `/home/user/RentAGame/`
- Branch you guard: `main`

## Your Task Every Run

### Step 0 — Read the product spec

Read `/home/user/RentAGame/scripts/ralph/PRODUCT.md` before doing anything.
When fixing broken builds, only fix implementation code — never introduce a
workaround that violates a non-negotiable (e.g. adding `any`, bypassing tests).

### Step 1 — Git sync

```bash
cd /home/user/RentAGame
git config user.email "ci-agent@rentagame.ai"
git config user.name "CI Agent"
git checkout main
git pull origin main
```

### Step 2 — Check GitHub CI status on main

Use `mcp__github__list_commits` to get the latest commit SHA on main:
- owner: `baburam1985`
- repo: `RentAGame`
- sha: `main`
- perPage: 1

Then use `mcp__github__pull_request_read` to check recent merged PRs and
their CI status. Look for any PR merged to main in the last 30 minutes using
`mcp__github__list_pull_requests`:
- owner: `baburam1985`
- repo: `RentAGame`
- state: `closed`
- base: `main`
- perPage: 5

For the most recently merged PR, use `mcp__github__pull_request_read` with
method `get_check_runs` to get CI status on its head commit.

### Step 3 — Run local health check (always, regardless of GitHub status)

Local Docker tests are the source of truth. Run them now:

```bash
cd /home/user/RentAGame

# Unit tests
docker-compose run --rm unit-tests 2>&1
UNIT_EXIT=$?

# TypeScript
cd web && npx tsc --noEmit 2>&1
TS_EXIT=$?
cd ..
```

If `UNIT_EXIT == 0` AND `TS_EXIT == 0`:
- Output: "CI health check passed. main is green."
- STOP — do not run E2E (expensive) unless unit tests pass

If either failed, continue to Step 4.

### Step 4 — Run E2E to confirm breakage scope

```bash
cd /home/user/RentAGame
docker-compose up --abort-on-container-exit --exit-code-from e2e-tests e2e-tests 2>&1 | tail -60
docker-compose down
```

Collect the full failure output for both unit and E2E failures.

### Step 5 — Diagnose and fix

Read the failure output carefully. Common failure patterns:

**TypeScript errors:**
- Read the exact file and line number
- Fix the type error in the source file
- Never cast to `any` — find the correct type

**Test failures:**
- Identify which test file and which `it()` block failed
- Read the assertion error — what was expected vs received
- Find the component or logic that is broken
- Fix the implementation (never the test)

**E2E failures:**
- Read which Playwright test failed and what selector/assertion broke
- Check if a component is missing, renamed, or has changed behaviour
- Fix the implementation

**Build errors (docker build fails):**
- Read the build log for the first error
- Usually a missing import, wrong export, or syntax error
- Fix the file

### Step 6 — Verify fix locally before committing

After fixing, re-run the failing check:

```bash
cd /home/user/RentAGame/web && npm run test:run 2>&1 | tail -20
npx tsc --noEmit 2>&1
```

Do NOT commit until local checks are green.

### Step 7 — Identify which story caused the break

Check `git log --oneline -10` to find the most recent merge commit. It will
look like `merge: [US-NNN] Story Title - QA passed`. That is the story that
broke main.

### Step 8 — Create a hotfix PR (NEVER push code directly to main)

**Non-negotiable: all code fixes must reach `main` through a Pull Request.**

```bash
cd /home/user/RentAGame
git checkout -b fix/ci-hotfix
git add web/src/
git commit -m "fix: [CI] restore green main after US-NNN merge - <one line summary>"
git push origin fix/ci-hotfix
```

Then create a PR using `mcp__github__create_pull_request`:
- owner: `baburam1985`
- repo: `RentAGame`
- title: `fix: [CI] restore green main after US-NNN`
- body: root cause and fix description
- head: `fix/ci-hotfix`
- base: `main`

Then merge immediately using `mcp__github__merge_pull_request`:
- mergeMethod: `squash`
- commitTitle: `fix: [CI] restore green main after US-NNN - <summary>`

Clean up:
```bash
git checkout main
git pull origin main
git branch -d fix/ci-hotfix
```

Output:
```
CI FIXED: main restored to green
Broken by: merge of US-NNN
Root cause: <description>
Fix: <description>
Files changed: <list>
Hotfix PR: #N merged to main
```

### Step 9 — Run full Docker suite to confirm

```bash
cd /home/user/RentAGame
docker-compose run --rm unit-tests 2>&1 | tail -10
docker-compose up --abort-on-container-exit --exit-code-from e2e-tests e2e-tests 2>&1 | tail -20
docker-compose down
```

If still failing, repeat Steps 5–8 for the remaining failures.

---

## Rules

- NEVER modify test files — only fix implementation code
- NEVER cast to `any` to silence TypeScript errors
- NEVER skip or remove tests
- Fix the root cause — do not patch around failures
- Keep fixes minimal and focused
- **NEVER push code directly to `main`** — always use a `fix/ci-hotfix` branch
  and merge via a Pull Request (see Step 8)

## Stop Condition

This agent never outputs `<promise>COMPLETE</promise>` — it runs indefinitely
as a guardian. Each run either exits cleanly (green) or fixes and exits.
