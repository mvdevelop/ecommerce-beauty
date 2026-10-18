# Verification checklist

Execute from a clean checkout:

```bash
npm ci
npm run no-js
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
```

O gate usa `--omit=dev`: apenas dependências de produção chegam ao bundle. Os advisories residuais do toolchain de desenvolvimento (`vitest`, `tinypool`) estão registrados em [`SECURITY.md`](../SECURITY.md).

Manual smoke test:

1. Open `/` and navigate to `/shop`.
2. Filter and sort products.
3. Add and remove an item from the cart.
4. Add and remove an item from the wishlist.
5. Open an existing product and an invalid `/product/999999` route.
6. Open checkout with an empty and populated cart.
7. Confirm no payment data is persisted in browser storage.
8. Test keyboard navigation and a mobile viewport.
9. Switch between PT-BR, English and Español; verify localized product names, descriptions, blog titles and dates.
10. Test navbar category labels, keyboard autocomplete and localized offline search/filtering.
11. Empty Wishlist and Favorites and confirm product suggestions are displayed.
12. Save an item for later, move it back to the cart, and confirm MiniCart refreshes after the saved-state event.
13. Activate the skip link and verify focus moves to the main content.
