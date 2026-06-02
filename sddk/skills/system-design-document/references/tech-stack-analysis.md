# Guia de Análise e Sugestão de Stack Tecnológica

## Como Detectar a Stack Existente

Antes de sugerir qualquer tecnologia, analise o projeto existente do usuário:

### Arquivos Indicadores

| Arquivo | Indica |
|:---|:---|
| `package.json` | Node.js / JavaScript / TypeScript |
| `tsconfig.json` | TypeScript |
| `requirements.txt` / `pyproject.toml` | Python |
| `Cargo.toml` | Rust |
| `go.mod` | Go |
| `pom.xml` / `build.gradle` | Java/Kotlin |
| `Gemfile` | Ruby |
| `composer.json` | PHP |

### Dentro do `package.json` — Detectar Framework

| Dependência | Framework |
|:---|:---|
| `next` | Next.js |
| `nuxt` | Nuxt.js |
| `react` (sem next) | React SPA (provavelmente Vite) |
| `vue` (sem nuxt) | Vue.js SPA |
| `@angular/core` | Angular |
| `express` | Express.js |
| `@nestjs/core` | NestJS |
| `fastify` | Fastify |

### Dentro do `requirements.txt` / `pyproject.toml` — Detectar Framework Python

| Dependência | Framework |
|:---|:---|
| `django` | Django |
| `fastapi` | FastAPI |
| `flask` | Flask |
| `sqlalchemy` | ORM SQLAlchemy |

---

## Como Sugerir Stack (Quando Não Há Projeto)

Se o usuário está começando do zero, use estas perguntas para guiar a sugestão:

### Pergunta 1: Tipo de Aplicação

| Tipo | Stack Sugerida |
|:---|:---|
| **Web fullstack (SSR)** | Next.js + TypeScript + Prisma + PostgreSQL |
| **Web SPA + API separada** | Vite + React + TypeScript (front) + NestJS ou FastAPI (back) |
| **API/Backend only** | NestJS (TS) ou FastAPI (Python) |
| **Mobile** | React Native + Expo ou Flutter |
| **CLI tool** | Node.js + Commander ou Python + Click |

### Pergunta 2: Prioridades do Projeto

| Prioridade | Influência na Stack |
|:---|:---|
| **Performance** | Considerar Rust, Go, ou otimizações específicas |
| **Velocidade de desenvolvimento** | Frameworks com mais abstrações (Next.js, Django) |
| **Escalabilidade** | Microserviços, filas, cache distribuído |
| **Simplicidade** | Monolito, ORM, framework full-featured |

### Pergunta 3: Equipe

| Contexto | Influência |
|:---|:---|
| Dev solo | Menos abstrações, full-stack frameworks |
| Equipe pequena (2-5) | Monorepo, TypeScript end-to-end |
| Equipe grande (5+) | Módulos bem definidos, CI/CD robusto |

---

## Regras para Sugestão

1. **NUNCA sugira uma stack sem justificativa** — sempre explique o "porquê"
2. **Considere a experiência do usuário** — não sugira Rust se o usuário é iniciante
3. **Apresente no máximo 3 opções** — excesso de escolha paralisa
4. **Inclua prós e contras** de cada opção
5. **Use `ask_question`** para que o usuário escolha formalmente
6. **Registre a decisão** com justificativa no SDD
