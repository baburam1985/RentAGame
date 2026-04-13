# AgenticAutonomous — RentAGame Pipeline Orchestrator

This file describes the full autonomous agent pipeline for RentAGame. Reading
it is enough to understand how the entire system works end-to-end and how to
start, stop, or extend it.

---

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  RENTAGAME AGENTIC PIPELINE                 │
│                                                             │
│  RESEARCH (every 6h)                                        │
│    └─ Searches 6 external categories                        │
│    └─ Generates 20+ ideas/bugs → research.json              │
│                    │                                        │
│                    ▼                                        │
│  PM (every 10 min)                                          │
│    └─ Reads research.json → vets items → prd.csv + stories/  │
│    └─ Keeps backlog healthy (pending ≥ 3)                   │
│    └─ Rewrites failing acceptance criteria                  │
│                    │                                        │
│                    ▼                                        │
│  DEV (every 5 min)                                          │
│    └─ Picks highest-priority pending or qa-failed story     │
│    └─ Creates feat/US-NNN branch                            │
│    └─ RED commit (failing tests)                            │
│    └─ GREEN commit (implementation passes tests)            │
│    └─ Sets status: dev-complete                             │
│                    │                                        │
│                    ▼                                        │
│  QA (every 5 min)                                           │
│    └─ Creates PR: feat/US-NNN → main                        │
│    └─ Check 0: waits for GitHub CI green                    │
│    └─ Checks 1–8: TDD integrity + Docker tests              │
│    └─ PASS → merges PR → status: qa-passed                  │
│    └─ FAIL → status: qa-failed + qaFeedback → back to Dev   │
│                    │                                        │
│                    ▼                                        │
│  CI-FIX (every 5 min)                                       │
│    └─ Runs Docker tests on main                             │
│    └─ Fixes any broken build, commits, pushes               │
│                    │                                        │
│                    ▼                                        │
│            main (always green)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Agent Registry

Run agents **sequentially** in the order listed below. Each agent completes
its task before the next one starts.

| # | Agent | Instructions | Trigger Prompt |
|---|-------|-------------|----------------|
| 1 | Research | `RESEARCH.md` | `Read and follow /home/user/RentAGame/scripts/ralph/RESEARCH.md` |
| 2 | PM | `PM.md` | `Read and follow /home/user/RentAGame/scripts/ralph/PM.md` |
| 3 | Dev | `DEV.md` | `Read and follow /home/user/RentAGame/scripts/ralph/DEV.md` |
| 4 | QA | `QA.md` | `Read and follow /home/user/RentAGame/scripts/ralph/QA.md` |
| 5 | CI-Fix | `CI.md` | `Read and follow /home/user/RentAGame/scripts/ralph/CI.md` |
| 6 | Retro | `RETRO.md` | `Read and follow /home/user/RentAGame/scripts/ralph/RETRO.md` |

Repo: `baburam1985/RentAGame`, branch `main`.

---

## Shared State Files

| File | Written by | Read by | Purpose |
|------|-----------|---------|---------|
| `PRODUCT.md` | humans only | ALL agents (Step 0) | Authoritative product spec — non-negotiables, scope, constraints |
| `prd.csv` | PM, Dev, QA | All agents | Story dashboard — status, branch, QA attempts (replaces prd.json) |
| `stories/*.md` | PM, Dev, QA | All agents | Full detail per story — acceptance criteria, dev notes, QA feedback |
| `research.json` | Research | PM | Raw ideas/bugs from external research |
| `patterns.md` | Dev, Retro | Dev, Retro | Reusable codebase knowledge (replaces progress.txt patterns section) |
| `execution-log.md` | Dev, QA, PM, CI, Retro | Retro, humans | Human-readable timeline of all status changes |

---

## Story Lifecycle

```
pending
  │  Dev picks up
  ▼
in-progress
  │  Dev writes tests
  ▼
tests-written  (RED commit on feat/US-NNN branch)
  │  Dev implements
  ▼
dev-complete   (GREEN commit, Docker passing)
  │  QA creates PR
  ▼
ci-pending     (waiting for GitHub Actions)
  │  CI passes
  ▼
[QA checks 1–8]
  │  All pass          │  Any fail
  ▼                    ▼
qa-passed          qa-failed
(merged to main)   (back to Dev with qaFeedback)
```

---

## Story ID Conventions

| Element | Format | Example |
|---------|--------|---------|
| Story ID | `US-NNN` | `US-001` |
| Research item ID | `R-NNN` | `R-001` |
| Feature branch | `feat/US-NNN-short-title` | `feat/US-001-search-filter` |
| RED commit | `test: [US-NNN] RED - failing tests` | `test: [US-001] RED - failing tests` |
| GREEN commit | `feat: [US-NNN] GREEN - implementation` | `feat: [US-001] GREEN - implementation` |
| Lock commit | `chore: [US-NNN] mark in-progress` | |
| Merge commit | `merge: [US-NNN] Title - QA passed` | |
| CI fix commit | `fix: [CI] restore green main after US-NNN` | |

---

## Git Config Per Agent

Each agent sets its own identity before committing:

| Agent | Email | Name |
|-------|-------|------|
| PM | `pm-agent@rentagame.ai` | PM Agent |
| Dev | `dev-agent@rentagame.ai` | Dev Agent |
| QA | `qa-agent@rentagame.ai` | QA Agent |
| CI-Fix | `ci-agent@rentagame.ai` | CI Agent |
| Research | `research-agent@rentagame.ai` | Research Agent |

---

## prd.json Story Schema

```json
{
  "id": "US-NNN",
  "epic": "Discovery | Checkout & Payments | User Accounts | Admin Dashboard",
  "title": "Short story title",
  "description": "Full description",
  "acceptanceCriteria": ["criterion 1", "criterion 2"],
  "priority": 1,
  "status": "pending | in-progress | tests-written | dev-complete | ci-pending | qa-failed | qa-passed",
  "passes": false,
  "branch": "feat/US-NNN-short-title",
  "prNumber": 0,
  "devNotes": "",
  "qaFeedback": "",
  "qaAttempts": 0,
  "filesChanged": [],
  "history": []
}
```

### `filesChanged` field

Dev populates this in Step 7 with the list of files modified for the story:
```json
"filesChanged": ["web/src/components/SearchBar.tsx", "web/src/components/GameGrid.tsx", "web/src/app/page.tsx"]
```

### Execution Log (human-readable timeline)

Instead of a JSON `history` array (hard to read), all agents append to
`scripts/ralph/execution-log.md` — a markdown table that humans and the
Retro agent can both scan easily:

```markdown
| Timestamp | Story | Status | Agent | Note |
|-----------|-------|--------|-------|------|
| 2026-04-13 10:00 | US-001 | in-progress | dev | picked up story |
| 2026-04-13 10:15 | US-001 | tests-written | dev | 6 test cases |
| 2026-04-13 10:45 | US-001 | dev-complete | dev | all tests pass, 3 files changed |
| 2026-04-13 11:00 | US-001 | ci-pending | qa | PR #7 created |
| 2026-04-13 11:30 | US-001 | qa-failed | qa | Check 9: scope violation — Hero.tsx modified |
| 2026-04-13 12:30 | US-001 | qa-passed | qa | all 10 checks passed |
```

**Rules:**
- Agents APPEND a row — never delete or rewrite existing rows
- Use UTC timestamps: `date -u +"%Y-%m-%d %H:%M"`
- On QA failure, the Note MUST include which check failed and why
- The Retro agent reads this log to analyze cycle time and failure patterns

---

## research.json Item Schema

```json
{
  "id": "R-NNN",
  "type": "idea | ux-bug | accessibility | trust | performance | conversion",
  "title": "Short title",
  "description": "What the problem or opportunity is",
  "source": "URL or platform",
  "confidence": "high | medium | low",
  "effort": "small | medium | large",
  "status": "pending | accepted | rejected",
  "pmVerdict": "accepted | rejected: reason",
  "convertedToStory": "US-NNN or empty"
}
```

---

## Current Epics (original backlog)

| Range | Epic |
|-------|------|
| US-001 – US-005 | Discovery |
| US-006 – US-009 | Checkout & Payments |
| US-010 – US-013 | User Accounts |
| US-014 – US-017 | Admin Dashboard |
| US-018+ | Research-sourced stories (added dynamically by PM) |

---

## QA Checks Reference

| # | Check | Failure condition |
|---|-------|------------------|
| 0 | GitHub CI green on PR | Any job failed or cancelled |
| 1 | RED commit before GREEN | Missing commit or wrong order |
| 2 | Test files unchanged after RED | Any diff in `*.test.*` between RED and GREEN |
| 3 | No skipped tests | Any `.skip(` in test files |
| 4 | No trivial assertions | `expect(true)`, `expect(1).toBe(1)`, etc. |
| 5 | Test count ≥ criteria count | Fewer tests than acceptance criteria |
| 6 | TypeScript clean | Any `tsc --noEmit` errors |
| 7 | Docker unit tests | Any Vitest failure |
| 8 | Docker E2E tests | Any Playwright failure |

---

## Non-Negotiable Git Rules

**No agent may push implementation code directly to `main`. Ever.**

| Who | May push directly to `main`? | What they push |
|-----|------------------------------|----------------|
| Dev | State files only | `prd.csv`, `stories/*.md`, `patterns.md`, `execution-log.md` |
| QA | State files only | `prd.csv`, `stories/*.md`, `execution-log.md` (after merging via PR) |
| CI-Fix | **No code** | Uses `fix/ci-hotfix` branch → PR → merge |
| PM | State files only | `prd.csv`, `stories/*.md`, `research.json` |
| Research | State files only | `research.json` |
| Humans | **Never** | Platform-enforced: branch protection + squash-only merge (enforce_admins=true) |

Code reaches `main` **exclusively** through Pull Requests validated by the QA
agent and merged via the GitHub API (`mcp__github__merge_pull_request`).

---

## Anti-Hallucination Strategy

Every agent reads `PRODUCT.md` as Step 0 before acting. This prevents:

| Hallucination risk | Mitigation |
|--------------------|-----------|
| Dev adding a real backend | Non-negotiables block it; `status: "blocked"` if attempted |
| Dev using an external library | Non-negotiables explicitly list forbidden libraries |
| PM accepting out-of-scope research | Out of Scope list is the vetting filter |
| Research generating irrelevant ideas | Step 0 + Out of Scope list pre-filters them |
| QA passing code that uses `any` | QA checks non-negotiable violations as failures |
| CI-Fix introducing workarounds | Step 0 constrains fixes to spec-compliant code |
| Agents inventing new user roles | Target Users section defines exactly two roles |
| Agents inventing new localStorage keys | `rg_` key conventions table is authoritative |
| Any agent pushing code directly to `main` | Non-Negotiable Git Rules above; QA is the only merge path |

`PRODUCT.md` is written by humans only — agents read it, never modify it.

---

## How to Start the Pipeline

### Step 0: Configure GitHub Repo (one-time, run from repo root)

Lock the repo so `main` can only be updated via squash-merged PRs — matching
what the QA agent does programmatically. `enforce_admins=true` is safe because
CI-Fix handles all CI breakage via `fix/ci-hotfix` branches; no human escape
hatch to `main` is needed.

**a) Restrict merge methods to squash only:**
```bash
gh api repos/baburam1985/RentAGame \
  --method PATCH \
  -f allow_squash_merge=true \
  -f allow_merge_commit=false \
  -f allow_rebase_merge=false \
  -f squash_merge_commit_title=PR_TITLE \
  -f squash_merge_commit_message=BLANK
```

**b) Protect `main` branch — require CI on PRs, enforce squash rule for everyone including admins:**
```bash
gh api repos/baburam1985/RentAGame/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ci"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews=null \
  --field restrictions=null
```

> **Note:** Direct pushes to `main` remain allowed so agents can commit state
> files (`prd.csv`, `stories/*.md`, `execution-log.md`) without a PR.
> `enforce_admins=true` ensures that when a PR *is* merged, the squash-only
> rule applies to everyone — no admin bypass of the merge method.

Verify:
```bash
gh api repos/baburam1985/RentAGame \
  | jq '{squash: .allow_squash_merge, merge: .allow_merge_commit, rebase: .allow_rebase_merge}'
# Expected: { "squash": true, "merge": false, "rebase": false }
```

### Step 1–4 (pipeline startup)

1. Ensure all 5 triggers exist at **https://claude.ai/code/scheduled**
   (see Agent Registry table above for prompts and schedules)
2. Ensure `main` branch is green: `docker-compose run --rm unit-tests`
3. Verify `prd.csv` has stories with `status: "pending"`
4. Agents self-coordinate via `prd.csv` — no manual intervention needed

## How to Pause

Disable any trigger at https://claude.ai/code/scheduled. In-flight work
is safe — `prd.json` preserves all state. Re-enable to resume.

## How to Add a New Story Manually

Add to `prd.json` following the schema above. Set `status: "pending"` and
assign the next US-NNN ID. PM and Dev will pick it up automatically.

## How to Extend the Pipeline

To add a new agent:
1. Create a new `AGENTNAME.md` in `scripts/ralph/`
2. Add a new trigger at https://claude.ai/code/scheduled
3. Update this file's Agent Registry and pipeline diagram
4. If the agent reads/writes shared state, document it in the Shared State
   Files table
