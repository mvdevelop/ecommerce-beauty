import type { BlogPost } from '../types/blog';
import type { DemoUser } from '../types/api';
import type { CartItem, Product } from '../types/product';

export function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Product>;
  return typeof item.id === 'number' && typeof item.ProductName === 'string' && typeof item.price === 'string';
}

export function isCartItem(value: unknown): value is CartItem {
  return isProduct(value) && typeof (value as CartItem).quantity === 'number' && (value as CartItem).quantity > 0;
}

export function isBlogPost(value: unknown): value is BlogPost {
  return Boolean(value && typeof value === 'object');
}

export function isDemoUser(value: unknown): value is DemoUser {
  if (!value || typeof value !== 'object') return false;
  const user = value as Partial<DemoUser>;
  return typeof user.id === 'string'
    && typeof user.email === 'string'
    && typeof user.displayName === 'string'
    && (user.role === 'customer' || user.role === 'admin');
}

export function parseCollection<T>(value: unknown, guard: (item: unknown) => item is T): T[] {
  return Array.isArray(value) ? value.filter(guard) : [];
}
