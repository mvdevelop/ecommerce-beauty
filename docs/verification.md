# Verification checklist

Execute from a clean checkout:

```bash
npm ci
npm run no-js
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
```

Manual smoke test:

1. Open `/` and navigate to `/shop`.
2. Filter and sort products.
3. Add and remove an item from the cart.
4. Add and remove an item from the wishlist.
5. Open an existing product and an invalid `/product/999999` route.
6. Open checkout with an empty and populated cart.
7. Confirm no payment data is persisted in browser storage.
8. Test keyboard navigation and a mobile viewport.
