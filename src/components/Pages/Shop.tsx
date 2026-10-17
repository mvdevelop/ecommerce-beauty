import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listProducts } from '../../api/client';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import { parsePrice } from '../../lib/pricing';
import { CATEGORIES, filterLocalProducts, localProducts } from '../../lib/catalog';
import { apiToProduct } from '../../lib/products';
import { MESSAGES } from '../../lib/messages';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { ProductCard } from '../product/ProductCard';
import { EmptyState } from '../ui/Primitives';
import type { Product } from '../../types/product';

type SortOption = 'featured' | 'low' | 'high';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState(() => getWishlist().map((item) => item.id));
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const sort = (params.get('sort') as SortOption | null) ?? 'featured';
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);
  const pageSize = 12;

  useEffect(() => {
    let active = true;
    setLoading(true);
    listProducts({ q: query || undefined, category: category || undefined, page, limit: pageSize })
      .then((items) => { if (active) setProducts(items.map(apiToProduct)); })
      // Offline fallback must apply the same filters the UI is showing, otherwise the
      // visible query and category would silently do nothing.
      .catch(() => { if (active) setProducts(filterLocalProducts(localProducts, query, category)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query, category, page]);

  useEffect(() => { setWishlistIds(getWishlist().map((item) => item.id)); }, [products]);

  const displayed = useMemo(() => [...products].sort((a, b) => sort === 'low' ? parsePrice(a.price) - parsePrice(b.price) : sort === 'high' ? parsePrice(b.price) - parsePrice(a.price) : 0), [products, sort]);
  const change = (key: string, value: string) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); setParams(next); };
  const clearFilters = () => setParams(new URLSearchParams());
  const addToWishlist = (product: Product) => { const wishlist = getWishlist(); if (wishlist.some((item) => item.id === product.id)) { toast.info(MESSAGES.wishlistExists); return; } saveWishlist([...wishlist, product]); setWishlistIds(getWishlist().map((item) => item.id)); toast.success(MESSAGES.wishlistAdded); };
  const addToCart = (product: Product) => { const cart = getCart(); if (cart.some((item) => item.id === product.id)) { toast.info(MESSAGES.cartExists); return; } saveCart([...cart, { ...product, quantity: 1 }]); toast.success(MESSAGES.cartAdded); };
  const hasFilters = Boolean(query || category || sort !== 'featured');
  return <><main className="container py-5"><Breadcrumbs items={[{ label: 'Início', to: '/' }, { label: 'Loja' }]} /><p className="eyebrow">A coleção</p><h1>Descubra essenciais de beleza</h1><div className="d-flex flex-wrap gap-3 align-items-end my-4"><label className="flex-grow-1">Buscar<input className="form-control" value={query} onChange={(event) => change('q', event.target.value)} placeholder="Buscar produtos" /></label><label>Categoria<select className="form-select" value={category} onChange={(event) => change('category', event.target.value)}><option value="">Todas as categorias</option>{CATEGORIES.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></label><label>Ordenar<select className="form-select" value={sort} onChange={(event) => change('sort', event.target.value)}><option value="featured">Destaques</option><option value="low">Preço: menor para maior</option><option value="high">Preço: maior para menor</option></select></label></div>{loading && <p aria-live="polite">Carregando produtos…</p>}{!loading && displayed.length === 0 && <EmptyState title="Nenhum produto encontrado" description="Não encontramos produtos para os filtros selecionados. Tente outro termo ou explore uma categoria.">{hasFilters && <button className="btn" type="button" onClick={clearFilters}>Limpar filtros</button>}</EmptyState>}<section aria-labelledby="shop-results"><h2 id="shop-results" className="visually-hidden">Resultados da loja</h2><div className="row g-4">{displayed.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} onAddToCart={addToCart} onToggleWishlist={addToWishlist} wishlisted={wishlistIds.includes(product.id)} />)}</div></section>{displayed.length > 0 && <nav className="d-flex justify-content-center gap-2 mt-5" aria-label="Páginas de produtos"><button className="btn btn-outline-secondary" disabled={page <= 1} onClick={() => change('page', String(page - 1))} type="button">Anterior</button><span className="px-3 py-2">Página {page}</span><button className="btn btn-outline-secondary" disabled={displayed.length < pageSize} onClick={() => change('page', String(page + 1))} type="button">Próxima</button></nav>}<p className="mt-4"><Link to="/">Voltar para a página inicial</Link></p></main><ToastContainer /></>;
}
