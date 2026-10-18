import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getWishlist, WISHLIST_UPDATED_EVENT } from '../../lib/storage';
import MiniCart from '../cart/MiniCart';
import SearchBox from '../search/SearchBox';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../i18n/LanguageProvider';
import { CATEGORIES } from '../../lib/catalog';
import { useDismissable } from '../../hooks/useDismissable';
import NavDrawer from './NavDrawer';
import LanguageSelect from './LanguageSelect';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('blushify-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  // cartCount is now displayed by MiniCart; Nav only tracks wishlistCount.
  const [wishlistCount, setWishlistCount] = useState(() => getWishlist().length);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const categoriesRef = useDismissable<HTMLDivElement>(categoriesOpen, () => setCategoriesOpen(false));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('blushify-theme', theme);
  }, [theme]);

  useEffect(() => {
    const refresh = () => { setWishlistCount(getWishlist().length); };
    window.addEventListener(WISHLIST_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(WISHLIST_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => setCategoriesOpen(false), [location.pathname, location.search]);
  useEffect(() => setDrawerOpen(false), [location.pathname, location.search]);

  const activeCategory = new URLSearchParams(location.search).get('category');
  const selectCategory = (slug: string) => {
    navigate(slug ? `/shop?category=${encodeURIComponent(slug)}` : '/shop');
    setCategoriesOpen(false);
  };

  return (
    <>
      <nav className="navbar site-nav" aria-label={t('a11y.principalNavigation')}>
        <div className="container gap-3 site-nav__inner">
          <Link className="navbar-brand" to="/">{t('common.brand')}</Link>
          <SearchBox />
          <div className="nav-actions d-flex align-items-center gap-3">
            <div className="nav-categories" ref={categoriesRef}>
              <button type="button" className="nav-categories__trigger" aria-haspopup="true" aria-expanded={categoriesOpen} aria-controls="nav-categories-menu" onClick={() => setCategoriesOpen((open) => !open)}>
                {t('nav.categories')} <span aria-hidden="true">▾</span>
              </button>
              {categoriesOpen && (
                <ul className="nav-categories__menu" id="nav-categories-menu">
                  <li><button type="button" onClick={() => selectCategory('')}>{t('nav.allCategories')}</button></li>
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <button type="button" aria-current={activeCategory === category.slug ? 'page' : undefined} onClick={() => selectCategory(category.slug)}>
                        {t(`category.${category.slug}` as 'category.skincare')}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link to="/shop">{t('common.shop')}</Link>
            <Link to="/wishlist" aria-label={t('nav.wishlistAria', { count: wishlistCount })} className="nav-icon">
              <span aria-hidden="true">♡</span> <span className="nav-count">{wishlistCount}</span>
            </Link>
            <MiniCart />
            {user ? (
              <>
                <Link to="/account" aria-label={t('nav.account')}>{t('nav.greeting', { name: user.displayName })}</Link>
                <button type="button" className="btn btn-link p-0" onClick={logout}>{t('nav.logout')}</button>
              </>
            ) : (
              <>
                <Link to="/login">{t('nav.login')}</Link>
                <Link to="/signup">{t('nav.signup')}</Link>
              </>
            )}
            <button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? t('nav.themeToDark') : t('nav.themeToLight')}>
              {theme === 'light' ? '☾' : '☀'}
            </button>
            <LanguageSelect compact />
            <button type="button" className="nav-hamburger" aria-expanded={drawerOpen} aria-controls="nav-drawer" aria-label={drawerOpen ? t('nav.closeMenu') : t('nav.openMenu')} onClick={() => setDrawerOpen((open) => !open)}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
