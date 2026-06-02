# Self-Review Checklist

Apply this checklist after implementing each microtask. If any item fails, fix it BEFORE marking the microtask as complete.

---

## Checklist

### 1. SDD Adherence

- [ ] Does the code implement exactly what is specified in the referenced SDD section?
- [ ] Does the folder/file structure follow what's defined in the SDD?
- [ ] Does the data model match the SDD schema (fields, types, constraints)?
- [ ] Do the endpoints/routes follow the SDD API design (paths, methods, bodies)?
- [ ] Are the responsibility layers separated according to the SDD architecture?

### 2. Clean Code

- [ ] Do all variables and functions have descriptive and specific names?
- [ ] Are there no comments that just describe what the code does (obvious)?
- [ ] Is there no repeated code that should be abstracted?
- [ ] Does each file/component have single responsibility (≤ 150 meaningful lines)?
- [ ] Is error handling specific (not generic catch-all)?

### 3. Naming Conventions (per `.specs/standards/naming-conventions.md`)

- [ ] Do naming conventions follow what's defined in the **project standards**?
- [ ] Do variables and functions follow the project convention (check `naming-conventions.md`)?
- [ ] Do table/column names follow the database convention (check `naming-conventions.md#database`)?
- [ ] Do components use the convention defined for frontend (check `naming-conventions.md#components`)?
- [ ] Do boolean variables use the prefix defined in standards (`is`, `has`, `can`, `should`)?
- [ ] Do constants use the convention defined in standards?

### 4. Anti-AI-Design

- [ ] Are there no emojis in interface text (buttons, labels, headings)?
- [ ] Does CSS/Tailwind use design tokens from the SDD/`design-system.md` (no generic hardcoded values)?
- [ ] Are there no generic placeholder texts ('Lorem ipsum', 'Click here', 'Submit')?
- [ ] Does the UI not look like a "YouTube tutorial" (purposeless shadows and gradients)?
- [ ] Are components properly separated (not monolithic)?
- [ ] Is there no repetitive boilerplate code without abstraction?

### 5. Project Standards Compliance

- [ ] Does the architecture follow the layers and dependency rules from `.specs/standards/architecture.md`?
- [ ] Are design tokens from `.specs/standards/design-system.md` being used (if frontend)?
- [ ] Does the API follow conventions from `.specs/standards/api-conventions.md` (response format, status codes)?
- [ ] Are best practices from `.specs/standards/coding-standards.md` being respected?
- [ ] Does error handling follow the strategy defined in standards?

### 6. Functionality

- [ ] Does the code compile/execute without errors?
- [ ] Has the microtask's "done" criterion been met?
- [ ] Was no unspecified functionality added that's not in the SRS/SDD?

---

## How to Use

1. After implementing a microtask, go through each checklist item mentally
2. If any item is ❌, fix the code
3. Only mark the microtask as `[x]` when all items are ✅
4. No need to list the checklist to the user — it's an internal agent process
