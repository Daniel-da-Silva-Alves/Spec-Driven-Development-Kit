# Regras de Clean Code

Regras stack-agnostic que o agente deve seguir durante o desenvolvimento. Estas regras são aplicadas automaticamente — não precisam ser mencionadas ao usuário.

---

## 1. Nomenclatura

### Variáveis e Funções
| ❌ Ruim | ✅ Bom | Razão |
|:---|:---|:---|
| `data` | `userProfile` | Descreve o conteúdo |
| `temp` | `formattedDate` | Descreve o propósito |
| `handleClick` | `handleLoginSubmit` | Descreve a ação específica |
| `result` | `validationErrors` | Descreve o que contém |
| `x`, `y`, `i` (fora de loop) | `index`, `coordinate` | Autodocumentável |
| `flag` | `isAuthenticated` | Semântico |
| `arr` | `activeUsers` | Descreve o conteúdo da coleção |

### Funções
| ❌ Ruim | ✅ Bom | Razão |
|:---|:---|:---|
| `process()` | `validateAndSaveUser()` | Descreve o que faz |
| `doStuff()` | `calculateShippingCost()` | Específico |
| `getData()` | `fetchUserOrders()` | Especifica o que busca |
| `check()` | `isEmailAlreadyRegistered()` | Booleans com prefixo `is/has/can` |

### Componentes (React/Vue/Svelte)
| ❌ Ruim | ✅ Bom | Razão |
|:---|:---|:---|
| `Card` (genérico) | `ProductCard` | Específico ao domínio |
| `Modal` (genérico) | `ConfirmDeleteModal` | Descreve o propósito |
| `List` (genérico) | `OrderHistoryList` | Específico |
| `Button` (global catch-all) | `SubmitButton`, `NavigationButton` | Variantes explícitas |

---

## 2. Comentários

### Comentários Proibidos (❌)
```typescript
// Incrementa o contador
counter++;

// Retorna o usuário
return user;

// Define o estado como true
setIsLoading(true);

// Cria uma nova instância
const service = new UserService();
```

### Comentários Aceitáveis (✅)
```typescript
// Regex RFC 5322 simplificada para validação de email corporativo
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@empresa\.com$/;

// Delay de 300ms para debounce de busca — evita flood de requests
// durante digitação rápida no campo de pesquisa
const SEARCH_DEBOUNCE_MS = 300;

// TODO(#123): Migrar para a v2 da API quando disponível em produção
const API_BASE = '/api/v1';
```

### Regra Geral
> Comente o **porquê**, nunca o **o quê**. Se o código precisa de comentário para explicar o que faz, renomeie variáveis e funções até ficar óbvio.

---

## 3. Abstração e Reutilização

### Código Repetitivo (❌)
```typescript
// Repetido em 5 componentes
const response = await fetch('/api/users', {
  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
});
if (!response.ok) throw new Error('Failed to fetch');
const data = await response.json();
```

### Com Abstração (✅)
```typescript
// Usado em 5+ componentes — fetch centralizado
const users = await apiClient.get<User[]>('/users');
```

### Regra: Extrair quando repetir ≥ 2 vezes
Se um padrão de código aparece 2 ou mais vezes, deve ser extraído para:
- Uma função utilitária
- Um componente reutilizável
- Um hook customizado (React)
- Um serviço/module

---

## 4. Estrutura de Arquivos

### Arquivo Monolítico (❌)
```
src/components/Dashboard.tsx  ← 500+ linhas com tudo junto
```

### Arquivos Granulares (✅)
```
src/components/dashboard/
├── Dashboard.tsx              ← Composição dos sub-componentes
├── DashboardHeader.tsx        ← Header isolado
├── DashboardMetrics.tsx       ← Cards de métricas
├── DashboardRecentOrders.tsx  ← Lista de pedidos recentes
└── useDashboardData.ts        ← Hook de dados
```

### Regra: 1 componente por arquivo, máximo ~150 linhas significativas

---

## 5. Tratamento de Erros

### Genérico (❌)
```typescript
try {
  await saveUser(data);
} catch (e) {
  console.log(e);  // Ignora silenciosamente
}
```

### Específico (✅)
```typescript
try {
  await saveUser(data);
} catch (error) {
  if (error instanceof ValidationError) {
    showFieldErrors(error.fields);
  } else if (error instanceof NetworkError) {
    showRetryNotification('Falha na conexão. Tente novamente.');
  } else {
    logger.error('Unexpected error saving user', { error, userId: data.id });
    showGenericError();
  }
}
```
