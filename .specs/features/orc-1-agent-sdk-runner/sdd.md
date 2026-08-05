---
type: sdd
title: "SDD — Agent SDK Headless Orchestrator"
description: "Design for the sddk run orchestrator: a separate TypeScript package that sequentially drives the shipped skills + sddk:verifier via the Agent SDK, isolating code in a git worktree."
status: approved
work_item: orc-1-agent-sdk-runner
work_type: features
tags: [orc]
timestamp: 2026-08-05T00:00:00Z
traces:
  - rel: refines
    target: srs.md
  - rel: governed-by
    target: ../../standards/architecture.md
  - rel: governed-by
    target: ../../standards/coding-standards.md
---

# System Design Document (SDD)
## Agent SDK Headless Orchestrator

**Version**: 1.0
**Date**: 2026-08-05
**Project**: SDDK — Spec-Driven Development Kit
**Feature**: orc-1-agent-sdk-runner

---

## 1. Overview & Scope

Design for `sddk run <work-item>`: a headless orchestrator that, given an **approved** spec, drives `SDD → Planning → Dev → Code Review` by invoking the shipped SDDK skills and the `sddk:verifier` subagent through the Anthropic Agent SDK. Control flow is **deterministic and code-driven** (the orchestrator sequences stages and the verification loop; the model executes each stage). Implements [srs.md](srs.md) FR-001…FR-010.

---

## 2. Module Structure & Dependency Isolation

`orc` ships as a **separate package** so the core `sddk` installer stays zero-dependency (SRS §2.4, [architecture](../../standards/architecture.md) rule 1). The heavy `@anthropic-ai/claude-agent-sdk` dependency is pulled only when a user opts into headless mode.

```
orc/                         # separate npm package (@daniel-da-silva-alves/sddk-orc)
├── package.json             # deps: @anthropic-ai/claude-agent-sdk ; devDeps: typescript
├── tsconfig.json
├── src/
│   ├── run.ts               # entry: orchestrate(workItem, opts)
│   ├── pipeline.ts          # sequential stage state machine + verification loop
│   ├── stages.ts            # per-stage Agent SDK invocation (SDD/Planning/Dev/Review)
│   ├── worktree.ts          # git worktree create / merge / cleanup
│   ├── specs.ts             # read/advance OKF status in .specs/ (reuses gate parsing)
│   └── report.ts            # RunReport assembly + JSON write
└── dist/                    # tsc output (committed or built on publish)
```

- **Build**: TypeScript compiled with `tsc` to `dist/` (`typescript` is a devDep only). Realizes FR-001’s TS/Node choice.
- **Invocation**: the core `bin/cli.js` gains a `run` subcommand that lazily resolves the `orc` package and calls `orchestrate()`. If `orc` is not installed, `sddk run` prints an install hint and exits non-zero (keeps the core zero-dep).

---

## 3. Orchestration Design (deterministic state machine)

`pipeline.ts` runs a fixed ordered list of stages, each wrapped in a bounded verification loop. Pseudocode:

```
stages = [SDD, PLANNING, DEV, REVIEW]           // start index from --from (default SDD)
for stage in stages:
    for attempt in 1..3:                        // FR-005 cap = 3
        result = runStage(stage)                // §4
        if stage is DEV or REVIEW:
            verdict = runVerifier()             // sddk:verifier
            if verdict.pass: break
            else: feedback = verdict.violations ; continue
        else: break
    if not passed after 3: return abort(report) // FR-005/FR-006 — no merge
mergeWorktree()                                  // FR-006 on success
advanceStatus('verified')                        // FR-007
return report(result='verified')                 // FR-008
```

- Only DEV/REVIEW run the verifier loop; SDD/PLANNING are generative stages validated by their own skill completion.
- Exhaustion → `abort` (worktree kept, not merged, `result: aborted`). Realizes BR-001/BR-002.

---

## 4. Agent SDK Integration

- **One `query()` per stage** (not a single agentic loop), so ordering stays in code. Each call sets `allowedTools`, `cwd` (the worktree for DEV), and the relevant SDDK skill.
- **Skills**: each stage loads the matching shipped skill (`system-design-document`, `implementation-planning`, `fullstack-development`, `code-review`) — the orchestrator does not reimplement stage logic ([architecture](../../standards/architecture.md) rule 2).
- **Verifier**: invoked as the `sddk:verifier` agent with a `StructuredOutput` schema yielding `{ verdict: 'PASS'|'FAIL', violations: [...] }`.
- **Auth**: the SDK reads `ANTHROPIC_API_KEY` from the environment (FR-009); the orchestrator never receives or logs it.

---

## 5. Worktree & Merge Mechanics (`worktree.ts`)

- On run start: `git worktree add <tmp> -b sddk/run/<work-item>-<runid>` off the current HEAD. (`runid` is passed in, since scripts can't use random/time — see §9.)
- DEV stage runs with `cwd = worktree path`.
- On verified success: fast-forward/merge the run branch into the base branch, then `git worktree remove`.
- On abort: leave the worktree and branch intact for inspection; do not merge (FR-004/FR-006).

---

## 6. Run Report Schema (`report.ts`, FR-008)

```json
{
  "workItem": "orc-1-agent-sdk-runner",
  "result": "verified | aborted | failed",
  "startedAt": "<iso>", "finishedAt": "<iso>",
  "stages": [
    { "stage": "sdd", "attempts": 1, "outcome": "ok",
      "verifier": null, "tokens": 0, "durationMs": 0 },
    { "stage": "dev", "attempts": 2, "outcome": "ok",
      "verifier": { "verdict": "PASS", "violations": [] }, "tokens": 0, "durationMs": 0 }
  ],
  "worktree": { "branch": "sddk/run/...", "merged": true }
}
```

Written to `.specs/features/{work-item}/runs/<runid>.json`. Never contains secrets (FR-009).

---

## 7. CLI Interface

- `sddk run <work-item> [--from=sdd|planning|dev|review]` — default `--from=sdd`.
- Precondition (FR-002): read the anchor spec `status` via the same frontmatter parsing as `sddk-gate.mjs`; if not `approved`, exit non-zero with a clear message.
- Exit codes (FR-010): `0` only when `result === 'verified'`; non-zero otherwise.

---

## 8. Error Handling & Determinism

- Fail-safe ([coding](../../standards/coding-standards.md) §3): any unrecoverable error → abort without merge, `result: 'failed'`, report written.
- **No `Math.random`/`Date.now` in orchestration seeds** where reproducibility matters: `runid` and timestamps are injected by the CLI entry (captured once at process start) and threaded through, keeping stage logic deterministic and testable.

---

## 9. Testing Strategy

- Unit: `specs.ts` (status parsing incl. CRLF + inline comments), `report.ts` (schema), `worktree.ts` (against a temp git repo) — `node:test`, mirroring `tests/validate-plugin.mjs`.
- The Agent SDK calls are wrapped behind a small `runStage` seam so tests can inject a fake stage runner (no live API in CI).

---

## 10. Documentation Sources

| Technology | Priority source |
|:---|:---|
| Anthropic Agent SDK (TS) | Official docs (pin to installed version) → `@anthropic-ai/claude-agent-sdk` README |
| git worktree | `git help worktree` (local) |
| Node ≥18 APIs | Official Node docs (pinned) |

> Lookup hierarchy for Dev/Review: local docs → official URL (version-pinned) → web search. Never rely on training data for SDK/API specifics.
