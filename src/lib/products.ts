import type { ApiProduct } from '../types/api';
import type { Product, ProductTag } from '../types/product';
import { formatPrice } from './pricing';
import { resolveLocalized } from '../i18n/content';
import type { Locale } from '../i18n/types';

export const TAG_LABELS: Record<ProductTag, string> = { New: 'Novo', Sale: 'Oferta' };

function deriveTag(tags: string[]): ProductTag | undefined {
  const normalized = tags.map((tag) => tag.toLowerCase());
  if (normalized.includes('new')) return 'New';
  if (normalized.includes('sale')) return 'Sale';
  return undefined;
}

export function apiToProduct(product: ApiProduct, locale?: Locale): Product {
  const tag = deriveTag(product.tags);
  const nameI18n = product.nameI18n;
  const descriptionI18n = product.descriptionI18n;
  return {
    id: Number(product.id),
    image: product.image,
    secondImage: product.secondImage ?? product.image,
    ProductName: locale ? resolveLocalized(nameI18n, locale, product.name) : product.name,
    price: formatPrice(product.price),
    ...(product.compareAtPrice !== undefined ? { oldPrice: formatPrice(product.compareAtPrice) } : {}),
    ...(tag ? { tag } : {}),
    category: product.category,
    brand: product.brand,
    rating: product.rating,
    reviewCount: product.reviewCount,
    stock: product.stock,
    description: locale ? resolveLocalized(descriptionI18n, locale, product.description) : product.description,
  };
}