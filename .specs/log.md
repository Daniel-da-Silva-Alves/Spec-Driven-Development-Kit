---
type: log
title: "SDDK — Changelog"
description: "Chronological log of feature specification and implementation events."
timestamp: 2026-08-05T00:00:00Z
---

# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

<!-- Entries are grouped by date, most recent first. -->
<!-- Categories: Added, Implemented, Changed, Removed -->

### [2026-08-19]

#### Removed
- `orc-1-agent-sdk-runner` — the headless Agent SDK orchestrator (spec + `orc/` package) was dropped. The pipeline runs interactively via skills, with the `developer` / `reviewer` / `verifier` subagents handling the autonomous stages — no headless runner or API key required.
