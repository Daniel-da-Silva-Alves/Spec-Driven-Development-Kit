# Manual Tests Template

Use this template to generate the `manual-tests.md` for each feature. Each test scenario must be clear, reproducible, and linked to a functional requirement.

## Document Structure

```markdown
# Manual Tests — {Feature Name}

**Feature**: {feature name}
**Date**: {generation date}
**Spec Reference**: [{spec_doc}](.specs/{type}/{work-name}/{spec_doc})
**SDD Reference**: [sdd.md](.specs/{type}/{work-name}/sdd.md)

---

## Instructions for the Developer

1. Execute each test scenario **in the listed order**
2. Mark `[x]` on scenarios that passed
3. For failed scenarios, note the observed behavior in the "Actual Result" column
4. All scenarios MUST pass before considering the feature complete

---

## Test Scenarios

### TS-001: {Descriptive scenario name}

| Field | Value |
|:---|:---|
| **Requirement** | FR-{xxx} — {requirement name} |
| **Priority** | High / Medium / Low |
| **Precondition** | {required initial state} |

**Steps:**
1. {specific action 1}
2. {specific action 2}
3. {specific action 3}

**Expected Result:**
{precise description of what should happen}

**Actual Result:**
- [ ] ✅ Passed
- [ ] ❌ Failed — Observation: ___

---

### TS-002: {Descriptive scenario name}

(repeat format)

---

## Edge Case Scenarios

### EC-001: {Edge case name}

| Field | Value |
|:---|:---|
| **Requirement** | FR-{xxx} |
| **Type** | Invalid input / Network error / Concurrency / Limit |

**Steps:**
1. {action that triggers the edge case}

**Expected Result:**
{how the system should behave in this case}

**Actual Result:**
- [ ] ✅ Passed
- [ ] ❌ Failed — Observation: ___

---

## Execution Summary

| Total | Passed | Failed | Pending |
|:---:|:---:|:---:|:---:|
| {n} | {n} | {n} | {n} |

**Executor**: ___
**Execution date**: ___
**Approved for deploy**: [ ] Yes / [ ] No
```

## Generation Rules

1. **Each functional requirement (FR-xxx) MUST have at least 1 test scenario**
2. **Each business rule (BR-xxx) MUST have at least 1 scenario that validates it**
3. **Include at least 2 edge cases** per feature (invalid inputs, limits, errors)
4. **Steps MUST be reproducible** — "click button X" not "test the functionality"
5. **Expected result MUST be specific** — "display green toast with text 'Saved successfully'" not "work"
6. **Scenario priority** corresponds to the priority of the requirement they test
