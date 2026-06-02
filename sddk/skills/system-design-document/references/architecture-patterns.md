# Catálogo de Padrões Arquiteturais

Referência para o agente ao conduzir decisões arquiteturais com o usuário. Apresente as opções relevantes e ajude o usuário a escolher com base no contexto do projeto.

---

## Padrões de Arquitetura de Aplicação

### MVC (Model-View-Controller)
- **Quando usar**: Aplicações web tradicionais, APIs simples, projetos menores
- **Prós**: Simples, bem documentado, fácil onboarding
- **Contras**: Pode ficar desorganizado em projetos grandes, acoplamento entre camadas
- **Exemplos**: Express.js + templates, Ruby on Rails, Django

### Clean Architecture
- **Quando usar**: Aplicações de médio/grande porte, domínios complexos, quando testabilidade é prioridade
- **Prós**: Independência de frameworks, alta testabilidade, separação clara de responsabilidades
- **Contras**: Mais boilerplate, curva de aprendizado, overengineering para projetos simples
- **Exemplos**: NestJS com módulos, FastAPI com camadas, aplicações enterprise

### Hexagonal (Ports & Adapters)
- **Quando usar**: Sistemas com múltiplas integrações externas, quando a lógica de negócio precisa ser isolada
- **Prós**: Facilita troca de dependências externas, excelente para testes
- **Contras**: Complexidade adicional, muitas interfaces/abstrações
- **Exemplos**: Sistemas financeiros, aplicações com múltiplos data sources

### Feature-Based (Vertical Slicing)
- **Quando usar**: Aplicações frontend/fullstack, quando cada feature é relativamente independente
- **Prós**: Código organizado por funcionalidade (não por tipo), fácil de navegar
- **Contras**: Pode haver duplicação entre features, difícil quando há muita lógica compartilhada
- **Exemplos**: Next.js App Router, módulos NestJS, features de app mobile

---

## Padrões de Comunicação

### REST
- **Quando usar**: APIs públicas, CRUD simples, integração com múltiplos clientes
- **Prós**: Universal, stateless, cacheable, bem documentado
- **Contras**: Over/under-fetching, múltiplas requisições para dados relacionados

### GraphQL
- **Quando usar**: Frontends complexos com dados aninhados, múltiplas views do mesmo dado
- **Prós**: Fetch exato do necessário, tipagem forte, introspection
- **Contras**: Complexidade no backend, N+1 queries, caching mais difícil

### tRPC
- **Quando usar**: Fullstack TypeScript, quando cliente e servidor estão no mesmo repo
- **Prós**: Type-safety end-to-end sem código gerado, DX excelente
- **Contras**: Só funciona com TypeScript, acoplamento client-server

---

## Padrões de State Management (Frontend)

### React Context
- **Quando usar**: Estado simples e pouco frequente (theme, auth, locale)
- **Prós**: Nativo, zero dependências
- **Contras**: Re-renders desnecessários, não escala bem

### Zustand
- **Quando usar**: Estado moderado, performance importa, simplicidade é prioridade
- **Prós**: API mínima, seletores granulares, sem boilerplate
- **Contras**: Menos estruturado que Redux, pode virar "bag of state"

### Redux Toolkit
- **Quando usar**: Estado complexo com muitas interações, quando previsibilidade é crítica
- **Prós**: DevTools, time-travel debugging, ecosistema maduro
- **Contras**: Boilerplate, curva de aprendizado, overengineering para projetos simples

### TanStack Query (React Query)
- **Quando usar**: Estado que vem do servidor (server state), cache de API
- **Prós**: Cache automático, invalidação, refetch em background, loading states
- **Contras**: Não substitui client state, curva para cache policies

---

## Padrões de Acesso a Dados

### ORM (Prisma, TypeORM, SQLAlchemy)
- **Quando usar**: CRUD-heavy, migrations automatizadas, type-safety
- **Prós**: Produtividade, migrations, tipagem
- **Contras**: Performance em queries complexas, abstração leaky

### Query Builder (Knex, Drizzle)
- **Quando usar**: Queries complexas, performance importa, controle fino
- **Prós**: Flexibilidade, performance, composabilidade
- **Contras**: Mais verboso que ORM, sem migrations automáticas (alguns)

### Raw SQL
- **Quando usar**: Queries altamente otimizadas, stored procedures, DBA no time
- **Prós**: Máxima performance e controle
- **Contras**: Sem tipagem, vulnerável a SQL injection se mal feito, difícil manutenção

---

## Como Apresentar ao Usuário

Ao conduzir a entrevista técnica:

1. Identifique qual **categoria** de decisão está em jogo
2. Apresente **2-3 opções relevantes** (não todas) com base no contexto
3. Inclua a **recomendação** baseada no projeto
4. Use `ask_question` com as opções formatadas
5. Registre a decisão com justificativa no SDD
