# Template: Padrões Arquiteturais do Projeto

Use este template para gerar `.specs/standards/architecture.md`. Preencha com as respostas do onboarding.

```markdown
# Padrões Arquiteturais do Projeto

**Projeto**: {nome do projeto}
**Última atualização**: {data}

---

## 1. Padrão Arquitetural Base

**Padrão**: {ex: Domain-Driven Design (DDD)}
**Justificativa**: {por que este padrão}

### Camadas e Responsabilidades

| Camada | Responsabilidade | Pode importar de | NÃO pode importar de |
|:---|:---|:---|:---|
| {ex: Domain} | {ex: Entidades, Value Objects, regras de negócio} | {nenhuma} | {Application, Infrastructure, Presentation} |
| {ex: Application} | {ex: Use Cases, DTOs, Ports} | {Domain} | {Infrastructure, Presentation} |
| {ex: Infrastructure} | {ex: Repositories, API clients, DB} | {Domain, Application} | {Presentation} |
| {ex: Presentation} | {ex: Controllers, Views, Components} | {Application} | {Domain, Infrastructure} |

### Estrutura de Diretórios Padrão

```
src/
├── {camada1}/
├── {camada2}/
├── {camada3}/
└── {camada4}/
```

---

## 2. Padrões Avançados

### {ex: Event Sourcing}
- **Usado em**: {módulos/contextos onde se aplica}
- **NÃO usado em**: {módulos onde NÃO se aplica}
- **Implementação**: {detalhes técnicos}

### {ex: BFF (Backend for Frontend)}
- **Escopo**: {cada frontend tem seu BFF? ou BFF único?}
- **Regra**: {BFF contém lógica de negócio? Ou apenas orquestra?}

### {ex: CQRS (Command Query Responsibility Segregation)}
- **Usado em**: {onde se aplica}
- **Command**: {como são os commands}
- **Query**: {como são as queries}

---

## 3. Regras de Dependência

> [!IMPORTANT]
> Estas regras NUNCA devem ser violadas. Violação é classificada como 🔴 Crítica no Code Review.

1. {ex: Domain NUNCA importa de Infrastructure}
2. {ex: Use Cases orquestram, NUNCA contêm lógica de domínio pura}
3. {ex: Cada Aggregate tem seu próprio Repository}
4. {ex: Repositories retornam Domain Entities, não DTOs}

---

## 4. Princípios de Design

| Princípio | Como aplicamos |
|:---|:---|
| {ex: SSOT} | {ex: Estado vive no banco. Cache é derivado, nunca fonte primária} |
| {ex: Separation of Concerns} | {ex: Cada módulo tem responsabilidade única} |
| {ex: Fail Fast} | {ex: Validar inputs na borda do sistema} |
```
