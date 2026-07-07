<!-- SDDK:START — Spec-Driven Development Kit v{version} -->
<!-- DO NOT EDIT THIS BLOCK MANUALLY. Managed by: sddk install/uninstall -->

# SDDK — Spec-Driven Development Kit

You have 5 SDDK skills installed. These skills form a **sequential pipeline** for specification-driven development. You MUST follow this pipeline order — never skip stages.

## Pipeline

```
1. SRS → 2. SDD → 3. Planning → 4. Dev → 5. Code Review
```

Each stage must be completed and approved by the user before advancing to the next.

## Skill Activation Rules

When the user's intent matches a trigger below, you MUST read and follow the corresponding skill's `SKILL.md` file from `~/.claude/skills/`. Do NOT use generic knowledge — the skill file is the authoritative source.

### Skill 1: `/software-requirements-specification`
**Triggers:** specify feature, software requirements, SRS, spec, specification, gather requirements, define functionality, document requirements, IEEE 830, create feature spec, business rules, use cases, acceptance criteria, report bug, fix bug, specify bug, refactor, refactoring spec, chore, maintenance spec, "I want to create a feature", "let's specify", "I need to document the requirements", "I want to start the SDD pipeline", "I want to specify a refactoring", "I want to report a bug", "I want to specify a chore"

### Skill 2: `/system-design-document`
**Triggers:** SDD, system design, design document, feature architecture, technical decisions, define stack, technical design, technical planning, how to implement technically, code structure, API design, data model, system components. Also activate when Skill 1 (Specification) is completed and the user confirms transition to SDD.

### Skill 3: `/implementation-planning`
**Triggers:** plan implementation, create development plan, microtasks, development checklist, implementation phases, break into tasks, task breakdown, sprint planning, technical dev planning. Also activate when Skill 2 (SDD) is completed and the user confirms transition to Planning.

### Skill 4: `/fullstack-development`
**Triggers:** develop, implement, code, program, create the code, start development, execute microtasks, start coding, build the feature. Also activate when Skill 3 (Planning) is completed and the user confirms transition to Development.

### Skill 5: `/code-review`
**Triggers:** code review, review code, review, audit code, check quality, check security, review implementation. Also activate when Skill 4 (Development) is completed and the user confirms transition to Code Review.

## Critical Rules

1. **Before taking ANY action involving the `.specs/` directory** — including analyzing, classifying, or questioning work item types (feature vs fix vs refactoring vs chore), reviewing naming conventions, or modifying any spec document — you MUST read the relevant SDDK skill first.
2. The skill `software-requirements-specification` defines the 4 work types and their classification criteria. **Never reason about `.specs/` content using generic knowledge.**
3. **ALWAYS write ALL generated documents and artifacts in the same language the user communicates in.**

<!-- SDDK:END -->
