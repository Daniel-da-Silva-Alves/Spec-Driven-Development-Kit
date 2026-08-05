---
type: srs
title: "SRS — Agent SDK Headless Orchestrator"
description: "Headless CLI (sddk run) that executes the SDDK pipeline from an approved spec via the Anthropic Agent SDK, with an automatic verification loop and worktree isolation."
status: approved
work_item: orc-1-agent-sdk-runner
work_type: features
tags: [orc]
timestamp: 2026-08-05T00:00:00Z
---

# Software Requirements Specification (SRS)
## Agent SDK Headless Orchestrator

**Version**: 1.0
**Date**: 2026-08-05
**Project**: SDDK — Spec-Driven Development Kit
**Feature**: orc-1-agent-sdk-runner

---

## 1. Introduction

### 1.1 Purpose
Specifies a headless orchestrator that runs the SDDK pipeline non-interactively, starting from an already-approved specification. It lets a developer execute `SDD → Planning → Dev → Code Review` in one command, with the same skills and enforcement used interactively, driven programmatically by the Anthropic Agent SDK.

### 1.2 Scope
**In scope:** a `sddk run` CLI command (TypeScript/Node) that drives the existing SDDK skills and the `sddk:verifier` subagent from an approved `srs.md`, isolates code changes in a git worktree, runs an automatic per-stage verification loop, advances the OKF `status` lifecycle, and emits a structured JSON run report.

**Out of scope:** the Specification stage's Socratic interview (a headless run cannot interview a human); it therefore requires a spec already at `status: approved`. Also out of scope for this feature: CI/CD wrappers and a Python SDK variant (possible later phases).

### 1.3 Definitions, Acronyms, and Abbreviations
- **Agent SDK** — `@anthropic-ai/claude-agent-sdk`, the Anthropic Agent SDK for Node.
- **Work item** — a directory under `.specs/{type}/{name}/` holding a spec bundle.
- **Anchor spec** — the work item's spec document (`srs.md` for features) whose `status` tracks the pipeline stage.
- **Verification loop** — stage → `sddk:verifier` → retry-on-FAIL, bounded by an iteration cap.
- **Worktree** — an isolated `git worktree` where the Dev stage writes code.

### 1.4 References
- ADR-0001 — `doc/adr/0001-sddk-memoria-okf-plugin-com-enforcement.md` (Action Item 8).
- OKF profile — `doc/design/okf-perfil-sddk.md`.
- Anthropic Agent SDK (TypeScript) — `@anthropic-ai/claude-agent-sdk`.

### 1.5 Document Overview
Section 2 gives the general description; Section 3 the functional requirements; Section 4 non-functional; Section 5 business rules; Section 6 interfaces; Section 7 the traceability matrix.

---

## 2. General Description

### 2.1 Product Perspective
The orchestrator is a new entry point in the `plg`/`orc` surface of SDDK. It does not reimplement pipeline logic: it programmatically drives the same 5 skills and the `sddk:verifier` agent that ship in the plugin, using the Agent SDK's agent loop, subagents, and hooks.

### 2.2 Product Functions
Run the pipeline from an approved spec; isolate code in a worktree; verify each stage and retry on failure up to a cap; merge on success or abort with a report; keep the OKF `status` and `.specs/` bundle in sync.

### 2.3 User Characteristics
Primary actor: a **developer** running `sddk run` locally, comfortable with the CLI and git. Secondary (future): a CI system.

### 2.4 Constraints
- TypeScript/Node; Node ≥ 18 (matches the existing package).
- Credentials (`ANTHROPIC_API_KEY`) come from the environment only.
- Must reuse the shipped skills and `sddk:verifier`; no forked pipeline logic.

### 2.5 Assumptions and Dependencies
- The target work item exists and its anchor spec is `status: approved`.
- The repository is a git repository (worktree isolation requires it).
- The Agent SDK is available as a dependency and authenticates via env.

---

## 3. Functional Requirements

### FR-001: Headless run invocation
- **Description**: Provide `sddk run <work-item>` that executes the pipeline for the named work item non-interactively.
- **Input**: work-item identifier (folder name under `.specs/features/`, e.g. `orc-1-agent-sdk-runner`); optional `--from=<stage>` (default `sdd`).
- **Processing**: resolve the work item in the `.specs/` bundle; start at the requested stage.
- **Output**: pipeline execution + a run report (FR-008).
- **Priority**: High
- **Acceptance Criteria**: running `sddk run <valid-approved-item>` starts at the SDD stage and proceeds without prompting for input.

### FR-002: Approved-spec precondition gate
- **Description**: Refuse to run when the anchor spec is not `status: approved`.
- **Input**: the anchor spec frontmatter `status`.
- **Processing**: reuse the gate logic (`sddk-gate.mjs` parsing) to read status.
- **Output**: on failure, a clear error and a non-zero exit; no stage executes.
- **Priority**: High
- **Acceptance Criteria**: a work item at `status: draft` causes `sddk run` to exit non-zero with a message naming the unmet precondition.

### FR-003: Ordered stage execution via the Agent SDK
- **Description**: Drive `SDD → Planning → Dev → Code Review` in order, each stage invoking the corresponding shipped skill through the Agent SDK.
- **Priority**: High
- **Acceptance Criteria**: each stage runs exactly once per successful pass, in order, producing its artifact (`sdd.md`, `implementation-plan`, code, review).

### FR-004: Worktree isolation for the Dev stage
- **Description**: The Dev stage writes code inside an isolated `git worktree`, never directly in the user's working tree.
- **Priority**: High
- **Acceptance Criteria**: after a run, the user's working tree is unchanged until a merge (FR-006); code changes exist on the run's worktree/branch.

### FR-005: Automatic per-stage verification loop
- **Description**: After the Dev stage, run `sddk:verifier`; on FAIL, feed the violations back for correction and retry, up to **3** iterations per stage.
- **Input**: the verifier's PASS/FAIL verdict.
- **Processing**: loop stage → verify; increment attempt counter.
- **Output**: a PASS verdict, or exhaustion after 3 attempts.
- **Priority**: High
- **Acceptance Criteria**: a stage that fails verification is retried; the loop stops at PASS or after the 3rd failed attempt.

### FR-006: Merge-or-abort decision
- **Description**: On verifier PASS, the Code Review stage merges the worktree into the base branch; on cap exhaustion, abort without merging.
- **Priority**: High
- **Acceptance Criteria**: PASS → worktree merged and cleaned; exhaustion → worktree left intact, no merge, run marked failed.

### FR-007: OKF status advancement
- **Description**: Advance the anchor spec `status` as stages complete: `approved → implemented` (Dev done) → `verified` (verifier PASS + review complete).
- **Priority**: Medium
- **Acceptance Criteria**: a fully successful run ends with the anchor at `status: verified`; an aborted run does not set `verified`.

### FR-008: Structured run report
- **Description**: Emit a machine-readable JSON report: per-stage outcome, verifier verdicts (with violations), and per-stage token/duration metrics.
- **Priority**: High
- **Acceptance Criteria**: every run writes a JSON report with an entry per executed stage and an overall `result: verified | aborted | failed`.

### FR-009: Environment-only credentials
- **Description**: Read `ANTHROPIC_API_KEY` exclusively from the environment; never accept it as a flag, argument, or file, and never write it to logs or the report.
- **Priority**: High
- **Acceptance Criteria**: with no `ANTHROPIC_API_KEY` in the environment, the run fails fast with a clear message; the key never appears in any output artifact.

### FR-010: Deterministic exit codes
- **Description**: Exit `0` only when the run reaches `verified`; non-zero on precondition failure, verification exhaustion, or error.
- **Priority**: Medium
- **Acceptance Criteria**: CI can branch on the exit code alone to decide pass/fail.

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Bounded cost: at most 3 verification iterations per stage (FR-005). The report records token/duration per stage for later empirical analysis (ADR-0001 Action Item 7).

### 4.2 Security
- `ANTHROPIC_API_KEY` from environment only; never logged or persisted (FR-009).
- Code changes are sandboxed in a worktree until an explicit merge (FR-004/FR-006).

### 4.3 Usability
- Single command with sensible defaults (`--from=sdd`); actionable error messages on precondition failure.

### 4.4 Reliability
- Fail-safe: on any unrecoverable error the run aborts without merging and reports the failure.

### 4.5 Maintainability
- Reuse the shipped skills and `sddk:verifier` (no forked pipeline logic); TypeScript with the existing Node ≥ 18 toolchain.

---

## 5. Business Rules

### BR-001: Never merge unverified code
- **Description**: A worktree is merged only after the verifier returns PASS.
- **Condition**: end of a stage's verification loop.
- **Action**: merge on PASS; abort (no merge) otherwise.
- **Exceptions**: none.

### BR-002: Never run without an approved spec
- **Description**: The pipeline may not start unless the anchor spec is `status: approved`.
- **Condition**: at invocation.
- **Action**: gate and refuse (FR-002).
- **Exceptions**: none.

---

## 6. Interface Requirements

### 6.1 User Interfaces
CLI only: `sddk run <work-item> [--from=<stage>]`. Human-readable progress to stdout; the structured report to a file.

### 6.2 Software Interfaces
- Anthropic Agent SDK (`@anthropic-ai/claude-agent-sdk`) — agent loop, subagents, hooks.
- `git` — worktree create/merge/cleanup.
- The `.specs/` OKF bundle — read specs/status, write status/report.

### 6.3 Hardware Interfaces
N/A.

---

## 7. Traceability Matrix

| Requirement ID | Business Rule | Acceptance Criteria | Priority |
|:---|:---|:---|:---|
| FR-001 | — | starts at SDD without prompting | High |
| FR-002 | BR-002 | draft item exits non-zero | High |
| FR-004 | BR-001 | working tree untouched pre-merge | High |
| FR-005 | — | retries up to 3, stops at PASS | High |
| FR-006 | BR-001 | merge on PASS, abort on exhaustion | High |
| FR-008 | — | JSON report with per-stage entries | High |
| FR-009 | — | key never in output; fails fast if absent | High |

---

## 8. Appendices

### 8.1 Use Case Diagram
N/A (single primary flow: developer runs `sddk run`).

### 8.2 Prototypes / Wireframes
N/A (CLI).

### 8.3 Open Questions
- CI/CD wrapper and Python SDK variant deferred to later `orc` features.
- Exact report schema/versioning to be finalized in the SDD.
