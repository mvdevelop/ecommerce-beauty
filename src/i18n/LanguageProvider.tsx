import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readStoredLocale, writeStoredLocale } from './storage';
import { translate } from './index';
import type { Locale, TranslationKey, TranslationParams } from './index';

// Re-export the storage helpers' key name for callers that need it (tests).
export { LOCALE_STORAGE_KEY } from './storage';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
    writeStoredLocale(locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale: setLocaleState,
    t: (key, params) => translate(locale, key, params),
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
