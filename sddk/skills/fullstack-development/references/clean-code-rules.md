# Clean Code Rules

Stack-agnostic rules that the agent must follow during development. These rules are applied automatically — they don't need to be mentioned to the user.

---

## 1. Naming

### Variables and Functions
| ❌ Bad | ✅ Good | Reason |
|:---|:---|:---|
| `data` | `userProfile` | Describes the content |
| `temp` | `formattedDate` | Describes the purpose |
| `handleClick` | `handleLoginSubmit` | Describes the specific action |
| `result` | `validationErrors` | Describes what it contains |
| `x`, `y`, `i` (outside loops) | `index`, `coordinate` | Self-documenting |
| `flag` | `isAuthenticated` | Semantic |
| `arr` | `activeUsers` | Describes the collection content |

### Functions
| ❌ Bad | ✅ Good | Reason |
|:---|:---|:---|
| `process()` | `validateAndSaveUser()` | Describes what it does |
| `doStuff()` | `calculateShippingCost()` | Specific |
| `getData()` | `fetchUserOrders()` | Specifies what it fetches |
| `check()` | `isEmailAlreadyRegistered()` | Booleans with `is/has/can` prefix |

### Components (React/Vue/Svelte)
| ❌ Bad | ✅ Good | Reason |
|:---|:---|:---|
| `Card` (generic) | `ProductCard` | Domain-specific |
| `Modal` (generic) | `ConfirmDeleteModal` | Describes the purpose |
| `List` (generic) | `OrderHistoryList` | Specific |
| `Button` (global catch-all) | `SubmitButton`, `NavigationButton` | Explicit variants |

---

## 2. Comments

### Prohibited Comments (❌)
```typescript
// Increment the counter
counter++;

// Return the user
return user;

// Set state to true
setIsLoading(true);

// Create a new instance
const service = new UserService();
```

### Acceptable Comments (✅)
```typescript
// Simplified RFC 5322 regex for corporate email validation
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@company\.com$/;

// 300ms delay for search debounce — prevents request flooding
// during rapid typing in the search field
const SEARCH_DEBOUNCE_MS = 300;

// TODO(#123): Migrate to API v2 when available in production
const API_BASE = '/api/v1';
```

### General Rule
> Comment the **why**, never the **what**. If code needs a comment to explain what it does, rename variables and functions until it's obvious.

---

## 3. Abstraction and Reuse

### Repetitive Code (❌)
```typescript
// Repeated in 5 components
const response = await fetch('/api/users', {
  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
});
if (!response.ok) throw new Error('Failed to fetch');
const data = await response.json();
```

### With Abstraction (✅)
```typescript
// Used in 5+ components — centralized fetch
const users = await apiClient.get<User[]>('/users');
```

### Rule: Extract when repeating ≥ 2 times
If a code pattern appears 2 or more times, it should be extracted to:
- A utility function
- A reusable component
- A custom hook (React)
- A service/module

---

## 4. File Structure

### Monolithic File (❌)
```
src/components/Dashboard.tsx  ← 500+ lines with everything together
```

### Granular Files (✅)
```
src/components/dashboard/
├── Dashboard.tsx              ← Composition of sub-components
├── DashboardHeader.tsx        ← Isolated header
├── DashboardMetrics.tsx       ← Metrics cards
├── DashboardRecentOrders.tsx  ← Recent orders list
└── useDashboardData.ts        ← Data hook
```

### Rule: 1 component per file, maximum ~150 meaningful lines

---

## 5. Error Handling

### Generic (❌)
```typescript
try {
  await saveUser(data);
} catch (e) {
  console.log(e);  // Silently ignores
}
```

### Specific (✅)
```typescript
try {
  await saveUser(data);
} catch (error) {
  if (error instanceof ValidationError) {
    showFieldErrors(error.fields);
  } else if (error instanceof NetworkError) {
    showRetryNotification('Connection failed. Try again.');
  } else {
    logger.error('Unexpected error saving user', { error, userId: data.id });
    showGenericError();
  }
}
```
