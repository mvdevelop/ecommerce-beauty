import type { CartItem } from '../types/product';
import { parsePrice } from './pricing';
import { getCart, saveCart } from './storage';

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);
}

export function addCartItem(item: CartItem): CartItem[] {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  const next = existing
    ? cart.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + item.quantity } : entry)
    : [...cart, item];
  saveCart(next);
  return next;
}

export function removeCartItem(id: number): CartItem[] {
  const next = getCart().filter((item) => item.id !== id);
  saveCart(next);
  return next;
}

export function updateCartQuantity(id: number, quantity: number): CartItem[] {
  const next = getCart().map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0);
  saveCart(next);
  return next;
}
