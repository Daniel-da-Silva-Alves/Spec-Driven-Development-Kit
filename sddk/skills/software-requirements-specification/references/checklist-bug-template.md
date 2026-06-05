# Bug Investigation Checklist Template

Use this template to create the Task artifact when the work type is `fix/`. The checklist is shorter and focused on bug reproduction, impact, and fix criteria.

## Default Checklist

```markdown
# Bug Investigation Checklist — {Bug Name}

## Bug Identification
- [ ] Bug summary (one sentence)
- [ ] Severity classification (Critical / High / Medium / Low)
- [ ] Environment where it occurs (Production / Staging / Local)

## Reproduction
- [ ] Steps to reproduce (numbered, specific)
- [ ] Frequency (always / intermittent / specific conditions)
- [ ] Expected behavior (what SHOULD happen)
- [ ] Actual behavior (what ACTUALLY happens)

## Impact
- [ ] Affected features / modules
- [ ] Affected users / personas
- [ ] Data impact (corruption, loss, exposure?)
- [ ] Workaround available?

## Evidence
- [ ] Logs collected
- [ ] Screenshots / recordings
- [ ] Network traces (if applicable)

## Fix Criteria
- [ ] Acceptance criteria defined (Given/When/Then)
- [ ] Constraints on the fix approach

## Dependencies
- [ ] Related features or SRS requirements
- [ ] Related SDD sections

## Root Cause Investigation (Phase 1B)
- [ ] Files mapped (via SDD reference / grep search / user input)
- [ ] File list confirmed with user
- [ ] Hypotheses formulated (2-5, ranked by probability)
- [ ] Hypotheses evaluated (discriminating questions asked)
- [ ] Root cause confirmed (file, function, line)
- [ ] Investigation documented in Section 9 of bug-report
```

## Usage Instructions

1. When starting the bug investigation, create the Task artifact with this checklist
2. Mark `[/]` when you begin investigating a topic
3. Mark `[x]` when the topic is fully documented (no ambiguity)
4. Add sub-items as new findings emerge during the investigation
5. Do not remove items — if not applicable, mark as `[x] N/A — {justification}`
