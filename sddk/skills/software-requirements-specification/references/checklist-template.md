# Template de Checklist para Entrevista de Especificação

Use este template para criar o Task artifact no início da entrevista. Adapte os tópicos conforme a natureza da feature (nem todos serão aplicáveis).

## Checklist Padrão

```markdown
# Checklist de Especificação — {Nome da Feature}

## Contexto Geral
- [ ] Objetivo e propósito da feature
- [ ] Problema de negócio que resolve
- [ ] Escopo (o que está DENTRO e FORA)

## Atores e Personas
- [ ] Usuários primários (quem usa diretamente)
- [ ] Usuários secundários (afetados indiretamente)
- [ ] Papéis e permissões (admin, user, guest, etc.)

## Requisitos Funcionais
- [ ] Fluxo principal (happy path)
- [ ] Fluxos alternativos
- [ ] Fluxos de exceção / erro
- [ ] Entradas necessárias (dados, formatos, validações)
- [ ] Saídas esperadas (resultados, notificações, estados)

## Regras de Negócio
- [ ] Regras de validação
- [ ] Regras de cálculo / processamento
- [ ] Regras de estado / transição
- [ ] Regras de limite / threshold

## Requisitos Não-Funcionais
- [ ] Performance (tempo de resposta, throughput)
- [ ] Segurança (autenticação, autorização, dados sensíveis)
- [ ] Usabilidade (acessibilidade, responsividade)
- [ ] Confiabilidade (disponibilidade, tolerância a falhas)

## Interface
- [ ] Telas / componentes visuais necessários
- [ ] Integrações com APIs / serviços externos
- [ ] Eventos / webhooks / notificações

## Dependências
- [ ] Dependências com outras features
- [ ] Dependências com serviços externos
- [ ] Dependências com dados pré-existentes

## Critérios de Aceitação
- [ ] Critérios mensuráveis para cada requisito funcional
- [ ] Cenários de teste que comprovam o funcionamento

## Restrições e Premissas
- [ ] Restrições técnicas (stack, plataforma, browser)
- [ ] Restrições de negócio (regulatórias, compliance)
- [ ] Premissas assumidas
```

## Instruções de Uso

1. Ao iniciar a entrevista, crie o Task artifact com este checklist adaptado à feature
2. Marque `[/]` quando iniciar a discussão de um tópico
3. Marque `[x]` quando o tópico estiver completamente resolvido (sem ambiguidade)
4. Adicione sub-itens conforme novos pontos surgirem durante a entrevista
5. Não remova itens — se não aplicável, marque como `[x] N/A — {justificativa}`
