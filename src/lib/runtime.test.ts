import { describe, expect, it } from 'vitest';
import { isCartItem, isProduct, parseCollection } from './runtime';

const product = { id: 1, image: '/a.webp', secondImage: '/b.webp', ProductName: 'Product', price: '$10.00' };

describe('runtime guards', () => {
  it('accepts valid products and cart items', () => {
    expect(isProduct(product)).toBe(true);
    expect(isCartItem({ ...product, quantity: 2 })).toBe(true);
  });

  it('rejects malformed values', () => {
    expect(isProduct({ ...product, id: '1' })).toBe(false);
    expect(isCartItem({ ...product, quantity: 0 })).toBe(false);
  });

  it('filters untrusted collections', () => {
    expect(parseCollection([product, { invalid: true }], isProduct)).toEqual([product]);
  });
});
