# log.md — Project Changelog Template

> This template is used by the SRS skill (Phase 0) to generate the project changelog at `.specs/log.md` — the OKF-reserved name for a bundle's chronological history. Skills append entries: the SRS skill on new specs (`Added`), the Code Review skill on completion (`Implemented`).

> **OKF profile (mandatory).** The generated `log.md` begins with the YAML frontmatter below. This is a project-level artifact: it carries only `type`, `title`, `description`, and `timestamp` — no `status`, `work_item`, or `work_type`.

---
type: log
title: "{Project Name} — Changelog"
description: "Chronological log of feature specification and implementation events."
timestamp: {ISO 8601, e.g. 2026-08-05T14:30:00Z}
---

# Changelog

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
