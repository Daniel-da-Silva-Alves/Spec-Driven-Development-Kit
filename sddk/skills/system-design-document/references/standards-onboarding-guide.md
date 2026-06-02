# Project Standards Onboarding Guide

## Purpose

This guide instructs the agent to conduct an onboarding interview to define the project's standards. Standards are saved in `.specs/standards/` and function as **persistent static memory** — consulted by ALL features in the project.

## When to Execute

Onboarding is triggered by **Skill SDD (Skill 2)** in the following scenarios:

| Scenario | Action |
|:---|:---|
| `.specs/standards/` **does not exist** | Conduct full onboarding |
| `.specs/standards/` **exists but incomplete** | Ask if they want to complete it |
| `.specs/standards/` **exists and complete** | Read and respect, propose additions if necessary |

## Standards Structure

```
.specs/
└── standards/
    ├── architecture.md           ← Architectural patterns (DDD, CQRS, BFF, etc.)
    ├── naming-conventions.md     ← Naming (functions, tables, variables)
    ├── design-system.md          ← Tokens, palette, typography, components
    ├── api-conventions.md        ← API patterns (REST, GraphQL, error format)
    └── coding-standards.md       ← Best practices and principles (SSOT, DRY, etc.)
```

## Onboarding Flow

### Step 1: Verification

Check if `.specs/standards/` exists in the project:
- If it DOES NOT exist → proceed to Step 2
- If it exists → read all files and proceed directly to the SDD technical interview

### Step 2: Announcement

Announce to the user:
> "This project doesn't have standards defined in `.specs/standards/` yet. I'll conduct a quick interview to define the project standards. These standards will be used as a reference for ALL future features."

### Step 3: Interview by Category

For each category, conduct a mini-interview via `ask_question`:

#### 3.1 Architecture
Questions to ask:
1. "What architectural pattern does the project follow?" (options: MVC, Clean Architecture, DDD, Hexagonal, Feature-Based, or describe)
2. "Does it use any advanced pattern?" (options: Event Sourcing, CQRS, BFF, Microservices, Monolith, or describe)
3. "What is the layer/module structure?"
4. "Are there dependency rules between layers?" (e.g.: Domain never imports Infrastructure)

Generate: `.specs/standards/architecture.md` using template `references/standards-architecture-template.md`

#### 3.2 Naming
Questions to ask:
1. "Convention for database tables?" (snake_case plural, PascalCase singular, etc.)
2. "Convention for columns?" (snake_case, camelCase)
3. "Convention for foreign keys?" ({table}_id, fk_{table}, etc.)
4. "Convention for JS/TS variables/functions?" (camelCase, verb+noun for functions)
5. "Convention for React/Vue components?" (PascalCase, kebab-case)
6. "Convention for files?" (PascalCase for components, camelCase for utils, etc.)

Generate: `.specs/standards/naming-conventions.md` using template `references/standards-naming-template.md`

#### 3.3 Design System (if the project has frontend)
Questions to ask:
1. "Does the project have a defined design system?" (if yes, which tokens)
2. "Color palette?" (primary, secondary, surface, error, etc.)
3. "Typography?" (main font, headings, sizes)
4. "Spacing?" (spacing scale)
5. "Border radius and shadows?" (shape tokens)
6. "Base components?" (Card, Button, Input — which tokens they use)

Generate: `.specs/standards/design-system.md` using template `references/standards-design-system-template.md`

If there's no frontend, mark as "N/A — backend-only project".

#### 3.4 API Conventions (if it has an API)
Questions to ask:
1. "API pattern?" (REST, GraphQL, tRPC, gRPC)
2. "Response format?" (envelope `{data, error, meta}`, flat, etc.)
3. "API versioning?" (/v1/, header, query param)
4. "Error pattern?" (HTTP status + standardized body)
5. "Pagination?" (cursor, offset, keyset)
6. "API authentication?" (Bearer token, cookie, API key)

Generate: `.specs/standards/api-conventions.md` using template `references/standards-api-template.md`

#### 3.5 Best Practices and Principles
Questions to ask:
1. "Which principles does the project adopt?" (SSOT, DRY, KISS, YAGNI, SOLID — select relevant ones)
2. "Are there abstraction rules?" (when to extract function, component, hook)
3. "Error handling?" (custom exceptions, error boundary, etc.)
4. "Logging?" (structured logging, levels, what to log)
5. "Testing?" (strategy, minimum coverage, test types)

Generate: `.specs/standards/coding-standards.md` using template `references/standards-coding-template.md`

### Step 4: Presentation

1. Present a summary of all defined standards
2. Ask: "Are the standards correct? Would you like to adjust anything?"
3. Save all files to `.specs/standards/`

### Step 5: Continue to SDD

After onboarding, proceed normally with Phase 1 of the SDD (Context Analysis).

---

## Incremental Evolution

During SDDs of future features, the agent may propose additions to standards:

1. If a new technical decision is not covered by existing standards
2. Ask: "Should this decision become a project standard for future features?"
3. If yes, update the relevant standards file
4. If no, document only in the feature's SDD
