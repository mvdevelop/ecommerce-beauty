# Blushify

Frontend de e-commerce de cosméticos construído com React, Vite e TypeScript.

## Stack

- React 19
- TypeScript em modo `strict`
- Vite 7
- React Router
- Bootstrap/React-Bootstrap
- Vitest

## Desenvolvimento

```bash
npm install
npm run dev
```

## Scripts

| Script | Objetivo |
| --- | --- |
| `npm run dev` | inicia o servidor de desenvolvimento |
| `npm run build` | executa typecheck e build de produção |
| `npm run lint` | verifica padrões de código |
| `npm run typecheck` | valida tipos sem gerar arquivos |
| `npm test` | executa testes |
| `npm run test:coverage` | executa testes com cobertura |
| `npm run check` | lint, typecheck e testes |

## Arquitetura

- `src/components`: componentes e páginas React;
- `src/types`: contratos TypeScript do domínio;
- `src/lib/pricing.ts`: parsing e cálculo de preços;
- `src/lib/storage.ts`: fronteira validada para carrinho e wishlist;
- `src/Product.json` e `src/Blogs.json`: dados locais de demonstração;
- `src/assets` e `public/images`: recursos estáticos.

O carrinho e a wishlist são persistidos localmente apenas para fins demonstrativos. O conteúdo do `localStorage` é tratado como não confiável e validado antes do uso.

## Segurança e privacidade

- Não inclua segredos em variáveis `VITE_*`: elas são incorporadas ao bundle público.
- Use `.env.example` como referência para configurações públicas.
- O checkout é somente demonstrativo e não processa pagamentos. Nunca insira dados reais de cartão.
- O projeto não envia dados pessoais para um backend nesta versão.
- Para remover dados locais, limpe o storage do domínio no navegador.

## Qualidade

A integração contínua deve executar `npm ci`, `npm run check` e `npm run build`. Dependências devem ser revisadas com `npm audit` antes de releases.

## Migração JavaScript → TypeScript

Todo o código de aplicação está sendo mantido em `.ts`/`.tsx`, com `allowJs: false` e `strict: true`. O CI deve bloquear novos arquivos `.js`/`.jsx` em `src/` e qualquer erro de typecheck.

## Limitações conhecidas

Esta é uma aplicação frontend-only. Autenticação, autorização, pagamentos reais, pedidos persistidos e backoffice exigem um backend dedicado, gestão de segredos e controles adicionais de LGPD/PCI.
