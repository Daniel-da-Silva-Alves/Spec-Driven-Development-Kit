---
type: project-index
title: "SDDK — Spec-Driven Development Kit"
description: "AI-agent plugin that enforces a 5-stage spec-driven pipeline producing an OKF-formatted .specs/ knowledge graph."
tags: [sddk]
timestamp: 2026-08-05T00:00:00Z
---

# SDDK — Spec-Driven Development Kit

SDDK is a plugin for AI coding agents (Claude Code, Gemini) that enforces a disciplined 5-stage engineering pipeline — Specification → System Design → Planning → Development → Code Review — instead of letting the agent jump straight to code. As of v3.0.0 it produces the `.specs/` bundle as an OKF knowledge graph and gates each stage on an artifact status lifecycle.

---

## Modules

| Acronym | Module Name | Scope |
|:--------|:------------|:------|
| `skl` | Pipeline Skills | The 5 pipeline skills (SRS → SDD → Planning → Dev → Code Review) and their reference templates |
| `okf` | OKF Bundle | The OKF profile of `.specs/`: `type` vocabulary, frontmatter, status lifecycle, traceability graph |
| `enf` | Enforcement | Deterministic gating: the read-only `sddk:verifier` subagent and the pipeline-gate hooks |
| `plg` | Packaging & Distribution | Plugin manifests, the marketplace catalog, and the npm CLI installer |
| `orc` | Orchestration | Headless execution of the pipeline (Anthropic Agent SDK) for CI / non-interactive runs |

> [!NOTE]
> Modules define the naming convention for feature folders: `{acronym}-{number}-{description}`. Every feature MUST belong to a registered module.

---

## Feature Map

<!-- For each module, a subsection with its feature table. Features are added by the SRS skill (Phase 4). -->

### ORC — Orchestration

| # | Feature | Status | Date |
|:-:|:--------|:------:|:----:|
| 1 | [orc-1-agent-sdk-runner](./features/orc-1-agent-sdk-runner/) | ✅ Specified | 2026-08-05 |

**Possible statuses:**
- `📝 In specification` — SRS in progress
- `✅ Specified` — SRS completed
- `🔧 In development` — Dev in progress
- `✅ Implemented` — Full pipeline completed (Dev + CodeReview approved)

---

## Changelog

The project changelog is NOT kept in this index. It lives in the OKF-reserved companion file `.specs/log.md` (`type: log`). Append all `Added` / `Implemented` entries there.
