# Checklist de Segurança para Code Review

Checklist simplificado baseado no OWASP Top 10, adaptado para revisão de código de features individuais.

---

## 1. Injeção (SQL, XSS, Command)

- [ ] **SQL Injection**: Queries usam parametrização/prepared statements (nunca concatenação de strings)
- [ ] **XSS**: Inputs de usuário são sanitizados antes de renderizar no DOM
- [ ] **Command Injection**: Inputs de usuário NUNCA são passados diretamente para execução de comandos do sistema
- [ ] **Template Injection**: Templates (Handlebars, EJS, Jinja) escapam variáveis por padrão

### O que verificar
```typescript
// ❌ SQL Injection
db.query(`SELECT * FROM users WHERE id = '${userId}'`);

// ✅ Parameterizado
db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

```typescript
// ❌ XSS
element.innerHTML = userInput;

// ✅ Sanitizado
element.textContent = userInput;
```

---

## 2. Autenticação

- [ ] Senhas são hasheadas com algoritmo forte (bcrypt, argon2, scrypt) — nunca MD5/SHA1
- [ ] Tokens JWT têm expiração definida
- [ ] Refresh tokens são armazenados de forma segura (httpOnly cookies, não localStorage)
- [ ] Tentativas de login são limitadas (rate limiting / account lockout)
- [ ] Logout invalida sessão/token no servidor

---

## 3. Autorização

- [ ] Cada endpoint verifica permissões do usuário autenticado
- [ ] Não há IDOR (Insecure Direct Object Reference) — usuário A não acessa dados do usuário B
- [ ] Roles/permissions são validadas no backend (nunca apenas no frontend)
- [ ] Endpoints admin são protegidos adequadamente

### O que verificar
```typescript
// ❌ IDOR — qualquer usuário autenticado acessa qualquer pedido
app.get('/api/orders/:id', async (req, res) => {
  const order = await orderRepo.findById(req.params.id);
  return res.json(order);
});

// ✅ Verificação de propriedade
app.get('/api/orders/:id', async (req, res) => {
  const order = await orderRepo.findById(req.params.id);
  if (order.userId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  return res.json(order);
});
```

---

## 4. Exposição de Dados Sensíveis

- [ ] Senhas nunca aparecem em responses de API
- [ ] Dados sensíveis (CPF, cartão, tokens) não são logados
- [ ] .env e secrets não estão comitados no git (.gitignore configurado)
- [ ] Errors de produção não expõem stack traces ou detalhes internos ao cliente

### O que verificar
```typescript
// ❌ Expõe senha
return res.json(user);

// ✅ Omite campos sensíveis
const { password, ...safeUser } = user;
return res.json(safeUser);
```

---

## 5. Configuração de Segurança

- [ ] CORS está configurado para permitir apenas origens necessárias (não `*` em produção)
- [ ] Headers de segurança configurados (CSP, X-Frame-Options, X-Content-Type-Options)
- [ ] HTTPS enforced em produção
- [ ] Secrets/tokens não estão hardcoded no código fonte

### O que verificar
```typescript
// ❌ CORS aberto
app.use(cors({ origin: '*' }));

// ✅ CORS restrito
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
```

---

## 6. Validação de Input

- [ ] Todos os inputs de formulário são validados no backend (não apenas no frontend)
- [ ] Uploads de arquivo validam tipo, tamanho e conteúdo
- [ ] Paginação tem limites máximos (não permite `limit=999999`)
- [ ] Campos numéricos validam range (não aceita negativos quando não deveria)

---

## Classificação de Issues de Segurança

| Issue | Severidade |
|:---|:---|
| SQL/XSS/Command Injection | 🔴 Crítica |
| IDOR (acesso a dados de outros usuários) | 🔴 Crítica |
| Senha em plaintext / hash fraco | 🔴 Crítica |
| Secrets hardcoded no código | 🔴 Crítica |
| Token sem expiração | 🔴 Crítica |
| CORS `*` em produção | 🟡 Média |
| Falta de rate limiting | 🟡 Média |
| Falta de headers de segurança | 🟡 Média |
| Stack trace em response de erro | 🟡 Média |
| Validação apenas no frontend | 🟡 Média |
| Falta de paginação com limite | 🟢 Baixa |

> [!IMPORTANT]
> **Toda issue de segurança classificada como Crítica DEVE ser corrigida imediatamente.** Nunca mover para backlog.
