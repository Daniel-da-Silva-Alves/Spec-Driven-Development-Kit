# Technology Stack Analysis and Suggestion Guide

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

| Type | Suggested Stack |
|:---|:---|
| **Web fullstack (SSR)** | Next.js + TypeScript + Prisma + PostgreSQL |
| **Web SPA + separate API** | Vite + React + TypeScript (front) + NestJS or FastAPI (back) |
| **API/Backend only** | NestJS (TS) or FastAPI (Python) |
| **Mobile** | React Native + Expo or Flutter |
| **CLI tool** | Node.js + Commander or Python + Click |

### Question 2: Project Priorities

| Priority | Stack Influence |
|:---|:---|
| **Performance** | Consider Rust, Go, or specific optimizations |
| **Development speed** | Frameworks with more abstractions (Next.js, Django) |
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
2. **Consider the user's experience** — don't suggest Rust if the user is a beginner
3. **Present at most 3 options** — excess choice paralyzes
4. **Include pros and cons** of each option
5. **Use `ask_question`** so the user can formally choose
6. **Record the decision** with justification in the SDD
