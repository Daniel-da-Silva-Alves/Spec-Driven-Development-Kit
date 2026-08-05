# Perfil OKF do SDDK — Vocabulário de `type` e frontmatter

> **Status:** Rascunho · **Relacionado:** [ADR-0001](../adr/0001-sddk-memoria-okf-plugin-com-enforcement.md) (Action Item 1)
>
> Este documento define o **contrato** entre quem *produz* o `.specs/` (as 5 skills do SDDK) e quem o *consome* (subagents de validação, hooks de gate, e qualquer agente futuro). O [OKF](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) exige apenas o campo `type` e não define quais valores usar — **é justamente esse vocabulário controlado que dá valor ao OKF dentro do SDDK.**

---

## 1. Layout do bundle (bundle único do projeto)

Conforme decidido no ADR-0001, o `.specs/` inteiro é **um único bundle OKF** — um grafo, uma memória de projeto. O `index.md` na raiz é o ponto de entrada de navegação (*progressive disclosure*).

```
.specs/                              ← raiz do bundle OKF
├── index.md                         type: project-index   (era _overview.md)
├── log.md                           type: log             (changelog do projeto — nome reservado OKF)
├── standards/
│   ├── index.md                     type: index
│   ├── architecture.md              type: standard-architecture
│   ├── naming-conventions.md        type: standard-naming
│   ├── design-system.md             type: standard-design-system
│   ├── api-conventions.md           type: standard-api
│   └── coding-standards.md          type: standard-coding
├── features/
│   ├── index.md                     type: index
│   └── {module-n-desc}/
│       ├── srs.md                   type: srs
│       ├── sdd.md                   type: sdd
│       ├── implementation-plan.md   type: implementation-plan
│       ├── manual-tests.md          type: manual-tests
│       └── refactoring-backlog.md   type: refactoring-backlog
├── fix/{name}/
│   ├── bug-report.md                type: bug-report
│   ├── sdd.md                       type: sdd
│   └── ...
├── refact/{name}/
│   ├── refact-spec.md               type: refact-spec
│   └── ...
└── chore/{name}/
    ├── chore-spec.md                type: chore-spec
    └── ...
```

**Regras OKF herdadas:** a identidade do conceito é o **caminho do arquivo**; `index.md` e `log.md` são nomes reservados; os relacionamentos são **links markdown normais** (ver §4).

---

## 2. Vocabulário controlado de `type`

Único valor permitido para o campo `type`. Produtores **devem** emitir exatamente estes; consumidores **podem** confiar neles.

| `type` | Artefato | Produzido por (skill) | Fase |
|:---|:---|:---|:---:|
| `project-index` | `index.md` raiz (mapa de módulos + navegação) | Specification | 1 |
| `log` | `log.md` (changelog do projeto) | todas (append) | — |
| `index` | `index.md` de subpasta (navegação local) | qualquer | — |
| `srs` | Especificação de feature (IEEE 830) | Specification | 1 |
| `bug-report` | Relatório de bug (IEEE 1044) | Specification | 1 |
| `refact-spec` | Spec de refatoração (IEEE 1219) | Specification | 1 |
| `chore-spec` | Spec de manutenção (ISO 14764) | Specification | 1 |
| `sdd` | System Design Document | System Design | 2 |
| `implementation-plan` | Plano de microtasks | Implementation Planning | 3 |
| `manual-tests` | Cenários de teste manual | Implementation Planning | 3 |
| `refactoring-backlog` | Backlog de melhorias do code review | Code Review | 5 |
| `standard-architecture` | Padrão de arquitetura do projeto | System Design (onboarding) | 2 |
| `standard-naming` | Convenções de nomenclatura | System Design (onboarding) | 2 |
| `standard-design-system` | Design system / tokens | System Design (onboarding) | 2 |
| `standard-api` | Convenções de API | System Design (onboarding) | 2 |
| `standard-coding` | Padrões de codificação | System Design (onboarding) | 2 |

> **Contrato:** adicionar um novo `type` é uma mudança de contrato — exige atualizar esta tabela e os consumidores (subagents/hooks) que dependem dele. Nunca inventar `type` fora desta lista em runtime.

---

## 3. Frontmatter por artefato

### 3.1 Campos

| Campo | Origem | Obrigatoriedade | Descrição |
|:---|:---|:---|:---|
| `type` | OKF | **obrigatório** | Um valor do §2 |
| `title` | OKF | recomendado | Título legível do conceito |
| `description` | OKF | recomendado | Uma linha sobre o conceito |
| `tags` | OKF | opcional | Lista para busca/filtro |
| `timestamp` | OKF | recomendado | ISO 8601 da última atualização |
| `status` | **SDDK** | **obrigatório** (specs/sdd/plan) | Ciclo de vida — **é o que os hooks de gate leem** (§5) |
| `work_item` | **SDDK** | obrigatório (dentro de work-item) | Id da pasta do item (ex.: `ass-13-consulta-promocoes`) |
| `work_type` | **SDDK** | obrigatório (dentro de work-item) | `features` \| `fix` \| `refact` \| `chore` |
| `traces` | **SDDK** | recomendado | Arestas do grafo — links para conceitos relacionados (§4) |

> Os campos `status`, `work_item`, `work_type` e `traces` são **extensões do SDDK** sobre o OKF v0.1. São permitidos porque o OKF só restringe `type` — o resto é livre por design. Ao migrar para OKF v0.2, reavaliar se `status`/confiança passam a ter campo nativo.

### 3.2 Valores de `status`

```
draft        → em elaboração (entrevista/geração em andamento)
approved     → aprovado pelo usuário (destrava a próxima fase)
implemented  → código correspondente entregue (Dev concluído)
verified     → validado pelo subagent verifier (pass)
superseded   → substituído por outro artefato
```

O gate de enforcement (ADR-0001, pilar 4) é essencialmente: *"bloquear escrita de código enquanto o `srs`/`sdd` do `work_item` não estiver `approved`; bloquear `Stop` enquanto não estiver `verified`."* Por isso `status` é obrigatório nos artefatos de fase.

---

## 4. Grafo de rastreabilidade (`traces`)

A rastreabilidade que o SDDK já pratica (`microtask → FR-XXX → seção do SDD`) vira **explicitamente** as arestas do grafo OKF — de duas formas complementares:

1. **Links markdown inline** no corpo (como o OKF recomenda), ex.: `atende [FR-003](srs.md#fr-003)`.
2. **Campo `traces`** no frontmatter, para relações consultáveis por máquina sem parsear o corpo:

```yaml
traces:
  - rel: implements        # este conceito implementa...
    target: srs.md#fr-003
  - rel: designed-by
    target: sdd.md#4-api-design
```

Convenção de `rel` (extensível): `refines` (sdd→srs), `plans` (plan→sdd), `implements` (código→plan/srs), `tests` (manual-tests→srs), `reviews` (backlog→código), `governed-by` (qualquer→standard-*).

Isso é o que habilita **progressive disclosure**: o agente entra pelo `index.md`, segue só as arestas relevantes ao microtask atual, e carrega 2–3 conceitos em vez do bundle inteiro (a condição de custo sublinear do ADR-0001).

---

## 5. Exemplo trabalhado — um `srs.md` no perfil OKF

Antes (v2.5.0):

```markdown
# SRS — Consulta de Promoções
## 1. Introdução
...
```

Depois (perfil OKF):

```markdown
---
type: srs
title: "SRS — Consulta de Promoções"
description: "Requisitos da consulta de promoções ativas por loja."
status: approved
work_item: ass-13-consulta-promocoes
work_type: features
tags: [assortment, promocoes]
timestamp: 2026-08-05T14:30:00Z
traces:
  - rel: governed-by
    target: ../../standards/api-conventions.md
---

# SRS — Consulta de Promoções

## 1. Introdução
...

## FR-003 — Filtrar por loja
O sistema deve permitir filtrar promoções pela loja ativa.
Ver design em [SDD §4](sdd.md#4-api-design).
```

O conteúdo/estrutura IEEE 830 do corpo **não muda** — só ganha o cabeçalho tipado e os links viram grafo. Migração de baixo risco.

---

## 6. Impacto nas 5 skills (prévia do Action Item 2)

Cada template de `references/` recebe o bloco de frontmatter no topo, e cada `SKILL.md` ganha a instrução de preenchê-lo e de atualizar `status`/`log.md` nas transições:

| Skill | Muda para | Campo `status` que grava |
|:---|:---|:---|
| Specification | frontmatter nos 4 spec-templates + `_overview.md`→`index.md` | `draft` → `approved` |
| System Design | frontmatter no `sdd.md` + nos 5 `standard-*` | `approved` |
| Implementation Planning | frontmatter no `implementation-plan` + `manual-tests` | `approved` |
| Fullstack Development | grava `implemented` ao concluir microtasks | `implemented` |
| Code Review | grava `verified`/gera `refactoring-backlog` | `verified` |

---

## Próximos passos

- [ ] Aprovar este vocabulário (esta é a decisão que trava o contrato).
- [ ] **Action Item 2:** aplicar o frontmatter aos templates das 5 skills (PoC primeiro em um template).
- [ ] **Action Item 3:** provar progressive disclosure — skill de dev navegando por `traces` em vez de ler documentos inteiros.
