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
