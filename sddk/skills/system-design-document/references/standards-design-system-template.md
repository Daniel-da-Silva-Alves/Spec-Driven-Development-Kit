# Template: Design System do Projeto

Use este template para gerar `.specs/standards/design-system.md`. Preencha com as respostas do onboarding. Se o projeto é backend-only, criar o arquivo com conteúdo "N/A — projeto backend-only".

```markdown
# Design System

**Projeto**: {nome do projeto}
**Última atualização**: {data}

---

## 1. Paleta de Cores

### Cores Primárias
| Token | Valor | Uso |
|:---|:---|:---|
| `--color-primary-50` | {ex: #e8f0fe} | Backgrounds suaves |
| `--color-primary-100` | {ex: #d2e3fc} | Hover em backgrounds |
| `--color-primary-500` | {ex: #4285f4} | Ações primárias, links |
| `--color-primary-700` | {ex: #1a73e8} | Hover em ações primárias |
| `--color-primary-900` | {ex: #174ea6} | Texto em destaque |

### Cores de Superfície
| Token | Valor | Uso |
|:---|:---|:---|
| `--color-surface` | {ex: #ffffff} | Background de cards, modals |
| `--color-surface-variant` | {ex: #f8f9fa} | Background de seções alternadas |
| `--color-on-surface` | {ex: #1f1f1f} | Texto sobre surfaces |
| `--color-on-surface-secondary` | {ex: #5f6368} | Texto secundário |
| `--color-outline` | {ex: #dadce0} | Bordas, divisores |

### Cores Semânticas
| Token | Valor | Uso |
|:---|:---|:---|
| `--color-error` | {ex: #d32f2f} | Erros, validação |
| `--color-success` | {ex: #0f9d58} | Sucesso, confirmação |
| `--color-warning` | {ex: #f9ab00} | Alertas, avisos |
| `--color-info` | {ex: #4285f4} | Informações |

### Modo Escuro (se aplicável)
| Token Light | Token Dark | Valor Dark |
|:---|:---|:---|
| `--color-surface` | `--color-surface-dark` | {ex: #1e1e1e} |

---

## 2. Tipografia

### Fontes
| Token | Valor | Uso |
|:---|:---|:---|
| `--font-family` | {ex: 'Inter', sans-serif} | Texto geral |
| `--font-family-heading` | {ex: 'Outfit', sans-serif} | Headings |
| `--font-family-mono` | {ex: 'JetBrains Mono', monospace} | Código |

### Tamanhos
| Token | Valor | Line Height | Uso |
|:---|:---|:---|:---|
| `--text-xs` | {ex: 0.75rem} | {ex: 1rem} | Labels, captions |
| `--text-sm` | {ex: 0.875rem} | {ex: 1.25rem} | Body small |
| `--text-base` | {ex: 1rem} | {ex: 1.5rem} | Body default |
| `--text-lg` | {ex: 1.125rem} | {ex: 1.75rem} | Body large |
| `--text-xl` | {ex: 1.25rem} | {ex: 1.75rem} | Heading 4 |
| `--text-2xl` | {ex: 1.5rem} | {ex: 2rem} | Heading 3 |
| `--text-3xl` | {ex: 1.875rem} | {ex: 2.25rem} | Heading 2 |
| `--text-4xl` | {ex: 2.25rem} | {ex: 2.5rem} | Heading 1 |

### Pesos
| Token | Valor | Uso |
|:---|:---|:---|
| `--font-regular` | {ex: 400} | Texto normal |
| `--font-medium` | {ex: 500} | Ênfase suave |
| `--font-semibold` | {ex: 600} | Headings, labels |
| `--font-bold` | {ex: 700} | Destaque forte |

---

## 3. Espaçamento

| Token | Valor | Uso |
|:---|:---|:---|
| `--spacing-xs` | {ex: 0.25rem (4px)} | Espaço mínimo |
| `--spacing-sm` | {ex: 0.5rem (8px)} | Dentro de componentes |
| `--spacing-md` | {ex: 1rem (16px)} | Entre elementos |
| `--spacing-lg` | {ex: 1.5rem (24px)} | Entre seções |
| `--spacing-xl` | {ex: 2rem (32px)} | Entre blocos |
| `--spacing-2xl` | {ex: 3rem (48px)} | Entre seções maiores |

---

## 4. Bordas e Sombras

### Border Radius
| Token | Valor | Uso |
|:---|:---|:---|
| `--radius-sm` | {ex: 4px} | Botões, inputs |
| `--radius-md` | {ex: 8px} | Cards |
| `--radius-lg` | {ex: 12px} | Modals, containers |
| `--radius-full` | {ex: 9999px} | Avatars, badges |

### Shadows
| Token | Valor | Uso |
|:---|:---|:---|
| `--shadow-sm` | {ex: 0 1px 2px rgba(0,0,0,0.05)} | Cards sutis |
| `--shadow-md` | {ex: 0 4px 6px rgba(0,0,0,0.07)} | Cards elevados |
| `--shadow-lg` | {ex: 0 10px 15px rgba(0,0,0,0.1)} | Modals, dropdowns |

---

## 5. Componentes Base

| Componente | Background | Padding | Radius | Shadow |
|:---|:---|:---|:---|:---|
| Card | `--color-surface` | `--spacing-lg` | `--radius-md` | `--shadow-sm` |
| Button Primary | `--color-primary-500` | `--spacing-sm` `--spacing-md` | `--radius-sm` | none |
| Button Secondary | transparent | `--spacing-sm` `--spacing-md` | `--radius-sm` | none |
| Input | `--color-surface` | `--spacing-sm` `--spacing-md` | `--radius-sm` | inset border |
| Modal | `--color-surface` | `--spacing-xl` | `--radius-lg` | `--shadow-lg` |
| Badge | `--color-primary-50` | `--spacing-xs` `--spacing-sm` | `--radius-full` | none |

---

## 6. Breakpoints (Responsividade)

| Token | Valor | Dispositivo |
|:---|:---|:---|
| `--breakpoint-sm` | {ex: 640px} | Mobile landscape |
| `--breakpoint-md` | {ex: 768px} | Tablet |
| `--breakpoint-lg` | {ex: 1024px} | Desktop |
| `--breakpoint-xl` | {ex: 1280px} | Desktop largo |
```

## Regra para o Agente

> [!IMPORTANT]
> Quando o design system está definido, o agente NUNCA deve usar valores hardcoded para cores, espaçamentos, tipografia ou border-radius. SEMPRE usar os tokens definidos neste documento.
