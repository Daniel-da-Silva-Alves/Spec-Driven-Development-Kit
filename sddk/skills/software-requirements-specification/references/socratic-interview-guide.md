# Guia de Entrevista Socrática para Levantamento de Requisitos

## Princípios do Pensamento Socrático Aplicado

A entrevista socrática não busca respostas diretas — busca **clareza de pensamento**. O objetivo é guiar o stakeholder a articular exatamente o que precisa, eliminando suposições implícitas.

### Técnicas Fundamentais

#### 1. Pergunta Clarificadora
Usada quando uma resposta é vaga ou usa termos ambíguos.

**Padrão**: "Quando você diz '{termo}', o que exatamente isso significa neste contexto?"

**Exemplos**:
- Usuário: "O login deve ser seguro"
- Agente: "Quando você diz 'seguro', você está se referindo a: autenticação multifator, criptografia de senhas, proteção contra brute force, ou todas essas?"

#### 2. Pergunta de Suposição
Usada para expor premissas não declaradas.

**Padrão**: "Você está assumindo que {premissa}. Essa premissa é válida?"

**Exemplos**:
- Usuário: "O usuário faz login e acessa o dashboard"
- Agente: "Você está assumindo que existe apenas um tipo de usuário. Existem diferentes papéis (admin, operador, visitante) com acessos diferentes?"

#### 3. Pergunta de Contraponto
Usada para testar a robustez de um requisito propondo cenários contrários.

**Padrão**: "E se {cenário oposto ou edge case} acontecer? Como o sistema deve reagir?"

**Exemplos**:
- Usuário: "O sistema envia um email de confirmação"
- Agente: "E se o email for inválido? E se o servidor de email estiver fora do ar? O usuário fica bloqueado ou pode prosseguir?"

#### 4. Pergunta de Consequência
Usada para explorar impactos de uma decisão.

**Padrão**: "Se implementarmos {decisão}, qual seria o impacto em {aspecto relacionado}?"

**Exemplos**:
- Usuário: "Quero que o sistema permita upload de arquivos ilimitados"
- Agente: "Se permitirmos uploads ilimitados, qual seria o impacto no custo de armazenamento e na performance do sistema? Devemos ter um limite por usuário?"

#### 5. Pergunta de Priorização
Usada para rankear requisitos quando há muitos.

**Padrão**: "Se você tivesse que lançar amanhã com apenas 3 funcionalidades, quais seriam?"

---

## Fluxo da Entrevista

### Abertura (1-2 perguntas)
Objetivo: Entender o contexto geral da feature.

- "Descreva em uma frase o que essa feature deve fazer"
- "Quem são os principais usuários dessa feature?"
- "Qual problema de negócio essa feature resolve?"

### Aprofundamento (N perguntas por tópico)
Objetivo: Detalhar cada aspecto do checklist.

Para cada tópico do checklist:
1. Pergunte abertamente primeiro
2. Use perguntas clarificadoras para respostas vagas
3. Use perguntas de contraponto para edge cases
4. Use perguntas de suposição para premissas implícitas
5. Marque como `[x]` quando inequívoco

### Validação (2-3 perguntas finais)
Objetivo: Garantir completude antes de gerar o documento.

- "Revisando tudo que discutimos, há algum cenário que não cobrimos?"
- "Existe alguma integração com sistema externo que não mencionamos?"
- "Há alguma restrição regulatória ou de compliance que afeta essa feature?"

---

## Sinais de Alerta (Não Aceitar)

| Sinal | Ação |
|:---|:---|
| "Depois a gente vê isso" | Insistir — decisão adiada vira bug |
| "É óbvio que..." | Questionar — o óbvio do stakeholder pode não ser do dev |
| "Algo parecido com o sistema X" | Pedir detalhes — "parecido" é ambíguo |
| "O usual" / "O padrão" | Definir explicitamente o que é "padrão" neste contexto |
| Requisitos contraditórios | Apontar a contradição e pedir resolução |

## Quando Encerrar um Tópico

Um tópico está **concluído** quando:
- A resposta é específica e mensurável
- Não há interpretação alternativa possível
- O critério de aceitação é verificável
- Edge cases foram cobertos
