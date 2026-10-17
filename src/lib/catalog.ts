import productsData from '../Product.json';
import type { Product } from '../types/product';
import { isProduct, parseCollection } from './runtime';

export interface CategoryOption {
  slug: string;
  label: string;
}

// Static table: slugs are the values stored in db.json and used in `?category=`.
// Labels come from the i18n dictionary via `categoryLabel()`, falling back to these.
export const CATEGORIES: readonly CategoryOption[] = [
  { slug: 'skincare', label: 'Cuidados com a pele' },
  { slug: 'makeup', label: 'Maquiagem' },
  { slug: 'body', label: 'Cuidados com o corpo' },
  { slug: 'hair', label: 'Cabelos' },
];

export function categoryLabel(slug: string): string {
  // Labels are resolved in components through useLanguage; this keeps the slug stable.
  return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}

export const localProducts: Product[] = parseCollection(productsData, isProduct);

export function findLocalProduct(id: number): Product | undefined {
  return localProducts.find((product) => product.id === id);
}

export function localProductsByCategory(slug: string, excludeId?: number): Product[] {
  return localProducts.filter((product) => product.category === slug && product.id !== excludeId);
}

export function filterLocalProducts(products: Product[], query: string, category: string): Product[] {
  const term = query.trim().toLowerCase();
  return products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesQuery = !term || product.ProductName.toLowerCase().includes(term);
    return matchesCategory && matchesQuery;
  });
}