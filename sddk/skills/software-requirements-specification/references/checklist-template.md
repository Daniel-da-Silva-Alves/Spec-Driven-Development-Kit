# Specification Interview Checklist Template

Use this template to create the Task artifact at the beginning of the interview. Adapt the topics according to the nature of the feature (not all will be applicable).

## Default Checklist

```markdown
# Specification Checklist — {Feature Name}

## General Context
- [ ] Feature objective and purpose
- [ ] Business problem it solves
- [ ] Scope (what's IN and OUT)

## Actors and Personas
- [ ] Primary users (direct users)
- [ ] Secondary users (indirectly affected)
- [ ] Roles and permissions (admin, user, guest, etc.)

## Functional Requirements
- [ ] Main flow (happy path)
- [ ] Alternative flows
- [ ] Exception / error flows
- [ ] Required inputs (data, formats, validations)
- [ ] Expected outputs (results, notifications, states)

## Business Rules
- [ ] Validation rules
- [ ] Calculation / processing rules
- [ ] State / transition rules
- [ ] Limit / threshold rules

## Non-Functional Requirements
- [ ] Performance (response time, throughput)
- [ ] Security (authentication, authorization, sensitive data)
- [ ] Usability (accessibility, responsiveness)
- [ ] Reliability (availability, fault tolerance)

## Interface
- [ ] Screens / visual components needed
- [ ] Integrations with APIs / external services
- [ ] Events / webhooks / notifications

## Dependencies
- [ ] Dependencies with other features
- [ ] Dependencies with external services
- [ ] Dependencies with pre-existing data

## Acceptance Criteria
- [ ] Measurable criteria for each functional requirement
- [ ] Test scenarios that prove functionality

## Constraints and Assumptions
- [ ] Technical constraints (stack, platform, browser)
- [ ] Business constraints (regulatory, compliance)
- [ ] Assumptions made
```

## Usage Instructions

1. When starting the interview, create the Task artifact with this checklist adapted to the feature
2. Mark `[/]` when you begin discussing a topic
3. Mark `[x]` when the topic is fully resolved (no ambiguity)
4. Add sub-items as new points emerge during the interview
5. Do not remove items — if not applicable, mark as `[x] N/A — {justification}`
