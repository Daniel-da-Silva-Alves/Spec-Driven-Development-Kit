# Template: Convenções de Nomenclatura do Projeto

Use este template para gerar `.specs/standards/naming-conventions.md`. Preencha com as respostas do onboarding.

```markdown
# Convenções de Nomenclatura

**Projeto**: {nome do projeto}
**Última atualização**: {data}

---

## 1. Banco de Dados

| Elemento | Convenção | Exemplo | Anti-exemplo |
|:---|:---|:---|:---|
| Tabelas | {ex: snake_case, plural} | {ex: `auth_users`} | {ex: `User`, `authUser`} |
| Colunas | {ex: snake_case, singular} | {ex: `first_name`} | {ex: `firstName`, `FirstName`} |
| Primary Keys | {ex: `id` (UUID v4)} | {ex: `id`} | {ex: `user_id`, `ID`} |
| Foreign Keys | {ex: `{tabela_singular}_id`} | {ex: `user_id`} | {ex: `fk_user`, `userId`} |
| Índices | {ex: `idx_{tabela}_{colunas}`} | {ex: `idx_users_email`} | {ex: `index1`} |
| Enums (valores) | {ex: UPPER_SNAKE_CASE} | {ex: `PENDING_PAYMENT`} | {ex: `pendingPayment`} |
| Timestamps | {ex: `created_at`, `updated_at`} | — | {ex: `createdAt`, `date_created`} |
| Soft delete | {ex: `deleted_at` nullable} | — | {ex: `is_deleted`} |
| Booleanos | {ex: `is_` prefix} | {ex: `is_active`} | {ex: `active`, `status`} |

### Prefixos de Módulo (se aplicável)
| Módulo | Prefixo | Exemplo |
|:---|:---|:---|
| {ex: Autenticação} | {ex: `auth_`} | {ex: `auth_users`, `auth_sessions`} |
| {ex: Pagamentos} | {ex: `pay_`} | {ex: `pay_transactions`} |

---

## 2. Código ({linguagem})

### Variáveis

| Tipo | Convenção | Exemplo | Anti-exemplo |
|:---|:---|:---|:---|
| Variáveis locais | {ex: camelCase} | {ex: `userName`} | {ex: `user_name`, `UserName`} |
| Constantes | {ex: UPPER_SNAKE_CASE} | {ex: `MAX_RETRIES`} | {ex: `maxRetries`} |
| Booleanos | {ex: prefixo is/has/can/should} | {ex: `isAuthenticated`} | {ex: `authenticated`, `auth`} |
| Arrays/Coleções | {ex: plural} | {ex: `activeUsers`} | {ex: `userList`, `data`} |

### Funções

| Tipo | Convenção | Exemplo | Anti-exemplo |
|:---|:---|:---|:---|
| Funções gerais | {ex: verbo + substantivo, camelCase} | {ex: `calculateTotal`} | {ex: `calc`, `doStuff`} |
| Handlers | {ex: handle + evento específico} | {ex: `handleLoginSubmit`} | {ex: `handleClick`} |
| Getters | {ex: get + o quê} | {ex: `getUserOrders`} | {ex: `getData`} |
| Validadores | {ex: is/validate + o quê} | {ex: `isValidEmail`} | {ex: `check`} |
| Transformadores | {ex: formato + To + formato} | {ex: `dtoToEntity`} | {ex: `convert`} |

### Classes e Types

| Tipo | Convenção | Exemplo | Anti-exemplo |
|:---|:---|:---|:---|
| Classes | {ex: PascalCase, substantivo} | {ex: `UserService`} | {ex: `userService`} |
| Interfaces | {ex: PascalCase, sem prefixo I} | {ex: `UserProfile`} | {ex: `IUserProfile`} |
| Types | {ex: PascalCase} | {ex: `OrderStatus`} | {ex: `TOrderStatus`} |
| Enums | {ex: PascalCase singular} | {ex: `PaymentMethod`} | {ex: `PaymentMethods`} |

### Componentes (Frontend)

| Tipo | Convenção | Exemplo | Anti-exemplo |
|:---|:---|:---|:---|
| Componentes | {ex: PascalCase, específico} | {ex: `ProductCard`} | {ex: `Card`} |
| Hooks | {ex: use + contexto} | {ex: `useOrderData`} | {ex: `useData`} |
| Context | {ex: PascalCase + Context} | {ex: `AuthContext`} | {ex: `ctx`} |

---

## 3. Arquivos e Diretórios

| Tipo | Convenção | Exemplo |
|:---|:---|:---|
| Componentes | {ex: PascalCase.tsx} | {ex: `ProductCard.tsx`} |
| Hooks | {ex: camelCase.ts} | {ex: `useAuth.ts`} |
| Utils | {ex: camelCase.ts} | {ex: `formatCurrency.ts`} |
| Types | {ex: camelCase.ts} | {ex: `userTypes.ts`} |
| Services | {ex: camelCase.service.ts} | {ex: `auth.service.ts`} |
| Repositories | {ex: camelCase.repository.ts} | {ex: `user.repository.ts`} |
| Migrations | {ex: NNN_descricao.sql} | {ex: `001_create_users.sql`} |

---

## 4. Git

| Tipo | Convenção | Exemplo |
|:---|:---|:---|
| Branches | {ex: tipo/descricao-curta} | {ex: `feat/user-auth`, `fix/login-redirect`} |
| Commits | {ex: Conventional Commits} | {ex: `feat(auth): add login endpoint`} |
| Tags | {ex: semver} | {ex: `v1.2.3`} |
```
