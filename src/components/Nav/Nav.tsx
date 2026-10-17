import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCart, getWishlist, CART_UPDATED_EVENT, WISHLIST_UPDATED_EVENT } from '../../lib/storage';
import MiniCart from '../cart/MiniCart';
import SearchBox from '../search/SearchBox';
import { useAuth } from '../../auth/AuthProvider';
import { CATEGORIES } from '../../lib/catalog';
import { useDismissable } from '../../hooks/useDismissable';

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
  const [cartCount, setCartCount] = useState(() => getCart().length);
  const [wishlistCount, setWishlistCount] = useState(() => getWishlist().length);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useDismissable<HTMLDivElement>(categoriesOpen, () => setCategoriesOpen(false));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('blushify-theme', theme);
  }, [theme]);

  useEffect(() => {
    const refresh = () => { setCartCount(getCart().length); setWishlistCount(getWishlist().length); };
    window.addEventListener(CART_UPDATED_EVENT, refresh);
    window.addEventListener(WISHLIST_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refresh);
      window.removeEventListener(WISHLIST_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Any navigation closes the dropdown so it does not linger over the new page.
  useEffect(() => setCategoriesOpen(false), [location.pathname, location.search]);

  const activeCategory = new URLSearchParams(location.search).get('category');
  const selectCategory = (event: FormEvent<HTMLSelectElement>) => {
    const slug = event.currentTarget.value;
    navigate(slug ? `/shop?category=${encodeURIComponent(slug)}` : '/shop');
  };

  return (
    <nav className="navbar navbar-expand-lg site-nav" aria-label="Navegação principal">
      <div className="container gap-3">
        <Link className="navbar-brand" to="/">Blushify</Link>
        <SearchBox />
        <div className="nav-actions d-flex align-items-center gap-3">
          <div className="nav-categories" ref={categoriesRef}>
            <button type="button" className="nav-categories__trigger" aria-haspopup="true" aria-expanded={categoriesOpen} aria-controls="nav-categories-menu" onClick={() => setCategoriesOpen((open) => !open)}>Categorias <span aria-hidden="true">▾</span></button>
            {categoriesOpen && <ul className="nav-categories__menu" id="nav-categories-menu">{CATEGORIES.map((category) => <li key={category.slug}><Link to={`/shop?category=${category.slug}`} aria-current={activeCategory === category.slug ? 'page' : undefined}>{category.label}</Link></li>)}</ul>}
          </div>
          <label className="visually-hidden" htmlFor="nav-category-select">Categoria</label>
          <select id="nav-category-select" className="nav-category-select form-select form-select-sm" value={activeCategory ?? ''} onChange={selectCategory}><option value="">Todas</option>{CATEGORIES.map((category) => <option key={category.slug} value={category.slug}>{category.label}</option>)}</select>
          <Link to="/shop">Loja</Link>
          <Link to="/wishlist" aria-label={`Favoritos com ${wishlistCount} itens`}>♡ {wishlistCount}</Link>
          <MiniCart />
          <Link to="/cart" aria-label={`Carrinho com ${cartCount} itens`}>Carrinho ({cartCount})</Link>
          {user ? <><Link to="/account" aria-label="Minha conta">Olá, {user.displayName}</Link><button type="button" className="btn btn-link p-0" onClick={logout}>Sair</button></> : <><Link to="/login">Entrar</Link><Link to="/signup">Criar conta</Link></>}
          <button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Alternar para o modo ${theme === 'light' ? 'escuro' : 'claro'}`}>
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </div>
    </nav>
  );
}
