import type { ApiProduct } from '../types/api';
import type { Product, ProductTag } from '../types/product';
import { formatPrice } from './pricing';

export const TAG_LABELS: Record<ProductTag, string> = { New: 'Novo', Sale: 'Oferta' };

function deriveTag(tags: string[]): ProductTag | undefined {
  const normalized = tags.map((tag) => tag.toLowerCase());
  if (normalized.includes('new')) return 'New';
  if (normalized.includes('sale')) return 'Sale';
  return undefined;
}

export function apiToProduct(product: ApiProduct): Product {
  const tag = deriveTag(product.tags);
  return {
    id: Number(product.id),
    image: product.image,
    secondImage: product.secondImage ?? product.image,
    ProductName: product.name,
    // formatPrice keeps the API path and the local Product.json fallback showing the
    // same string; the raw currency code would render as "USD 27.00" instead of "$27.00".
    price: formatPrice(product.price),
    ...(product.compareAtPrice !== undefined ? { oldPrice: formatPrice(product.compareAtPrice) } : {}),
    ...(tag ? { tag } : {}),
    category: product.category,
    brand: product.brand,
    rating: product.rating,
    reviewCount: product.reviewCount,
    stock: product.stock,
    description: product.description,
  };
}
