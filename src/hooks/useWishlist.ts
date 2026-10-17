import { useEffect, useState } from 'react';
import { getWishlist, WISHLIST_UPDATED_EVENT } from '../lib/storage';
import type { Product } from '../types/product';

export function useWishlist() {
  const [items, setItems] = useState<Product[]>(getWishlist);

  useEffect(() => {
    const refresh = () => setItems(getWishlist());
    window.addEventListener(WISHLIST_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(WISHLIST_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return items;
}
