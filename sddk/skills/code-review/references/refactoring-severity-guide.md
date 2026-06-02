# Refactoring Severity Classification Guide

Use this guide to classify each issue found during Code Review. The classification determines the **immediate action** to be taken.

---

## Severities

### 🔴 Critical — Immediate Execution

Issues that **must be fixed in the same session** before considering the feature complete.

#### Criteria for Classifying as Critical:

| Category | Examples |
|:---|:---|
| **Security** | SQL injection, XSS, IDOR, exposed secrets, plaintext passwords |
| **Functional bug** | Feature doesn't work per SRS, crash in main flow |
| **Severe SDD violation** | Architecture implemented differently from design (e.g.: business logic in controller) |
| **Data loss** | Destructive operations without confirmation, missing validation on deletes |

#### Action:
1. Fix the code directly
2. Document what was fixed in the review report
3. If there are more than 5 critical fixes, create microtasks and return to Skill 4

---

### 🟡 Medium — Document in Backlog

Issues that **affect quality but don't prevent functionality**. Should be resolved before the next release or sprint.

#### Criteria for Classifying as Medium:

| Category | Examples |
|:---|:---|
| **Code smell** | Code duplication, overly long functions, high cyclomatic complexity |
| **Naming** | Inconsistent names across files, mixed conventions |
| **Anti-AI detected** | Emojis in UI, generic CSS, obvious comments |
| **Componentization** | Component with multiple responsibilities (but functional) |
| **Configuration** | Open CORS, missing rate limiting, frontend-only validation |

#### Action:
1. Document in `.specs/features/{feature}/refactoring-backlog.md`
2. Include: file, line, description, fix suggestion
3. Prioritize within the backlog

---

### 🟢 Low — Document in Backlog (Low Priority)

Issues that are **optional improvements** to aesthetics, performance, or organization. Not urgent.

#### Criteria for Classifying as Low:

| Category | Examples |
|:---|:---|
| **Optimization** | Queries that could be more efficient (but work) |
| **Style** | Inconsistent formatting (that a linter would fix) |
| **Documentation** | Missing JSDoc on public functions |
| **Organization** | File could be in a different directory (but works where it is) |
| **DX** | Uninformative log messages |

#### Action:
1. Document in `.specs/features/{feature}/refactoring-backlog.md`
2. Mark as low priority
3. Resolve when time is available

---

## Decision Tree

```
Does the code work incorrectly or have a security flaw?
├── YES → 🔴 Critical → FIX NOW
└── NO
    └── Does the code violate best practices, conventions, or the SDD?
        ├── YES → 🟡 Medium → BACKLOG (priority)
        └── NO
            └── Can the code be improved but is it OK?
                ├── YES → 🟢 Low → BACKLOG (when possible)
                └── NO → ✅ No issue
```

## Backlog Entry Format

```markdown
### RB-{number}: {Descriptive title}
- **Severity**: 🟡 Medium / 🟢 Low
- **File**: `{path/to/file.ext}`
- **Line(s)**: {L42-L58}
- **Category**: {Code Smell | Naming | Anti-AI | Security | Performance | Organization}
- **Description**: {What's wrong}
- **Suggestion**: {How to fix}
- **Estimated effort**: {Low | Medium | High}
```
