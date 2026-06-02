# Guia de Onboarding de Padrões do Projeto

## Propósito

Este guia instrui o agente a conduzir uma entrevista de onboarding para definir os padrões do projeto. Os padrões são salvos em `.specs/standards/` e funcionam como **memória estática persistente** — consultados por TODAS as features do projeto.

## Quando Executar

O onboarding é acionado pela **Skill SDD (Skill 2)** nos seguintes cenários:

| Cenário | Ação |
|:---|:---|
| `.specs/standards/` **não existe** | Conduzir onboarding completo |
| `.specs/standards/` **existe mas incompleto** | Perguntar se quer completar |
| `.specs/standards/` **existe e completo** | Ler e respeitar, propor adições se necessário |

## Estrutura de Standards

```
.specs/
└── standards/
    ├── architecture.md           ← Padrões arquiteturais (DDD, CQRS, BFF, etc.)
    ├── naming-conventions.md     ← Nomenclatura (funções, tabelas, variáveis)
    ├── design-system.md          ← Tokens, paleta, tipografia, componentes
    ├── api-conventions.md        ← Padrões de API (REST, GraphQL, error format)
    └── coding-standards.md       ← Boas práticas e princípios (SSOT, DRY, etc.)
```

## Fluxo do Onboarding

### Passo 1: Verificação

Verificar se `.specs/standards/` existe no projeto:
- Se NÃO existe → prosseguir para Passo 2
- Se existe → ler todos os arquivos e prosseguir diretamente para a entrevista técnica do SDD

### Passo 2: Anúncio

Anunciar ao usuário:
> "Este projeto ainda não tem padrões definidos em `.specs/standards/`. Vou conduzir uma entrevista rápida para definir os padrões do projeto. Esses padrões serão usados como referência em TODAS as features futuras."

### Passo 3: Entrevista por Categoria

Para cada categoria, conduzir uma mini-entrevista via `ask_question`:

#### 3.1 Arquitetura
Perguntas a fazer:
1. "Qual padrão arquitetural o projeto segue?" (opções: MVC, Clean Architecture, DDD, Hexagonal, Feature-Based, ou descrever)
2. "Usa algum padrão avançado?" (opções: Event Sourcing, CQRS, BFF, Microserviços, Monolito, ou descrever)
3. "Qual a estrutura de camadas/módulos?"
4. "Há regras de dependência entre camadas?" (ex: Domain nunca importa Infrastructure)

Gerar: `.specs/standards/architecture.md` usando template `references/standards-architecture-template.md`

#### 3.2 Nomenclatura
Perguntas a fazer:
1. "Convenção para tabelas de banco?" (snake_case plural, PascalCase singular, etc.)
2. "Convenção para colunas?" (snake_case, camelCase)
3. "Convenção para chaves estrangeiras?" ({tabela}_id, fk_{tabela}, etc.)
4. "Convenção para variáveis/funções JS/TS?" (camelCase, verbo+substantivo para funções)
5. "Convenção para componentes React/Vue?" (PascalCase, kebab-case)
6. "Convenção para arquivos?" (PascalCase para componentes, camelCase para utils, etc.)

Gerar: `.specs/standards/naming-conventions.md` usando template `references/standards-naming-template.md`

#### 3.3 Design System (se o projeto tem frontend)
Perguntas a fazer:
1. "O projeto tem design system definido?" (se sim, quais tokens)
2. "Paleta de cores?" (primária, secundária, surface, error, etc.)
3. "Tipografia?" (fonte principal, headings, sizes)
4. "Espaçamentos?" (escala de spacing)
5. "Border radius e shadows?" (tokens de forma)
6. "Componentes base?" (Card, Button, Input — quais tokens usam)

Gerar: `.specs/standards/design-system.md` usando template `references/standards-design-system-template.md`

Se não tem frontend, marcar como "N/A — projeto backend-only".

#### 3.4 Convenções de API (se tem API)
Perguntas a fazer:
1. "Padrão de API?" (REST, GraphQL, tRPC, gRPC)
2. "Formato de response?" (envelope `{data, error, meta}`, flat, etc.)
3. "Versionamento de API?" (/v1/, header, query param)
4. "Padrão de erro?" (HTTP status + body padronizado)
5. "Paginação?" (cursor, offset, keyset)
6. "Autenticação em API?" (Bearer token, cookie, API key)

Gerar: `.specs/standards/api-conventions.md` usando template `references/standards-api-template.md`

#### 3.5 Boas Práticas e Princípios
Perguntas a fazer:
1. "Quais princípios o projeto adota?" (SSOT, DRY, KISS, YAGNI, SOLID — selecionar os relevantes)
2. "Há regras de abstração?" (quando extrair função, componente, hook)
3. "Tratamento de erros?" (custom exceptions, error boundary, etc.)
4. "Logging?" (structured logging, níveis, o que logar)
5. "Testes?" (estratégia, cobertura mínima, tipos de teste)

Gerar: `.specs/standards/coding-standards.md` usando template `references/standards-coding-template.md`

### Passo 4: Apresentação

1. Apresentar resumo de todos os padrões definidos
2. Perguntar: "Os padrões estão corretos? Deseja ajustar algo?"
3. Salvar todos os arquivos em `.specs/standards/`

### Passo 5: Continuar para SDD

Após o onboarding, prosseguir normalmente com a Fase 1 do SDD (Análise do Contexto).

---

## Evolução Incremental

Durante SDDs de features futuras, o agente pode propor adições aos standards:

1. Se uma decisão técnica nova não está coberta pelos standards existentes
2. Perguntar: "Essa decisão deve virar um padrão do projeto para futuras features?"
3. Se sim, atualizar o arquivo de standards relevante
4. Se não, documentar apenas no SDD da feature
