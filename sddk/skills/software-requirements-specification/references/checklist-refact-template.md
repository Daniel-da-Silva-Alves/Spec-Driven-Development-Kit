# Refactoring Specification Checklist Template

Use this template to create the Task artifact when the work type is `refact/`. The checklist focuses on motivation, behavioral invariants, quality metrics, and risk assessment.

## Default Checklist

```markdown
# Refactoring Specification Checklist — {Refactoring Name}

## Motivation
- [ ] Problem statement (what's wrong with current code)
- [ ] Origin (backlog item, code review, proactive)
- [ ] Quality metrics targeted (with current vs target values)

## Scope
- [ ] Files / modules that will change
- [ ] Explicit exclusions (what does NOT change)

## Behavioral Preservation
- [ ] Invariants identified (behaviors that MUST be preserved)
- [ ] Verification method for each invariant

## Structure
- [ ] Current structure documented
- [ ] Proposed structure documented
- [ ] Refactoring pattern named (if applicable)

## Risk Assessment
- [ ] Regression risks identified
- [ ] Performance impact assessed
- [ ] Mitigation strategies defined

## Acceptance Criteria
- [ ] Measurable criteria for each improvement
- [ ] Verification method for each criterion

## Dependencies
- [ ] Affected features / modules
- [ ] Affected tests
- [ ] Affected external integrations

## Impact Analysis (Phase 1B)
- [ ] Files mapped (via SDD reference / import tracing / grep search)
- [ ] Forward slicing completed (who depends on refactored code)
- [ ] Backward slicing completed (what refactored code depends on)
- [ ] Blast radius summary documented
- [ ] Impact map confirmed with user
- [ ] Investigation documented in Section 9 of refact-spec
```

## Usage Instructions

1. When starting the refactoring specification, create the Task artifact with this checklist
2. Mark `[/]` when you begin discussing a topic
3. Mark `[x]` when the topic is fully resolved (no ambiguity)
4. Add sub-items as new points emerge during the interview
5. Do not remove items — if not applicable, mark as `[x] N/A — {justification}`
