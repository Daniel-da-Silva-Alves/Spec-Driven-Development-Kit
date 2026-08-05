# Template: Project Architectural Standards

Use this template to generate `.specs/standards/architecture.md`. Fill in with the onboarding interview answers.

> **OKF profile (mandatory).** The generated document begins with the YAML frontmatter below. It makes the `.specs/` bundle a portable, machine-readable knowledge graph. See the profile contract in `doc/design/okf-perfil-sddk.md`. This is a project-level standard: it carries `type`, `title`, `description`, `tags`, and `timestamp` with `status: approved` — no `work_item` or `work_type`.

```markdown
---
type: standard-architecture
title: "Project Architectural Standards"
description: "{one-line summary of the project's architectural standards}"
status: approved
tags: [standards, architecture]
timestamp: {ISO 8601, e.g. 2026-08-05T14:30:00Z}
---

# Project Architectural Standards

**Project**: {project name}
**Last updated**: {date}

---

## 1. Base Architectural Pattern

**Pattern**: {e.g.: Domain-Driven Design (DDD)}
**Justification**: {why this pattern}

### Layers and Responsibilities

| Layer | Responsibility | Can import from | CANNOT import from |
|:---|:---|:---|:---|
| {e.g.: Domain} | {e.g.: Entities, Value Objects, business rules} | {none} | {Application, Infrastructure, Presentation} |
| {e.g.: Application} | {e.g.: Use Cases, DTOs, Ports} | {Domain} | {Infrastructure, Presentation} |
| {e.g.: Infrastructure} | {e.g.: Repositories, API clients, DB} | {Domain, Application} | {Presentation} |
| {e.g.: Presentation} | {e.g.: Controllers, Views, Components} | {Application} | {Domain, Infrastructure} |

### Default Directory Structure

```
src/
├── {layer1}/
├── {layer2}/
├── {layer3}/
└── {layer4}/
```

---

## 2. Advanced Patterns

### {e.g.: Event Sourcing}
- **Used in**: {modules/contexts where it applies}
- **NOT used in**: {modules where it does NOT apply}
- **Implementation**: {technical details}

### {e.g.: BFF (Backend for Frontend)}
- **Scope**: {does each frontend have its own BFF? or a single BFF?}
- **Rule**: {does BFF contain business logic? Or only orchestrates?}

### {e.g.: CQRS (Command Query Responsibility Segregation)}
- **Used in**: {where it applies}
- **Command**: {what commands look like}
- **Query**: {what queries look like}

---

## 3. Dependency Rules

> [!IMPORTANT]
> These rules must NEVER be violated. Violations are classified as 🔴 Critical in Code Review.

1. {e.g.: Domain NEVER imports from Infrastructure}
2. {e.g.: Use Cases orchestrate, NEVER contain pure domain logic}
3. {e.g.: Each Aggregate has its own Repository}
4. {e.g.: Repositories return Domain Entities, not DTOs}

---

## 4. Design Principles

| Principle | How we apply it |
|:---|:---|
| {e.g.: SSOT} | {e.g.: State lives in the database. Cache is derived, never the primary source} |
| {e.g.: Separation of Concerns} | {e.g.: Each module has a single responsibility} |
| {e.g.: Fail Fast} | {e.g.: Validate inputs at the system boundary} |
```

> Note: the OKF frontmatter above is mandatory — always emit it at the top of the generated document, with `type: standard-architecture` and `status: approved`.
