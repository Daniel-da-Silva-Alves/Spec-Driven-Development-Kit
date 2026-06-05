# Maintenance Specification Checklist Template

Use this template to create the Task artifact when the work type is `chore/`. The checklist is the shortest, focused on what changes, breaking changes, and rollback planning.

## Default Checklist

```markdown
# Maintenance Specification Checklist — {Chore Name}

## Objective
- [ ] What is being changed and why
- [ ] Maintenance type (Adaptive or Preventive)

## Current vs Target State
- [ ] Current versions / configurations documented
- [ ] Target versions / configurations defined
- [ ] Justification for the change

## Impact
- [ ] Breaking changes identified
- [ ] Backward compatibility assessed
- [ ] Affected features listed

## Rollback
- [ ] Rollback plan defined
- [ ] Rollback time estimated
- [ ] Data migration reversibility assessed

## Acceptance Criteria
- [ ] Build passes
- [ ] Tests green
- [ ] Deploy succeeds
- [ ] Additional criteria (if any)

## Compatibility Scan (Phase 1B)
- [ ] Changelogs / release notes of target version read
- [ ] Codebase scanned for deprecated/removed APIs
- [ ] Incompatibilities documented with severity
- [ ] Compatibility summary generated
- [ ] Report confirmed with user
- [ ] Investigation documented in Section 9 of chore-spec
```

## Usage Instructions

1. When starting the maintenance specification, create the Task artifact with this checklist
2. Mark `[/]` when you begin discussing a topic
3. Mark `[x]` when the topic is fully resolved (no ambiguity)
4. Add sub-items as new points emerge during the interview
5. Do not remove items — if not applicable, mark as `[x] N/A — {justification}`
