# Anti-Design de IA — 8 Padrões a Detectar e Rejeitar

Estes são padrões que denunciam código gerado por IA sem curadoria humana. O agente DEVE detectar e corrigir todos eles durante o Code Review.

---

## Padrão 1: Emojis em Interface

### O que detectar
Emojis usados como conteúdo textual em elementos de interface do usuário.

### Onde procurar
- Textos de botões
- Labels de formulários
- Headings e títulos
- Placeholders de inputs
- Mensagens de feedback/toast
- Navegação (menus, breadcrumbs)

### Exemplos

❌ **Ruim**:
```html
<button>🚀 Enviar Projeto</button>
<h1>📊 Dashboard de Vendas</h1>
<input placeholder="🔍 Pesquisar..." />
<span>✅ Salvo com sucesso!</span>
```

✅ **Bom**:
```html
<button>Enviar Projeto</button>
<h1>Dashboard de Vendas</h1>
<input placeholder="Pesquisar produtos, pedidos ou clientes" />
<span>Alterações salvas</span>
```

### Exceção
Emojis são aceitáveis em: conteúdo gerado por usuários (chat, comentários), campos de dados (não de UI), e quando o design system do projeto explicitamente os inclui.

---

## Padrão 2: CSS/Tailwind Genérico

### O que detectar
Estilos visuais aplicados sem coerência com um design system. Cores aleatórias, tamanhos inconsistentes, espaçamentos ad-hoc.

### Exemplos

❌ **Ruim**:
```html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
  <h2 class="text-2xl font-bold mb-2">Título</h2>
  <p class="text-gray-200">Descrição aqui</p>
</div>
```

✅ **Bom** (com design tokens):
```html
<div class="bg-surface-primary text-on-surface p-card rounded-card shadow-card">
  <h2 class="text-heading-md font-heading mb-spacing-sm">Título</h2>
  <p class="text-body-md text-on-surface-secondary">Descrição aqui</p>
</div>
```

Ou com CSS variables:
```css
.card {
  background: var(--color-surface-primary);
  padding: var(--spacing-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}
```

---

## Padrão 3: Comentários Óbvios

### O que detectar
Comentários que reescrevem em português/inglês o que o código já diz.

### Exemplos

❌ **Ruim**:
```typescript
// Importa o serviço de usuários
import { UserService } from './user.service';

// Define a variável contador como 0
let counter = 0;

// Incrementa o contador
counter++;

// Retorna a resposta
return response;
```

✅ **Bom** (sem comentários — o código é autoexplicativo):
```typescript
import { UserService } from './user.service';
let counter = 0;
counter++;
return response;
```

---

## Padrão 4: Nomes Genéricos

### O que detectar
Variáveis, funções e componentes com nomes que não descrevem seu conteúdo ou propósito.

### Lista de Nomes Proibidos

| Contexto | Nomes Genéricos ❌ |
|:---|:---|
| Variáveis | `data`, `result`, `temp`, `item`, `obj`, `val`, `info`, `stuff` |
| Funções | `handleClick`, `handleChange`, `handleSubmit`, `getData`, `processData`, `doStuff`, `check` |
| Componentes | `Card`, `Modal`, `List`, `Item`, `Container`, `Wrapper` (sem qualificador) |
| Tipos | `Props`, `Data`, `Response`, `Payload` (sem qualificador) |

---

## Padrão 5: Componentes Monolíticos

### O que detectar
Arquivos de componente com mais de ~150 linhas significativas que misturam múltiplas responsabilidades.

### Sinais
- Múltiplos `useState`/`useEffect` não relacionados no mesmo componente
- Renderização condicional extensa (múltiplos `if/else` ou ternários aninhados)
- Lógica de negócio misturada com UI
- Formulário, tabela e gráfico no mesmo componente

---

## Padrão 6: Código Boilerplate Repetitivo

### O que detectar
Padrões de código idênticos ou quase idênticos repetidos em múltiplos arquivos sem abstração.

### Sinais
- Fetch/API calls repetidos sem cliente centralizado
- Validações duplicadas entre formulários
- Tratamento de loading/error state repetido
- Formatações de data/moeda duplicadas

---

## Padrão 7: UI "Tutorial de YouTube"

### O que detectar
Interfaces que parecem screenshots de tutoriais genéricos — funcionais mas sem identidade visual.

### Sinais
- Cards com `box-shadow` padrão do framework sem personalização
- Gradientes genéricos (`linear-gradient(to right, blue, purple)`)
- Cores padrão do Tailwind sem customização (`blue-500`, `gray-700`)
- Layout grid básico sem hierarquia visual
- Tipografia padrão do browser (sem fonte customizada)
- Ícones genéricos de bibliotecas sem curadoria

---

## Padrão 8: Textos Placeholder Genéricos

### O que detectar
Textos que demonstram falta de cuidado com o conteúdo real da interface.

### Lista de Textos Proibidos

| Contexto | Textos Genéricos ❌ |
|:---|:---|
| Conteúdo | "Lorem ipsum dolor sit amet" |
| Botões | "Click here", "Submit", "Send", "OK", "Go" |
| Links | "Read more", "Learn more", "Click here" |
| Placeholders | "Enter text here", "Type something...", "Search..." |
| Labels | "Label", "Field", "Input" |
| Headings | "Title", "Heading", "Section" |
| Error msgs | "An error occurred", "Something went wrong" |

### O que usar no lugar
Textos reais e descritivos baseados no domínio da aplicação, extraídos dos requisitos funcionais do SRS.
