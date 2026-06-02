# Guia de Configuração de Fontes de Documentação Técnica

## Propósito

Durante o desenvolvimento (Skill 4) e code review (Skill 5), o agente precisa consultar documentação técnica das tecnologias da stack. Este guia define como configurar as fontes de documentação para cada tecnologia, garantindo que o agente use **a versão correta** e **a fonte mais confiável**.

## Hierarquia de Consulta

Ao precisar de documentação técnica, o agente segue esta ordem de prioridade:

```
1. 📁 Docs locais do projeto     (docs/, README, ARCHITECTURE.md)
    ↓ se não encontrar
2. 🔌 MCP/Skill da tecnologia    (se existir e for da versão correta)
    ↓ se não existir
3. 🌐 URL oficial pré-configurada (registrada no SDD, pinada à versão)
    ↓ se não cobrir o caso
4. 🔍 Web search como fallback   (pesquisa direcionada ao site oficial)
```

### Por que esta ordem?

| Prioridade | Fonte | Justificativa |
|:---:|:---|:---|
| 1 | **Docs locais** | Mais específico ao projeto, padrões customizados, convenções internas |
| 2 | **MCP/Skill** | Curado, confiável, eficiente em tokens, funciona offline |
| 3 | **URL oficial** | Fonte canônica da tecnologia, pinada à versão correta |
| 4 | **Web search** | Fallback universal, mas ruidoso e pode trazer versão errada |

---

## Como Conduzir a Entrevista de Fontes

Durante a Fase 2.5 do SDD, após definir a stack, perguntar para cada tecnologia:

### Pergunta padrão (via ask_question):

```
Para a tecnologia {nome} v{versão}, qual fonte de documentação devemos usar?
```

**Opções:**
1. **URL oficial** — informar a URL da documentação oficial pinada na versão
2. **MCP disponível** — informar qual MCP server provê docs desta tecnologia
3. **Skill local** — o projeto tem uma skill customizada para esta tecnologia
4. **Docs no projeto** — existe pasta `docs/` ou wiki com documentação interna

### Tecnologias com MCPs conhecidos:

| Tecnologia | MCP Disponível | Notas |
|:---|:---|:---|
| Múltiplas libs | Context7 | Cobre muitas bibliotecas populares via `context7` |
| PostgreSQL | postgres-mcp | Schema awareness |
| GitHub | github-mcp | Issues, PRs, repos |
| Filesystem | filesystem-mcp | Nativo do Antigravity |

> [!NOTE]
> A disponibilidade de MCPs muda frequentemente. Pergunte ao usuário se ele tem MCPs configurados no projeto.

---

## Formato da Seção no SDD

A seção "10. Fontes de Documentação Técnica" no SDD deve seguir este formato:

```markdown
## 10. Fontes de Documentação Técnica

### 10.1 Configuração de Fontes

| Tecnologia | Versão | Fonte Primária | URL Oficial | MCP/Skill |
|:---|:---|:---|:---|:---|
| Next.js | 15.2 | URL oficial | https://nextjs.org/docs | — |
| React | 19.1 | URL oficial | https://react.dev/reference | — |
| Prisma | 6.3 | MCP | https://prisma.io/docs | context7 |
| Tailwind CSS | 4.0 | URL oficial | https://tailwindcss.com/docs | — |
| PostgreSQL | 16 | MCP | https://www.postgresql.org/docs/16/ | postgres-mcp |
| TypeScript | 5.7 | URL oficial | https://www.typescriptlang.org/docs/ | — |

### 10.2 Documentação Local do Projeto

| Caminho | Conteúdo |
|:---|:---|
| `docs/api.md` | Documentação da API interna |
| `docs/conventions.md` | Convenções de código do projeto |
| `ARCHITECTURE.md` | Arquitetura geral do sistema |

### 10.3 Regra de Consulta

Ordem de prioridade para consulta de documentação durante o desenvolvimento:
1. Documentação local do projeto (caminhos listados em 10.2)
2. MCP/Skill (se listado na coluna MCP/Skill em 10.1)
3. URL oficial (usar `read_url_content` na URL listada em 10.1)
4. Web search (usar `search_web` com query: "{tecnologia} {versão} {tópico} site:{domínio oficial}")
```

---

## Instruções para o Agente (Dev e CodeReview)

Quando o agente precisar consultar documentação durante o desenvolvimento:

### Passo 1: Ler a seção 10 do SDD
Abrir `.specs/features/{feature}/sdd.md` e ler a seção "10. Fontes de Documentação Técnica"

### Passo 2: Seguir a hierarquia
1. **Docs local?** → `view_file` no caminho listado em 10.2
2. **MCP/Skill?** → Usar a ferramenta/skill configurada em 10.1
3. **URL oficial?** → `read_url_content("{url-da-tabela-10.1}/topico-especifico")`
4. **Nenhum?** → `search_web("{tecnologia} {versão} {tópico} site:{domínio}")`

### Passo 3: Validar a versão
> [!WARNING]
> Antes de usar qualquer informação de documentação, verificar se corresponde à versão listada na tabela 10.1. Documentação da versão errada pode gerar código incompatível.

### Exemplo prático de consulta:

```
Microtask: "Implementar server action de criação de usuário"
Stack: Next.js 15.2

1. Docs local? → Não tem docs sobre server actions
2. MCP/Skill? → Não tem MCP de Next.js
3. URL oficial? → read_url_content("https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations")
4. Se URL não cobrir → search_web("Next.js 15 server actions mutations site:nextjs.org")
```
