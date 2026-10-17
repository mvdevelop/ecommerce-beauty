// Core i18n types and constants. Kept dependency-free on purpose: the project ships
// without an i18n library, so the dictionaries are plain typed TS modules.

export const LOCALES = ['pt-BR', 'en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

// PT-BR is the source of truth: it defines the key set and the copy every other
// locale is measured against.
export const DEFAULT_LOCALE: Locale = 'pt-BR';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  'pt-BR': 'Português',
  en: 'English',
  es: 'Español',
};

// Short form shown by the compact selector in the navbar.
export const LOCALE_SHORT: Record<Locale, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
};

export type TranslationParams = Record<string, string | number>;

// A message is either a plain string (with optional `{placeholder}` slots) or a
// function for entries that need logic — plurals, mostly. Latin-language plurals in
// PT-BR/EN/ES all follow the same one/other CLDR rule, so the decision fits inside the
// message itself and no plural engine is needed.
export type Message = string | ((params: TranslationParams) => string);

/**
 * Identity helper that gives every message the contextual `Message` type (so arrow
 * functions infer their params) while preserving the exact key union of the object
 * literal, which is what makes `TranslationKey` safe.
 */
export function defineMessages<T extends Record<string, Message>>(messages: T): T {
  return messages;
}

/** Replaces `{name}` slots in a message string. Unknown slots are left untouched. */
export function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}
