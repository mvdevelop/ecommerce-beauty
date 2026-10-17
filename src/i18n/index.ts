import { ptBR } from './locales/pt-BR';
import { en } from './locales/en';
import { es } from './locales/es';
import type { Locale, Message, TranslationParams } from './types';
import { isLocale, interpolate } from './types';

export { ptBR, en, es };
export type { Locale, Message, TranslationParams } from './types';
export { LOCALES, DEFAULT_LOCALE, isLocale, LOCALE_LABELS, LOCALE_SHORT, defineMessages } from './types';

// Re-exports of the type aliases used by the locales and consumers.
export type TranslationKey = keyof typeof ptBR;
export type Messages = Record<TranslationKey, Message>;

// The locale union of the dictionary map. `satisfies` keeps the index complete.
export const dictionaries = {
  'pt-BR': ptBR,
  en,
  es,
} as const satisfies Record<Locale, Messages>;

/**
 * Resolves a translation key against the active locale, falling back to PT-BR when
 * the entry is missing (defensive — the compiler should prevent that) or the locale
 * itself is unknown.
 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: TranslationParams,
): string {
  const dictionary = dictionaries[locale] ?? dictionaries['pt-BR'];
  const entry: Message | undefined = (dictionary as Record<string, Message>)[key] ?? ptBR[key];
  if (typeof entry === 'function') return entry(params ?? {});
  return interpolate(entry ?? key, params);
}
