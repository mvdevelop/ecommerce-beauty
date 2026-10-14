# Security policy

## Scope

Blushify is a frontend-only portfolio application. It does not process real payments, store authentication credentials, or send personal data to a backend.

## Reporting

Do not publish sensitive details in a public issue. Report suspected vulnerabilities privately to the repository maintainers with reproduction steps, affected files and impact.

## Development rules

- Never commit `.env` files or secrets.
- `VITE_*` variables are public and must not contain credentials.
- Treat `localStorage`, route parameters and imported data as untrusted input.
- Never enter real payment-card data in the demo checkout.
- Run `npm run check`, `npm run build` and `npm audit --audit-level=high` before release.
- Keep dependencies and GitHub Actions updated.

## Data and privacy

The demo stores cart and wishlist data locally in the browser. Users can remove it by clearing site storage. A production checkout must move payment and personal-data processing to a controlled backend/payment provider with appropriate LGPD and PCI DSS controls.
