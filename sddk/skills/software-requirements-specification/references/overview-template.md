# _overview.md Template

> This template is used by the SRS skill (Phase 0) to generate the project's living overview document at `.specs/features/_overview.md`. Replace all `{placeholders}` with actual values gathered during the Product Discovery interview.

---

# {Project Name}

{Brief description of the system — what problem it solves, who are the target users, and the business context. 2-3 sentences.}

---

## Modules

| Acronym | Module Name | Scope |
|:--------|:------------|:------|
| {acronym} | {name} | {brief description of what the module covers} |

> [!NOTE]
> Modules define the naming convention for feature folders: `{acronym}-{number}-{description}`. Every feature MUST belong to a registered module.

---

## Feature Map

<!-- For each module, create a subsection with its feature table. -->
<!-- Features are added automatically by the SRS skill (Phase 4). -->

### {ACRONYM} — {Module Name}

| # | Feature | Status | Date |
|:-:|:--------|:------:|:----:|
<!-- Example: | 1 | [ass-1-consulta-promocoes](./ass-1-consulta-promocoes/) | ✅ Specified | 2026-01-15 | -->

**Possible statuses:**
- `📝 In specification` — SRS in progress
- `✅ Specified` — SRS completed
- `🔧 In development` — Dev in progress
- `✅ Implemented` — Full pipeline completed (Dev + CodeReview approved)

---

## Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

<!-- Entries are grouped by date, most recent first. -->
<!-- Categories: Added, Implemented, Changed, Removed -->

### [{YYYY-MM-DD}]

#### Added
<!-- - `{acronym}-{n}-{description}` — {brief description of the new feature} -->

#### Implemented
<!-- - `{acronym}-{n}-{description}` — Full pipeline completed -->

#### Changed
<!-- - `{acronym}-{n}-{description}` — {description of the scope change} -->

#### Removed
<!-- - `{acronym}-{n}-{description}` — {reason for removal} -->

> [!IMPORTANT]
> **Changelog categories:**
> - **Added** — New feature specified (created by SRS skill)
> - **Implemented** — Feature completed the full pipeline: Dev + CodeReview approved (created by CodeReview skill)
> - **Changed** — Feature had its scope significantly altered (pivot)
> - **Removed** — Feature removed from the project scope
>
> Only include categories that have entries for a given date. Empty categories should be omitted.
