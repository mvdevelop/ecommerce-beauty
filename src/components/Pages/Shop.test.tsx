import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import Shop from './Shop';

function renderShop(route = '/shop') {
  return render(<MemoryRouter initialEntries={[route]}><LanguageProvider><Shop /></LanguageProvider></MemoryRouter>);
}

describe('Shop page', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('falls back to the local catalog when the API is unreachable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    renderShop();
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Shield Conditioner' })).toBeInTheDocument());
    expect(screen.getAllByRole('article').length).toBe(16);
  });

  it('filters the local catalog by category when the API is unreachable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    renderShop('/shop?category=hair');
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Shield Conditioner' })).toBeInTheDocument());
    expect(screen.getAllByRole('article').length).toBe(3);
  });

  it('filters the local catalog by search term when the API is unreachable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    renderShop('/shop?q=serum');
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Calming Face Serum' })).toBeInTheDocument());
    expect(screen.queryByRole('heading', { name: 'Shield Conditioner' })).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    renderShop('/shop?q=nonexistent-product');
    await waitFor(() => expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument());
  });

  it('renders breadcrumbs', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    renderShop();
    expect(screen.getByRole('navigation', { name: 'Trilha de navegação' })).toBeInTheDocument();
  });
});
