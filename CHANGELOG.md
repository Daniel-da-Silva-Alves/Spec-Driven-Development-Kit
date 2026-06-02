# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
