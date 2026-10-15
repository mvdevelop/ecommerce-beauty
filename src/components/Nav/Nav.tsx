import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCart, getWishlist, CART_UPDATED_EVENT, WISHLIST_UPDATED_EVENT } from '../../lib/storage';
import MiniCart from '../cart/MiniCart';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('blushify-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(() => getCart().length);
  const [wishlistCount, setWishlistCount] = useState(() => getWishlist().length);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('q') ?? '');

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

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : '/shop');
  };

  return (
    <nav className="navbar navbar-expand-lg site-nav" aria-label="Main navigation">
      <div className="container gap-3">
        <Link className="navbar-brand" to="/">Blushify</Link>
        <form className="nav-search flex-grow-1" role="search" onSubmit={submitSearch}>
          <label className="visually-hidden" htmlFor="site-search">Search products</label>
          <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skincare, makeup..." />
          <button type="submit" aria-label="Submit search">⌕</button>
        </form>
        <div className="nav-actions d-flex align-items-center gap-3">
          <Link to="/shop">Shop</Link>
          <Link to="/wishlist" aria-label={`Wishlist with ${wishlistCount} items`}>♡ {wishlistCount}</Link>
          <Link to="/cart" aria-label={`Cart with ${cartCount} items`}>🛒 {cartCount}</Link><MiniCart />
          <Link to="/account" aria-label="Your account">◯</Link>
          <button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </div>
    </nav>
  );
}
