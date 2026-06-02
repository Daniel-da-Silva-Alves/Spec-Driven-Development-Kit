# Template: Convenções de API do Projeto

Use este template para gerar `.specs/standards/api-conventions.md`. Preencha com as respostas do onboarding. Se o projeto não tem API, criar com "N/A — projeto sem API".

```markdown
# Convenções de API

**Projeto**: {nome do projeto}
**Última atualização**: {data}

---

## 1. Padrão de API

**Tipo**: {REST | GraphQL | tRPC | gRPC}
**Versionamento**: {ex: URL path /api/v1/, header, nenhum}
**Base URL**: {ex: /api/v1}

---

## 2. Formato de Response

### Response de Sucesso
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 150
  }
}
```

### Response de Erro
```json
{
  "error": {
    "code": "{ERROR_CODE}",
    "message": "{mensagem legível}",
    "details": [ ... ]
  }
}
```

### HTTP Status Codes

| Status | Quando usar |
|:---|:---|
| 200 | Sucesso (GET, PUT, PATCH) |
| 201 | Recurso criado (POST) |
| 204 | Sucesso sem body (DELETE) |
| 400 | Validação / input inválido |
| 401 | Não autenticado |
| 403 | Não autorizado (sem permissão) |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: email já existe) |
| 422 | Entidade não processável |
| 429 | Rate limit excedido |
| 500 | Erro interno do servidor |

---

## 3. Naming de Endpoints

| Regra | Exemplo correto | Exemplo errado |
|:---|:---|:---|
| Substantivos no plural | `/api/v1/users` | `/api/v1/user` |
| Sem verbos na URL | `GET /users` | `GET /getUsers` |
| Kebab-case para multi-palavras | `/order-items` | `/orderItems` |
| Recursos aninhados | `/users/:id/orders` | `/getUserOrders` |

---

## 4. Paginação

**Tipo**: {cursor | offset | keyset}

### Formato de Request
{ex para offset:}
```
GET /api/v1/users?page=2&per_page=20
```

### Formato de Response (meta)
```json
{
  "meta": {
    "page": 2,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## 5. Filtros e Ordenação

### Filtros
```
GET /api/v1/users?status=active&role=admin
```

### Ordenação
```
GET /api/v1/users?sort=created_at&order=desc
```

---

## 6. Autenticação

**Método**: {ex: Bearer Token (JWT) via header Authorization}
**Header**: `Authorization: Bearer {token}`
**Refresh**: {ex: via POST /api/v1/auth/refresh com refresh token em httpOnly cookie}

---

## 7. Validação

| Regra | Descrição |
|:---|:---|
| Validação no backend | TODA input é validada no servidor, independente do frontend |
| Mensagens de erro | Retornar campo + mensagem específica |
| Formato de erro de validação | `{"error": {"code": "VALIDATION_ERROR", "details": [{"field": "email", "message": "Email inválido"}]}}` |
```
