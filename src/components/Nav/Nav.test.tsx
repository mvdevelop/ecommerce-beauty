import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import Nav from './Nav';

describe('Nav', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('renders the hamburger button and opens the drawer', () => {
    renderWithProviders(<Nav />, { route: '/' });
    const button = screen.getByRole('button', { name: /Abrir menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    act(() => button.click());
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: /Menu/i })).toBeInTheDocument();
  });

  it('closes the drawer on Escape', () => {
    renderWithProviders(<Nav />, { route: '/' });
    const btn = screen.getByRole('button', { name: /Abrir menu/i });
    act(() => btn.click());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // dispatch Escape on the document (useDismissable listens on document)
    act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the wishlist counter', () => {
    renderWithProviders(<Nav />, { route: '/' });
    expect(screen.getByLabelText(/Favoritos com 0 itens/)).toBeInTheDocument();
  });
});
