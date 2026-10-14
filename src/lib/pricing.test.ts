import { describe, expect, it } from 'vitest';
import { calculateCartTotal, formatPrice, parsePrice } from './pricing';

describe('pricing', () => {
  it('parses currency values safely', () => {
    expect(parsePrice('$27.00')).toBe(27);
    expect(parsePrice('invalid')).toBe(0);
  });

  it('calculates cart totals with quantities', () => {
    expect(calculateCartTotal([
      { price: '$10.00', quantity: 2 },
      { price: '$5.50', quantity: 1 },
    ])).toBe(25.5);
  });

  it('formats prices consistently', () => {
    expect(formatPrice(12)).toBe('$12.00');
  });
});
