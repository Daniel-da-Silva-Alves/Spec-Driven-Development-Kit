# Socratic Interview Guide for Requirements Gathering

## Principles of Applied Socratic Thinking

The Socratic interview does not seek direct answers — it seeks **clarity of thought**. The goal is to guide the stakeholder to articulate exactly what they need, eliminating implicit assumptions.

### Fundamental Techniques

#### 1. Clarifying Question
Used when an answer is vague or uses ambiguous terms.

**Pattern**: "When you say '{term}', what exactly does that mean in this context?"

**Examples**:
- User: "The login should be secure"
- Agent: "When you say 'secure', are you referring to: multi-factor authentication, password encryption, brute force protection, or all of these?"

#### 2. Assumption Question
Used to expose undeclared assumptions.

**Pattern**: "You're assuming that {assumption}. Is this assumption valid?"

**Examples**:
- User: "The user logs in and accesses the dashboard"
- Agent: "You're assuming there's only one type of user. Are there different roles (admin, operator, visitor) with different access levels?"

#### 3. Counterpoint Question
Used to test the robustness of a requirement by proposing contrary scenarios.

**Pattern**: "What if {opposite scenario or edge case} happens? How should the system react?"

**Examples**:
- User: "The system sends a confirmation email"
- Agent: "What if the email is invalid? What if the email server is down? Is the user blocked or can they proceed?"

#### 4. Consequence Question
Used to explore the impacts of a decision.

**Pattern**: "If we implement {decision}, what would be the impact on {related aspect}?"

**Examples**:
- User: "I want the system to allow unlimited file uploads"
- Agent: "If we allow unlimited uploads, what would be the impact on storage costs and system performance? Should we have a per-user limit?"

#### 5. Prioritization Question
Used to rank requirements when there are many.

**Pattern**: "If you had to launch tomorrow with only 3 features, which would they be?"

---

## Interview Flow

### Opening (1-2 questions)
Goal: Understand the general context of the feature.

- "Describe in one sentence what this feature should do"
- "Who are the main users of this feature?"
- "What business problem does this feature solve?"

### Deep Dive (N questions per topic)
Goal: Detail each aspect of the checklist.

For each checklist topic:
1. Ask openly first
2. Use clarifying questions for vague answers
3. Use counterpoint questions for edge cases
4. Use assumption questions for implicit premises
5. Mark as `[x]` when unambiguous

### Validation (2-3 final questions)
Goal: Ensure completeness before generating the document.

- "Reviewing everything we discussed, are there any scenarios we didn't cover?"
- "Is there any integration with an external system that we didn't mention?"
- "Are there any regulatory or compliance restrictions that affect this feature?"

---

## Warning Signs (Do Not Accept)

| Signal | Action |
|:---|:---|
| "We'll figure that out later" | Insist — deferred decisions become bugs |
| "It's obvious that..." | Question — what's obvious to the stakeholder may not be to the developer |
| "Something similar to system X" | Ask for details — "similar" is ambiguous |
| "The usual" / "The standard" | Explicitly define what "standard" means in this context |
| Contradictory requirements | Point out the contradiction and request resolution |

## When to Close a Topic

A topic is **complete** when:
- The answer is specific and measurable
- There is no alternative interpretation possible
- The acceptance criterion is verifiable
- Edge cases have been covered

---

## Type-Specific Interview Adaptations

The Socratic interview adapts its focus and depth based on the work type selected in Phase 0.

### Feature (type: features) — Full Interview

Use the complete interview flow described above. All techniques apply. Cover all checklist topics.

**Key focus**: Business rules, personas, functional requirements, edge cases, acceptance criteria.

### Fix (type: fix) — Focused Investigation

The interview is shorter and focused on **reproduction and impact**, not on requirements gathering.

**Prioritize these techniques**:
1. **Clarifying Questions** — "When you say it crashes, what exactly happens? Is there an error message?"
2. **Counterpoint Questions** — "Does this happen with all users or only specific roles? In all browsers?"
3. **Consequence Questions** — "If this bug is not fixed, what is the impact on users/business?"

**Avoid**: Assumption questions about personas, prioritization questions about feature scope, deep dives into business rules. The bug already happened — focus on understanding it, not designing new behavior.

**Interview flow**:
1. **Opening**: "Describe the bug in one sentence." → "Where does it happen?" → "When did it start?"
2. **Deep dive**: Reproduction steps → Expected vs actual → Environment → Frequency
3. **Impact**: Affected features → Affected users → Data impact → Workaround
4. **Evidence**: Logs → Screenshots → Network traces
5. **Closing**: Acceptance criteria (Given/When/Then)

### Refactoring (type: refact) — Moderate Interview

The interview focuses on **motivation, invariants, and risk**, not on user-facing requirements.

**Prioritize these techniques**:
1. **Clarifying Questions** — "When you say the code is 'messy', what specifically is wrong? High coupling? Duplication?"
2. **Assumption Questions** — "You're assuming this refactoring won't affect the API contract. Is that correct?"
3. **Consequence Questions** — "If we change the service layer structure, what tests will need updating?"

**Avoid**: Questions about user personas, UI design, business rules, or new features. Refactoring does NOT add functionality.

**Interview flow**:
1. **Opening**: "What's wrong with the current code?" → "Where did this come from?" (backlog? code review? proactive?)
2. **Deep dive**: Quality metrics → Scope (what changes vs what doesn't) → Invariants
3. **Structure**: Current structure → Proposed structure → Refactoring pattern
4. **Risk**: Regression risks → Performance impact → Mitigation strategies
5. **Closing**: Acceptance criteria (measurable quality improvement)

### Chore (type: chore) — Minimal Interview

The interview is the shortest. Focus on **what changes, what breaks, and how to revert**.

**Prioritize these techniques**:
1. **Clarifying Questions** — "When you say 'update Deno', which specific version are you targeting?"
2. **Consequence Questions** — "If this update has breaking changes, which features are affected?"

**Avoid**: Deep Socratic questioning about business rules, user personas, or architecture design. Chores are typically well-defined tasks with clear scope.

**Interview flow**:
1. **Opening**: "What are you updating/changing?" → "Why now?" (deprecation? security? performance?)
2. **Deep dive**: Current state → Target state → Justification
3. **Impact**: Breaking changes → Backward compatibility → Affected features
4. **Safety**: Rollback plan → Time estimate → Team coordination
5. **Closing**: Acceptance criteria (build passes, tests green, deploy succeeds)

---

## Phase 2.5 — Transition to Code Investigation

After completing the Socratic interview, the agent transitions to active code investigation for `fix/`, `refact/`, and `chore/` types. The interview guide provides the **context** (symptoms, scope, goals); the investigation provides the **evidence** (code, dependencies, root causes).

### Transition Signals

The interview is complete and ready for investigation when:
- All checklist items (except the Phase 1B section) are `[x]`
- The agent has enough context to know **where to look** in the code

### How to Announce the Transition

```
"Thank you. The specification interview is complete. 
Now I'll investigate the codebase to {investigation purpose}.
Let me start by identifying the relevant files..."
```

Where `{investigation purpose}` is:
- **fix/**: "identify the root cause of this bug"
- **refact/**: "map the complete impact of this refactoring"
- **chore/**: "scan for compatibility issues with the target version"

### Key Principle

During investigation, the agent **shifts from asking to analyzing**:
- Interview (Phase 2): Agent asks questions, user provides answers
- Investigation (Phase 2.5): Agent reads code, forms hypotheses, asks **targeted** questions to confirm/eliminate

The questions in Phase 2.5 are NOT open-ended like the interview. They are **binary or multiple-choice**, designed to eliminate hypotheses efficiently:
- ✅ "Does this bug happen when the user is an admin, a regular user, or both?"
- ❌ "Tell me more about the user roles in the system." (this is an interview question, not an investigation question)
