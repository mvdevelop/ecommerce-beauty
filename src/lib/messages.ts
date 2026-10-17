// Re-exported for backward compatibility; the canonical microcopy now lives in the
// i18n dictionaries under the `toast.*` keys. Kept as a thin shim so existing
// call sites that still import `MESSAGES` keep working.
import { useLanguage } from '../i18n/LanguageProvider';

export const MESSAGES = new Proxy({} as Record<string, string>, {
  get(_target, prop: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useLanguage();
    const map: Record<string, string> = {
      wishlistAdded: t('toast.wishlistAdded'),
      wishlistExists: t('toast.wishlistExists'),
      wishlistRemoved: t('toast.wishlistRemoved'),
      cartAdded: t('toast.cartAdded'),
      cartExists: t('toast.cartExists'),
      cartRemoved: t('toast.cartRemoved'),
      savedAdded: t('toast.savedAdded'),
      savedMovedToCart: t('toast.savedMovedToCart'),
    };
    return map[prop] ?? prop;
  },
});
