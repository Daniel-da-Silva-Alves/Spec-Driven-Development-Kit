# Template: Boas Práticas e Padrões de Código

Use este template para gerar `.specs/standards/coding-standards.md`. Preencha com as respostas do onboarding.

```markdown
# Boas Práticas e Padrões de Código

**Projeto**: {nome do projeto}
**Última atualização**: {data}

---

## 1. Princípios Adotados

| Princípio | O que significa NESTE projeto | Exemplo |
|:---|:---|:---|
| **SSOT** (Single Source of Truth) | {ex: Estado vive no banco. Cache é derivado.} | {ex: Não manter contadores em 2 tabelas} |
| **DRY** (Don't Repeat Yourself) | {ex: Extrair quando repetir ≥ 2 vezes} | {ex: apiClient centralizado, não fetch repetido} |
| **KISS** (Keep It Simple) | {ex: Preferir solução simples à elegante} | {ex: Usar map/filter ao invés de reduce complexo} |
| **YAGNI** (You Aren't Gonna Need It) | {ex: Não implementar features "por garantia"} | {ex: Não criar abstração genérica para 1 uso} |
| **SOLID** | {quais princípios do SOLID o projeto segue explicitamente} | — |

---

## 2. Regras de Abstração

### Quando Extrair uma Função
- {ex: Quando o bloco é usado ≥ 2 vezes}
- {ex: Quando o bloco tem mais de 10 linhas e pode ter nome descritivo}
- {ex: Quando o bloco faz algo semanticamente independente}

### Quando Criar um Componente
- {ex: Quando a UI é reutilizada em ≥ 2 lugares}
- {ex: Quando o componente tem mais de ~100 linhas}
- {ex: Quando tem estado ou lógica própria}

### Quando Criar um Hook (React)
- {ex: Quando lógica stateful é usada em ≥ 2 componentes}
- {ex: Quando o componente fica mais limpo separando a lógica}

### Quando Criar um Service
- {ex: Quando a lógica de negócio não pertence ao componente/controller}
- {ex: Quando a mesma operação é usada em múltiplos endpoints/páginas}

---

## 3. Tratamento de Erros

### Estratégia por Camada

| Camada | Estratégia |
|:---|:---|
| **Domain** | {ex: Lançar custom exceptions (DomainError, ValidationError)} |
| **Application/Service** | {ex: Capturar domain errors, traduzir para DTOs de erro} |
| **API/Controller** | {ex: Error handler global, mapear exceptions para HTTP status} |
| **Frontend** | {ex: Error Boundary para crashes, toast para erros de ação} |

### Custom Exceptions (se aplicável)
```typescript
// Hierarquia de erros do projeto
class AppError extends Error { code: string; statusCode: number; }
class ValidationError extends AppError { fields: FieldError[]; }
class NotFoundError extends AppError { }
class UnauthorizedError extends AppError { }
class ConflictError extends AppError { }
```

### Mensagens de Erro
- {ex: Mensagens voltadas ao usuário, nunca stack traces}
- {ex: Logging do erro completo no servidor, mensagem limpa no client}
- {ex: Códigos de erro padronizados (ERROR_CODE) para o frontend mapear}

---

## 4. Logging

### Estratégia
- **Formato**: {ex: Structured logging (JSON)}
- **Níveis**: {ex: error, warn, info, debug}
- **Ferramenta**: {ex: pino, winston, console estruturado}

### O que Logar

| Nível | Quando usar | Exemplo |
|:---|:---|:---|
| `error` | Falhas que impedem a operação | Erro de conexão DB, exception não tratada |
| `warn` | Situações anormais mas recuperáveis | Rate limit próximo, fallback ativado |
| `info` | Eventos de negócio importantes | Usuário criado, pagamento processado |
| `debug` | Detalhes para debugging | Query SQL executada, payload recebido |

### O que NUNCA Logar
- Senhas, tokens, chaves de API
- Dados pessoais sensíveis (CPF, cartão de crédito)
- Payloads completos de request em produção

---

## 5. Testes (se aplicável)

### Estratégia
- **Tipo principal**: {ex: Testes manuais via manual-tests.md}
- **Cobertura mínima**: {ex: N/A — foco em testes manuais}
- **Quando automatizar**: {ex: Lógica de domínio crítica (cálculos, validações)}

---

## 6. Performance

### Regras Gerais
- {ex: Queries de listagem DEVEM ter paginação (máximo 100 por página)}
- {ex: N+1 queries são proibidas — usar eager loading / join}
- {ex: Imagens devem ser otimizadas (WebP, lazy loading)}
- {ex: Bundle splitting para rotas de frontend}
```
