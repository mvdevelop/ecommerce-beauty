import { beforeEach, describe, expect, it } from 'vitest';
import { getCart, getWishlist, saveCart, saveWishlist } from './storage';
import type { Product } from '../types/product';

const product: Product = {
  id: 1,
  image: '/product.webp',
  secondImage: '/product-2.webp',
  ProductName: 'Test product',
  price: '$10.00',
};

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips valid cart items', () => {
    saveCart([{ ...product, quantity: 2 }]);
    expect(getCart()[0]?.quantity).toBe(2);
  });

  it('rejects malformed persisted values', () => {
    localStorage.setItem('cart', '{invalid');
    localStorage.setItem('wishlist', JSON.stringify([{ id: 'bad' }]));
    expect(getCart()).toEqual([]);
    expect(getWishlist()).toEqual([]);
  });

  it('round-trips wishlist products', () => {
    saveWishlist([product]);
    expect(getWishlist()[0]?.ProductName).toBe('Test product');
  });
});
