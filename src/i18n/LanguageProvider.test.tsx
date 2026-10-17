import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageProvider';
import { LOCALE_STORAGE_KEY, readStoredLocale } from './storage';

function Probe() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="value">{t('common.brand')}</span>
      <button type="button" onClick={() => setLocale('en')}>switch</button>
    </div>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    document.documentElement.lang = 'pt-BR';
  });

  it('defaults to PT-BR when nothing is stored', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Probe />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('reads a valid locale from storage', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'es');
    expect(readStoredLocale()).toBe('es');
  });

  it('falls back to PT-BR for an invalid stored locale', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'fr');
    expect(readStoredLocale()).toBe('pt-BR');
  });

  it('switches locale, persists and updates <html lang>', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Probe />
        </LanguageProvider>
      </MemoryRouter>,
    );
    act(() => screen.getByRole('button', { name: 'switch' }).click());
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
