import { isLocale } from './types';
import type { Locale } from './types';
import { DEFAULT_LOCALE } from './types';

export const LOCALE_STORAGE_KEY = 'blushify-locale';

// Storage is untrusted input: validate on read, the same way lib/storage.ts and
// AuthProvider treat localStorage.
export function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(raw) ? raw : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function writeStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable or full; the UI keeps working in memory.
  }
}
