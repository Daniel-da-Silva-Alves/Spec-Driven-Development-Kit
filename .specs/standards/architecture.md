---
type: standard-architecture
title: "Project Architectural Standards"
description: "Architecture of SDDK: a zero-dependency Node plugin whose behavior lives in markdown skills, distributed as a Claude Code plugin, producing an OKF .specs/ bundle."
status: approved
tags: [standards, architecture]
timestamp: 2026-08-05T00:00:00Z
---

# Project Architectural Standards

**Project**: SDDK — Spec-Driven Development Kit
**Last updated**: 2026-08-05

---

## 1. Base Architectural Pattern

**Pattern**: Instruction-as-artifact plugin. SDDK is not a running application; its "logic" is a set of markdown **skills** the agent follows, plus thin zero-dependency Node tooling (CLI, hooks) around them. Distribution is a Claude Code **plugin** (with a Gemini/npm fallback).

**Justification**: the product IS the process the agent follows; encoding it as versioned instructions + templates (not code) is what makes it portable across agents and inspectable.

### Modules and Responsibilities

| Module | Responsibility | Lives in |
|:---|:---|:---|
| `skl` Pipeline Skills | The 5 stage skills + reference templates (the authoritative pipeline behavior) | `sddk/skills/` |
| `okf` OKF Bundle | The `.specs/` format: `type` vocabulary, frontmatter, status lifecycle, graph | templates + `doc/design/okf-perfil-sddk.md` |
| `enf` Enforcement | Read-only `sddk:verifier` agent + fail-open gate hooks | `sddk/agents/`, `sddk/hooks/` |
| `plg` Packaging | Plugin/marketplace manifests + npm CLI installer | `sddk/.claude-plugin/`, `.claude-plugin/`, `bin/` |
| `orc` Orchestration | Headless pipeline runner (Agent SDK, TypeScript) | `orc/` (planned) |

---

## 2. Advanced Patterns

### Progressive disclosure over the OKF graph
- **Used in**: the Dev skill (and any consumer of `.specs/`).
- **Rule**: traverse `traces`/pointers and load only the needed concept sections; never load the whole bundle.

### Fail-open enforcement
- **Used in**: `sddk/hooks/sddk-gate.mjs`.
- **Rule**: any missing file, parse error, or ambiguity results in ALLOW (exit 0). Gates never block legitimate work on uncertainty.

---

## 3. Dependency Rules

> [!IMPORTANT]
> Violations are 🔴 Critical in Code Review.

1. **Zero runtime dependencies** — Node tooling (CLI, hooks) uses only Node built-ins. New runtime deps require an ADR.
2. **Skills are the single source of pipeline behavior** — tooling (`orc`, hooks) DRIVES the skills; it MUST NOT reimplement or fork stage logic.
3. **Cross-platform** — all scripts must run on Windows and POSIX (no bash-only assumptions; prefer Node scripts over `.sh`).
4. **`orc` reuses the shipped skills + `sddk:verifier`** via the Agent SDK; it never hardcodes a parallel pipeline.

---

## 4. Design Principles

| Principle | How we apply it |
|:---|:---|
| SSOT | The skill/template files are authoritative for pipeline behavior; docs and tooling derive from them |
| Fail-safe defaults | Hooks fail open; the orchestrator aborts without merging on uncertainty |
| Portability | Behavior encoded as OKF/markdown so it survives across agents and tools |
| Zero-dependency | Prefer Node built-ins; every dependency is a liability for a tool installed globally |

> N/A for this project: traditional app layers (Domain/Application/Infrastructure/Presentation), BFF, CQRS — SDDK has no runtime domain model or UI.
