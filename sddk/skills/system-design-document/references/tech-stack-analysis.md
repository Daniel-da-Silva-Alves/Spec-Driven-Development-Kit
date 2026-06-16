# Technology Stack Analysis and Suggestion Guide

> **Purpose**: This document provides **decision criteria and diagnostic questions** for the agent to use during the SDD technical interview. It is NOT a static catalog of tools — the agent MUST use `search_web` to find current options before making proposals.

---

## How to Detect the Existing Stack

Before suggesting any technology, analyze the user's existing project:

### Indicator Files

| File | Indicates |
|:---|:---|
| `package.json` | Node.js / JavaScript / TypeScript |
| `tsconfig.json` | TypeScript |
| `requirements.txt` / `pyproject.toml` | Python |
| `Cargo.toml` | Rust |
| `go.mod` | Go |
| `pom.xml` / `build.gradle` | Java/Kotlin |
| `Gemfile` | Ruby |
| `composer.json` | PHP |

### Inside `package.json` — Detect Framework

| Dependency | Framework |
|:---|:---|
| `next` | Next.js |
| `nuxt` | Nuxt.js |
| `react` (without next) | React SPA (probably Vite) |
| `vue` (without nuxt) | Vue.js SPA |
| `@angular/core` | Angular |
| `express` | Express.js |
| `@nestjs/core` | NestJS |
| `fastify` | Fastify |

### Inside `requirements.txt` / `pyproject.toml` — Detect Python Framework

| Dependency | Framework |
|:---|:---|
| `django` | Django |
| `fastapi` | FastAPI |
| `flask` | Flask |
| `sqlalchemy` | ORM SQLAlchemy |

---

## How to Suggest a Stack (When There's No Project)

If the user is starting from scratch, use these questions to guide the suggestion:

### Question 1: Application Type

| Type | Suggested Direction |
|:---|:---|
| **Web fullstack (SSR)** | React meta-framework + TypeScript + ORM + Relational DB |
| **Web SPA + separate API** | React/Vue SPA (front) + API framework (back) |
| **API/Backend only** | TypeScript or Python API framework |
| **Mobile** | Cross-platform framework |
| **CLI tool** | Node.js or Python with CLI library |

### Question 2: Project Priorities

| Priority | Stack Influence |
|:---|:---|
| **Performance** | Consider compiled languages or specific optimizations |
| **Development speed** | Frameworks with more abstractions |
| **Scalability** | Microservices, queues, distributed cache |
| **Simplicity** | Monolith, ORM, full-featured framework |

### Question 3: Team

| Context | Influence |
|:---|:---|
| Solo dev | Fewer abstractions, full-stack frameworks |
| Small team (2-5) | Monorepo, end-to-end TypeScript |
| Large team (5+) | Well-defined modules, robust CI/CD |

---

## Suggestion Rules

1. **NEVER suggest a stack without justification** — always explain the "why"
2. **Consider the user's experience** — don't suggest technologies the user can't maintain
3. **Present at most 3 options** — excess choice paralyzes
4. **Include pros and cons** of each option
5. **Use `ask_question`** so the user can formally choose
6. **Record the decision** with justification in the SDD
7. **ALWAYS use `search_web` to validate current options** — your training data may be outdated. Search for current versions, pricing, and community status before proposing

---

## Infrastructure & Services Decision Categories

> [!IMPORTANT]
> For each category below, the agent MUST:
> 1. Use the **diagnostic questions** to understand the user's context
> 2. Use `search_web` to find current options, pricing, and community status
> 3. **PROPOSE** a solution with justification, rather than just asking the user what they want
> 4. Present at most 3 options with pros/cons and a clear recommendation

### Category 1: Database

**When this decision applies**: Every project that persists data.

#### Diagnostic Questions (ask the user)
1. "Is your data highly structured and relational (user accounts, financial records, orders) or unstructured/evolving rapidly (content, logs, sensor data)?"
2. "Do you need strict transactional consistency (ACID) or can you tolerate eventual consistency?"
3. "What's the expected data volume and growth rate?"
4. "Do you need full-text search, vector search (for AI), or geospatial queries?"

#### Decision Criteria

| Criterion | Relational (SQL) | Document (NoSQL) | NewSQL |
|:---|:---|:---|:---|
| **Data structure** | Rigid, schema-based | Flexible (JSON, graph, key-value) | Rigid, relational |
| **Transactions** | Strong ACID | Often eventual consistency | ACID compliant |
| **Scalability** | Primarily vertical | Horizontal (scale-out) | Horizontal |
| **Query complexity** | Complex joins, reporting | Simple lookups, aggregations | Complex joins at scale |
| **Best for** | Finance, ERP, structured data | Big data, IoT, real-time apps | Global-scale SQL apps |

#### Agent Research Instructions
- Search for: `"best {type} database {year} comparison pricing"` (where type = relational/document/graph)
- For managed services, compare: self-hosted vs. managed (BaaS) options
- For relational: check if the user's stack has a preferred ORM (Prisma for TS, SQLAlchemy for Python)
- **Default recommendation**: For 90% of new projects, a well-managed PostgreSQL instance is the best starting point — it handles relational data, JSON, and even vector search via extensions

---

### Category 2: Authentication

**When this decision applies**: Any project with user accounts or protected resources.

#### Diagnostic Questions
1. "Is this a B2C app (individual users) or B2B (organization/team accounts)?"
2. "Do you need social login (Google, GitHub) or enterprise SSO (SAML, OIDC)?"
3. "Do you need to manage user profiles, roles, and permissions (RBAC)?"
4. "Are there data sovereignty requirements? Must user data stay in a specific region?"
5. "Do you already have a database where user data is stored?"

#### Decision Criteria

| Criterion | Managed Auth Service | Framework-Integrated Auth | Self-Hosted Auth |
|:---|:---|:---|:---|
| **Setup time** | Minutes | Hours | Days |
| **Customization** | Limited (pre-built UI) | Full control (you build UI) | Full control + full responsibility |
| **Cost at scale** | Per-user pricing (can be expensive) | Free/low (your infrastructure) | Free (your infrastructure + ops) |
| **Security responsibility** | Shared (provider handles core) | You handle everything | You handle everything |
| **Best for** | Startups, SaaS, fast shipping | Developers who need full control | Enterprise, strict compliance |

#### Agent Research Instructions
- Search for: `"authentication solutions {year} comparison {framework}"` (where framework = Next.js, React, etc.)
- Key factors: pricing per MAU, social login support, MFA, organization management
- If user already uses a BaaS (e.g., Supabase, Firebase), recommend their built-in auth
- **Default recommendation**: If using a BaaS, use its integrated auth; otherwise, for SaaS/startup, suggest a managed service; for maximum control, suggest an open-source framework

---

### Category 3: Hosting & Deploy

**When this decision applies**: Every project that needs to go to production.

#### Diagnostic Questions
1. "Is this a frontend-only, backend-only, or fullstack app?"
2. "Do you need background workers, cron jobs, or WebSockets?"
3. "How important is cost predictability? Do you prefer flat-rate or pay-per-use?"
4. "Are there compliance requirements (SOC2, HIPAA, data residency)?"
5. "Do you have DevOps resources on the team, or does deploy need to be 'push and forget'?"

#### Decision Criteria

| Criterion | PaaS (Managed) | Edge/Serverless | IaaS (Cloud VMs) |
|:---|:---|:---|:---|
| **Setup complexity** | Very low (git push) | Low (framework-specific) | High (configure everything) |
| **Cost predictability** | Flat-rate or usage-based | Usage-based (can spike) | Consumption-based (complex) |
| **Long-running processes** | Yes | Limited (timeout constraints) | Yes (full control) |
| **Scaling** | Automatic (platform-managed) | Automatic (edge) | Manual or auto-scaling rules |
| **Best for** | Startups, small teams | Frontend, static sites, APIs | Enterprise, complex infra |

#### Agent Research Instructions
- Search for: `"best hosting platform {year} {app-type} comparison pricing"`
- For frontend-heavy (Next.js, SvelteKit): prioritize edge/serverless platforms
- For backend-heavy or needs workers: prioritize PaaS with persistent services
- **Default recommendation**: For MVP/startup, suggest a PaaS with git-push deploy; for Next.js, suggest its canonical hosting platform; for complex backends, suggest a PaaS that supports background workers

---

### Category 4: Storage & CDN

**When this decision applies**: Any project that handles file uploads, images, media, or static assets.

#### Diagnostic Questions
1. "What type of files will be stored? (user uploads, images, video, documents, backups)"
2. "Are files served to the public (e.g., product images, media) or private (e.g., invoices, reports)?"
3. "What's the expected volume and frequency of reads vs. writes?"
4. "Are there data residency requirements for stored files?"

#### Decision Criteria

| Criterion | BaaS-Integrated Storage | Dedicated Object Storage | Specialized CDN |
|:---|:---|:---|:---|
| **Setup complexity** | Very low (API call) | Medium (bucket config) | Medium (CDN rules) |
| **Auth integration** | Seamless (row-level security) | Separate (IAM policies) | None (public by default) |
| **Egress costs** | Varies by provider | Can be expensive | Some offer zero egress |
| **Advanced features** | Limited (basic CRUD) | Full (lifecycle, archival, WORM) | Edge transforms, optimization |
| **Best for** | App-integrated user content | Enterprise, backups, compliance | Public assets, heavy traffic |

#### Agent Research Instructions
- Search for: `"object storage comparison {year} pricing egress fees"`
- **Critical factor**: egress fees dominate costs for public-facing apps — prioritize providers with zero/low egress
- If user already uses a BaaS, recommend its integrated storage
- For backups/archives: prioritize cost-effective long-term storage
- **Default recommendation**: Use BaaS-integrated storage if available; for public assets, suggest zero-egress providers; for enterprise, suggest S3-compatible services

---

### Category 5: Observability

**When this decision applies**: Any production application that needs monitoring, error tracking, or debugging capabilities.

#### Diagnostic Questions
1. "What's the primary pain point? (code crashes, performance issues, system-wide visibility)"
2. "Is this a monolith or a distributed system (microservices)?"
3. "Do you have DevOps resources to manage self-hosted monitoring infrastructure?"
4. "What's the budget for monitoring? Is a managed SaaS acceptable?"

#### Decision Criteria

| Criterion | Error Tracking | All-in-One SaaS | Open-Source Stack |
|:---|:---|:---|:---|
| **What it answers** | "What line of code crashed?" | "What's happening across all systems?" | "Custom questions, vendor-neutral" |
| **Setup complexity** | Very low (SDK install) | Low (agent install) | High (deploy + configure) |
| **Cost** | Free tier + per-event | Expensive at scale | Free (you host it) |
| **Vendor lock-in** | Low | High | None |
| **Best for** | Developers, code-level debugging | Large orgs, unified visibility | Teams with DevOps, cost-conscious |

#### The Three Pillars of Observability
- **Metrics** (the "What"): Numeric measurements over time — use for alerting and dashboards
- **Logs** (the "Why"): Structured event records — use for granular debugging
- **Traces** (the "Where"): Request journey across services — use for distributed systems

#### Agent Research Instructions
- Search for: `"observability tools comparison {year} {language/framework}"`
- **Start small**: Begin with error tracking for critical paths (login, checkout) — don't instrument everything at once
- If user mentions "AI-ready": check for platforms with OpenTelemetry support for vendor-neutral instrumentation
- **Default recommendation**: For most apps, start with an error tracking SDK; add metrics/logs as the system grows; for distributed systems, use OpenTelemetry as the instrumentation standard

---

### Category 6: Queues & Messaging

**When this decision applies**: When the system needs to handle background jobs, decouple services, or manage traffic spikes.

#### Diagnostic Questions
1. "Do you have operations that don't need an immediate response? (email sending, image processing, report generation)"
2. "Do you need to decouple services so they can fail independently?"
3. "Do you need to replay historical events or stream real-time data?"
4. "What's the expected message throughput? (messages per second/minute)"

#### When to Use a Queue vs. Synchronous

| Criterion | Use Synchronous (REST/gRPC) | Use Async Queue |
|:---|:---|:---|
| **Response need** | Client needs immediate result | Result can come later |
| **Coupling** | Tight coupling is acceptable | Services must be independent |
| **Traffic** | Predictable, steady | Spiky, needs buffering |
| **Processing time** | Milliseconds | Seconds to minutes |
| **Failure** | Fail-fast is OK | Must eventually succeed (retries) |

#### Decision Criteria

| Criterion | In-Process Queue | Dedicated Broker | Event Streaming |
|:---|:---|:---|:---|
| **Complexity** | Very low | Medium | High |
| **Throughput** | Medium (Redis-backed) | Medium-High | Extremely high |
| **Message replay** | No | Limited | Yes (native) |
| **Scaling** | Limited (single Redis) | Good (cluster) | Massive (partitions) |
| **Best for** | Background jobs in a monolith | Microservice communication | Event-driven architectures, data pipelines |

#### Agent Research Instructions
- Search for: `"message queue comparison {year} {language/framework}"`
- For Node.js apps with simple background jobs: recommend an in-process Redis-backed queue
- For microservices needing reliable routing: recommend a dedicated broker
- For event-driven architectures or data pipelines: recommend event streaming
- **Default recommendation**: Most apps start with a simple in-process queue; only introduce a dedicated broker when you have multiple services that need to communicate; only use event streaming when you need message replay or massive throughput

---

## Web Search Mandate

> [!IMPORTANT]
> **The agent MUST follow these rules when making technology proposals:**
>
> 1. **NEVER rely solely on training data** for tool/service recommendations — always validate with `search_web`
> 2. **Search for current versions** — a tool recommended in 2024 may be deprecated or superseded in 2025
> 3. **Search for current pricing** — pricing models change frequently; don't quote cached prices
> 4. **Search for community health** — check GitHub stars, recent commits, active maintainers
> 5. **Search query template**: `"{category} {technology} vs alternatives {current-year} comparison"`
> 6. **When in doubt, search** — it's better to take 30 seconds to verify than to recommend an obsolete tool
