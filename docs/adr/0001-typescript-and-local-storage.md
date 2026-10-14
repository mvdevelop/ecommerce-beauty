# ADR 0001: TypeScript e persistência local

## Status

Aceita.

## Contexto

O projeto começou como um frontend React em JavaScript, com dados locais e carrinho/wishlist escritos diretamente em `localStorage`. A duplicação dificultava manutenção, testes e validação de entradas.

## Decisão

Migrar o código de aplicação e configurações para TypeScript com `strict: true`, mantendo dados de demonstração em JSON. Toda leitura/escrita de carrinho e wishlist passa por `src/lib/storage.ts`, com guards de runtime em `src/lib/runtime.ts`.

A persistência local permanece temporária e limitada ao navegador. Não armazenamos pagamentos, credenciais ou segredos.

## Consequências

- erros de contrato são detectados pelo compilador;
- dados de JSON e storage continuam sendo validados em runtime;
- a aplicação permanece frontend-only;
- pagamentos reais, autenticação e pedidos persistentes exigirão backend e controles de segurança adicionais;
- a migração exige CI com typecheck, testes e build.
