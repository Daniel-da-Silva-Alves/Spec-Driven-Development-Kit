# ADR-0001: Evolução do SDDK — de skills passivas para plugin Claude Code com memória OKF e enforcement

**Status:** Proposto
**Data:** 2026-08-05
**Deciders:** Daniel da Silva Alves (autor/mantenedor)
**Escopo:** Direção arquitetural do SDDK v3.x

---

## Contexto

O SDDK v2.5.0 entrega um pipeline de 5 estágios (SRS → SDD → Planning → Dev → Code Review) como **5 skills sequenciais** distribuídas por cópia de arquivos (`bin/cli.js`) para `~/.claude/skills/` e `~/.gemini/config/plugins/sddk/`, com um bloco injetado no `~/.claude/CLAUDE.md` global.

Três forças motivam esta revisão:

1. **O pipeline é advisory, não enforced.** O `CLAUDE.md` afirma *"you MUST follow this pipeline order — never skip stages"*, mas nada impede o agente de pular o SRS e ir direto ao código. As skills **instruem**; não **governam**. A garantia de qualidade depende inteiramente da obediência do modelo à instrução.

2. **Os artefatos `.specs/` são markdown sem formato acordado.** Hoje são *write-mostly* — produzidos no pipeline e referenciados dentro dele. Não são uma superfície de leitura durável e portável entre ferramentas (Claude, Gemini, Cursor). A rastreabilidade (`microtask → FR-XXX → seção do SDD`) já existe como links, mas informalmente.

3. **A distribuição por cópia é frágil.** Mutação do `CLAUDE.md` global do usuário, sem versionamento por plugin, sem namespacing, sem marketplace. A consciência de ordem do pipeline só existe para o Claude (via CLAUDE.md); no Gemini depende só das descrições das skills (assimetria).

**Restrições / requisitos não-funcionais:**
- Reaproveitar o conteúdo existente das 5 skills (não reescrever a engenharia de prompt já validada).
- Manter portabilidade multi-ferramenta (não amarrar a uma única IDE).
- Custo de tokens em tempo de execução deve ser **sublinear** no volume de documentação (ver Trade-offs).
- Adoção incremental — não exigir big-bang.

---

## Decisão

Evoluir o SDDK para um **plugin nativo do Claude Code com memória de projeto em formato OKF e enforcement determinístico**, composto por quatro pilares:

1. **Perfil OKF para o `.specs/`** — adotar o [Open Knowledge Format (OKF) v0.1](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) do Google Cloud como formato do `.specs/`, estruturado como **um único bundle do projeto inteiro** (memória de projeto unificada, grafo único). Cada artefato ganha frontmatter YAML com um `type` de um **vocabulário controlado do SDDK** (`srs`, `sdd`, `bug-report`, `refact-spec`, `chore-spec`, `microtask-plan`, `manual-tests`, `standard-architecture`, `standard-naming`, `standard-design-system`, `standard-api`, `standard-coding`). O `_overview.md` vira o `index.md` (navegação/*progressive disclosure*) e ganha um `log.md` companheiro (changelog — nome reservado do OKF).

2. **Empacotamento como Claude Code Plugin** — migrar de cópia de arquivos para `.claude-plugin/plugin.json`, distribuído via marketplace, empacotando skills + agents + hooks num único artefato versionado.

3. **Subagents de validação** — criar subagents com **tools restritas** (read-only + Bash só para testes) para os estágios de verificação (ex.: `sddk-verifier`, `sddk-code-review`), que **julgam** sem **consertar**, retornando veredito estruturado (pass/fail + violações rastreadas aos `FR-XXX`/seções do SDD).

4. **Hooks de gate** — usar hooks determinísticos para transformar as regras hoje advisory em enforcement: `PreToolUse` (Write/Edit) bloqueia escrita de código sem spec aprovado no bundle; `Stop`/`SubagentStop` bloqueia conclusão até o `verifier` retornar pass (é isto que materializa o **loop de verificação**, com teto de iterações).

O **Claude Agent SDK como orquestrador headless** (`sddk run` para CI/CD) fica registrado como evolução futura (Fase 4), fora do escopo desta decisão.

---

## Opções Consideradas

### Opção A: Status quo — skills passivas por cópia

| Dimensão | Avaliação |
|-----------|------------|
| Complexidade | Baixa |
| Custo (esforço) | Zero (nada muda) |
| Enforcement | Nenhum (só instrução) |
| Portabilidade da memória | Baixa (markdown sem formato/contrato) |
| Familiaridade da equipe | Alta (já é o hoje) |

**Prós:** sem trabalho; já funciona para quem obedece a instrução.
**Contras:** qualidade depende da obediência do modelo; `.specs/` não é memória portável; distribuição frágil; assimetria Claude/Gemini.

### Opção B: Perfil OKF + Plugin Claude Code com hooks/subagents *(recomendada)*

| Dimensão | Avaliação |
|-----------|------------|
| Complexidade | Média |
| Custo (esforço) | Médio (reaproveita 80–90% do conteúdo atual) |
| Enforcement | Determinístico (hooks bloqueiam de fato) |
| Portabilidade da memória | Alta (OKF é agnóstico de ferramenta, Apache 2.0) |
| Familiaridade da equipe | Média (novos: hooks, subagents, plugin format) |

**Prós:** pipeline deixa de ser opcional; `.specs/` vira memória de projeto durável e portável; a rastreabilidade existente vira grafo OKF "de graça"; distribuição versionada por marketplace; resolve a assimetria (memória portável em vez de regra por-ferramenta).
**Contras:** OKF é v0.1 (alvo móvel); introduz conceitos novos (hooks/subagents); enforcement por hook é específico do Claude Code (Gemini fica sem os gates duros).

### Opção C: Orquestrador headless completo via Claude Agent SDK

| Dimensão | Avaliação |
|-----------|------------|
| Complexidade | Alta |
| Custo (esforço) | Alto (produto novo em TS/Python) |
| Enforcement | Total (loop programático real) |
| Portabilidade da memória | Alta (se combinada com OKF) |
| Familiaridade da equipe | Baixa |

**Prós:** loop de verificação em código, com critério de parada explícito; roda não-interativo (CI/CD, disparo por ticket).
**Contras:** maior esforço; é um produto separado, não uma evolução das skills; supérfluo para uso interativo cotidiano.

---

## Análise de Trade-offs

**B não é mutuamente exclusiva com C.** B entrega o loop de verificação dentro do Claude Code reaproveitando o que já existe; C é um produto adicional para automação. Sequência correta: **B primeiro, C depois** — as duas compartilham os mesmos subagents/skills/OKF.

**Enforcement vs. portabilidade (a tensão central).** Os hooks (pilar 4) são específicos do Claude Code — dão enforcement duro só ali. O OKF (pilar 1) é o que preserva a portabilidade multi-ferramenta. A decisão aceita conscientemente que **o enforcement é mais forte no Claude Code e mais fraco no Gemini**, compensado por a *memória* (OKF) ser universal. É um trade-off deliberado, não um descuido.

**Custo-benefício de tokens (a pergunta que justifica ou derruba o Pilar 1).**

A comparação ingênua é *"gastar tokens documentando vs. não gastar"*. Ela está errada: **a alternativa a documentar não é zero tokens — é re-descobrir a mesma intenção a cada sessão**, a partir do código (mais caro e lossy, porque intenção não vive no código). O custo é pago de qualquer forma; a escolha é *pagar uma vez e amortizar* vs. *pagar toda vez*. A economia é de amortização:

```
Custo    = C_produzir (uma vez)  +  N × C_ler_subconjunto_relevante
Benefício = retrabalho evitado   +  continuidade entre sessões
```

- Para feature de vida longa, tocada por muitas sessões: `N` grande + `C_ler` pequeno → **fortemente positivo**.
- Para script/spike descartável: `N ≈ 1` → **negativo**.

Três condições precisam ser verdadeiras para a conta fechar — e definem requisitos de implementação:

1. **`C_ler` sublinear** — o agente **nunca** carrega o bundle inteiro; navega o grafo OKF via `index.md` e carrega só os 2–3 conceitos ligados ao microtask atual (*progressive disclosure*). **Sem isto, o harness vira imposto de token linear no volume de doc.**
2. **Memória confiável** — spec desatualizado é *pior* que spec nenhum (a IA constrói errado com confiança → tokens de valor negativo). O loop de verificação (pilares 3–4) e o `log.md`/*confidence signals* (OKF v0.2) são o que mantém a memória honesta. **É por isso que os pilares não se sustentam isoladamente: sem verificação, a economia do OKF desmorona.**
3. **Intensidade proporcional** — full pipeline para itens de vida longa/alto custo de errar; harness mínimo (ou nenhum) para trivial/descartável. O `Phase 0` (seleção de tipo de trabalho) é o gancho natural para classificar isto.

Heurística de decisão por item:

| Sinal | Harness completo | Harness mínimo / pular |
|:---|:---:|:---:|
| Vida útil longa (feature de produto) | ✅ | |
| Tocado por múltiplas sessões/pessoas | ✅ | |
| Alto custo de errar (preço, dados, compliance) | ✅ | |
| Mudança trivial / script / spike | | ✅ |

---

## Consequências

**O que fica mais fácil:**
- Pular estágios deixa de ser possível (hook bloqueia) — qualidade não depende mais da obediência do modelo.
- `.specs/` vira memória de projeto durável, portável e legível por qualquer agente/ferramenta, sem tradução.
- A rastreabilidade existente vira um grafo navegável, com custo de leitura em execução quase constante.
- Distribuição versionada e sem mutar o `CLAUDE.md` global do usuário.

**O que fica mais difícil / custos assumidos:**
- Dependência de uma spec v0.1 em evolução (mitigação: pinar `okf_version`; tratar migração v0.1→v0.2 como tarefa consciente).
- Curva de aprendizado nova (hooks, subagents, plugin format) para contribuidores.
- Enforcement duro só no Claude Code; Gemini fica com garantia mais fraca (aceito).
- Necessidade de manter o vocabulário de `type` do SDDK como contrato — divergência entre produtor (skills) e consumidor (subagents) quebra o valor.

**O que revisitar:**
- Reavaliar quando sair OKF v0.2 (confidence signals) — pode substituir mecanismo caseiro de confiança.
- Definir critério de parada e teto de iterações do loop de verificação (ex.: máx. 3 rounds → escala ao usuário) antes de ligar o gate no `Stop`.
- Medir empiricamente `C_produzir` e `C_ler` reais em 2–3 features piloto para validar a tese de amortização.

---

## Action Items

1. [ ] Definir e documentar o **vocabulário controlado de `type`** (perfil OKF do SDDK) como contrato produtor/consumidor.
2. [ ] Especificar a **migração do `.specs/`**: adicionar frontmatter aos templates das 5 skills; `_overview.md` → `index.md`; introduzir `log.md`.
3. [ ] Provar o conceito de **progressive disclosure** — skill de dev navegando o grafo OKF em vez de carregar documentos inteiros.
4. [ ] Empacotar como **`.claude-plugin/plugin.json`** e validar instalação via marketplace (aposentar/reduzir o `bin/cli.js` de cópia).
5. [ ] Criar o subagent **`sddk-verifier`** (tools read-only + Bash de teste; saída estruturada pass/fail).
6. [ ] Escrever os **hooks de gate** (`PreToolUse` em Write/Edit; `Stop`/`SubagentStop`) com teto de iterações.
7. [ ] Rodar **2–3 features piloto** medindo tokens de produção vs. leitura para validar a amortização.
8. [ ] (Futuro / Fase 4) Avaliar orquestrador headless via **Claude Agent SDK** para CI/CD — ADR próprio.

---

## Referências

- [Open Knowledge Format — Google Cloud Blog (fonte primária)](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
- [Spec OKF oficial — GoogleCloudPlatform/knowledge-catalog/okf](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)
- Claude Code — Plugins, Subagents, Hooks (docs oficiais em code.claude.com)
- SDDK v2.5.0 — estado atual: [sddk/CLAUDE.md](../../sddk/CLAUDE.md), [sddk/plugin.json](../../sddk/plugin.json), [bin/cli.js](../../bin/cli.js)
