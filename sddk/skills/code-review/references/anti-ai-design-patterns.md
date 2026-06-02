# Anti-AI-Design — 8 Patterns to Detect and Reject

These are patterns that expose AI-generated code without human curation. The agent MUST detect and fix all of them during Code Review.

---

## Pattern 1: Emojis in Interface

### What to detect
Emojis used as textual content in user interface elements.

### Where to look
- Button text
- Form labels
- Headings and titles
- Input placeholders
- Feedback/toast messages
- Navigation (menus, breadcrumbs)

### Examples

❌ **Bad**:
```html
<button>🚀 Submit Project</button>
<h1>📊 Sales Dashboard</h1>
<input placeholder="🔍 Search..." />
<span>✅ Saved successfully!</span>
```

✅ **Good**:
```html
<button>Submit Project</button>
<h1>Sales Dashboard</h1>
<input placeholder="Search products, orders, or customers" />
<span>Changes saved</span>
```

### Exception
Emojis are acceptable in: user-generated content (chat, comments), data fields (not UI), and when the project's design system explicitly includes them.

---

## Pattern 2: Generic CSS/Tailwind

### What to detect
Visual styles applied without coherence with a design system. Random colors, inconsistent sizes, ad-hoc spacing.

### Examples

❌ **Bad**:
```html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
  <h2 class="text-2xl font-bold mb-2">Title</h2>
  <p class="text-gray-200">Description here</p>
</div>
```

✅ **Good** (with design tokens):
```html
<div class="bg-surface-primary text-on-surface p-card rounded-card shadow-card">
  <h2 class="text-heading-md font-heading mb-spacing-sm">Title</h2>
  <p class="text-body-md text-on-surface-secondary">Description here</p>
</div>
```

Or with CSS variables:
```css
.card {
  background: var(--color-surface-primary);
  padding: var(--spacing-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}
```

---

## Pattern 3: Obvious Comments

### What to detect
Comments that restate in natural language what the code already says.

### Examples

❌ **Bad**:
```typescript
// Import the users service
import { UserService } from './user.service';

// Set the counter variable to 0
let counter = 0;

// Increment the counter
counter++;

// Return the response
return response;
```

✅ **Good** (no comments — the code is self-explanatory):
```typescript
import { UserService } from './user.service';
let counter = 0;
counter++;
return response;
```

---

## Pattern 4: Generic Names

### What to detect
Variables, functions, and components with names that don't describe their content or purpose.

### Prohibited Names List

| Context | Generic Names ❌ |
|:---|:---|
| Variables | `data`, `result`, `temp`, `item`, `obj`, `val`, `info`, `stuff` |
| Functions | `handleClick`, `handleChange`, `handleSubmit`, `getData`, `processData`, `doStuff`, `check` |
| Components | `Card`, `Modal`, `List`, `Item`, `Container`, `Wrapper` (without qualifier) |
| Types | `Props`, `Data`, `Response`, `Payload` (without qualifier) |

---

## Pattern 5: Monolithic Components

### What to detect
Component files with more than ~150 meaningful lines that mix multiple responsibilities.

### Signs
- Multiple unrelated `useState`/`useEffect` in the same component
- Extensive conditional rendering (multiple nested `if/else` or ternaries)
- Business logic mixed with UI
- Form, table, and chart in the same component

---

## Pattern 6: Repetitive Boilerplate Code

### What to detect
Identical or near-identical code patterns repeated across multiple files without abstraction.

### Signs
- Repeated fetch/API calls without a centralized client
- Duplicated validations across forms
- Repeated loading/error state handling
- Duplicated date/currency formatting

---

## Pattern 7: "YouTube Tutorial" UI

### What to detect
Interfaces that look like screenshots from generic tutorials — functional but without visual identity.

### Signs
- Cards with default framework `box-shadow` without customization
- Generic gradients (`linear-gradient(to right, blue, purple)`)
- Default Tailwind colors without customization (`blue-500`, `gray-700`)
- Basic grid layout without visual hierarchy
- Default browser typography (no custom font)
- Generic library icons without curation

---

## Pattern 8: Generic Placeholder Text

### What to detect
Text that demonstrates lack of care with the actual interface content.

### Prohibited Text List

| Context | Generic Text ❌ |
|:---|:---|
| Content | "Lorem ipsum dolor sit amet" |
| Buttons | "Click here", "Submit", "Send", "OK", "Go" |
| Links | "Read more", "Learn more", "Click here" |
| Placeholders | "Enter text here", "Type something...", "Search..." |
| Labels | "Label", "Field", "Input" |
| Headings | "Title", "Heading", "Section" |
| Error msgs | "An error occurred", "Something went wrong" |

### What to use instead
Real and descriptive text based on the application domain, extracted from the SRS functional requirements.
