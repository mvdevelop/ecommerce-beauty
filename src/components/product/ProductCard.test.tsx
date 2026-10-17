import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product';

const product: Product = { id: 7, image: '/images/p.webp', secondImage: '/images/p2.webp', ProductName: 'Exfoliating Scrub', price: '$25.00', oldPrice: '$30.00', tag: 'Sale', category: 'skincare' };

function renderCard(props: Partial<Parameters<typeof ProductCard>[0]> = {}) {
  return render(<MemoryRouter><LanguageProvider><ProductCard product={product} {...props} /></LanguageProvider></MemoryRouter>);
}

describe('ProductCard', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('renders the name, price and struck-through old price', () => {
    renderCard();
    expect(screen.getByRole('heading', { name: 'Exfoliating Scrub' })).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
    expect(screen.getByText('$30.00').tagName).toBe('S');
  });

  it('translates the sale badge to Portuguese', () => {
    renderCard();
    expect(screen.getByText('Oferta')).toBeInTheDocument();
  });

  it('links the card to the product route', () => {
    renderCard();
    expect(screen.getByRole('link', { name: /Exfoliating Scrub/ })).toHaveAttribute('href', '/product/7');
  });

  it('renders only the actions that were provided', () => {
    renderCard({ onAddToCart: () => {} });
    expect(screen.getByRole('button', { name: /ao carrinho/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /favoritos/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Remover' })).not.toBeInTheDocument();
  });

  it('reflects the wishlisted state through aria-pressed', () => {
    renderCard({ onToggleWishlist: () => {}, wishlisted: true });
    const button = screen.getByRole('button', { name: /Remover Exfoliating Scrub dos favoritos/ });
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls the handlers with the product', () => {
    const onAddToCart = vi.fn();
    const onToggleWishlist = vi.fn();
    renderCard({ onAddToCart, onToggleWishlist });
    screen.getByRole('button', { name: /ao carrinho/ }).click();
    screen.getByRole('button', { name: /favoritos/ }).click();
    expect(onAddToCart).toHaveBeenCalledWith(product);
    expect(onToggleWishlist).toHaveBeenCalledWith(product);
  });
});
