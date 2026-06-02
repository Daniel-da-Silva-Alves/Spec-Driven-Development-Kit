# Guia de Classificação de Severidade de Refatorações

Use este guia para classificar cada issue encontrada durante o Code Review. A classificação determina a **ação imediata** a ser tomada.

---

## Severidades

### 🔴 Crítica — Execução Imediata

Issues que **devem ser corrigidas na mesma sessão** antes de considerar a feature concluída.

#### Critérios para Classificar como Crítica:

| Categoria | Exemplos |
|:---|:---|
| **Segurança** | SQL injection, XSS, IDOR, secrets expostos, senhas em plaintext |
| **Bug funcional** | Feature não funciona conforme SRS, crash em fluxo principal |
| **Violação grave do SDD** | Arquitetura implementada diferente do design (ex: lógica de negócio no controller) |
| **Perda de dados** | Operações destrutivas sem confirmação, falta de validação em deletes |

#### Ação:
1. Corrigir o código diretamente
2. Documentar o que foi corrigido no relatório de review
3. Se houver mais de 5 correções críticas, criar microtasks e voltar para Skill 4

---

### 🟡 Média — Documentar no Backlog

Issues que **afetam qualidade mas não impedem o funcionamento**. Devem ser resolvidas antes do próximo release ou sprint.

#### Critérios para Classificar como Média:

| Categoria | Exemplos |
|:---|:---|
| **Code smell** | Duplicação de código, funções muito longas, complexidade ciclomática alta |
| **Naming** | Nomes inconsistentes entre arquivos, convenções misturadas |
| **Anti-IA detectado** | Emojis em UI, CSS genérico, comentários óbvios |
| **Componentização** | Componente com múltiplas responsabilidades (mas funcional) |
| **Configuração** | CORS aberto, falta de rate limiting, validação apenas no frontend |

#### Ação:
1. Documentar em `.specs/features/{feature}/refactoring-backlog.md`
2. Incluir: arquivo, linha, descrição, sugestão de correção
3. Priorizar dentro do backlog

---

### 🟢 Baixa — Documentar no Backlog (Baixa Prioridade)

Issues que são **melhorias opcionais** de estética, performance ou organização. Não urgentes.

#### Critérios para Classificar como Baixa:

| Categoria | Exemplos |
|:---|:---|
| **Otimização** | Queries que poderiam ser mais eficientes (mas funcionam) |
| **Estilo** | Formatação inconsistente (que um linter resolveria) |
| **Documentação** | Falta de JSDoc em funções públicas |
| **Organização** | Arquivo poderia estar em outro diretório (mas funciona onde está) |
| **DX** | Mensagens de log pouco informativas |

#### Ação:
1. Documentar em `.specs/features/{feature}/refactoring-backlog.md`
2. Marcar como baixa prioridade
3. Resolver quando houver tempo disponível

---

## Árvore de Decisão

```
O código funciona incorretamente ou tem falha de segurança?
├── SIM → 🔴 Crítica → CORRIGIR AGORA
└── NÃO
    └── O código viola boas práticas, convenções ou o SDD?
        ├── SIM → 🟡 Média → BACKLOG (prioridade)
        └── NÃO
            └── O código pode ser melhorado mas está OK?
                ├── SIM → 🟢 Baixa → BACKLOG (quando possível)
                └── NÃO → ✅ Sem issue
```

## Formato do Backlog Entry

```markdown
### RB-{número}: {Título descritivo}
- **Severidade**: 🟡 Média / 🟢 Baixa
- **Arquivo**: `{caminho/do/arquivo.ext}`
- **Linha(s)**: {L42-L58}
- **Categoria**: {Code Smell | Naming | Anti-IA | Segurança | Performance | Organização}
- **Descrição**: {O que está errado}
- **Sugestão**: {Como corrigir}
- **Esforço estimado**: {Baixo | Médio | Alto}
```
