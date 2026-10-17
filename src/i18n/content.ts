import type { Locale } from './types';
import { DEFAULT_LOCALE } from './types';

// Fields added to the JSON catalogues (Product.json / Blogs.json / db.json) so the
// existing base fields (`ProductName`, `description`, `name`, `title`) keep working as
// the PT-BR fallback. The shape is additive on purpose: `isProduct`/`isCartItem` only
// validate the base fields, so older localStorage snapshots keep validating.
export type LocalizedText = Partial<Record<Locale, string>>;

export function resolveLocalized(
  localized: LocalizedText | undefined,
  locale: Locale,
  fallback: string,
): string {
  if (!localized) return fallback;
  const direct = localized[locale];
  if (typeof direct === 'string' && direct.trim() !== '') return direct;
  const base = localized[DEFAULT_LOCALE];
  if (typeof base === 'string' && base.trim() !== '') return base;
  return fallback;
}

// ISO date → locale-formatted string (e.g. "10 de jan. de 2025"). Uses the platform's
// Intl, no extra dependency.
export function formatLocalizedDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
