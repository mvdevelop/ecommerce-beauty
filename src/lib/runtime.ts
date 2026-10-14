import type { BlogPost } from '../types/blog';
import type { CartItem, Product } from '../types/product';

export function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Product>;
  return typeof item.id === 'number' && Number.isInteger(item.id) && item.id > 0 &&
    typeof item.image === 'string' && typeof item.secondImage === 'string' &&
    typeof item.ProductName === 'string' && item.ProductName.length > 0 &&
    typeof item.price === 'string';
}

export function isCartItem(value: unknown): value is CartItem {
  return isProduct(value) && typeof (value as Partial<CartItem>).quantity === 'number' &&
    Number.isInteger((value as Partial<CartItem>).quantity) &&
    (value as Partial<CartItem>).quantity > 0;
}

export function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== 'object') return false;
  const post = value as Partial<BlogPost>;
  return typeof post.id === 'number' && Number.isInteger(post.id) &&
    typeof post.title === 'string' && post.title.length > 0 &&
    (post.image === undefined || typeof post.image === 'string') &&
    (post.description === undefined || typeof post.description === 'string');
}

export function parseCollection<T>(value: unknown, guard: (item: unknown) => item is T): T[] {
  return Array.isArray(value) ? value.filter(guard) : [];
}
