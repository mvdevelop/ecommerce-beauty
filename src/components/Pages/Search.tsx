import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { listProducts } from '../../api/client';
import type { ApiProduct } from '../../types/api';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const query = params.get('q') ?? '';

  useEffect(() => {
    let active = true;
    setLoading(true);
    listProducts({ q: query }).then((items) => { if (active) setProducts(items); }).catch(() => { if (active) setProducts([]); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query]);

  return <main className="container py-5"><div className="d-flex justify-content-between gap-3 align-items-center flex-wrap"><div><p className="eyebrow">Search results</p><h1>{query ? `Results for “${query}”` : 'Explore our products'}</h1></div><label className="visually-hidden" htmlFor="search-page-input">Search products</label><input id="search-page-input" className="form-control" style={{ maxWidth: 320 }} value={query} onChange={(event) => { const value = event.target.value; setParams(value ? { q: value } : {}); }} placeholder="Search products" /></div>{loading ? <p className="py-5">Loading products…</p> : products.length === 0 ? <p className="py-5">No products found. Try another search.</p> : <div className="row g-4 mt-3">{products.map((product) => <article className="col-6 col-md-3" key={product.id}><Link to={`/product/${product.id}`}><img className="img-fluid" src={product.image} alt={product.name} /><h2 className="h5 mt-2">{product.name}</h2><p>{product.price.toFixed(2)} {product.currency}</p></Link></article>)}</div>}</main>;
}
