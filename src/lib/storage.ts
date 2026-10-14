import { isCartItem, isProduct, parseCollection } from './runtime';
import type { CartItem, Product } from '../types/product';

export const CART_KEY = 'cart';
export const WISHLIST_KEY = 'wishlist';
export const CART_UPDATED_EVENT = 'cartUpdated';
export const WISHLIST_UPDATED_EVENT = 'wishlistUpdated';
const MAX_ITEMS = 100;
const MAX_QUANTITY = 99;

function readJson(key: string): unknown {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function getCart(): CartItem[] {
  return parseCollection(readJson(CART_KEY), isCartItem)
    .map((item) => ({ ...item, quantity: Math.min(item.quantity, MAX_QUANTITY) }))
    .slice(0, MAX_ITEMS);
}

export function getWishlist(): Product[] {
  return parseCollection(readJson(WISHLIST_KEY), isProduct).slice(0, MAX_ITEMS);
}

function write(key: string, value: unknown, eventName: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(eventName));
  } catch {
    // Storage can be unavailable or full; the UI remains usable in memory.
  }
}

export function saveCart(items: CartItem[]): void {
  write(CART_KEY, items.slice(0, MAX_ITEMS).map((item) => ({ ...item, quantity: Math.min(Math.max(1, Math.floor(item.quantity)), MAX_QUANTITY) })), CART_UPDATED_EVENT);
}

export function saveWishlist(items: Product[]): void {
  write(WISHLIST_KEY, items.slice(0, MAX_ITEMS), WISHLIST_UPDATED_EVENT);
}
