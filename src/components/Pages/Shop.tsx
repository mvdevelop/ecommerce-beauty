import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productsData from '../../Product.json';
import { listProducts } from '../../api/client';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import { parsePrice } from '../../lib/pricing';
import { isProduct, parseCollection } from '../../lib/runtime';
import type { Product } from '../../types/product';
import { apiToProduct } from '../../lib/products';

type SortOption = 'featured' | 'low' | 'high';
const localProducts = parseCollection(productsData, isProduct);

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loading, setLoading] = useState(false);
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const sort = (params.get('sort') as SortOption | null) ?? 'featured';
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);
  const pageSize = 12;

  useEffect(() => { let active = true; setLoading(true); listProducts({ q: query || undefined, category: category || undefined, page, limit: pageSize }).then((items) => { if (active) setProducts(items.map(apiToProduct)); }).catch(() => { if (active) setProducts(localProducts); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [query, category, page]);
  const displayed = useMemo(() => [...products].sort((a, b) => sort === 'low' ? parsePrice(a.price) - parsePrice(b.price) : sort === 'high' ? parsePrice(b.price) - parsePrice(a.price) : 0), [products, sort]);
  const change = (key: string, value: string) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); setParams(next); };
  const addToWishlist = (product: Product) => { const wishlist = getWishlist(); if (wishlist.some((item) => item.id === product.id)) { toast.info('Product is already in your wishlist.'); return; } saveWishlist([...wishlist, product]); toast.success('Product added to your wishlist.'); };
  const addToCart = (product: Product) => { const cart = getCart(); if (cart.some((item) => item.id === product.id)) { toast.info('Product is already in your cart.'); return; } saveCart([...cart, { ...product, quantity: 1 }]); toast.success('Product added to your cart.'); };
  return <><main className="container py-5"><p className="eyebrow">The collection</p><h1>Shop beauty essentials</h1><div className="d-flex flex-wrap gap-3 align-items-end my-4"><label className="flex-grow-1">Search<input className="form-control" value={query} onChange={(event) => change('q', event.target.value)} placeholder="Search products" /></label><label>Category<select className="form-select" value={category} onChange={(event) => change('category', event.target.value)}><option value="">All categories</option><option value="skincare">Skincare</option><option value="makeup">Makeup</option><option value="body">Body care</option><option value="hair">Hair care</option></select></label><label>Sort<select className="form-select" value={sort} onChange={(event) => change('sort', event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>{loading && <p aria-live="polite">Loading products…</p>}{!loading && displayed.length === 0 && <p>No products found. Try another search.</p>}<div className="row g-4">{displayed.map((product) => <article className="col-6 col-md-4 col-lg-3" key={product.id}><Link to={`/product/${product.id}`}><img className="img-fluid" src={product.image} alt={product.ProductName} loading="lazy" /><h2 className="h5 mt-2">{product.ProductName}</h2><p>{product.price}</p></Link><button className="btn btn-sm btn-outline-secondary me-1" type="button" onClick={() => addToWishlist(product)}>Wishlist</button><button className="btn btn-sm btn-primary" type="button" onClick={() => addToCart(product)}>Add</button></article>)}</div><nav className="d-flex justify-content-center gap-2 mt-5" aria-label="Product pages"><button className="btn btn-outline-secondary" disabled={page <= 1} onClick={() => change('page', String(page - 1))} type="button">Previous</button><span className="px-3 py-2">Page {page}</span><button className="btn btn-outline-secondary" disabled={displayed.length < pageSize} onClick={() => change('page', String(page + 1))} type="button">Next</button></nav></main><ToastContainer /></>;
}
