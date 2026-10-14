import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, getWishlist, CART_UPDATED_EVENT, WISHLIST_UPDATED_EVENT } from '../../lib/storage';

export default function Nav() {
  const [cartCount, setCartCount] = useState(() => getCart().length);
  const [wishlistCount, setWishlistCount] = useState(() => getWishlist().length);

  useEffect(() => {
    const refresh = () => {
      setCartCount(getCart().length);
      setWishlistCount(getWishlist().length);
    };
    window.addEventListener(CART_UPDATED_EVENT, refresh);
    window.addEventListener(WISHLIST_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refresh);
      window.removeEventListener(WISHLIST_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return <nav className="navbar navbar-expand-lg" aria-label="Main navigation">
    <div className="container">
      <Link className="navbar-brand" to="/">Blushify</Link>
      <div className="d-flex gap-3">
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist" aria-label={`Wishlist with ${wishlistCount} items`}>Wishlist ({wishlistCount})</Link>
        <Link to="/cart" aria-label={`Cart with ${cartCount} items`}>Cart ({cartCount})</Link>
      </div>
    </div>
  </nav>;
}
