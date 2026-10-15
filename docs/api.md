# API local de desenvolvimento

A API usa `json-server` somente para desenvolvimento e prototipação local.

## Executar

```bash
npm install
npm run api
```

O servidor escuta em `http://localhost:3001`.

## Recursos

- `GET /products`
- `GET /products/:id`
- `GET /categories`
- `GET /brands`
- `GET /reviews?productId=:id`
- `GET /users/:id`
- `GET /carts?userId=:id`
- `GET /orders?userId=:id`
- `GET /favorites?userId=:id`

A aplicação usa `VITE_API_URL` para substituir a URL padrão.

## Limites de segurança

Este servidor não é uma solução de autenticação ou autorização. O arquivo local não deve conter senhas reais, tokens reais ou dados pessoais reais, e a porta 3001 não deve ser exposta à internet. Antes de produção, substitua este mock por um backend com banco de dados, hash Argon2/bcrypt, sessões seguras, autorização por recurso, validação server-side, rate limiting e logs sem segredos.
