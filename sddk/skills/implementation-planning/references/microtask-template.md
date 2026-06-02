# Template de Microtask

Cada microtask no Implementation Plan DEVE seguir este formato:

## Formato Obrigatório

```markdown
- [ ] **{Fase}.{Número}: {Título descritivo da tarefa}**
  - 📎 Ref SDD: [{seção}](.specs/features/{feature}/sdd.md#L{inicio}-L{fim})
  - 📎 Ref SRS: [{requisito}](.specs/features/{feature}/srs.md#L{inicio}-L{fim})
  - 📎 Ref Standards: [{padrão}](.specs/standards/{arquivo}.md#{seção})  ← quando aplicável
  - 📁 Arquivos:
    - `{caminho/do/arquivo.ext}` — {criar | modificar} — {breve descrição}
  - ✅ Done: {critério mensurável de conclusão}
```

## Exemplo Completo

```markdown
# Implementation Plan — Feature: Autenticação de Usuários

## Fase 1: Setup e Configuração

- [ ] **1.1: Configurar dependências de autenticação**
  - 📎 Ref SDD: [SDD#1.2 Stack Tecnológica](.specs/features/user-auth/sdd.md#L15-L28)
  - 📎 Ref SRS: [SRS#2.4 Restrições](.specs/features/user-auth/srs.md#L60-L65)
  - 📁 Arquivos:
    - `package.json` — modificar — adicionar bcrypt, jsonwebtoken
    - `src/config/auth.ts` — criar — constantes de autenticação (jwt secret, expiration)
  - ✅ Done: Dependências instaladas, config de auth exportando constantes tipadas

## Fase 2: Modelo de Dados

- [ ] **2.1: Criar migration da tabela users**
  - 📎 Ref SDD: [SDD#3.1 Entidade User](.specs/features/user-auth/sdd.md#L45-L62)
  - 📎 Ref SRS: [SRS RF-001 Cadastro de Usuário](.specs/features/user-auth/srs.md#L80-L95)
  - 📎 Ref Standards: [Naming DB](.specs/standards/naming-conventions.md#banco-de-dados)
  - 📁 Arquivos:
    - `prisma/schema.prisma` — modificar — adicionar model User
    - `prisma/migrations/001_create_users/` — criar — migration auto-gerada
  - ✅ Done: Migration executada, tabela users criada com todos os campos do SDD e nomenclatura conforme standards

- [ ] **2.2: Criar repository de User**
  - 📎 Ref SDD: [SDD#2.3 Camada Repository](.specs/features/user-auth/sdd.md#L35-L42)
  - 📎 Ref SRS: [SRS RF-001](.specs/features/user-auth/srs.md#L80-L95)
  - 📁 Arquivos:
    - `src/repositories/user.repository.ts` — criar — CRUD operations para User
  - ✅ Done: Repository com findById, findByEmail, create, update, delete implementados e tipados

## Fase 3: Lógica de Negócio

- [ ] **3.1: Implementar service de registro**
  - 📎 Ref SDD: [SDD#4.1 POST /api/auth/register](.specs/features/user-auth/sdd.md#L70-L85)
  - 📎 Ref SRS: [SRS RF-001 + RN-001](.specs/features/user-auth/srs.md#L80-L110)
  - 📁 Arquivos:
    - `src/services/auth.service.ts` — criar — register(), hashPassword()
  - ✅ Done: Service registra user com senha hasheada, valida email único, retorna user sem senha
```

## Regras

1. **Numeração por fase**: `{Fase}.{Número}` — ex: 1.1, 1.2, 2.1, 3.1
2. **Referências DEVEM apontar para linhas específicas** — não para o documento inteiro
3. **Arquivos DEVEM ter ação clara** — "criar" ou "modificar"
4. **Critério de done DEVE ser verificável** — não "funcionar bem" mas "endpoint retorna 200 com body tipado"
5. **Cada microtask DEVE ser completável em 1 iteração** do agente — se for muito grande, quebre em sub-tarefas
