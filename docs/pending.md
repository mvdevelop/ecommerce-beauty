# Pendências

## Próximos incrementos planejados

1. **Descoberta comercial completa**
   - Categorias na navbar (dropdown)
   - Breadcrumbs em ProductDetails e Shop
   - Badges e tags visíveis nos cards
   - Produtos relacionados no PDP
   - Autocomplete na busca

2. **UX e confiança**
   - Melhorias de acessibilidade (skip links, focus visible)
   - Estados vazios com sugestões de produtos
   - Save for later no carrinho
   - Microcopy consistente PT-BR

3. **Infra/Qualidade**
   - Revisar advisories npm audit (high/critical) quando viável
   - Testes de componente (Login, Signup, ProtectedRoute, Navbar)
   - Testes de integração para favoritos/wishlist sincronizados
   - SEO (meta tags dinâmicas, JSON-LD)

## Notas CI
- Workflow atualizado (actions v5, persist-credentials, git safe.directory, diagnóstico)
- Erro git exit code 128 pode ocorrer por questões específicas do runner; com as melhorias de diagnóstico será mais fácil identificar a causa nos logs do Actions.
- db.json e Product.json alinhados com os 16 produtos.
- CI, lint, typecheck e build validados localmente.