---
type: standard-coding
title: "Coding Best Practices and Standards"
description: "Coding standards for SDDK's Node tooling: zero-dependency, cross-platform, fail-open, env-only secrets, node:test."
status: approved
tags: [standards, coding]
timestamp: 2026-08-05T00:00:00Z
---

# Coding Best Practices and Standards

**Project**: SDDK — Spec-Driven Development Kit
**Last updated**: 2026-08-05

---

## 1. Adopted Principles

| Principle | What it means in SDDK | Example |
|:---|:---|:---|
| **Zero-dependency** | Node tooling uses only built-ins; a new dep needs an ADR | CLI/hooks use `node:fs`, `node:path`, no npm libs |
| **KISS** | Prefer the simple, obvious solution | plain string/regex frontmatter parsing, not a YAML lib |
| **YAGNI** | Don't build for hypothetical needs | no Python variant until a real use appears |
| **Fail-safe defaults** | On uncertainty, choose the non-destructive path | hooks fail open; orchestrator aborts without merge |

---

## 2. Abstraction Rules

- Extract a function when a block repeats ≥ 2 times or has an independent, nameable responsibility.
- Keep the CLI's ANSI/log helpers centralized (`color`, `log*`), never inline escape codes.
- `orc` MUST call the shipped skills/agent, not duplicate their logic.

---

## 3. Error Handling

| Context | Strategy |
|:---|:---|
| CLI (`bin/cli.js`) | Print a clear message via `logError`, exit non-zero; validate inputs at the boundary |
| Hooks (`sddk-gate.mjs`) | **Fail-open**: wrap everything; any error → allow (exit 0). Never crash the user's tool call |
| Orchestrator (`orc`) | Fail-safe: on unrecoverable error, abort the run without merging and record it in the report |
| Deterministic exit codes | `0` = success/verified; non-zero = precondition failure, verification exhaustion, or error |

---

## 4. Logging & Secrets

- Human output to stdout/stderr via the CLI helpers; the orchestrator also emits a structured JSON report.
- **NEVER log or persist**: `ANTHROPIC_API_KEY`, tokens, or any credential. Credentials come from the environment ONLY — never a flag, argument, or file.

---

## 5. Testing

- **Framework**: `node --test` (`node:test` + `node:assert/strict`) — zero-dependency, matches `tests/validate-plugin.mjs`.
- Cover both structure (manifests, frontmatter, wiring) and behavior (functional hook-gate runs against fixtures).
- **Cross-platform**: parsers must tolerate CRLF (`\r?\n`); never assume LF-only.
- The suite must pass on Node 18/20/22 (the CI matrix).

---

## 6. Performance

- Bounded work: the verification loop caps at 3 iterations per stage.
- Progressive disclosure: read only the `.specs/` sections a task references; never load the whole bundle.

> N/A for this project: SQL/N+1, image optimization, bundle splitting (no DB, no frontend).
