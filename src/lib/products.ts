import type { ApiProduct } from '../types/api';
import type { Product } from '../types/product';

export function apiToProduct(product: ApiProduct): Product {
  return {
    id: Number(product.id),
    image: product.image,
    secondImage: product.secondImage ?? product.image,
    ProductName: product.name,
    price: `${product.currency} ${product.price.toFixed(2)}`,
    ...(product.compareAtPrice !== undefined
      ? { oldPrice: `${product.currency} ${product.compareAtPrice.toFixed(2)}` }
      : {}),
    ...(product.tags.includes('New') || product.tags.includes('Sale')
      ? { tag: product.tags.find((tag): tag is 'New' | 'Sale' => tag === 'New' || tag === 'Sale') }
      : {}),
  };
}
