import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getCart, getSaved, saveCart } from './storage';
// addCartItem not needed here
import { moveSavedToCart, removeSaved, saveForLater } from './saved';
import type { CartItem } from '../types/product';

const item: CartItem = { id: 7, image: '/p.webp', secondImage: '/p2.webp', ProductName: 'Scrub', price: '$25.00', quantity: 1 };

describe('saved', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('round-trips a saved item', () => {
    saveForLater(item);
    expect(getSaved()).toHaveLength(1);
    expect(getSaved()[0]?.id).toBe(7);
  });

  it('removes a saved item', () => {
    saveForLater(item);
    removeSaved(7);
    expect(getSaved()).toHaveLength(0);
  });

  it('moves a saved item back to the cart', () => {
    saveForLater(item);
    moveSavedToCart(7);
    expect(getSaved()).toHaveLength(0);
    expect(getCart().some((entry) => entry.id === 7)).toBe(true);
  });
});
