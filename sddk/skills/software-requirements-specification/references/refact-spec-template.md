# Refactoring Specification Template — IEEE 1219 / ISO/IEC/IEEE 14764 (Perfective Maintenance)

Use this template to generate the specification document for `refact/` work items. This replaces the SRS for refactoring work, focusing on code restructuring motivation, behavioral preservation, and quality metrics rather than functional requirements.

---

## Document Structure

```markdown
# Refactoring Specification
## {Refactoring Name}

**Version**: 1.0
**Date**: {creation date}
**Project**: {project name}
**Refactoring**: {refactoring name}
**Origin**: Backlog item {RB-xxx} | Tech debt | Proactive improvement
**ISO 14764 Type**: Perfective Maintenance

---

## 1. Motivation

### 1.1 Problem Statement
What is wrong with the current code/architecture. Why this refactoring is needed.
Be specific: name the files, patterns, or structures that are problematic.

### 1.2 Origin
Where this refactoring came from:
- [ ] Refactoring backlog item ({RB-xxx} in {feature}/refactoring-backlog.md)
- [ ] Code review finding
- [ ] Proactive improvement identified during development
- [ ] Tech debt accumulated over time

### 1.3 Quality Metrics Targeted

| Metric | Current State | Target State | How to Measure |
|:---|:---|:---|:---|
| {e.g.: Cyclomatic complexity} | {current value} | {target value} | {tool or method} |
| {e.g.: Code duplication} | {current %} | {target %} | {tool or method} |
| {e.g.: Coupling between modules} | {current level} | {target level} | {tool or method} |
| {e.g.: Component line count} | {current LOC} | {target LOC} | {tool or method} |

---

## 2. Scope

### 2.1 What Changes
Files, modules, or layers that will be modified or restructured.

| File/Module | Current State | Proposed Change |
|:---|:---|:---|
| {path} | {current structure/pattern} | {proposed structure/pattern} |

### 2.2 What Does NOT Change (Explicit Exclusions)
External behavior, APIs, data contracts, user-facing functionality that MUST remain identical.

---

## 3. Invariants (Behavioral Preservation)

> [!IMPORTANT]
> The defining characteristic of a refactoring is that **external behavior does not change**. Each invariant below documents a behavior that MUST be preserved.

### INV-001: {Invariant Name}
- **Description**: {behavior that must be preserved exactly}
- **Verification**: {how to prove it's preserved — automated test, manual check, comparison}

### INV-002: {Invariant Name}
(repeat for each invariant)

---

## 4. Current vs Proposed Structure

### 4.1 Current Structure
Description and/or diagram of the current implementation.

### 4.2 Proposed Structure
Description and/or diagram of the proposed implementation.

### 4.3 Refactoring Pattern
Name the refactoring pattern being applied if applicable (e.g.: Extract Method, Move Class, Replace Conditional with Polymorphism, Extract Service Layer).

---

## 5. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|:---|:---|:---|:---|
| {e.g.: Regression in feature X} | Low/Medium/High | Low/Medium/High | {e.g.: Automated test coverage} |
| {e.g.: Performance degradation} | Low/Medium/High | Low/Medium/High | {e.g.: Benchmark before/after} |

---

## 6. Acceptance Criteria

### AC-001: {Criterion Name}
- **Condition**: {what must be true after refactoring}
- **Verification**: {how to verify — test, metric, manual check}

### AC-002: {Criterion Name}
(repeat for each criterion)

---

## 7. Dependencies

- Dependencies with other features or modules that may be affected
- Dependencies with external services that must remain compatible
- Dependencies with pre-existing tests that must continue passing

---

## 8. Traceability

| Refact Section | Backlog Item | Original Feature | Original SDD |
|:---|:---|:---|:---|
| 1. Motivation | {RB-xxx} | {feature name} | {SDD section} |

---

## 9. Impact Analysis

> This section is generated during Phase 1B by the agent. It documents the code investigation used to map the full blast radius of the refactoring.

### 9.1 Files Analyzed

| File | Role | Discovery Method |
|:---|:---|:---|
| {path} | Source (being refactored) / Consumer (depends on source) / Test | SDD reference / import tracing / grep search |

### 9.2 Dependency Map

#### Forward Slicing — "Who depends on the code being refactored?"

| Consumer File | Dependency Type | Impact |
|:---|:---|:---|
| {path} | Direct import / Indirect (via {intermediate}) | Must update / No change needed |

#### Backward Slicing — "What does the refactored code depend on?"

| Dependency File | Dependency Type | Impact |
|:---|:---|:---|
| {path} | Import / Config / Data | Stable / Must verify compatibility |

### 9.3 Blast Radius Summary

- **Files directly affected**: {N} files
- **Files indirectly affected**: {N} files
- **Tests related**: {N} test files
- **External APIs affected**: {N} (list if any)

### 9.4 User Confirmation
Agent presents the complete impact map and asks: "Is this the complete blast radius? Are there any files or dependencies I missed?"
```

## Filling Rules

1. **Every invariant MUST have a verification method** — if you can't verify it, you can't guarantee preservation
2. **Quality metrics MUST be measurable** — no vague goals like "improve code quality"
3. **Scope MUST explicitly list what does NOT change** — this prevents scope creep
4. **Risk assessment MUST include mitigation strategies** — every risk needs a plan
5. **Origin MUST trace back to a source** — backlog item, code review, or explicit decision
6. **Refactoring pattern SHOULD be named** when a well-known pattern applies
7. **Section 9 is generated by the agent during Phase 1B** — the agent traces imports and dependencies to map the complete blast radius before any code changes

