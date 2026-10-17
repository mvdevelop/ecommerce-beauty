import { useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';
import LanguageSelect from './LanguageSelect';
import { CATEGORIES } from '../../lib/catalog';
import { useDismissable } from '../../hooks/useDismissable';

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function NavDrawer({ open, onClose }: NavDrawerProps) {
  const titleId = useId();
  const panelRef = useDismissable<HTMLDivElement>(open, onClose);
  // (location handling lives in the parent Nav)
  const { t } = useLanguage();
  // (no trigger ref needed; focus is restored to the previously focused element)

  // Close on navigation, mirroring the existing category dropdown behaviour.
  // Intentionally no auto-close on location change here: the parent Nav closes the
  // drawer itself via its own effect, and closing inside this effect would make the
  // drawer impossible to open in jsdom (location is stable but the effect runs once).
  // (kept for parity with the category dropdown, which closes on navigation)

  // Move focus into the drawer when it opens, and back to the trigger when it closes.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      previouslyFocused?.focus?.();
    };
  }, [open, panelRef]);

  if (!open) return null;

  return (
    <div className="nav-drawer-backdrop" role="presentation" onClick={onClose}>
      <aside
        ref={panelRef}
        id="nav-drawer"
        className="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="nav-drawer__header">
          <h2 id={titleId}>{t('nav.menu')}</h2>
          <button type="button" className="nav-drawer__close" aria-label={t('nav.closeMenu')} onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="nav-drawer__section" aria-label={t('nav.categories')}>
          <p className="nav-drawer__label">{t('nav.categories')}</p>
          <ul>
            <li>
              <Link to="/shop" onClick={onClose}>
                {t('shop.allCategories')}
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link to={`/shop?category=${category.slug}`} onClick={onClose}>
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="nav-drawer__section" aria-label={t('common.shop')}>
          <Link to="/shop" onClick={onClose}>
            {t('common.shop')}
          </Link>
        </nav>

        <div className="nav-drawer__section">
          <LanguageSelect onPick={onClose} />
        </div>
      </aside>
    </div>
  );
}
