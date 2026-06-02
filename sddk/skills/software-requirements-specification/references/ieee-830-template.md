# Template SRS — IEEE 830 / ISO/IEC/IEEE 29148:2018

Use este template como base para gerar o documento SRS. Adapte as seções conforme a complexidade da feature. Nunca remova seções — se não aplicável, marque como "N/A" com justificativa.

---

## Estrutura do Documento

```markdown
# Especificação de Requisitos de Software (SRS)
## {Nome da Feature}

**Versão**: 1.0
**Data**: {data de criação}
**Projeto**: {nome do projeto}
**Feature**: {nome da feature}

---

## 1. Introdução

### 1.1 Propósito
Descrever o propósito deste documento e qual feature ele especifica.

### 1.2 Escopo
Delimitação clara do que esta feature cobre e o que está FORA do escopo.

### 1.3 Definições, Acrônimos e Abreviações
Glossário de termos específicos do domínio usados neste documento.

### 1.4 Referências
Documentos externos referenciados (outros SRS, APIs, normas).

### 1.5 Visão Geral do Documento
Breve descrição da organização deste documento.

---

## 2. Descrição Geral

### 2.1 Perspectiva do Produto
Como esta feature se encaixa no sistema maior. Dependências com outros módulos/features.

### 2.2 Funções do Produto
Resumo de alto nível das funcionalidades que a feature provê.

### 2.3 Características dos Usuários
Personas/atores que interagem com esta feature. Nível técnico esperado.

### 2.4 Restrições
Limitações técnicas, regulatórias ou de negócio.

### 2.5 Premissas e Dependências
O que está sendo assumido como verdade e depende de fatores externos.

---

## 3. Requisitos Funcionais

### RF-001: {Nome do Requisito}
- **Descrição**: {O que o sistema deve fazer}
- **Entrada**: {Dados de entrada esperados}
- **Processamento**: {Lógica de negócio aplicada}
- **Saída**: {Resultado esperado}
- **Prioridade**: Alta | Média | Baixa
- **Critério de Aceitação**: {Condições mensuráveis para considerar completo}

### RF-002: {Nome do Requisito}
(repetir estrutura para cada requisito funcional)

---

## 4. Requisitos Não-Funcionais

### 4.1 Performance
- Tempo de resposta esperado
- Throughput mínimo
- Limites de carga

### 4.2 Segurança
- Requisitos de autenticação/autorização
- Proteção de dados sensíveis
- Conformidade regulatória

### 4.3 Usabilidade
- Padrões de acessibilidade (WCAG nível)
- Responsividade (dispositivos alvo)
- Idiomas suportados

### 4.4 Confiabilidade
- Disponibilidade esperada
- Tolerância a falhas
- Estratégia de recovery

### 4.5 Manutenibilidade
- Padrões de código exigidos
- Cobertura de testes mínima
- Documentação necessária

---

## 5. Regras de Negócio

### RN-001: {Nome da Regra}
- **Descrição**: {Regra de negócio}
- **Condição**: {Quando se aplica}
- **Ação**: {O que deve acontecer}
- **Exceções**: {Casos onde não se aplica}

---

## 6. Requisitos de Interface

### 6.1 Interfaces de Usuário
Descrição das telas/componentes visuais necessários.

### 6.2 Interfaces de Software
APIs, serviços externos, integrações com outros sistemas.

### 6.3 Interfaces de Hardware
Dispositivos, sensores, periféricos (se aplicável).

---

## 7. Matriz de Rastreabilidade

| ID Requisito | Regra de Negócio | Critério de Aceitação | Prioridade |
|:---|:---|:---|:---|
| RF-001 | RN-001 | CA-001 | Alta |

---

## 8. Apêndices

### 8.1 Diagrama de Casos de Uso
(se aplicável)

### 8.2 Protótipos / Wireframes
(referências a mockups, se existirem)

### 8.3 Perguntas em Aberto
(questões não resolvidas que precisam de follow-up)
```

## Regras de Preenchimento

1. **Cada requisito funcional DEVE ter critério de aceitação** — sem exceção
2. **Requisitos devem ser testáveis** — se não pode ser verificado, não é um requisito válido
3. **Use voz ativa** — "O sistema DEVE..." e não "Seria bom se o sistema..."
4. **Priorize com MoSCoW** — Must/Should/Could/Won't ou Alta/Média/Baixa
5. **IDs sequenciais** — RF-001, RF-002... / RN-001, RN-002... para rastreabilidade
