# Pendências

## Concluído

### Infra / dependências
- `swiper`, `react-bootstrap` e `bootstrap` removidos (nunca eram importados; o Bootstrap vem por CDN). O `swiper` carregava uma CVE crítica.
- `npm audit fix` aplicado: 22 advisories → 4, e nenhum atinge o bundle (o gate usa `--omit=dev`).
- Gate do CI trocado para `npm audit --omit=dev --audit-level=high`, com o residual de dev documentado em `SECURITY.md`.
- `index.html`: removidos os 3 CSS de ícones (remixicon, font-awesome, bootstrap-icons) e o bundle JS do Bootstrap — nenhuma classe de ícone nem `data-bs-*` era usada. O favicon passou a usar o arquivo local `/images/icon.png` no lugar da URL externa do flaticon.
- As 16 descrições de produto no `db.json` traduzidas para PT-BR.

### Bloco 1 — Descoberta comercial
- `src/lib/catalog.ts`: fonte única do catálogo local (categorias, `localProducts`, busca/filtro offline).
- `ProductCard` compartilhado + `product.css` (regras `.product-card*` movidas de `home.css`), com badge Novo/Oferta e preço antigo riscado. Usado em Home, Shop, Wishlist, Favoritos e relacionados.
- Dropdown "Categorias" na navbar (com `aria-expanded`/`aria-controls`, fecha por Escape e clique fora) e um `<select>` nativo de categoria.
- Autocomplete na busca (`SearchBox`) com ARIA de combobox, navegação por ↑/↓/Enter/Escape.
- Breadcrumbs em Shop e no PDP.
- Produtos relacionados no PDP, por categoria.
- `src/lib/messages.ts`: microcopy de toast centralizada em PT-BR.
- Removido `src/components/Pages/Search.tsx` (código morto, nunca importado).
- `id="campaign-heading"` duplicado corrigido em `PromoBannerSection`.

### Correções de bugs pré-existentes encontrados no caminho
- **`api/client.ts` não funcionava com o `json-server` v1 instalado.** Usava `name_like` e `_limit` (sintaxe v0) e não desembrulhava o envelope paginado. Efeito: **com a API ligada o Shop sempre caía no fallback local** e a busca/filtro não filtravam nada. Corrigido para `name:contains` / `_per_page` + desembrulho de `{ data: [...] }`.
- **O PDP estava quebrado em produção.** Sem `VITE_API_URL`, `API_URL` resolve para `''`, o `fetch` bate na origem e o `vercel.json` devolve o `index.html`; o `response.json()` lança e a página mostrava "Product not found" para os 16 produtos. Agora há fallback para o `Product.json` via um view model que tolera campos ausentes.
- **Fallback offline do Shop ignorava os filtros** (`setProducts(localProducts)` sem filtrar). Agora filtra por `q` e `category` pela mesma via.
- **Preço divergia entre API e fallback**: `apiToProduct` gerava `"USD 27.00"` e o `Product.json` tinha `"$27.00"`. Unificado em `formatPrice` (`$27.00`).
- **Divergência de catálogo nos ids 12–16**: `Product.json` e `db.json` descreviam produtos diferentes (nome e preço). `Product.json` alinhado ao `db.json` (0 divergências verificadas).

### Testes
- `matchMedia` polyfill em `src/test-setup.ts` (o `Nav` o lê sem guarda).
- `ProductCard.test.tsx` (6), `Shop.test.tsx` (5, cobrindo o filtro offline) e `client.test.ts` ampliado (3). **26 testes no total**, todos verdes.

---

## Próximos incrementos

### Verificação do Bloco 1 (pendente — sem automação de navegador no ambiente)
Não houve verificação visual. Conferir manualmente em `npm run api` + `npm run dev`:
1. Se a navbar ficou sobrecarregada: hoje convivem dropdown "Categorias", `<select>` de categoria, Loja, Favoritos, MiniCart, Carrinho, conta e tema. **Avaliar remover o `<select>` nativo** — ele foi mantido justamente para esta decisão.
2. Layout mobile com a navbar mais alta.
3. Posicionamento do dropdown de autocomplete sobre o conteúdo.
4. Dark mode nos componentes novos (badges, dropdown, sugestões, breadcrumbs).
5. Relacionados e breadcrumbs no PDP.

### Bloco 2 — UX e confiança
- **Skip link**: `<a className="skip-link" href="#main-content">Pular para o conteúdo</a>` antes do `AnnouncementBar`, e envolver o `<Routes>` em `<div id="main-content" tabIndex={-1}>` (decidido: um alvo no nível do `App`, não editar os 25 `<main>` em 22 arquivos). Requer `#main-content { scroll-margin-top: 5rem }` (navbar é sticky) e `#main-content:focus { outline: none }` (a regra global `*:focus-visible` desenharia contorno na página toda).
- **Ids ainda colidíveis**: `Modal.tsx` fixa `id="ui-modal-title"` e `MiniCart.tsx` fixa `id="mini-cart-title"` — trocar por `useId()`.
- **Estados vazios com sugestões de produtos**: `Shop`, `Wishlist` e `Favoritos` já têm estado vazio, mas sem grade de sugestões. Falta criar um `ProductSuggestions` e aplicar em **Cart** (ainda sem estado vazio), Wishlist e Favoritos.
- **`ErrorState`** (hoje sem uso) nos pontos onde a API falha em silêncio: `Shop` e `Orders`.
- **Save for later**: `SAVED_KEY`/`SAVED_UPDATED_EVENT` + `getSaved`/`saveSaved` em `storage.ts` (reusando `isCartItem`), um `lib/saved.ts` no molde de `lib/cart.ts`, UI no `Cart`, e os listeners de refresh no `Nav`/`MiniCart`.
- **Varredura PT-BR restante** (as demais páginas já foram traduzidas): `Cart.tsx`, `Checkout.tsx`, `Orders.tsx`, `MiniCart.tsx`, `AnnouncementBar.tsx`, `ProtectedRoute.tsx` ("Loading account…") e o `h1` de `Blog.tsx` ("Beauty journal"). Também falta um mapa `OrderStatus → PT-BR` em `Orders`.

### Bloco 3 — Infra / qualidade
- **Reviews demo no `db.json`**: a coleção `reviews` está vazia, mas os produtos anunciam `reviewCount` de 37 a 120 — o PDP sempre mostra "nenhuma avaliação". Popular com ~14 registros (`status: 'published'` e um `'pending'`, `demo: true`, `productId` como string) e reconciliar o `reviewCount` de cada produto. O PDP já filtra por `status === 'published'`.
- **Testes de componente** para `Login`, `Signup`, `ProtectedRoute` e `Nav` (envolver com `MemoryRouter` + `AuthProvider`; `useAuth` lança fora do provider).
- **Teste de integração** de sincronização de favoritos/salvos entre `useWishlist`, `Favoritos` e o contador do `Nav`.
- **SEO**: hook `useDocumentMeta` (sem dependência nova), JSON-LD de `Product` no PDP, e meta description + `og:*` no `index.html`.

### Documentação
- Marcar o Bloco 1 como concluído aqui.
- `docs/verification.md`: incluir os novos passos manuais (categorias, autocomplete por teclado, skip link, save for later, estados vazios).
- `README.md`: documentar `src/lib/catalog.ts`, `src/lib/saved.ts`, `src/components/product/` e `src/components/search/`.
- `README.md` ainda descreve `src/components/Pages/Search.tsx` e o `src/Product.json` como fontes — revisar após o Bloco 2.

---

## Notas CI
- Gate de auditoria agora é `npm audit --omit=dev --audit-level=high`. Residual conhecido: `vitest`, `tinypool`, `@vitest/mocker` e `@vitest/coverage-v8` (2 críticos, 2 moderados), cujo fix exige o major **vitest 5.x**. São devDependencies: não vão para o bundle nem rodam em produção. Registrado em `SECURITY.md`.
- Erro git exit code 128 pode ocorrer por questões específicas do runner; com as melhorias de diagnóstico será mais fácil identificar a causa nos logs do Actions.
- `db.json` e `Product.json` alinhados com os 16 produtos (verificado: 0 divergências de nome/preço/categoria).
- **Atenção**: há um processo externo commitando automaticamente as alterações com a mensagem genérica `feat: creating repository`. Os incrementos 0 e 1 foram capturados em `14d6bfc`, `1ca1b0e` e `49c3825` dessa forma. Vale revisar essa automação: ela agrupa mudanças não relacionadas e não descreve o que mudou.
