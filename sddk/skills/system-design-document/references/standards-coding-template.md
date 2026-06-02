# Template: Coding Best Practices and Standards

Use this template to generate `.specs/standards/coding-standards.md`. Fill in with the onboarding interview answers.

```markdown
# Coding Best Practices and Standards

**Project**: {project name}
**Last updated**: {date}

---

## 1. Adopted Principles

| Principle | What it means IN THIS project | Example |
|:---|:---|:---|
| **SSOT** (Single Source of Truth) | {e.g.: State lives in the database. Cache is derived.} | {e.g.: Don't maintain counters in 2 tables} |
| **DRY** (Don't Repeat Yourself) | {e.g.: Extract when repeating ≥ 2 times} | {e.g.: Centralized apiClient, not repeated fetch} |
| **KISS** (Keep It Simple) | {e.g.: Prefer simple solution over elegant} | {e.g.: Use map/filter instead of complex reduce} |
| **YAGNI** (You Aren't Gonna Need It) | {e.g.: Don't implement features "just in case"} | {e.g.: Don't create generic abstraction for 1 use} |
| **SOLID** | {which SOLID principles the project explicitly follows} | — |

---

## 2. Abstraction Rules

### When to Extract a Function
- {e.g.: When the block is used ≥ 2 times}
- {e.g.: When the block has more than 10 lines and can have a descriptive name}
- {e.g.: When the block does something semantically independent}

### When to Create a Component
- {e.g.: When the UI is reused in ≥ 2 places}
- {e.g.: When the component has more than ~100 lines}
- {e.g.: When it has its own state or logic}

### When to Create a Hook (React)
- {e.g.: When stateful logic is used in ≥ 2 components}
- {e.g.: When the component becomes cleaner by separating the logic}

### When to Create a Service
- {e.g.: When business logic doesn't belong to the component/controller}
- {e.g.: When the same operation is used across multiple endpoints/pages}

---

## 3. Error Handling

### Strategy by Layer

| Layer | Strategy |
|:---|:---|
| **Domain** | {e.g.: Throw custom exceptions (DomainError, ValidationError)} |
| **Application/Service** | {e.g.: Catch domain errors, translate to error DTOs} |
| **API/Controller** | {e.g.: Global error handler, map exceptions to HTTP status} |
| **Frontend** | {e.g.: Error Boundary for crashes, toast for action errors} |

### Custom Exceptions (if applicable)
```typescript
// Project error hierarchy
class AppError extends Error { code: string; statusCode: number; }
class ValidationError extends AppError { fields: FieldError[]; }
class NotFoundError extends AppError { }
class UnauthorizedError extends AppError { }
class ConflictError extends AppError { }
```

### Error Messages
- {e.g.: User-facing messages, never stack traces}
- {e.g.: Full error logging on the server, clean message on the client}
- {e.g.: Standardized error codes (ERROR_CODE) for the frontend to map}

---

## 4. Logging

### Strategy
- **Format**: {e.g.: Structured logging (JSON)}
- **Levels**: {e.g.: error, warn, info, debug}
- **Tool**: {e.g.: pino, winston, structured console}

### What to Log

| Level | When to use | Example |
|:---|:---|:---|
| `error` | Failures that prevent the operation | DB connection error, unhandled exception |
| `warn` | Abnormal but recoverable situations | Rate limit approaching, fallback activated |
| `info` | Important business events | User created, payment processed |
| `debug` | Details for debugging | SQL query executed, received payload |

### What to NEVER Log
- Passwords, tokens, API keys
- Sensitive personal data (SSN, credit card)
- Full request payloads in production

---

## 5. Testing (if applicable)

### Strategy
- **Primary type**: {e.g.: Manual tests via manual-tests.md}
- **Minimum coverage**: {e.g.: N/A — focus on manual tests}
- **When to automate**: {e.g.: Critical domain logic (calculations, validations)}

---

## 6. Performance

### General Rules
- {e.g.: Listing queries MUST have pagination (maximum 100 per page)}
- {e.g.: N+1 queries are prohibited — use eager loading / join}
- {e.g.: Images must be optimized (WebP, lazy loading)}
- {e.g.: Bundle splitting for frontend routes}
```
