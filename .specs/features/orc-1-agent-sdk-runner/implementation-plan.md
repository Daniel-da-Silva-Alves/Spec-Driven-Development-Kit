---
type: implementation-plan
title: "Implementation Plan — Agent SDK Headless Orchestrator"
description: "Phased microtasks to build the orc package (sddk run), ordered by dependency layer."
status: approved
work_item: orc-1-agent-sdk-runner
work_type: features
timestamp: 2026-08-05T00:00:00Z
traces:
  - rel: plans
    target: sdd.md
---

# Implementation Plan — Agent SDK Headless Orchestrator

Microtasks are ordered so each depends only on earlier ones. References point to specific SRS/SDD sections.

## Phase 1: Setup

- [ ] **1.1: Scaffold the `orc/` package**
  - 📎 SDD: [§2 Module Structure](sdd.md) · 📎 Spec: [FR-001](srs.md)
  - 📎 Standards: [architecture rule 1 (zero-dep core)](../../standards/architecture.md), [naming §1](../../standards/naming-conventions.md)
  - 📁 `orc/package.json` (dep `@anthropic-ai/claude-agent-sdk`, devDep `typescript`), `orc/tsconfig.json`
  - ✅ Done: `cd orc && npx tsc --noEmit` runs clean on an empty `src/`

## Phase 2: Core primitives (no Agent SDK yet)

- [ ] **2.1: `specs.ts` — read/advance OKF status**
  - 📎 SDD: [§7 CLI precondition](sdd.md) · 📎 Spec: [FR-002](srs.md), [FR-007](srs.md)
  - 📎 Standards: [coding §5 (CRLF tolerance)](../../standards/coding-standards.md)
  - 📁 `orc/src/specs.ts`
  - ✅ Done: reads anchor-spec `status` (tolerating CRLF + inline comments) and writes an advanced status; unit-tested
- [ ] **2.2: `report.ts` — RunReport + JSON writer**
  - 📎 SDD: [§6 Report Schema](sdd.md) · 📎 Spec: [FR-008](srs.md)
  - 📁 `orc/src/report.ts`
  - ✅ Done: builds the report object and writes `.specs/features/{item}/runs/<runid>.json`; never includes secrets
- [x] **2.3: `worktree.ts` — git worktree lifecycle**
  - 📎 SDD: [§5 Worktree Mechanics](sdd.md) · 📎 Spec: [FR-004](srs.md), [FR-006](srs.md)
  - 📁 `orc/src/worktree.ts`
  - ✅ Done: `add` / `merge` / `remove` against a temp git repo in tests; base tree untouched until merge

## Phase 3: Agent SDK integration

- [ ] **3.1: `stages.ts` — per-stage runner + verifier**
  - 📎 SDD: [§4 Agent SDK Integration](sdd.md) · 📎 Spec: [FR-003](srs.md), [FR-005](srs.md), [FR-009](srs.md)
  - 📁 `orc/src/stages.ts`
  - ✅ Done: `runStage(stage, ctx)` issues one `query()` loading the matching skill; `runVerifier()` returns structured `{verdict, violations}`; behind a seam for test injection

## Phase 4: Orchestration

- [x] **4.1: `pipeline.ts` — sequential state machine + verification loop**
  - 📎 SDD: [§3 Orchestration Design](sdd.md) · 📎 Spec: [FR-005](srs.md), [FR-006](srs.md), [FR-007](srs.md)
  - 📁 `orc/src/pipeline.ts`
  - ✅ Done: runs stages in order; loop cap 3; PASS→merge+advance `verified`; exhaustion→abort (no merge)
- [x] **4.2: `run.ts` — orchestrate() entry**
  - 📎 SDD: [§3](sdd.md), [§7](sdd.md) · 📎 Spec: [FR-002](srs.md), [FR-008](srs.md)
  - 📁 `orc/src/run.ts`
  - ✅ Done: precondition gate (refuse if not `approved`) → pipeline → report; injects `runid`/timestamps (no `Date.now`/random in logic)

## Phase 5: CLI integration

- [ ] **5.1: `sddk run` subcommand in the core CLI**
  - 📎 SDD: [§2 (lazy resolve)](sdd.md), [§7 (interface/exit codes)](sdd.md) · 📎 Spec: [FR-001](srs.md), [FR-010](srs.md)
  - 📎 Standards: [architecture rule 1](../../standards/architecture.md) (core stays zero-dep)
  - 📁 `bin/cli.js`
  - ✅ Done: `sddk run <item> [--from]` lazily resolves `orc`; if absent, prints install hint + non-zero; exit `0` only on `verified`

## Phase 6: Tests

- [ ] **6.1: unit + seam tests**
  - 📎 SDD: [§9 Testing Strategy](sdd.md)
  - 📁 `orc/test/*.mjs` (or `.test.ts`)
  - ✅ Done: `specs`, `report`, `worktree` covered; a fake `runStage` exercises `pipeline` happy-path + exhaustion without a live API
