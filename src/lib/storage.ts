import type { CartItem, Product } from '../types/product';

export const CART_KEY = 'cart';
export const WISHLIST_KEY = 'wishlist';
export const CART_UPDATED_EVENT = 'cartUpdated';
export const WISHLIST_UPDATED_EVENT = 'wishlistUpdated';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getCart(): CartItem[] {
  const value = readJson<unknown>(CART_KEY, []);
  if (!Array.isArray(value)) return [];
  return value.filter(isCartItem);
}

export function getWishlist(): Product[] {
  const value = readJson<unknown>(WISHLIST_KEY, []);
  if (!Array.isArray(value)) return [];
  return value.filter(isProduct);
}

export function saveCart(items: CartItem[]): void {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function saveWishlist(items: Product[]): void {
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Product>;
  return typeof item.id === 'number' && typeof item.ProductName === 'string' &&
    typeof item.price === 'string' && typeof item.image === 'string' && typeof item.secondImage === 'string';
}

function isCartItem(value: unknown): value is CartItem {
  return isProduct(value) && typeof (value as Partial<CartItem>).quantity === 'number' &&
    Number.isInteger((value as Partial<CartItem>).quantity) && (value as Partial<CartItem>).quantity > 0;
}
