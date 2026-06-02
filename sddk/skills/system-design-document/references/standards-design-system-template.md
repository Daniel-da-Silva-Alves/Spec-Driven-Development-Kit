# Template: Project Design System

Use this template to generate `.specs/standards/design-system.md`. Fill in with the onboarding interview answers. If the project is backend-only, create the file with content "N/A — backend-only project".

```markdown
# Design System

**Project**: {project name}
**Last updated**: {date}

---

## 1. Color Palette

### Primary Colors
| Token | Value | Usage |
|:---|:---|:---|
| `--color-primary-50` | {e.g.: #e8f0fe} | Soft backgrounds |
| `--color-primary-100` | {e.g.: #d2e3fc} | Hover on backgrounds |
| `--color-primary-500` | {e.g.: #4285f4} | Primary actions, links |
| `--color-primary-700` | {e.g.: #1a73e8} | Hover on primary actions |
| `--color-primary-900` | {e.g.: #174ea6} | Highlighted text |

### Surface Colors
| Token | Value | Usage |
|:---|:---|:---|
| `--color-surface` | {e.g.: #ffffff} | Card, modal backgrounds |
| `--color-surface-variant` | {e.g.: #f8f9fa} | Alternating section backgrounds |
| `--color-on-surface` | {e.g.: #1f1f1f} | Text on surfaces |
| `--color-on-surface-secondary` | {e.g.: #5f6368} | Secondary text |
| `--color-outline` | {e.g.: #dadce0} | Borders, dividers |

### Semantic Colors
| Token | Value | Usage |
|:---|:---|:---|
| `--color-error` | {e.g.: #d32f2f} | Errors, validation |
| `--color-success` | {e.g.: #0f9d58} | Success, confirmation |
| `--color-warning` | {e.g.: #f9ab00} | Alerts, warnings |
| `--color-info` | {e.g.: #4285f4} | Information |

### Dark Mode (if applicable)
| Light Token | Dark Token | Dark Value |
|:---|:---|:---|
| `--color-surface` | `--color-surface-dark` | {e.g.: #1e1e1e} |

---

## 2. Typography

### Fonts
| Token | Value | Usage |
|:---|:---|:---|
| `--font-family` | {e.g.: 'Inter', sans-serif} | General text |
| `--font-family-heading` | {e.g.: 'Outfit', sans-serif} | Headings |
| `--font-family-mono` | {e.g.: 'JetBrains Mono', monospace} | Code |

### Sizes
| Token | Value | Line Height | Usage |
|:---|:---|:---|:---|
| `--text-xs` | {e.g.: 0.75rem} | {e.g.: 1rem} | Labels, captions |
| `--text-sm` | {e.g.: 0.875rem} | {e.g.: 1.25rem} | Body small |
| `--text-base` | {e.g.: 1rem} | {e.g.: 1.5rem} | Body default |
| `--text-lg` | {e.g.: 1.125rem} | {e.g.: 1.75rem} | Body large |
| `--text-xl` | {e.g.: 1.25rem} | {e.g.: 1.75rem} | Heading 4 |
| `--text-2xl` | {e.g.: 1.5rem} | {e.g.: 2rem} | Heading 3 |
| `--text-3xl` | {e.g.: 1.875rem} | {e.g.: 2.25rem} | Heading 2 |
| `--text-4xl` | {e.g.: 2.25rem} | {e.g.: 2.5rem} | Heading 1 |

### Weights
| Token | Value | Usage |
|:---|:---|:---|
| `--font-regular` | {e.g.: 400} | Normal text |
| `--font-medium` | {e.g.: 500} | Soft emphasis |
| `--font-semibold` | {e.g.: 600} | Headings, labels |
| `--font-bold` | {e.g.: 700} | Strong emphasis |

---

## 3. Spacing

| Token | Value | Usage |
|:---|:---|:---|
| `--spacing-xs` | {e.g.: 0.25rem (4px)} | Minimum spacing |
| `--spacing-sm` | {e.g.: 0.5rem (8px)} | Inside components |
| `--spacing-md` | {e.g.: 1rem (16px)} | Between elements |
| `--spacing-lg` | {e.g.: 1.5rem (24px)} | Between sections |
| `--spacing-xl` | {e.g.: 2rem (32px)} | Between blocks |
| `--spacing-2xl` | {e.g.: 3rem (48px)} | Between larger sections |

---

## 4. Borders and Shadows

### Border Radius
| Token | Value | Usage |
|:---|:---|:---|
| `--radius-sm` | {e.g.: 4px} | Buttons, inputs |
| `--radius-md` | {e.g.: 8px} | Cards |
| `--radius-lg` | {e.g.: 12px} | Modals, containers |
| `--radius-full` | {e.g.: 9999px} | Avatars, badges |

### Shadows
| Token | Value | Usage |
|:---|:---|:---|
| `--shadow-sm` | {e.g.: 0 1px 2px rgba(0,0,0,0.05)} | Subtle cards |
| `--shadow-md` | {e.g.: 0 4px 6px rgba(0,0,0,0.07)} | Elevated cards |
| `--shadow-lg` | {e.g.: 0 10px 15px rgba(0,0,0,0.1)} | Modals, dropdowns |

---

## 5. Base Components

| Component | Background | Padding | Radius | Shadow |
|:---|:---|:---|:---|:---|
| Card | `--color-surface` | `--spacing-lg` | `--radius-md` | `--shadow-sm` |
| Button Primary | `--color-primary-500` | `--spacing-sm` `--spacing-md` | `--radius-sm` | none |
| Button Secondary | transparent | `--spacing-sm` `--spacing-md` | `--radius-sm` | none |
| Input | `--color-surface` | `--spacing-sm` `--spacing-md` | `--radius-sm` | inset border |
| Modal | `--color-surface` | `--spacing-xl` | `--radius-lg` | `--shadow-lg` |
| Badge | `--color-primary-50` | `--spacing-xs` `--spacing-sm` | `--radius-full` | none |

---

## 6. Breakpoints (Responsiveness)

| Token | Value | Device |
|:---|:---|:---|
| `--breakpoint-sm` | {e.g.: 640px} | Mobile landscape |
| `--breakpoint-md` | {e.g.: 768px} | Tablet |
| `--breakpoint-lg` | {e.g.: 1024px} | Desktop |
| `--breakpoint-xl` | {e.g.: 1280px} | Wide desktop |
```

## Rule for the Agent

> [!IMPORTANT]
> When the design system is defined, the agent must NEVER use hardcoded values for colors, spacing, typography, or border-radius. ALWAYS use the tokens defined in this document.
