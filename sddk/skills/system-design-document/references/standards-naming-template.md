# Template: Project Naming Conventions

Use this template to generate `.specs/standards/naming-conventions.md`. Fill in with the onboarding interview answers.

```markdown
# Naming Conventions

**Project**: {project name}
**Last updated**: {date}

---

## 1. Database

| Element | Convention | Example | Anti-example |
|:---|:---|:---|:---|
| Tables | {e.g.: snake_case, plural} | {e.g.: `auth_users`} | {e.g.: `User`, `authUser`} |
| Columns | {e.g.: snake_case, singular} | {e.g.: `first_name`} | {e.g.: `firstName`, `FirstName`} |
| Primary Keys | {e.g.: `id` (UUID v4)} | {e.g.: `id`} | {e.g.: `user_id`, `ID`} |
| Foreign Keys | {e.g.: `{singular_table}_id`} | {e.g.: `user_id`} | {e.g.: `fk_user`, `userId`} |
| Indexes | {e.g.: `idx_{table}_{columns}`} | {e.g.: `idx_users_email`} | {e.g.: `index1`} |
| Enums (values) | {e.g.: UPPER_SNAKE_CASE} | {e.g.: `PENDING_PAYMENT`} | {e.g.: `pendingPayment`} |
| Timestamps | {e.g.: `created_at`, `updated_at`} | — | {e.g.: `createdAt`, `date_created`} |
| Soft delete | {e.g.: `deleted_at` nullable} | — | {e.g.: `is_deleted`} |
| Booleans | {e.g.: `is_` prefix} | {e.g.: `is_active`} | {e.g.: `active`, `status`} |

### Module Prefixes (if applicable)
| Module | Prefix | Example |
|:---|:---|:---|
| {e.g.: Authentication} | {e.g.: `auth_`} | {e.g.: `auth_users`, `auth_sessions`} |
| {e.g.: Payments} | {e.g.: `pay_`} | {e.g.: `pay_transactions`} |

---

## 2. Code ({language})

### Variables

| Type | Convention | Example | Anti-example |
|:---|:---|:---|:---|
| Local variables | {e.g.: camelCase} | {e.g.: `userName`} | {e.g.: `user_name`, `UserName`} |
| Constants | {e.g.: UPPER_SNAKE_CASE} | {e.g.: `MAX_RETRIES`} | {e.g.: `maxRetries`} |
| Booleans | {e.g.: is/has/can/should prefix} | {e.g.: `isAuthenticated`} | {e.g.: `authenticated`, `auth`} |
| Arrays/Collections | {e.g.: plural} | {e.g.: `activeUsers`} | {e.g.: `userList`, `data`} |

### Functions

| Type | Convention | Example | Anti-example |
|:---|:---|:---|:---|
| General functions | {e.g.: verb + noun, camelCase} | {e.g.: `calculateTotal`} | {e.g.: `calc`, `doStuff`} |
| Handlers | {e.g.: handle + specific event} | {e.g.: `handleLoginSubmit`} | {e.g.: `handleClick`} |
| Getters | {e.g.: get + what} | {e.g.: `getUserOrders`} | {e.g.: `getData`} |
| Validators | {e.g.: is/validate + what} | {e.g.: `isValidEmail`} | {e.g.: `check`} |
| Transformers | {e.g.: format + To + format} | {e.g.: `dtoToEntity`} | {e.g.: `convert`} |

### Classes and Types

| Type | Convention | Example | Anti-example |
|:---|:---|:---|:---|
| Classes | {e.g.: PascalCase, noun} | {e.g.: `UserService`} | {e.g.: `userService`} |
| Interfaces | {e.g.: PascalCase, no I prefix} | {e.g.: `UserProfile`} | {e.g.: `IUserProfile`} |
| Types | {e.g.: PascalCase} | {e.g.: `OrderStatus`} | {e.g.: `TOrderStatus`} |
| Enums | {e.g.: PascalCase singular} | {e.g.: `PaymentMethod`} | {e.g.: `PaymentMethods`} |

### Components (Frontend)

| Type | Convention | Example | Anti-example |
|:---|:---|:---|:---|
| Components | {e.g.: PascalCase, specific} | {e.g.: `ProductCard`} | {e.g.: `Card`} |
| Hooks | {e.g.: use + context} | {e.g.: `useOrderData`} | {e.g.: `useData`} |
| Context | {e.g.: PascalCase + Context} | {e.g.: `AuthContext`} | {e.g.: `ctx`} |

---

## 3. Files and Directories

| Type | Convention | Example |
|:---|:---|:---|
| Components | {e.g.: PascalCase.tsx} | {e.g.: `ProductCard.tsx`} |
| Hooks | {e.g.: camelCase.ts} | {e.g.: `useAuth.ts`} |
| Utils | {e.g.: camelCase.ts} | {e.g.: `formatCurrency.ts`} |
| Types | {e.g.: camelCase.ts} | {e.g.: `userTypes.ts`} |
| Services | {e.g.: camelCase.service.ts} | {e.g.: `auth.service.ts`} |
| Repositories | {e.g.: camelCase.repository.ts} | {e.g.: `user.repository.ts`} |
| Migrations | {e.g.: NNN_description.sql} | {e.g.: `001_create_users.sql`} |

---

## 4. Git

| Type | Convention | Example |
|:---|:---|:---|
| Branches | {e.g.: type/short-description} | {e.g.: `feat/user-auth`, `fix/login-redirect`} |
| Commits | {e.g.: Conventional Commits} | {e.g.: `feat(auth): add login endpoint`} |
| Tags | {e.g.: semver} | {e.g.: `v1.2.3`} |
```
