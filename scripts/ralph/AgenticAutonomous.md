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
│    └─ Reads research.json → vets items → prd.json           │
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

| Agent | Instructions | Schedule | Trigger Prompt |
|-------|-------------|----------|----------------|
| Research | `RESEARCH.md` | Every 6h — `0 */6 * * *` | `Read and follow /home/user/RentAGame/scripts/ralph/RESEARCH.md` |
| PM | `PM.md` | Every 10 min — `*/10 * * * *` | `Read and follow /home/user/RentAGame/scripts/ralph/PM.md` |
| Dev | `DEV.md` | Every 5 min — `*/5 * * * *` | `Read and follow /home/user/RentAGame/scripts/ralph/DEV.md` |
| QA | `QA.md` | Every 5 min — `*/5 * * * *` | `Read and follow /home/user/RentAGame/scripts/ralph/QA.md` |
| CI-Fix | `CI.md` | Every 5 min — `*/5 * * * *` | `Read and follow /home/user/RentAGame/scripts/ralph/CI.md` |

All triggers: repo `baburam1985/RentAGame`, branch `main`.

---

## Shared State Files

| File | Written by | Read by | Purpose |
|------|-----------|---------|---------|
| `PRODUCT.md` | humans only | ALL agents (Step 0) | Authoritative product spec — non-negotiables, scope, constraints |
| `prd.json` | PM, Dev, QA | All agents | Story backlog — single source of truth |
| `research.json` | Research | PM | Raw ideas/bugs from external research |
| `progress.txt` | Dev | Dev | Codebase patterns and learnings |

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
  │  All pass                    │  Any fail
  ▼                              ▼
QA merges feat/US-NNN → main   qa-failed
  │  merge confirmed             (back to Dev with qaFeedback)
  ▼
qa-passed  ← status set ONLY after merge succeeds
(branch deleted)
```

> **Rule**: `qa-passed` is set **after** the merge, never before. A story whose
> branch has not been merged into `main` is not complete, regardless of QA check
> results.

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
  "qaAttempts": 0
}
```

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
| Dev | State files only | `prd.json`, `progress.txt` |
| QA | State files only | `prd.json` (after merging via PR) |
| CI-Fix | **No code** | Uses `fix/ci-hotfix` branch → PR → merge |
| PM | State files only | `prd.json`, `research.json` |
| Research | State files only | `research.json` |

Code reaches `main` **exclusively** through Pull Requests validated by the QA
agent and merged via the GitHub API (`mcp__github__merge_pull_request`).

**Every feature branch MUST be merged into `main` once its user story reaches
`qa-passed`. No exceptions.** A story is never considered done until its branch
is merged. The QA agent is responsible for completing this merge as the final
step of the QA pass.

---

## Branch Merge Policy

| Rule | Detail |
|------|--------|
| Merge is mandatory | Every `feat/US-NNN` branch MUST be merged into `main` after `qa-passed` |
| No long-lived feature branches | A feature branch must not outlive its user story's QA pass |
| QA owns the merge | QA calls `mcp__github__merge_pull_request` immediately after all checks pass |
| Status update is atomic | `prd.json` status is set to `qa-passed` **only after** the merge succeeds |
| Branch deletion after merge | QA deletes the feature branch via the GitHub API after a successful merge |
| Blocked merge = story stays `ci-pending` | If the merge fails (conflict, CI red), QA sets status back to `qa-failed` and adds `qaFeedback` for Dev |

### QA Merge Sequence (mandatory order)

```
1. All 8 QA checks pass
2. Call mcp__github__merge_pull_request  ← merge feat/US-NNN → main
3. Confirm merge success (check HTTP 200 / merged: true)
4. Update prd.json: status → "qa-passed"
5. Push prd.json to main
6. Delete remote branch feat/US-NNN
```

If step 2 fails, **do not** advance the status to `qa-passed`. Set status to
`qa-failed`, record the merge error in `qaFeedback`, and let Dev retry.

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
| QA marking `qa-passed` before merging | Branch Merge Policy: status advances only after `merge_pull_request` succeeds |
| Feature branch left unmerged after QA | Branch Merge Policy mandates merge + deletion as final QA step |

`PRODUCT.md` is written by humans only — agents read it, never modify it.

---

## How to Start the Pipeline

1. Ensure all 5 triggers exist at **https://claude.ai/code/scheduled**
   (see Agent Registry table above for prompts and schedules)
2. Ensure `main` branch is green: `docker-compose run --rm unit-tests`
3. Verify `prd.json` has stories with `status: "pending"`
4. Agents self-coordinate via `prd.json` — no manual intervention needed

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
