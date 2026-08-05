---
type: manual-tests
title: "Manual Tests — Agent SDK Headless Orchestrator"
description: "Manual test scenarios validating sddk run against its functional requirements."
status: approved
work_item: orc-1-agent-sdk-runner
work_type: features
timestamp: 2026-08-05T00:00:00Z
traces:
  - rel: tests
    target: srs.md
---

# Manual Tests — Agent SDK Headless Orchestrator

## MT-1 — Precondition gate (FR-002)
1. Pick a work item whose `srs.md` is `status: draft`.
2. Run `sddk run <item>`.
- **Expected**: non-zero exit; message names the unmet precondition (spec not approved); no stage runs; no worktree created.

## MT-2 — Happy path (FR-001, FR-003, FR-004, FR-006, FR-007, FR-008, FR-010)
1. Use a work item with `srs.md` `status: approved` and a valid `ANTHROPIC_API_KEY` in the env.
2. Run `sddk run <item>`.
- **Expected**: SDD→Planning→Dev→Review run in order in a worktree; verifier returns PASS; worktree merged into base; anchor status becomes `verified`; exit code `0`; a `runs/<runid>.json` report with `result: "verified"` and one entry per stage.

## MT-3 — Verification exhaustion (FR-005, FR-006)
1. Force the verifier to FAIL (e.g. a spec obligation the Dev stage cannot satisfy).
2. Run `sddk run <item>`.
- **Expected**: the DEV/REVIEW loop retries up to 3 times, then aborts; worktree/branch left intact (NOT merged); anchor NOT set to `verified`; non-zero exit; report `result: "aborted"` listing the verifier violations.

## MT-4 — Env-only credentials (FR-009)
1. Unset `ANTHROPIC_API_KEY`.
2. Run `sddk run <item>`.
- **Expected**: fails fast with a clear message; no partial run; the key never appears in stdout, logs, or the JSON report.

## MT-5 — Core stays zero-dependency (SDD §2)
1. Install only the core `sddk` (without the `orc` package).
2. Run `sddk run <item>`.
- **Expected**: `sddk run` detects `orc` is absent and prints how to install it, exiting non-zero — without having required the Agent SDK for the core install.

## MT-6 — Resume from a later stage (FR-001 `--from`)
1. On a work item that already has an approved `sdd.md`, run `sddk run <item> --from=planning`.
- **Expected**: the SDD stage is skipped; execution starts at Planning.
