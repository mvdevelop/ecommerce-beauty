import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listProducts } from '../../api/client';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import { parsePrice } from '../../lib/pricing';
import { CATEGORIES, filterLocalProducts } from '../../lib/catalog';
import { useCatalog } from '../../hooks/useCatalog';
import { apiToProduct } from '../../lib/products';
import { MESSAGES } from '../../lib/messages';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { ProductCard } from '../product/ProductCard';
import { EmptyState, ErrorState } from '../ui/Primitives';
import { useLanguage } from '../../i18n/LanguageProvider';
// resolveLocalized available via i18n/content if needed
import type { Product } from '../../types/product';

type SortOption = 'featured' | 'low' | 'high';

export default function Shop() {
  const { t, locale } = useLanguage();
  const { products: catalogProducts } = useCatalog();
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(catalogProducts);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [wishlistIds, setWishlistIds] = useState(() => getWishlist().map((item) => item.id));
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const sort = (params.get('sort') as SortOption | null) ?? 'featured';
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);
  const pageSize = 12;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setFailed(false);
    listProducts({ q: query || undefined, category: category || undefined, page, limit: pageSize })
      .then((items) => { if (active) setProducts(items.map((item) => apiToProduct(item, locale))); })
      .catch(() => {
        if (active) {
          setProducts(filterLocalProducts(catalogProducts, query, category));
          setFailed(true);
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query, category, page, catalogProducts, locale]);

  useEffect(() => { setWishlistIds(getWishlist().map((item) => item.id)); }, [products]);

  const displayed = useMemo(() => [...products].sort((a, b) => sort === 'low' ? parsePrice(a.price) - parsePrice(b.price) : sort === 'high' ? parsePrice(b.price) - parsePrice(a.price) : 0), [products, sort]);
  const change = (key: string, value: string) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); setParams(next); };
  const clearFilters = () => setParams(new URLSearchParams());
  const addToWishlist = (product: Product) => { const wishlist = getWishlist(); if (wishlist.some((item) => item.id === product.id)) { toast.info(MESSAGES.wishlistExists); return; } saveWishlist([...wishlist, product]); setWishlistIds(getWishlist().map((item) => item.id)); toast.success(MESSAGES.wishlistAdded); };
  const addToCart = (product: Product) => { const cart = getCart(); if (cart.some((item) => item.id === product.id)) { toast.info(MESSAGES.cartExists); return; } saveCart([...cart, { ...product, quantity: 1 }]); toast.success(MESSAGES.cartAdded); };
  const hasFilters = Boolean(query || category || sort !== 'featured');
  return (
    <>
      <main className="container py-5">
        <Breadcrumbs items={[{ label: t('common.home'), to: '/' }, { label: t('common.shop') }]} />
        <p className="eyebrow">{t('shop.eyebrow')}</p>
        <h1>{t('shop.title')}</h1>
        <div className="d-flex flex-wrap gap-3 align-items-end my-4">
          <label className="flex-grow-1">{t('shop.search')}<input className="form-control" value={query} onChange={(event) => change('q', event.target.value)} placeholder={t('shop.searchPlaceholder')} /></label>
          <label>{t('shop.category')}<select className="form-select" value={category} onChange={(event) => change('category', event.target.value)}><option value="">{t('shop.allCategories')}</option>{CATEGORIES.map((item) => <option key={item.slug} value={item.slug}>{t(`category.${item.slug}` as 'category.skincare')}</option>)}</select></label>
          <label>{t('shop.sort')}<select className="form-select" value={sort} onChange={(event) => change('sort', event.target.value)}><option value="featured">{t('shop.sortFeatured')}</option><option value="low">{t('shop.sortLow')}</option><option value="high">{t('shop.sortHigh')}</option></select></label>
        </div>
        {loading && <p aria-live="polite">{t('shop.loading')}</p>}
        {failed && !loading && <ErrorState title={t('shop.offlineTitle')} description={t('shop.offlineDescription')} />}
        {!loading && displayed.length === 0 && <EmptyState title={t('shop.emptyTitle')} description={t('shop.emptyDescription')}>{hasFilters && <button className="btn" type="button" onClick={clearFilters}>{t('shop.clearFilters')}</button>}</EmptyState>}
        <section aria-labelledby="shop-results">
          <h2 id="shop-results" className="visually-hidden">{t('shop.results')}</h2>
          <div className="row g-4">{displayed.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} onAddToCart={addToCart} onToggleWishlist={addToWishlist} wishlisted={wishlistIds.includes(product.id)} />)}</div>
        </section>
        {displayed.length > 0 && <nav className="d-flex justify-content-center gap-2 mt-5" aria-label={t('shop.pagination')}><button className="btn btn-outline-secondary" disabled={page <= 1} onClick={() => change('page', String(page - 1))} type="button">{t('shop.previous')}</button><span className="px-3 py-2">{t('shop.page', { page })}</span><button className="btn btn-outline-secondary" disabled={displayed.length < pageSize} onClick={() => change('page', String(page + 1))} type="button">{t('shop.next')}</button></nav>}
        <p className="mt-4"><Link to="/">{t('common.backHome')}</Link></p>
      </main>
      <ToastContainer />
    </>
  );
}