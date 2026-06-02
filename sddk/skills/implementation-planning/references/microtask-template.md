# Microtask Template

Each microtask in the Implementation Plan MUST follow this format:

## Required Format

```markdown
- [ ] **{Phase}.{Number}: {Descriptive task title}**
  - 📎 Ref SDD: [{section}](.specs/features/{feature}/sdd.md#L{start}-L{end})
  - 📎 Ref SRS: [{requirement}](.specs/features/{feature}/srs.md#L{start}-L{end})
  - 📎 Ref Standards: [{standard}](.specs/standards/{file}.md#{section})  ← when applicable
  - 📁 Files:
    - `{path/to/file.ext}` — {create | modify} — {brief description}
  - ✅ Done: {measurable completion criterion}
```

## Complete Example

```markdown
# Implementation Plan — Feature: User Authentication

## Phase 1: Setup and Configuration

- [ ] **1.1: Configure authentication dependencies**
  - 📎 Ref SDD: [SDD#1.2 Technology Stack](.specs/features/user-auth/sdd.md#L15-L28)
  - 📎 Ref SRS: [SRS#2.4 Constraints](.specs/features/user-auth/srs.md#L60-L65)
  - 📁 Files:
    - `package.json` — modify — add bcrypt, jsonwebtoken
    - `src/config/auth.ts` — create — authentication constants (jwt secret, expiration)
  - ✅ Done: Dependencies installed, auth config exporting typed constants

## Phase 2: Data Model

- [ ] **2.1: Create users table migration**
  - 📎 Ref SDD: [SDD#3.1 User Entity](.specs/features/user-auth/sdd.md#L45-L62)
  - 📎 Ref SRS: [SRS FR-001 User Registration](.specs/features/user-auth/srs.md#L80-L95)
  - 📎 Ref Standards: [Naming DB](.specs/standards/naming-conventions.md#database)
  - 📁 Files:
    - `prisma/schema.prisma` — modify — add User model
    - `prisma/migrations/001_create_users/` — create — auto-generated migration
  - ✅ Done: Migration executed, users table created with all SDD fields and naming per standards

- [ ] **2.2: Create User repository**
  - 📎 Ref SDD: [SDD#2.3 Repository Layer](.specs/features/user-auth/sdd.md#L35-L42)
  - 📎 Ref SRS: [SRS FR-001](.specs/features/user-auth/srs.md#L80-L95)
  - 📁 Files:
    - `src/repositories/user.repository.ts` — create — CRUD operations for User
  - ✅ Done: Repository with findById, findByEmail, create, update, delete implemented and typed

## Phase 3: Business Logic

- [ ] **3.1: Implement registration service**
  - 📎 Ref SDD: [SDD#4.1 POST /api/auth/register](.specs/features/user-auth/sdd.md#L70-L85)
  - 📎 Ref SRS: [SRS FR-001 + BR-001](.specs/features/user-auth/srs.md#L80-L110)
  - 📁 Files:
    - `src/services/auth.service.ts` — create — register(), hashPassword()
  - ✅ Done: Service registers user with hashed password, validates unique email, returns user without password
```

## Rules

1. **Phase numbering**: `{Phase}.{Number}` — e.g.: 1.1, 1.2, 2.1, 3.1
2. **References MUST point to specific lines** — not to the entire document
3. **Files MUST have a clear action** — "create" or "modify"
4. **Done criterion MUST be verifiable** — not "work well" but "endpoint returns 200 with typed body"
5. **Each microtask MUST be completable in 1 agent iteration** — if too large, break into sub-tasks
