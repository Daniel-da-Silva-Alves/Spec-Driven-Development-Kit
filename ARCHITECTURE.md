# SDDK Architecture

## Why a Single Agent with Multiple Skills?

SDDK deliberately uses a **single AI agent** that sequentially activates **5 specialized skills** — rather than multiple independent agents. This is not a technical limitation; it is an **architectural decision** grounded in the core principle that **critical technical decisions must never be fully delegated to AI**.

```mermaid
graph TD
    subgraph SDDK["Single Agent, 5 Skills"]
        A["🤖 AI Agent"]
        U["👤 Human"]
        
        A -->|"persona: Requirements Engineer"| S1["Skill 1: SRS"]
        A -->|"persona: Software Architect"| S2["Skill 2: SDD"]
        A -->|"persona: Tech Lead"| S3["Skill 3: Planning"]
        A -->|"persona: Fullstack Developer"| S4["Skill 4: Dev"]
        A -->|"persona: Security Auditor"| S5["Skill 5: Code Review"]
        
        S1 -->|"🗣️ interview"| U
        S2 -->|"🗣️ interview"| U
        S3 -->|"📋 validation"| U
        S5 -->|"📋 report"| U
        
        U -->|"decisions"| A
    end
```

The human is **in the loop** at every decision point. The agent interviews, proposes, and executes — but the human **approves** before each stage advances.

---

## The Pipeline

```mermaid
graph LR
    SRS["1. SRS<br>Requirements"] -->|"human ✅"| SDD["2. SDD<br>Architecture"]
    SDD -->|"human ✅"| PLAN["3. Planning<br>Microtasks"]
    PLAN -->|"human ✅"| DEV["4. Dev<br>Fullstack"]
    DEV -->|"human ✅"| CR["5. Code Review<br>Audit"]
    CR -->|"refactoring backlog"| PLAN
```

Each stage produces an artifact that feeds the next. The human must explicitly approve each transition. The Code Review stage may generate a refactoring backlog that cycles back to Planning.

### Stage Breakdown

```mermaid
graph TD
    subgraph S1["Stage 1 — SRS"]
        S1A["Create task checklist"] --> S1B["Socratic interview<br>question by question"]
        S1B --> S1C["Validate: no ambiguity,<br>no gaps, no missing deps"]
        S1C --> S1D["Generate IEEE 830<br>compliant SRS document"]
        S1D --> S1E["Save to .specs/features/"]
    end

    subgraph S2["Stage 2 — SDD"]
        S2A["Evaluate existing stack<br>or propose one"] --> S2B["Technical interview:<br>architecture, data model, API"]
        S2B --> S2C["Resolve technical doubts<br>BEFORE defining architecture"]
        S2C --> S2D["Generate SDD with<br>development guidance"]
        S2D --> S2E["Generate project standards<br>on first run"]
    end

    subgraph S3["Stage 3 — Planning"]
        S3A["Read SRS + SDD"] --> S3B["Decompose into<br>phased microtasks"]
        S3B --> S3C["Each microtask references<br>specific SRS/SDD sections"]
        S3C --> S3D["Generate manual<br>test scenarios"]
    end

    subgraph S4["Stage 4 — Dev"]
        S4A["Read microtask<br>references only"] --> S4B["Implement following<br>SDD + standards"]
        S4B --> S4C["Inline self-review<br>after each microtask"]
        S4C --> S4D["Mark microtask<br>as complete"]
    end

    subgraph S5["Stage 5 — Code Review"]
        S5A["6-category audit:<br>quality, security, SDD,<br>components, API, standards"] --> S5B["Critical issues:<br>fix immediately"]
        S5B --> S5C["Medium/Low issues:<br>add to refactoring backlog"]
    end

    S1 --> S2 --> S3 --> S4 --> S5
```

---

## Design Principles

### 1. Specifications Before Code

The AI agent **must never write a single line of code** before producing formal specifications. This eliminates the most common failure mode of AI-assisted development: "tutorial-quality" code that is functional but poorly structured, undocumented, and difficult to maintain.

```
❌ User says "build me auth" → AI immediately writes code → spaghetti

✅ User says "build me auth" → SRS interview → SDD design → Planning → Dev → Review
```

### 2. Human Authority Over Technical Decisions

Every architectural choice — stack selection, design patterns, data model, API design, security policies — goes through a **human decision gate**. The agent proposes options with trade-offs; the human chooses.

This is critical because:

- **Security decisions** (auth strategy, data encryption, CORS policy) have legal and compliance implications that AI cannot fully evaluate
- **Architecture decisions** (monolith vs microservices, SQL vs NoSQL) depend on team skills, infrastructure constraints, and business context that AI lacks
- **Business rules** (what happens on 3 failed login attempts?) require domain knowledge that only the human stakeholder possesses
- **AI hallucination risk** is highest for nuanced technical decisions — a human checkpoint catches errors before they propagate downstream

### 3. Traceability

Every line of code traces back to a requirement:

```mermaid
graph LR
    REQ["SRS Requirement<br>RF-001"] -->|"referenced by"| SDD_SEC["SDD Section<br>#3.1 L45-L62"]
    SDD_SEC -->|"referenced by"| MT["Microtask<br>2.1"]
    MT -->|"implemented in"| CODE["Code<br>src/services/auth.ts"]
    CODE -->|"audited by"| REVIEW["Code Review<br>Audit Report"]
```

If a bug is found in production, you can trace it back through: Code → Microtask → SDD Section → SRS Requirement → Original interview answer.

### 4. Optimized Context Usage

The Dev stage (Stage 4) uses a **pointer-based memory strategy** to avoid context bloat:

```
❌ Load entire SRS + SDD + Plan into context (50K+ tokens)

✅ Each microtask has pointers to specific lines:
   📎 Ref SDD: sdd.md#L45-L62 (18 lines)
   📎 Ref SRS: srs.md#L80-L95 (16 lines)
   → Only ~34 lines loaded per microtask
```

This means the agent reads **only** the relevant sections for each task, keeping the context window clean and focused.

---

## Single Agent vs Multi-Agent: Comparison

### Multi-Agent Approach (Evaluated and Rejected)

```mermaid
graph TD
    U["Human"] --> O["Orchestrator Agent"]
    O -->|"fire & forget"| A1["Agent 1: SRS"]
    O -->|"fire & forget"| A2["Agent 2: SDD"]
    O -->|"fire & forget"| A3["Agent 3: Planning"]
    O -->|"fire & forget"| A4["Agent 4: Dev"]
    O -->|"fire & forget"| A5["Agent 5: Review"]
```

In a multi-agent architecture, each stage runs in its own isolated agent. This was **evaluated and rejected** for the following reasons:

| Criterion | Single Agent + Skills ✅ | Multi-Agent ❌ |
|:---|:---:|:---:|
| **Human interactivity** | Continuous dialogue | Fire-and-forget |
| **Socratic interview** | Question by question | Impractical |
| **Technical decisions** | Human decides in real-time | Delegated to AI |
| **Context continuity** | Shared session memory | Each agent starts from zero |
| **Security decisions** | Human-gated | AI-autonomous |
| **Compatibility** | Works in any IDE agent | Platform-specific |
| **Complexity** | 5 SKILL.md files | Orchestrator + 5 agents + handoff |
| **Debugging** | Single conversation log | 5+ logs to correlate |

### The Fundamental Problem with Multi-Agent for SDDK

The first three stages of SDDK are **interview-driven**. The agent asks the human one question at a time, challenges vague answers, and detects ambiguities:

```
Agent: "What should happen when a user enters an incorrect password 3 times?"
  a) Lock the account for 15 minutes
  b) Lock the account until admin reset
  c) Show CAPTCHA
  d) Other
```

This **Socratic interview** pattern is impossible with isolated sub-agents because:

1. **Sub-agents run in background** — they receive a prompt, execute, and return a result. They cannot maintain an iterative Q&A loop with the user.
2. **Context is lost between agents** — Agent 2 (SDD) would not remember what the user said during Agent 1's (SRS) interview, unless everything is serialized to files. But the nuance of *why* a decision was made (the reasoning, the trade-offs discussed) is lost.
3. **The human cannot intervene mid-execution** — if a sub-agent makes a wrong assumption during architecture design, the human only discovers it after the agent finishes — potentially too late.

With a single agent, the human can interrupt at any point: *"Actually, wait — we need to consider GDPR compliance for that data model."* The agent immediately adjusts. With multi-agent, that correction requires restarting the sub-agent entirely.

---

## Why Technical Decisions Must Stay with Humans

SDDK enforces a principle that many AI-first tools ignore: **the human is the architect, the AI is the engineer**.

```mermaid
graph TD
    subgraph HUMAN["Human Decisions"]
        H1["Which auth strategy?<br>JWT vs Session vs OAuth"]
        H2["Which database?<br>PostgreSQL vs MongoDB"]
        H3["Which architecture?<br>Monolith vs Microservices"]
        H4["Security policy?<br>Rate limiting, CORS, encryption"]
        H5["Business rules?<br>Retry logic, error handling"]
    end

    subgraph AI["AI Execution"]
        A1["Write the auth service<br>following the chosen strategy"]
        A2["Create the schema<br>following the chosen DB"]
        A3["Implement the layers<br>following the chosen architecture"]
        A4["Apply security measures<br>following the chosen policy"]
        A5["Code the business logic<br>following the chosen rules"]
    end

    H1 --> A1
    H2 --> A2
    H3 --> A3
    H4 --> A4
    H5 --> A5
```

The AI is excellent at **implementing** decisions. It is unreliable at **making** them. Reasons:

| Risk | Example | Consequence |
|:---|:---|:---|
| **Hallucination** | AI recommends a deprecated auth library | Security vulnerability in production |
| **Missing context** | AI picks MongoDB because "it's popular" — but the team only knows SQL | Team velocity drops, tech debt accumulates |
| **Compliance blindness** | AI stores user data without encryption | LGPD/GDPR violation, legal exposure |
| **Bias toward novelty** | AI picks the newest framework instead of the stable one | Breaking changes, immature ecosystem |
| **Cost ignorance** | AI architects for serverless without considering cold start | Performance issues, unexpected billing |

SDDK's Socratic interview forces these decisions to surface **before** a single line of code is written. The human makes the call, the AI documents it in the SDD, and the Dev stage implements it faithfully.

---

## Generated Artifacts

The pipeline produces a structured documentation tree organized by **work type**, with each type using templates adapted from industry standards:

```
.specs/
├── standards/                        # Project-wide (generated once, reused across all work)
│   ├── architecture.md               # Layer rules, dependency direction, folder structure
│   ├── naming-conventions.md         # Variables, functions, DB columns, components
│   ├── design-system.md              # Colors, typography, spacing, component library
│   ├── api-conventions.md            # Response format, status codes, versioning
│   └── coding-standards.md           # Error handling, logging, testing patterns
├── features/                         # New features (IEEE 830 / ISO 29148)
│   └── {name}/
│       ├── srs.md                    # Stage 1 — Formal requirements (IEEE 830)
│       ├── sdd.md                    # Stage 2 — Full architecture (10 sections)
│       ├── manual-tests.md           # Stage 3 — Test scenarios
│       └── refactoring-backlog.md    # Stage 5 — Non-critical improvements
├── fix/                              # Bug fixes (IEEE 1044)
│   └── {name}/
│       ├── bug-report.md             # Stage 1 — Anomaly report (expected vs actual)
│       ├── sdd.md                    # Stage 2 — Minimal SDD/ADR (4 sections)
│       ├── manual-tests.md
│       └── refactoring-backlog.md
├── refact/                           # Refactoring (IEEE 1219 / ISO 14764)
│   └── {name}/
│       ├── refact-spec.md            # Stage 1 — Invariants + quality metrics
│       ├── sdd.md                    # Stage 2 — Reduced SDD/RFC (6 sections)
│       ├── manual-tests.md
│       └── refactoring-backlog.md
└── chore/                            # Maintenance (ISO 14764)
    └── {name}/
        ├── chore-spec.md             # Stage 1 — Change + rollback plan
        ├── sdd.md                    # Stage 2 — Minimal SDD/ADR (4 sections)
        ├── manual-tests.md
        └── refactoring-backlog.md
```

### Work Type Taxonomy (ISO/IEC/IEEE 14764 Mapping)

The 4 work types map directly to the ISO/IEC/IEEE 14764 software maintenance classification:

| ISO 14764 Type | SDDK Type | Description | Interview Depth |
|:---|:---|:---|:---|
| (New development) | `features/` | New functionality for end users | Full (12-20 questions) |
| Corrective | `fix/` | Reactive correction of discovered defects | Focused (5-8 questions) |
| Perfective | `refact/` | Improvement of maintainability or structure | Moderate (6-10 questions) |
| Adaptive / Preventive | `chore/` | Environment changes or latent fault prevention | Minimal (4-7 questions) |

### Pipeline Flow by Work Type

The pipeline adapts at Stages 1 and 2 based on the work type, while Stages 3–5 remain consistent. Types `fix/`, `refact/`, and `chore/` include an additional **Phase 2.5 — Code Investigation** before moving to Stage 2:

```mermaid
flowchart TD
    START(["User: describe work item"])
    START --> P0{"Phase 0:<br>What type of work?"}

    P0 -->|"New feature"| F_PATH["features/"]
    P0 -->|"Bug fix"| X_PATH["fix/"]
    P0 -->|"Refactoring"| R_PATH["refact/"]
    P0 -->|"Maintenance"| C_PATH["chore/"]

    subgraph FEAT["Feature Pipeline"]
        direction LR
        F1["Phase 1-2:<br>Interview<br>srs.md<br>IEEE 830"]
        F2["Stage 2<br>sdd.md<br>Full: 10 sections"]
        F1 -->|"human approval"| F2
    end

    subgraph FIX["Fix Pipeline"]
        direction LR
        X1["Phase 1-2:<br>Interview<br>bug-report.md<br>IEEE 1044"]
        X1B["Phase 2.5:<br>RCI<br>Hypothesis<br>Elimination"]
        X2["Stage 2<br>sdd.md<br>Minimal: 4 sections"]
        X1 --> X1B -->|"root cause confirmed"| X2
    end

    subgraph REFACT["Refactoring Pipeline"]
        direction LR
        R1["Phase 1-2:<br>Interview<br>refact-spec.md<br>IEEE 1219"]
        R1B["Phase 2.5:<br>Impact Analysis<br>Forward/Backward<br>Slicing"]
        R2["Stage 2<br>sdd.md<br>Reduced: 6 sections"]
        R1 --> R1B -->|"blast radius confirmed"| R2
    end

    subgraph CHORE["Chore Pipeline"]
        direction LR
        C1["Phase 1-2:<br>Interview<br>chore-spec.md<br>ISO 14764"]
        C1B["Phase 2.5:<br>Compat Scan<br>Breaking Changes<br>Detection"]
        C2["Stage 2<br>sdd.md<br>Minimal: 4 sections"]
        C1 --> C1B -->|"compat report confirmed"| C2
    end

    F_PATH --> FEAT
    X_PATH --> FIX
    R_PATH --> REFACT
    C_PATH --> CHORE

    FEAT --> SHARED
    FIX --> SHARED
    REFACT --> SHARED
    CHORE --> SHARED

    subgraph SHARED["Stages 3-5: Same for All Types"]
        direction LR
        S3["Stage 3<br>Planning<br>Microtasks"]
        S4["Stage 4<br>Dev<br>Implementation"]
        S5["Stage 5<br>Code Review<br>Audit"]
        S3 -->|"human approval"| S4
        S4 -->|"human approval"| S5
    end

    S5 --> DONE(["Done"])
    S5 -.->|"refactoring backlog"| S3
```

### Stage 1 — Interview + Investigation Flow by Type

```mermaid
flowchart LR
    subgraph FEATURE["Feature: Full Interview"]
        direction TB
        FA["Context + Business Problem"]
        FB["Actors + Personas"]
        FC["Functional Requirements"]
        FD["Business Rules"]
        FE["Non-Functional Requirements"]
        FF["Interfaces + Integrations"]
        FG["Acceptance Criteria"]
        FA --> FB --> FC --> FD --> FE --> FF --> FG
    end

    subgraph BUGFIX["Fix: Interview + RCI"]
        direction TB
        XA["Bug Summary + Severity"]
        XB["Reproduction Steps"]
        XC["Expected vs Actual"]
        XD["Impact + Workaround"]
        XE["Evidence: Logs, Screenshots"]
        XF["Acceptance Criteria"]
        XG["Phase 2.5: Map Files"]
        XH["Hypothesize + Eliminate"]
        XI["Root Cause Confirmed"]
        XA --> XB --> XC --> XD --> XE --> XF --> XG --> XH --> XI
    end

    subgraph REFACTOR["Refact: Interview + Impact Analysis"]
        direction TB
        RA["Motivation + Origin"]
        RB["Quality Metrics"]
        RC["Scope: What Changes vs Not"]
        RD["Invariants"]
        RE["Current vs Proposed"]
        RF["Risk Assessment"]
        RG["Acceptance Criteria"]
        RH["Phase 2.5: Map Files"]
        RI["Forward + Backward Slicing"]
        RJ["Blast Radius Confirmed"]
        RA --> RB --> RC --> RD --> RE --> RF --> RG --> RH --> RI --> RJ
    end

    subgraph MAINTENANCE["Chore: Interview + Compat Scan"]
        direction TB
        CA["Objective + Why Now"]
        CB["Current vs Target State"]
        CC["Breaking Changes"]
        CD["Rollback Plan"]
        CE["Acceptance Criteria"]
        CF["Phase 2.5: Read Changelogs"]
        CG["Scan Codebase"]
        CH["Compat Report Confirmed"]
        CA --> CB --> CC --> CD --> CE --> CF --> CG --> CH
    end
```

### Stage 2 — SDD Depth by Type

```mermaid
flowchart TD
    subgraph FULL["Feature SDD: 10 Sections"]
        direction TB
        F1S["1. Technical Overview + Stack"]
        F2S["2. System Architecture"]
        F3S["3. Data Model"]
        F4S["4. API Design"]
        F5S["5. Interface Design"]
        F6S["6. Integrations"]
        F7S["7. Error Handling"]
        F8S["8. Security"]
        F9S["9. SRS References"]
        F10S["10. Documentation Sources"]
        F1S --> F2S --> F3S --> F4S --> F5S --> F6S --> F7S --> F8S --> F9S --> F10S
    end

    subgraph REDUCED["Refact SDD: 6 Sections"]
        direction TB
        R1S["1. Technical Overview"]
        R2S["2. Current vs Proposed Architecture"]
        R3S["3. Impacted Files"]
        R4S["4. Test Strategy"]
        R5S["5. Spec References"]
        R6S["6. Documentation Sources"]
        R1S --> R2S --> R3S --> R4S --> R5S --> R6S
    end

    subgraph MINIMAL["Fix/Chore SDD: 4 Sections"]
        direction TB
        M1S["1. Root Cause / Change Analysis"]
        M2S["2. Proposed Solution + Alternatives"]
        M3S["3. Impact Assessment"]
        M4S["4. Documentation Sources"]
        M1S --> M2S --> M3S --> M4S
    end
```

---

## Anti-AI-Design Philosophy

SDDK actively detects and rejects 8 common patterns of low-quality AI-generated code:

| # | Anti-Pattern | Why It's Bad | SDDK Response |
|:---:|:---|:---|:---|
| 1 | Emojis in UI text | Unprofessional, accessibility issues | Rejected in Code Review |
| 2 | Generic CSS/Tailwind | No design system consistency | Must follow `design-system.md` tokens |
| 3 | Placeholder text | "Lorem ipsum", "Click here" | Must use real, contextual copy |
| 4 | Tutorial-style UI | Generic cards, shadows, gradients | Must follow SDD's design specifications |
| 5 | Monolithic components | 500+ line components | Max ~150 significant lines per file |
| 6 | Generic variable names | `data`, `temp`, `handleClick` | Must be descriptive and domain-specific |
| 7 | Obvious comments | `// increment counter` | Code must be self-explanatory |
| 8 | Boilerplate repetition | Copy-pasted code blocks | Must abstract into reusable functions |

This philosophy stems from the observation that AI agents, left unconstrained, produce code that **looks correct** but **feels like a tutorial**. SDDK raises the bar to **production-grade** quality by embedding these checks at both the Dev (Stage 4, self-review) and Code Review (Stage 5, audit) stages.
