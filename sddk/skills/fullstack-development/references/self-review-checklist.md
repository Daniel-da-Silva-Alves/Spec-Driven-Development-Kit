# Checklist de Auto-Review (Self-Review)

Aplique este checklist após implementar cada microtask. Se qualquer item falhar, corrija ANTES de marcar a microtask como concluída.

---

## Checklist

### 1. Aderência ao SDD

- [ ] O código implementa exatamente o que está especificado na seção referenciada do SDD?
- [ ] A estrutura de pastas/arquivos segue o definido no SDD?
- [ ] O modelo de dados corresponde ao schema do SDD (campos, tipos, constraints)?
- [ ] Os endpoints/rotas seguem o design de API do SDD (paths, methods, bodies)?
- [ ] As camadas de responsabilidade estão separadas conforme arquitetura do SDD?

### 2. Clean Code

- [ ] Todas as variáveis e funções têm nomes descritivos e específicos?
- [ ] Não há comentários que apenas descrevem o que o código faz (óbvios)?
- [ ] Não há código repetido que deveria ser abstraído?
- [ ] Cada arquivo/componente tem responsabilidade única (≤ 150 linhas significativas)?
- [ ] O tratamento de erros é específico (não genérico catch-all)?

### 3. Naming Conventions (conforme `.specs/standards/naming-conventions.md`)

- [ ] As conventions de nome seguem o definido nos **standards do projeto**?
- [ ] Variáveis e funções seguem a convenção do projeto (verificar `naming-conventions.md`)?
- [ ] Nomes de tabelas/colunas seguem a convenção do banco (verificar `naming-conventions.md#banco-de-dados`)?
- [ ] Componentes usam a convenção definida para frontend (verificar `naming-conventions.md#componentes`)?
- [ ] Variáveis booleanas usam o prefixo definido nos standards (`is`, `has`, `can`, `should`)?
- [ ] Constantes usam a convenção definida nos standards?

### 4. Anti-Design de IA

- [ ] Não há emojis em textos de interface (botões, labels, headings)?
- [ ] CSS/Tailwind usa design tokens do SDD/`design-system.md` (não valores hardcoded genéricos)?
- [ ] Não há textos placeholder genéricos ('Lorem ipsum', 'Click here', 'Submit')?
- [ ] A UI não tem aparência de "tutorial de YouTube" (sombras e gradientes sem propósito)?
- [ ] Componentes estão devidamente separados (não monolíticos)?
- [ ] Não há código boilerplate repetitivo sem abstração?

### 5. Conformidade com Standards do Projeto

- [ ] A arquitetura segue as camadas e regras de dependência de `.specs/standards/architecture.md`?
- [ ] Design tokens do `.specs/standards/design-system.md` estão sendo usados (se frontend)?
- [ ] API segue as convenções de `.specs/standards/api-conventions.md` (format de response, status codes)?
- [ ] Boas práticas de `.specs/standards/coding-standards.md` estão sendo respeitadas?
- [ ] Tratamento de erros segue a estratégia definida nos standards?

### 6. Funcionalidade

- [ ] O código compila/executa sem erros?
- [ ] O critério de "done" da microtask foi atendido?
- [ ] Não foi adicionada funcionalidade não especificada no SRS/SDD?

---

## Como Usar

1. Após implementar uma microtask, percorra cada item do checklist mentalmente
2. Se qualquer item estiver ❌, corrija o código
3. Só marque a microtask como `[x]` quando todos os itens estiverem ✅
4. Não é necessário listar o checklist ao usuário — é um processo interno do agente
