# Security Checklist for Code Review

Simplified checklist based on the OWASP Top 10, adapted for individual feature code review.

---

## 1. Injection (SQL, XSS, Command)

- [ ] **SQL Injection**: Queries use parameterization/prepared statements (never string concatenation)
- [ ] **XSS**: User inputs are sanitized before rendering in the DOM
- [ ] **Command Injection**: User inputs are NEVER passed directly to system command execution
- [ ] **Template Injection**: Templates (Handlebars, EJS, Jinja) escape variables by default

### What to verify
```typescript
// ❌ SQL Injection
db.query(`SELECT * FROM users WHERE id = '${userId}'`);

// ✅ Parameterized
db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

```typescript
// ❌ XSS
element.innerHTML = userInput;

// ✅ Sanitized
element.textContent = userInput;
```

---

## 2. Authentication

- [ ] Passwords are hashed with a strong algorithm (bcrypt, argon2, scrypt) — never MD5/SHA1
- [ ] JWT tokens have defined expiration
- [ ] Refresh tokens are stored securely (httpOnly cookies, not localStorage)
- [ ] Login attempts are limited (rate limiting / account lockout)
- [ ] Logout invalidates the session/token on the server

---

## 3. Authorization

- [ ] Each endpoint verifies the authenticated user's permissions
- [ ] No IDOR (Insecure Direct Object Reference) — user A cannot access user B's data
- [ ] Roles/permissions are validated on the backend (never only on the frontend)
- [ ] Admin endpoints are properly protected

### What to verify
```typescript
// ❌ IDOR — any authenticated user can access any order
app.get('/api/orders/:id', async (req, res) => {
  const order = await orderRepo.findById(req.params.id);
  return res.json(order);
});

// ✅ Ownership verification
app.get('/api/orders/:id', async (req, res) => {
  const order = await orderRepo.findById(req.params.id);
  if (order.userId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  return res.json(order);
});
```

---

## 4. Sensitive Data Exposure

- [ ] Passwords never appear in API responses
- [ ] Sensitive data (SSN, credit card, tokens) are not logged
- [ ] .env and secrets are not committed to git (.gitignore configured)
- [ ] Production errors don't expose stack traces or internal details to the client

### What to verify
```typescript
// ❌ Exposes password
return res.json(user);

// ✅ Omits sensitive fields
const { password, ...safeUser } = user;
return res.json(safeUser);
```

---

## 5. Security Configuration

- [ ] CORS is configured to allow only necessary origins (not `*` in production)
- [ ] Security headers configured (CSP, X-Frame-Options, X-Content-Type-Options)
- [ ] HTTPS enforced in production
- [ ] Secrets/tokens are not hardcoded in source code

### What to verify
```typescript
// ❌ Open CORS
app.use(cors({ origin: '*' }));

// ✅ Restricted CORS
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
```

---

## 6. Input Validation

- [ ] All form inputs are validated on the backend (not only on the frontend)
- [ ] File uploads validate type, size, and content
- [ ] Pagination has maximum limits (doesn't allow `limit=999999`)
- [ ] Numeric fields validate range (doesn't accept negatives when it shouldn't)

---

## Security Issue Classification

| Issue | Severity |
|:---|:---|
| SQL/XSS/Command Injection | 🔴 Critical |
| IDOR (access to other users' data) | 🔴 Critical |
| Plaintext password / weak hash | 🔴 Critical |
| Secrets hardcoded in code | 🔴 Critical |
| Token without expiration | 🔴 Critical |
| CORS `*` in production | 🟡 Medium |
| Missing rate limiting | 🟡 Medium |
| Missing security headers | 🟡 Medium |
| Stack trace in error response | 🟡 Medium |
| Frontend-only validation | 🟡 Medium |
| Missing pagination limit | 🟢 Low |

> [!IMPORTANT]
> **Every security issue classified as Critical MUST be fixed immediately.** Never move to backlog.
