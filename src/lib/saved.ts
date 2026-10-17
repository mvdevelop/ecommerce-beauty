import { addCartItem } from './cart';
import { getSaved, saveSaved } from './storage';
import type { CartItem } from '../types/product';

export function saveForLater(item: CartItem): CartItem[] {
  const next = [...getSaved().filter((entry) => entry.id !== item.id), item];
  saveSaved(next);
  return next;
}

export function removeSaved(id: number): CartItem[] {
  const next = getSaved().filter((entry) => entry.id !== id);
  saveSaved(next);
  return next;
}

export function moveSavedToCart(id: number): CartItem[] {
  const saved = getSaved();
  const item = saved.find((entry) => entry.id === id);
  if (!item) return saved;
  addCartItem({ ...item, quantity: item.quantity });
  const next = saved.filter((entry) => entry.id !== id);
  saveSaved(next);
  return next;
}