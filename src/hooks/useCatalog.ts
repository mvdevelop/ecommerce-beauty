import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { resolveLocalized } from '../i18n/content';
import { localProducts } from '../lib/catalog';
import type { Product } from '../types/product';

export function localizeProduct(product: Product, locale: ReturnType<typeof useLanguage>['locale']): Product {
  const localized = product;
  return {
    ...product,
    ProductName: resolveLocalized(localized.nameI18n, locale, product.ProductName),
    ...(product.description ? { description: resolveLocalized(localized.descriptionI18n, locale, product.description) } : {}),
  };
}

export function useCatalog() {
  const { locale } = useLanguage();
  const products = useMemo(() => localProducts.map((product) => localizeProduct(product, locale)), [locale]);

  const search = (query: string, category = '') => {
    const term = query.trim().toLocaleLowerCase(locale);
    return products.filter((product) => (!category || product.category === category)
      && (!term || `${product.ProductName} ${product.description ?? ''}`.toLocaleLowerCase(locale).includes(term)));
  };

  return { products, search, locale };
}
