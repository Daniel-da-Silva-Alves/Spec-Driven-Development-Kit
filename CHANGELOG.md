# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-06-16

### Added
- **Phase 1.5: Constraints Discovery** — new phase in Skill 2 (SDD) that explores infrastructure, financial, timeline, security, and legacy constraints BEFORE proposing technical solutions (features only)
- **6 infrastructure decision categories** in `tech-stack-analysis.md` — Database, Authentication, Hosting/Deploy, Storage/CDN, Observability, Queues/Messaging — each with diagnostic questions, decision criteria tables, and agent research instructions
- **Web Search Mandate** — `tech-stack-analysis.md` now requires the agent to use `search_web` for current tool/service data instead of relying on training knowledge
- **4 new BKL-12 consistency tests** in Layer 4 — validates Phase 1.5, propositional posture, search_web mandate, and infrastructure categories (18 total tests now)

### Changed
- **Skill 2 (SDD) Phase 2** — rewritten from consultative ("what do you prefer?") to **propositional** ("based on your context, I recommend X because Y — do you agree?")
- **Skill 2 (SDD) Rules** — added Rule 10 (propositional posture) and Rule 11 (search_web mandate)
- **Skill 2 (SDD) Feature interview** — expanded from 7 to 11 decision categories, each with cross-references to `tech-stack-analysis.md`
- **`tech-stack-analysis.md`** — complete rewrite: generic decision criteria that don't become stale + live web search for current data

## [2.3.0] - 2026-06-16

### Added
- **Feature naming convention** — mandatory `{module-acronym}-{number}-{kebab-description}` pattern for feature folders, enforced in Skill 1 (Rule 9)
- **Project overview registry** (`_overview.md`) — living document that maps modules, tracks features, and maintains a changelog
- **Phase 0.5: Project Overview Verification** — Socratic Product Discovery interview in Skill 1 to establish project context and module structure before any feature work
- **Automated plugin consistency tests** — `tests/validate-plugin.mjs` with 14 tests across 3 layers (structural, semantic, pipeline coherence) using Node.js native test runner
- **`overview-template.md`** — new reference template for generating `_overview.md`

### Changed
- **Skill 1 (Specification)** — Phase 1 now determines folder name using naming convention for features; free-form for fix/refact/chore. Phase 4 auto-updates `_overview.md` for features
- **Skill 2 (SDD)** — Phase 1 now reads `_overview.md` for architectural context
- **Skill 5 (Code Review)** — Phase 1 now reads the spec document. Phase 6 updates `_overview.md` status to `✅ Implemented` for features

### Fixed
- **Version drift** — `plugin.json` version synced with `package.json` (was stuck at 2.0.0)
- **CHANGELOG** — added missing release link for v2.2.0
- **README** — updated project structure tree to reflect all files added in v2.2.0 and v2.3.0
- **Code Review** — Preconditions and paths updated to use `{type}/{work-name}` instead of hardcoded `features/{feature-name}`

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

[2.4.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.4.0
[2.3.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.3.0
[2.2.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.2.0
[2.1.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.1.0
[2.0.1]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.0.1
[2.0.0]: https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/releases/tag/v2.0.0
