# SDD Template for Fix / Chore — Minimal (ADR Style)

Use this template when the work type is `fix/` or `chore/`. This is a minimal version of the SDD, styled as an Architecture Decision Record (ADR), focused on root cause analysis (for fixes), change analysis (for chores), the proposed solution, and impact assessment.

> **OKF profile (mandatory).** Every generated document begins with the YAML frontmatter below. It makes the `.specs/` bundle a portable, machine-readable knowledge graph and is what the pipeline gates read (via `status`). See the profile contract in `doc/design/okf-perfil-sddk.md`. Fill the frontmatter FIRST, then the body. The document body is unchanged.

---

## Document Structure

```markdown
---
type: sdd
title: "SDD — {Fix/Chore Name}"
description: "{one-line summary of the fix/chore design}"
status: draft            # draft → approved (only 'approved' unlocks the Planning stage)
work_item: "{module-acronym}-{number}-{kebab-description}"
work_type: fix    # or 'chore'
timestamp: {ISO 8601, e.g. 2026-08-05T14:30:00Z}
traces:
  - rel: refines
    target: bug-report.md   # or chore-spec.md
---

# System Design Document (SDD)
## {Fix/Chore Name}

**Version**: 1.0
**Date**: {creation date}
**Project**: {project name}
**Work Item**: {fix/chore name}
**Type**: Fix | Chore
**Spec Reference**: [bug-report.md](./bug-report.md) | [chore-spec.md](./chore-spec.md)

---

## 1. Analysis

### For Fix: Root Cause Analysis
- **Symptom**: {what the user sees}
- **Root Cause**: {the actual technical cause}
- **Code Path**: {file → function → line where issue occurs}

### For Chore: Change Analysis
- **Current State**: {what exists today}
- **Why Change**: {why the current state is insufficient}
- **Trigger**: {what triggered this chore — deprecation, security advisory, etc.}

---

## 2. Proposed Solution

### 2.1 Approach
Description of the fix/change approach. Be specific about what will be modified and how.

### 2.2 Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|:---|:---|:---|:---|
| {alt 1} | {pros} | {cons} | {reason} |
| {alt 2} | {pros} | {cons} | {reason} |

### 2.3 Impacted Files

| File | Action | Description |
|:---|:---|:---|
| {path} | Modify / Create / Delete | {what changes} |

---

## 3. Impact Assessment

### 3.1 Side Effects
Areas of the system that could be affected by this change. Be explicit about what might break.

### 3.2 Regression Risk

| Risk | Probability | Mitigation |
|:---|:---|:---|
| {risk description} | Low/Medium/High | {how to mitigate} |

### 3.3 Rollback Strategy (Chore only)
How to revert the change if something goes wrong in production.

---

## 4. Technical Documentation Sources

(Only include if the fix/chore involves a technology that needs version-specific documentation lookup)

| Technology | Version | Official URL |
|:---|:---|:---|
| {technology} | {version} | {URL} |

### Lookup Rule

Priority order for documentation lookup during development:
1. Local project documentation
2. MCP/Skill (if configured)
3. Official URL (use `read_url_content`)
4. Web search (use `search_web`)
```

## Filling Rules

1. **Root cause analysis (fix) MUST trace to specific code** — file, function, line
2. **At least one alternative MUST be documented** — even if it's "do nothing"
3. **Side effects MUST be explicitly listed** — even if the conclusion is "no side effects expected"
4. **Regression risk table is MANDATORY** — every change has risk
5. **Rollback strategy is MANDATORY for chores** — fixes typically don't need rollback if the fix is correct
6. **Documentation sources are OPTIONAL** — only include if version-specific API lookup is needed
7. **OKF frontmatter is mandatory** — always emit it, with `type: sdd` and `status: draft` on creation. Set `work_type` to `fix` or `chore` to match the work item, and set `status: approved` only after the user approves the document. `work_item` MUST match the fix/chore folder name exactly
