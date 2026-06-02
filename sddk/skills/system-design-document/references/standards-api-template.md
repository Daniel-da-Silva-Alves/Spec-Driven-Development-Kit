# Template: Project API Conventions

Use this template to generate `.specs/standards/api-conventions.md`. Fill in with the onboarding interview answers. If the project has no API, create with "N/A — project without API".

```markdown
# API Conventions

**Project**: {project name}
**Last updated**: {date}

---

## 1. API Pattern

**Type**: {REST | GraphQL | tRPC | gRPC}
**Versioning**: {e.g.: URL path /api/v1/, header, none}
**Base URL**: {e.g.: /api/v1}

---

## 2. Response Format

### Success Response
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 150
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "{ERROR_CODE}",
    "message": "{human-readable message}",
    "details": [ ... ]
  }
}
```

### HTTP Status Codes

| Status | When to use |
|:---|:---|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Resource created (POST) |
| 204 | Success with no body (DELETE) |
| 400 | Validation / invalid input |
| 401 | Not authenticated |
| 403 | Not authorized (no permission) |
| 404 | Resource not found |
| 409 | Conflict (e.g.: email already exists) |
| 422 | Unprocessable entity |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## 3. Endpoint Naming

| Rule | Correct example | Wrong example |
|:---|:---|:---|
| Plural nouns | `/api/v1/users` | `/api/v1/user` |
| No verbs in URL | `GET /users` | `GET /getUsers` |
| Kebab-case for multi-word | `/order-items` | `/orderItems` |
| Nested resources | `/users/:id/orders` | `/getUserOrders` |

---

## 4. Pagination

**Type**: {cursor | offset | keyset}

### Request Format
{e.g. for offset:}
```
GET /api/v1/users?page=2&per_page=20
```

### Response Format (meta)
```json
{
  "meta": {
    "page": 2,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## 5. Filters and Sorting

### Filters
```
GET /api/v1/users?status=active&role=admin
```

### Sorting
```
GET /api/v1/users?sort=created_at&order=desc
```

---

## 6. Authentication

**Method**: {e.g.: Bearer Token (JWT) via Authorization header}
**Header**: `Authorization: Bearer {token}`
**Refresh**: {e.g.: via POST /api/v1/auth/refresh with refresh token in httpOnly cookie}

---

## 7. Validation

| Rule | Description |
|:---|:---|
| Backend validation | ALL input is validated on the server, regardless of frontend |
| Error messages | Return field + specific message |
| Validation error format | `{"error": {"code": "VALIDATION_ERROR", "details": [{"field": "email", "message": "Invalid email"}]}}` |
```
