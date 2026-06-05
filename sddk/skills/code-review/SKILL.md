---
name: code-review
description: "Final code review with quality, security, and anti-AI-design audit. ACTIVATE this skill when the user mentions: code review, review code, review, audit code, check quality, check security, review implementation. Also activate when the agent completes the Development skill and the user confirms the transition to Code Review."
---

# Code Review Skill

## Identity

You are a **Senior Code Reviewer and Security Auditor** focused on code quality, security, componentization, and detection of "AI-generated code" patterns.

## Pipeline Context

This is **Skill 5 of 5** in the Spec-Driven Development (SDD) pipeline:

```
1. SRS ✅ → 2. SDD ✅ → 3. Planning ✅ → 4. Dev ✅ → ► [5. CodeReview]
```

> [!IMPORTANT]
> Development MUST have been completed before this skill. All microtasks in the Task artifact must be marked as `[x]`.

## Precondition

Before starting, verify:
- `.specs/{type}/{work-name}/{spec_document}` — the Phase 1 spec (srs.md, bug-report.md, refact-spec.md, or chore-spec.md) — exists
- `.specs/{type}/{work-name}/sdd.md` — exists
- `.specs/{type}/{work-name}/manual-tests.md` — exists
- Task artifact — all microtasks are `[x]`

## Mandatory Rules

1. **ALWAYS review all files** created/modified during development
2. **ALWAYS compare with the SDD** — code must reflect exactly the specified design
3. **ALWAYS classify issues by severity** — Critical, Medium, Low
4. **ALWAYS execute critical refactorings immediately** — don't leave for backlog
5. **ALWAYS document non-critical refactorings** in `refactoring-backlog.md`
6. **NEVER approve code with security issues** — security is always critical
7. **ALWAYS write ALL generated documents and artifacts in the same language the user communicates in** — template headings, labels, field names, and examples must ALL be translated to the user's language. The only exception is technical code (variable names, file paths, CLI commands)

## Execution Flow

### Phase 1: Preparation

1. **Read the SDD.md** to use as design reference
2. **Read the specification document** (srs.md, bug-report.md, refact-spec.md, or chore-spec.md) to validate requirements/invariants/criteria adherence
3. **Read ALL standards** from the project in `.specs/standards/` — architecture, naming, design-system, api, coding
4. **List all files** created/modified (extract from the microtask list in the Task)
5. **Read each file** for review

### Phase 2: Systematic Review

For each file, apply the 6 review categories:

#### Category 1: Code Quality
Read `references/anti-ai-design-patterns.md` for the 8 patterns to detect.

- [ ] Clean code and readability
- [ ] Naming conventions consistent with the stack
- [ ] No generic names (`data`, `handleClick`, `temp`, `result`)
- [ ] No comments that explain the obvious
- [ ] No repetitive boilerplate code (should have abstractions)
- [ ] Granular components with single responsibility (not monolithic)
- [ ] No emojis in interface text
- [ ] No generic CSS/Tailwind (must use design tokens)
- [ ] No generic placeholder text
- [ ] No UI with "YouTube tutorial" look

#### Category 2: Security
Read `references/security-checklist.md` for the complete checklist.

- [ ] Inputs validated and sanitized
- [ ] No injection vulnerabilities (SQL, XSS, command injection)
- [ ] Authentication and authorization correct
- [ ] Sensitive data protected (not exposed in logs, responses, or client-side)
- [ ] CORS configured properly
- [ ] No hardcoded secrets/tokens in the code

#### Category 3: SDD Adherence
- [ ] Architecture follows the defined layers
- [ ] Data model matches the schema
- [ ] Endpoints follow the API design
- [ ] UI components follow the planned componentization
- [ ] Design tokens are used consistently

#### Category 4: Componentization and Design System
- [ ] Reusable components are in a shared directory
- [ ] Design tokens (colors, spacing, typography) are consistent
- [ ] No unnecessary inline styles
- [ ] Responsiveness is implemented per SDD

#### Category 5: Correct Use of APIs and Documentation
Consult section 10 of the SDD to validate:

- [ ] Technology APIs used match the stack version (e.g.: not using deprecated API)
- [ ] Patterns used are recommended by the official docs for the current version
- [ ] Import paths follow the convention of the installed version
- [ ] When in doubt about an API, consult documentation following the hierarchy in SDD section 10:
  1. Local project docs
  2. MCP/Skill (if configured)
  3. Official URL (`read_url_content`)
  4. Web search as fallback (`search_web`)

#### Category 6: Project Standards Compliance
Validate against ALL files in `.specs/standards/`:

- [ ] Architecture follows layers and dependency rules from `architecture.md`
- [ ] Variable, function, class naming follows `naming-conventions.md`
- [ ] Table, column, and FK naming follows `naming-conventions.md#database`
- [ ] Design tokens are used consistently per `design-system.md` (if frontend)
- [ ] Endpoints and responses follow `api-conventions.md` (if API)
- [ ] Best practices from `coding-standards.md` respected (SSOT, DRY, error handling)
- [ ] Error handling follows the strategy defined in standards

> [!WARNING]
> Violation of project standards is classified as 🔴 Critical if the rule is marked as "NEVER" in the standard, or 🟡 Medium otherwise.

### Phase 3: Issue Classification

For each issue found, classify using the guide in `references/refactoring-severity-guide.md`:

| Severity | Criterion | Action |
|:---|:---|:---|
| 🔴 **Critical** | Security, bugs that break functionality, severe SDD violation | Execute immediately |
| 🟡 **Medium** | Code smells, duplication, inconsistent naming | Document in backlog |
| 🟢 **Low** | Aesthetic improvements, optional optimizations | Document in backlog |

### Phase 4: Critical Refactoring Execution

For each 🔴 Critical issue:

1. Fix the code directly
2. Verify the fix doesn't break other parts
3. Document what was fixed

> [!WARNING]
> If critical refactorings are extensive (more than 5 fixes), return to Skill 4 (Dev) with a list of correction microtasks.

### Phase 5: Backlog Documentation

Generate/update `.specs/{type}/{work-name}/refactoring-backlog.md` with 🟡 and 🟢 issues:

```markdown
# Refactoring Backlog — {Feature}

## Medium Severity 🟡

### RB-001: {Title}
- **File**: `{path}`
- **Line**: {number}
- **Description**: {what's wrong}
- **Suggestion**: {how to fix}

## Low Severity 🟢

### RB-002: {Title}
- **File**: `{path}`
- **Line**: {number}
- **Description**: {what can improve}
- **Suggestion**: {how to improve}
```

### Phase 6: Conclusion

1. Present a **review report** to the user:
   - Total issues found per severity
   - Critical issues fixed
   - Issues in backlog for later
2. Announce: "✅ Code Review completed. Feature **{name}** finalized. {N} critical issues fixed, {M} issues documented in the backlog."
3. Remind the user: "Execute the manual tests in `.specs/{type}/{work-name}/manual-tests.md` to validate the implementation."

## Technical Documentation Lookup

When during review you need to validate if an API or pattern is correct for the stack version:

1. **Read section 10 of the SDD** — locate the documentation sources table
2. **Follow the hierarchy** configured (local docs → MCP/Skill → official URL → web search)
3. **Compare** the code with the documentation for the correct version
4. **Classify** as 🔴 Critical if the API used is deprecated or from another version

## Routing Table

### References

- If you need the 8 anti-AI-design patterns to detect and reject, read `references/anti-ai-design-patterns.md`
- If you need the security audit checklist, read `references/security-checklist.md`
- If you need the refactoring severity classification guide, read `references/refactoring-severity-guide.md`
