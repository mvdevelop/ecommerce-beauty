# Pendências remanescentes (anotadas durante a implementação do i18n/navbar)

## Já entregue nesta rodada
- Núcleo do i18n (src/i18n/) com PT-BR/EN/ES, provider, persistência, <html lang>.
- Navbar com drawer mobile à direita + harmonização desktop (select de categoria removido, link textual "Carrinho" removido, ícones com contador).
- Skip link + #main-content; useId em Modal/MiniCart.
- Estados vazios com sugestões (ProductSuggestions) + estado vazio do Cart.
- ErrorState em Shop e Orders.
- Save for later (storage + lib/saved + UI no Cart).
- Conversão para t() de todas as páginas/componentes que estavam em EN ou PT-BR.
- Varredura PT-BR (virou i18n).
- Mapa OrderStatus → texto em Orders.
- Testes: LanguageProvider, Nav, saved.

## Ainda por fazer (Bloco 2/3 + conteúdo)
1. **Conteúdo localizado de fato nos JSONs**: adicionar os campos `nameI18n`/`descriptionI18n` (e `title`/`name` para Blogs) com traduções EN/ES em `src/Product.json`, `src/Blogs.json` e `db/db.json`. Hoje o código já resolve via `resolveLocalized`, mas os JSONs ainda não têm os campos, então o fallback PT-BR é usado em todos os idiomas.
2. **Datas do blog em ISO**: trocar `date: "Jan 10, 2025"` por `2025-01-10` nos 12 itens de `src/Blogs.json` (o `formatLocalizedDate` já está pronto).
3. **Wishlist/Favoritos com ProductSuggestions**: aplicar a grade de sugestões também em Wishlist e Favoritos (hoje só o Cart tem).
4. **MiniCart refresh de salvos**: adicionar listener de `SAVED_UPDATED_EVENT` no MiniCart (hoje só no Nav).
5. **MiniCart "Ver carrinho"**: já adicionado; conferir estilo.
6. **Categorias localizadas no dropdown**: hoje `CATEGORIES[].label` ainda vem do texto PT-BR estático; passar a resolver via `t('category.<slug>')` no Nav e no Shop.
7. **Bloco 3 pendente** (fora do escopo desta rodada): reviews demo no db.json (popular ~14 registros, reconciliar reviewCount), testes de componente para Login/Signup/ProtectedRoute/Nav (Nav já coberto parcialmente), teste de integração de favoritos/salvos, SEO (useDocumentMeta, JSON-LD de Product, meta description + og:* no index.html).
8. **Documentação**: marcar Bloco 2 como concluído em `docs/pending.md`, atualizar `docs/verification.md` com passos manuais novos, documentar `src/i18n/`, `src/components/Nav/NavDrawer.tsx`, `src/components/product/ProductSuggestions.tsx`, `src/lib/saved.ts` e a limitação de preço/moeda no README.md.
9. **Revisar automação de commit** que commita com mensagem genérica `feat: creating repository` (pending.md linha 72).
10. **useCatalog() hook**: expor catálogo localizado por locale (hoje `localProducts` é array estático; a busca/filtro offline casa com o nome base, não o localizado).