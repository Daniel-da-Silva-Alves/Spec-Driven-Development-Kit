# Template de Testes Manuais

Use este template para gerar o `manual-tests.md` de cada feature. Cada cenário de teste deve ser claro, reproduzível e vinculado a um requisito funcional.

## Estrutura do Documento

```markdown
# Testes Manuais — {Nome da Feature}

**Feature**: {nome da feature}
**Data**: {data de geração}
**SRS Referência**: [srs.md](.specs/features/{feature}/srs.md)
**SDD Referência**: [sdd.md](.specs/features/{feature}/sdd.md)

---

## Instruções para o Desenvolvedor

1. Execute cada cenário de teste **na ordem listada**
2. Marque `[x]` nos cenários que passaram
3. Para cenários que falharam, anote o comportamento observado na coluna "Resultado Real"
4. Todos os cenários DEVEM passar antes de considerar a feature completa

---

## Cenários de Teste

### CT-001: {Nome descritivo do cenário}

| Campo | Valor |
|:---|:---|
| **Requisito** | RF-{xxx} — {nome do requisito} |
| **Prioridade** | Alta / Média / Baixa |
| **Pré-condição** | {estado inicial necessário} |

**Passos:**
1. {ação específica 1}
2. {ação específica 2}
3. {ação específica 3}

**Resultado Esperado:**
{descrição precisa do que deve acontecer}

**Resultado Real:**
- [ ] ✅ Passou
- [ ] ❌ Falhou — Observação: ___

---

### CT-002: {Nome descritivo do cenário}

(repetir formato)

---

## Cenários de Edge Case

### EC-001: {Nome do edge case}

| Campo | Valor |
|:---|:---|
| **Requisito** | RF-{xxx} |
| **Tipo** | Input inválido / Erro de rede / Concorrência / Limite |

**Passos:**
1. {ação que provoca o edge case}

**Resultado Esperado:**
{como o sistema deve se comportar neste caso}

**Resultado Real:**
- [ ] ✅ Passou
- [ ] ❌ Falhou — Observação: ___

---

## Resumo de Execução

| Total | Passou | Falhou | Pendente |
|:---:|:---:|:---:|:---:|
| {n} | {n} | {n} | {n} |

**Executor**: ___
**Data de execução**: ___
**Aprovado para deploy**: [ ] Sim / [ ] Não
```

## Regras de Geração

1. **Cada requisito funcional (RF-xxx) DEVE ter pelo menos 1 cenário de teste**
2. **Cada regra de negócio (RN-xxx) DEVE ter pelo menos 1 cenário que a valida**
3. **Incluir pelo menos 2 edge cases** por feature (inputs inválidos, limites, erros)
4. **Passos DEVEM ser reproduzíveis** — "clicar no botão X" e não "testar a funcionalidade"
5. **Resultado esperado DEVE ser específico** — "exibir toast verde com texto 'Salvo com sucesso'" e não "funcionar"
6. **Prioridade dos cenários** corresponde à prioridade do requisito que testam
