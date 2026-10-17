import { useEffect, useState } from 'react';
import { listProducts } from '../../api/client';
import { apiToProduct } from '../../lib/products';
import { localProductsByCategory } from '../../lib/catalog';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../../i18n/LanguageProvider';

const LIMIT = 4;

export default function RelatedProducts({ product, onAddToCart, onToggleWishlist, wishlistedIds }: { product: Product; onAddToCart: (product: Product) => void; onToggleWishlist: (product: Product) => void; wishlistedIds: number[] }) {
  const { t } = useLanguage();
  const category = product.category;
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (!category) { setItems([]); return; }
    const local = localProductsByCategory(category, product.id).slice(0, LIMIT);
    let active = true;
    listProducts({ category, limit: LIMIT + 1 })
      .then((products) => { if (active) setItems(products.map((p) => apiToProduct(p)).filter((item) => item.id !== product.id).slice(0, LIMIT)); })
      .catch(() => { if (active) setItems(local); });
    return () => { active = false; };
  }, [category, product.id]);

  if (!category || items.length === 0) return null;
  return (
    <section className="mt-5" aria-labelledby="related-products">
      <h2 id="related-products">{t('product.relatedTitle')}</h2>
      <div className="row g-4 mt-2">{items.map((item) => <ProductCard key={item.id} product={item} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlisted={wishlistedIds.includes(item.id)} />)}</div>
    </section>
  );
}