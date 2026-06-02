# Architectural Patterns Catalog

Reference for the agent when conducting architectural decisions with the user. Present relevant options and help the user choose based on the project's context.

---

## Application Architecture Patterns

### MVC (Model-View-Controller)
- **When to use**: Traditional web applications, simple APIs, smaller projects
- **Pros**: Simple, well-documented, easy onboarding
- **Cons**: Can become disorganized in large projects, coupling between layers
- **Examples**: Express.js + templates, Ruby on Rails, Django

### Clean Architecture
- **When to use**: Medium/large applications, complex domains, when testability is a priority
- **Pros**: Framework independence, high testability, clear separation of responsibilities
- **Cons**: More boilerplate, learning curve, overengineering for simple projects
- **Examples**: NestJS with modules, FastAPI with layers, enterprise applications

### Hexagonal (Ports & Adapters)
- **When to use**: Systems with multiple external integrations, when business logic needs to be isolated
- **Pros**: Facilitates swapping external dependencies, excellent for testing
- **Cons**: Additional complexity, many interfaces/abstractions
- **Examples**: Financial systems, applications with multiple data sources

### Feature-Based (Vertical Slicing)
- **When to use**: Frontend/fullstack applications, when each feature is relatively independent
- **Pros**: Code organized by functionality (not by type), easy to navigate
- **Cons**: Possible duplication between features, difficult when there's lots of shared logic
- **Examples**: Next.js App Router, NestJS modules, mobile app features

---

## Communication Patterns

### REST
- **When to use**: Public APIs, simple CRUD, integration with multiple clients
- **Pros**: Universal, stateless, cacheable, well-documented
- **Cons**: Over/under-fetching, multiple requests for related data

### GraphQL
- **When to use**: Complex frontends with nested data, multiple views of the same data
- **Pros**: Fetch exactly what's needed, strong typing, introspection
- **Cons**: Backend complexity, N+1 queries, caching is harder

### tRPC
- **When to use**: Fullstack TypeScript, when client and server are in the same repo
- **Pros**: End-to-end type-safety without generated code, excellent DX
- **Cons**: Only works with TypeScript, client-server coupling

---

## State Management Patterns (Frontend)

### React Context
- **When to use**: Simple and infrequent state (theme, auth, locale)
- **Pros**: Native, zero dependencies
- **Cons**: Unnecessary re-renders, doesn't scale well

### Zustand
- **When to use**: Moderate state, performance matters, simplicity is a priority
- **Pros**: Minimal API, granular selectors, no boilerplate
- **Cons**: Less structured than Redux, can become a "bag of state"

### Redux Toolkit
- **When to use**: Complex state with many interactions, when predictability is critical
- **Pros**: DevTools, time-travel debugging, mature ecosystem
- **Cons**: Boilerplate, learning curve, overengineering for simple projects

### TanStack Query (React Query)
- **When to use**: Server-derived state (server state), API cache
- **Pros**: Automatic cache, invalidation, background refetch, loading states
- **Cons**: Doesn't replace client state, learning curve for cache policies

---

## Data Access Patterns

### ORM (Prisma, TypeORM, SQLAlchemy)
- **When to use**: CRUD-heavy, automated migrations, type-safety
- **Pros**: Productivity, migrations, typing
- **Cons**: Performance on complex queries, leaky abstraction

### Query Builder (Knex, Drizzle)
- **When to use**: Complex queries, performance matters, fine control
- **Pros**: Flexibility, performance, composability
- **Cons**: More verbose than ORM, no automatic migrations (some)

### Raw SQL
- **When to use**: Highly optimized queries, stored procedures, DBA on the team
- **Pros**: Maximum performance and control
- **Cons**: No typing, vulnerable to SQL injection if poorly done, difficult maintenance

---

## How to Present to the User

When conducting the technical interview:

1. Identify which **decision category** is at play
2. Present **2-3 relevant options** (not all) based on context
3. Include a **recommendation** based on the project
4. Use `ask_question` with formatted options
5. Record the decision with justification in the SDD
