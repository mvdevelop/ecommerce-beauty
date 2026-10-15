import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listProducts } from '../../api/client';
import type { ApiProduct } from '../../types/api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productsData from '../../Product.json';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import { parsePrice } from '../../lib/pricing';
import { isProduct, parseCollection } from '../../lib/runtime';
import type { Product } from '../../types/product';

type FilterOption = 'all' | 'New' | 'Sale' | 'low' | 'high';
const products = parseCollection(productsData, isProduct);
const apiToProduct = (item: ApiProduct): Product => ({ id: Number(item.id), image: item.image, secondImage: item.secondImage ?? item.image, ProductName: item.name, price: `${item.currency} ${item.price.toFixed(2)}` });

export default function Shop() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [params] = useSearchParams();
  const [apiProducts, setApiProducts] = useState<Product[] | null>(null);
  useEffect(() => { let active = true; listProducts({ q: params.get('q') ?? undefined }).then((items) => { if (active) setApiProducts(items.map(apiToProduct)); }).catch(() => { if (active) setApiProducts(null); }); return () => { active = false; }; }, [params]);
  const sourceProducts = apiProducts ?? products;
  const displayedProducts = useMemo(() => {
    const result = sourceProducts.filter((product) => filter === 'all' || product.tag === filter);
    return [...result].sort((a, b) => filter === 'low' ? parsePrice(a.price) - parsePrice(b.price) : filter === 'high' ? parsePrice(b.price) - parsePrice(a.price) : 0);
  }, [filter, sourceProducts]);

  const addToWishlist = (product: Product) => {
    const wishlist = getWishlist();
    if (wishlist.some((item) => item.id === product.id)) { toast.info('Product is already in your wishlist.'); return; }
    saveWishlist([...wishlist, product]);
    toast.success('Product added to your wishlist.');
  };

  const addToCart = (product: Product) => {
    const cart = getCart();
    if (cart.some((item) => item.id === product.id)) { toast.info('Product is already in your cart.'); return; }
    saveCart([...cart, { ...product, quantity: 1 }]);
    toast.success('Product added to your cart.');
  };

  return <>
    <main className="shop-container"><div className="container"><h1 className="text-center py-4">Products</h1>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"><span>Showing <strong>{displayedProducts.length}</strong> products</span>
        <label htmlFor="product-filter" className="visually-hidden">Filter products</label>
        <select id="product-filter" className="form-select" style={{ maxWidth: 260 }} value={filter} onChange={(event) => setFilter(event.target.value as FilterOption)}>
          <option value="all">All products</option><option value="New">New products</option><option value="Sale">Sale products</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      <div className="row">{displayedProducts.map((product) => <article className="col-md-3 mb-4" key={product.id}><div className="product-item text-center">
        <Link to={`/product/${product.id}`}><img src={product.image} className="img-fluid" alt={product.ProductName} /></Link><p className="mt-2 mb-1">{product.price}</p><h2 className="h5">{product.ProductName}</h2>
        <button type="button" className="btn btn-sm btn-outline-secondary me-2" onClick={() => addToWishlist(product)}>Wishlist</button><button type="button" className="btn btn-sm btn-primary" onClick={() => addToCart(product)}>Add to cart</button>
      </div></article>)}</div>
    </div></main><ToastContainer />
  </>;
}
