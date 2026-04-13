# Execution Log

Every agent appends a line here when a story changes status. This gives both
humans and the Retro agent a clear timeline of what happened and when.

## Format

```
| Timestamp (UTC) | Story | Status | Agent | Note |
```

## Log

| Timestamp | Story | Status | Agent | Note |
|-----------|-------|--------|-------|------|
| 2026-04-13 03:50 | US-001 | qa-passed | qa | merged to main, 3 QA attempts, CI dockerignore issues |
| 2026-04-13 03:50 | US-002 | ci-pending | qa | PR #3 created, waiting for CI |
| 2026-04-13 03:50 | US-003 | qa-failed | qa | E2E tests failed on feat/US-003-sort-games |
| 2026-04-13 04:30 | US-004 | ci-pending | qa | PR #8 created, waiting for CI |
| 2026-04-13 04:42 | US-002 | qa-failed | qa | CI E2E Tests failed (job 71016168942) — branch has merge conflicts with main; needs rebase + E2E investigation |
| 2026-04-13 04:45 | US-004 | qa-failed | qa | CI E2E failed — catalog.spec.ts expects 8 game cards but app has 12; update e2e/catalog.spec.ts toHaveCount(8) to toHaveCount(12) |

## Retro: US-001 - Search bar with live text filtering
- **QA attempts:** 3
- **Issues found:**
  - CI environment issue: Global `.dockerignore` excluded `*.test.ts`, `*.test.tsx`, and `vitest.config.ts` — the test Docker container had no test files, causing vitest to exit non-zero with zero results (not an assertion failure). Root cause was misdiagnosed twice (musl/glibc binary mismatch, Alpine apk packages) before the real fix: per-Dockerfile `.dockerignore` overrides (`Dockerfile.unit-tests.dockerignore`, `Dockerfile.e2e-tests.dockerignore`).
  - Slow iteration: 3 QA round-trips, all caused by CI infrastructure, not code logic. Dev pre-validation in Docker locally should have caught this before the first push.
  - Post-merge CI break: `console.log` left in `RentalForm.tsx` (a protected component) caused E2E tests to fail on main immediately after merge, requiring a CI hotfix PR.
- **Improvements applied:**
  - DEV.md (Step 6): Added warning — if Docker unit tests produce zero results (not assertion failures), check per-Dockerfile `.dockerignore` before assuming a code bug.
  - DEV.md (Step 6a): Added mandatory pre-commit `grep` for `console.log` across all source files — concrete automated check, not just a doc note.
  - CI.md (Step 5): Added two new diagnostic entries — (1) vitest zero-results = env-failure, check `.dockerignore`; (2) E2E fails on all assertions = check for `console.log` in production code.
- **Pipeline health:** degrading — US-001 required 3 QA attempts and a post-merge hotfix. Target is ≤1 QA attempt per story. CI environment issues need to be caught locally before first push.
---
| 2026-04-13 05:26 | US-002 | ci-pending | qa | PR #7 updated with clean TDD implementation, waiting for CI |
| 2026-04-13 05:26 | US-004 | ci-pending | qa | PR #8 updated with E2E count fix, waiting for CI |
| 2026-04-13 06:00 | US-005 | qa-failed | qa | env-failure: E2E catalog.spec.ts "clicking Lawn Games filter" — GameCard.tsx missing category badge after commit 88e076e; PR #10 |
| 2026-04-13 06:00 | US-006 | qa-failed | qa | env-failure: same systemic E2E failure; PR #11 |
| 2026-04-13 06:00 | US-007 | qa-failed | qa | env-failure: same systemic E2E failure; PR #12 |
| 2026-04-13 06:00 | US-008 | qa-failed | qa | env-failure: same systemic E2E failure; PR #13 |
| 2026-04-13 06:00 | US-009 | qa-failed | qa | env-failure: same systemic E2E failure; PR #14 |
| 2026-04-13 06:00 | US-010 | qa-failed | qa | env-failure: same systemic E2E failure; PR #15 |
| 2026-04-13 06:00 | US-011 | qa-failed | qa | env-failure: same systemic E2E failure; PR #16 |
| 2026-04-13 06:00 | US-012 | ci-pending | qa | PR #17 created, waiting for CI |
| 2026-04-13 06:00 | US-013 | ci-pending | qa | PR #18 created, waiting for CI |
| 2026-04-13 06:00 | US-014 | ci-pending | qa | PR #19 created, waiting for CI |

## Retro: [US-003] - Sort games by price or name
- **QA attempts:** 1
- **Issues found:**
  - Flaky E2E: `catalog.spec.ts` hardcoded `toHaveCount(8)` — broke when catalog grew to 12 games. Same root cause as US-004. CI-Fix hotfix PR #9 replaced both assertions with `toBeGreaterThanOrEqual(8)`.
  - Stale branch: `feat/US-003-sort-games` needed a full rebase to `feat/US-003-sort-games-rebased-merged` before CI passed — 1 extra QA round-trip.
- **Improvements applied:**
  - DEV.md (Step 6a): Added mandatory E2E catalog count check — `grep toHaveCount web/e2e/` before push when story touches catalog visibility.
  - DEV.md (Step 4): Added note — rebase on origin/main immediately before the RED commit to prevent entangled branch history.
  - patterns.md: Documented E2E catalog count fragility pattern with root cause and fix convention.
- **Pipeline health:** improving — US-003 had 1 QA attempt (down from US-001's 3). Recurring E2E count breakage is now addressed at root (PR #9 + DEV.md check). Target remains ≤1 QA attempt per story.
---
| 2026-04-13 07:19 | US-005 | dev-complete | dev | rebased on main after env-failure fix, all 54 tests pass |
| 2026-04-13 07:20 | US-006 | in-progress | dev | picking up qa-failed story for env-failure fix |
| 2026-04-13 07:21 | US-006 | dev-complete | dev | rebased on main after env-failure fix, all 54 tests pass |
