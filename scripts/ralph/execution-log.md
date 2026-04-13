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
| 2026-04-13 05:46 | US-005 | dev-complete | dev | all tests pass (54/54), 2 files changed |
