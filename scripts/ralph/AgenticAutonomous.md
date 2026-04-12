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
