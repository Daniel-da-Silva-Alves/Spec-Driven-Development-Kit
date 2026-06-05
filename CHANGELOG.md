# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-06-05

### Added
- **4 work types** — `.specs/` now supports `features/`, `fix/`, `refact/`, and `chore/` directories
- **Phase 0: Work Type Selection** — Skill 1 now asks the user to select the work type before starting
- **Phase 2.5: Code Investigation** — 3 investigation modes that actively analyze the codebase:
  - **Root Cause Investigation (RCI)** for `fix/` — Scientific debugging with ranked hypothesis elimination
  - **Impact Analysis (IA)** for `refact/` — Forward/backward slicing to map blast radius
  - **Compatibility Scan (CS)** for `chore/` — Changelog reading + codebase scanning for breaking changes
- **3-layer Code Discovery Strategy** — SDD reference → static analysis → user confirmation
- **Bug Report template** (`bug-report-template.md`) — IEEE 1044-inspired template with Section 9: RCI
- **Refactoring Specification template** (`refact-spec-template.md`) — IEEE 1219/ISO 14764-inspired template with Section 9: Impact Analysis
- **Maintenance Specification template** (`chore-spec-template.md`) — ISO 14764-inspired template with Section 9: Compatibility Scan
- **3 type-specific interview checklists** with investigation topics
- **Reduced SDD template** (`sdd-refact-template.md`) — 6-section RFC+ADR style for refactoring
- **Minimal SDD template** (`sdd-fix-chore-template.md`) — 4-section ADR style for fix/chore
- **Type-specific Socratic interview adaptations** with Phase 2.5 transition guide

### Changed
- **Skill 1 (Specification)** — completely rewritten with conditional logic per work type and Phase 2.5 investigation
- **Skill 2 (SDD)** — completely rewritten with work type awareness and conditional template routing
- **Skill 3 (Planning)** — paths updated from `features/{name}` to `{type}/{name}`, spec references made type-aware
- **Skill 4 (Dev)** — paths updated, spec references made type-aware, context loading strategy documented per type
- **Skill 5 (Code Review)** — paths updated, spec references made type-aware
- **README.md** — updated pipeline table, usage section, and generated artifacts tree
- **ARCHITECTURE.md** — updated generated artifacts section with ISO 14764 taxonomy mapping

## [2.1.0] - 2026-06-02

### Added
- **Auto-publish workflow** — GitHub Actions pipeline that publishes to npm on tag push (`v*`)
- **Language output rule** — all 5 skills now enforce generating documents in the user's language
- **ARCHITECTURE.md** — system architecture documentation with Mermaid diagrams replacing the old PDF

### Changed
- **All 26 skill files translated to English** — SKILL.md files and all reference documents across 5 skills now use English for improved LLM instruction quality
- **plugin.json description** updated to English
- **publishConfig** added to package.json for explicit public npm registry configuration
- **prepublishOnly** script added as safety net before publishing

## [2.0.1] - 2026-06-02

### Fixed
- CLI help and error messages now reference the correct scoped package name (`@daniel-da-silva-alves/sddk`)
- README installation section updated with npm/npx commands
- Badge now links to npm package page
- Project structure tree corrected (PDF path, added `bin/` and `.github/`)

## [2.0.0] - 2026-06-02

### Added
- **5-stage pipeline**: SRS → SDD → Planning → Dev → Code Review
- **Skill 1 — SRS**: Socratic interview with IEEE 830 compliance
- **Skill 2 — SDD**: System design with tech stack analysis and project standards onboarding
- **Skill 3 — Planning**: Phased microtasks with full traceability to SRS/SDD
- **Skill 4 — Dev**: Fullstack development with inline self-review and clean code enforcement
- **Skill 5 — Code Review**: 6-category audit with security checklist and anti-AI-design detection
- **CLI installer** (`sddk install`) with global and per-project modes
- **Project standards onboarding** generating 5 reusable standards files
- **Documentation sources hierarchy** for version-pinned tech documentation
- **Anti-AI-design patterns** detection (8 patterns)
- **Manual test scenarios** generation

### Changed
- Complete rewrite from v1.0.0
- Restructured plugin to use `skills/` directory with `SKILL.md` + `references/` pattern

[2.1.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.1.0
[2.0.1]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.0.1
[2.0.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.0.0
