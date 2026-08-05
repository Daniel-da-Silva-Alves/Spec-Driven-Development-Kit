---
type: standard-naming
title: "Naming Conventions"
description: "File, folder, work-item, and commit naming conventions for the SDDK repository."
status: approved
tags: [standards, naming]
timestamp: 2026-08-05T00:00:00Z
---

# Naming Conventions

**Project**: SDDK — Spec-Driven Development Kit
**Last updated**: 2026-08-05

---

## 1. Files and Folders

| Kind | Convention | Example |
|:---|:---|:---|
| Skill directory | kebab-case | `system-design-document/` |
| Skill entry file | literal `SKILL.md` (uppercase) | `SKILL.md` |
| Reference/template | kebab-case `.md` | `ieee-830-template.md` |
| Node ESM scripts (tests, hooks) | kebab-case `.mjs` | `validate-plugin.mjs`, `sddk-gate.mjs` |
| Node CommonJS (CLI) | kebab-case `.js` | `cli.js` |
| Design/ADR docs | kebab-case, ADRs numbered | `0001-...md`, `okf-perfil-sddk.md` |

## 2. `.specs/` Work Items (OKF bundle)

- **Features**: `{module-acronym}-{number}-{kebab-description}` (e.g. `orc-1-agent-sdk-runner`). Acronym MUST match a module in `.specs/index.md`. Numbers are sequential per module and never reused.
- **fix / refact / chore**: free-form kebab-case.
- **`type` values**: only the controlled vocabulary in `doc/design/okf-perfil-sddk.md` (`srs`, `sdd`, `standard-*`, `project-index`, `log`, ...).

## 3. Identifiers Inside Specs

- Functional requirements: `FR-001`, `FR-002`, ... (sequential, never reused).
- Business rules: `BR-001`; acceptance criteria `AC-001`; invariants `INV-001`; refactoring-backlog `RB-001`.

## 4. Git

- **Branches**: `feat/…`, `fix/…`, `chore/…`, `docs/…` (kebab-case).
- **Commits**: Conventional Commits — `type(scope): summary` (e.g. `feat(hooks): …`, `fix(gitignore): …`).

## 5. Code Identifiers (Node/TS)

- Functions/variables: `camelCase`; classes/types: `PascalCase`; constants: `UPPER_SNAKE_CASE`.
- Descriptive names only — no `data`, `temp`, `result`, `x`.

> N/A for this project: database naming (no DB) and UI/component naming (no UI).
