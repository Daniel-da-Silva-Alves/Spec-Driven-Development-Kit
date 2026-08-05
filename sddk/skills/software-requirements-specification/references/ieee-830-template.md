# SRS Template — IEEE 830 / ISO/IEC/IEEE 29148:2018

Use this template as a base to generate the SRS document. Adapt sections according to the feature's complexity. Never remove sections — if not applicable, mark as "N/A" with justification.

> **OKF profile (mandatory).** Every generated document begins with the YAML frontmatter below. It makes the `.specs/` bundle a portable, machine-readable knowledge graph and is what the pipeline gates read (via `status`). See the profile contract in `doc/design/okf-perfil-sddk.md`. Fill the frontmatter FIRST, then the body. The document body follows IEEE 830 unchanged.

---

## Document Structure

```markdown
---
type: srs
title: "SRS — {Feature Name}"
description: "{one-line summary of what this feature specifies}"
status: draft            # draft → approved (only 'approved' unlocks the SDD stage)
work_item: "{module-acronym}-{number}-{kebab-description}"
work_type: features
tags: [{module-acronym}]
timestamp: {ISO 8601, e.g. 2026-08-05T14:30:00Z}
traces:
  - rel: governed-by
    target: ../../standards/api-conventions.md
---

# Software Requirements Specification (SRS)
## {Feature Name}

**Version**: 1.0
**Date**: {creation date}
**Project**: {project name}
**Feature**: {feature name}

---

## 1. Introduction

### 1.1 Purpose
Describe the purpose of this document and which feature it specifies.

### 1.2 Scope
Clear delimitation of what this feature covers and what is OUT of scope.

### 1.3 Definitions, Acronyms, and Abbreviations
Glossary of domain-specific terms used in this document.

### 1.4 References
External documents referenced (other SRS, APIs, standards).

### 1.5 Document Overview
Brief description of how this document is organized.

---

## 2. General Description

### 2.1 Product Perspective
How this feature fits into the larger system. Dependencies with other modules/features.

### 2.2 Product Functions
High-level summary of the functionalities the feature provides.

### 2.3 User Characteristics
Personas/actors that interact with this feature. Expected technical level.

### 2.4 Constraints
Technical, regulatory, or business limitations.

### 2.5 Assumptions and Dependencies
What is being assumed as true and depends on external factors.

---

## 3. Functional Requirements

### FR-001: {Requirement Name}
- **Description**: {What the system must do}
- **Input**: {Expected input data}
- **Processing**: {Business logic applied}
- **Output**: {Expected result}
- **Priority**: High | Medium | Low
- **Acceptance Criteria**: {Measurable conditions to consider it complete}

### FR-002: {Requirement Name}
(repeat structure for each functional requirement)

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Expected response time
- Minimum throughput
- Load limits

### 4.2 Security
- Authentication/authorization requirements
- Sensitive data protection
- Regulatory compliance

### 4.3 Usability
- Accessibility standards (WCAG level)
- Responsiveness (target devices)
- Supported languages

### 4.4 Reliability
- Expected availability
- Fault tolerance
- Recovery strategy

### 4.5 Maintainability
- Required code standards
- Minimum test coverage
- Required documentation

---

## 5. Business Rules

### BR-001: {Rule Name}
- **Description**: {Business rule}
- **Condition**: {When it applies}
- **Action**: {What must happen}
- **Exceptions**: {Cases where it doesn't apply}

---

## 6. Interface Requirements

### 6.1 User Interfaces
Description of required screens/visual components.

### 6.2 Software Interfaces
APIs, external services, integrations with other systems.

### 6.3 Hardware Interfaces
Devices, sensors, peripherals (if applicable).

---

## 7. Traceability Matrix

Reference each requirement with a markdown anchor (e.g. `#fr-001`) so downstream artifacts (SDD, implementation plan) can link to it — these links become edges in the OKF knowledge graph and enable progressive disclosure.

| Requirement ID | Business Rule | Acceptance Criteria | Priority |
|:---|:---|:---|:---|
| FR-001 | BR-001 | AC-001 | High |

---

## 8. Appendices

### 8.1 Use Case Diagram
(if applicable)

### 8.2 Prototypes / Wireframes
(references to mockups, if they exist)

### 8.3 Open Questions
(unresolved questions that need follow-up)
```

## Filling Rules

1. **Each functional requirement MUST have acceptance criteria** — no exceptions
2. **Requirements must be testable** — if it can't be verified, it's not a valid requirement
3. **Use active voice** — "The system SHALL..." not "It would be nice if the system..."
4. **Prioritize with MoSCoW** — Must/Should/Could/Won't or High/Medium/Low
5. **Sequential IDs** — FR-001, FR-002... / BR-001, BR-002... for traceability
6. **OKF frontmatter is mandatory** — always emit it, with `type: srs` and `status: draft` on creation. Set `status: approved` only after the user approves the document (Phase 5 transition). `work_item` MUST match the feature folder name exactly
