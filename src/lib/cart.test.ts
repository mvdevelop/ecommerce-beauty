import { beforeEach, describe, expect, it } from 'vitest';
import { addCartItem, cartSubtotal, removeCartItem, updateCartQuantity } from './cart';
import { getCart } from './storage';

const item = { id: 1, image: '/item.webp', secondImage: '/item-2.webp', ProductName: 'Test', price: '$10.00', quantity: 1 };

describe('cart domain', () => {
  beforeEach(() => localStorage.clear());
  it('calculates subtotal from quantities', () => expect(cartSubtotal([{ ...item, quantity: 2 }])).toBe(20));
  it('merges duplicate items', () => { addCartItem(item); addCartItem({ ...item, quantity: 2 }); expect(getCart()[0]?.quantity).toBe(3); });
  it('updates and removes items', () => { addCartItem(item); updateCartQuantity(1, 4); expect(getCart()[0]?.quantity).toBe(4); removeCartItem(1); expect(getCart()).toEqual([]); });
});
