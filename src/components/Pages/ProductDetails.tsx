import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, listReviews } from '../../api/client';
import { addCartItem } from '../../lib/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ApiProduct, Review } from '../../types/api';

export default function ProductDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; setLoading(true); Promise.all([getProduct(id), listReviews(id)]).then(([item, productReviews]) => { if (active) { setProduct(item); setImage(item.image); setReviews(productReviews); } }).catch(() => { if (active) { setProduct(null); setReviews([]); } }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [id]);
  if (loading) return <main className="container py-5"><p>Loading product…</p></main>;
  if (!product) return <main className="container py-5"><h1>Product not found</h1><Link to="/shop">Back to products</Link></main>;
  const gallery = [product.image, product.secondImage].filter((value): value is string => Boolean(value));
  return <><main className="container py-5"><Link to="/shop">← Products</Link><div className="row g-5 mt-2"><div className="col-md-6"><img className="img-fluid" src={image} alt={product.name} /><div className="d-flex gap-2 mt-3">{gallery.map((item) => <button type="button" className="border-0 bg-transparent p-0" key={item} onClick={() => setImage(item)}><img src={item} alt="" width="72" height="72" /></button>)}</div></div><div className="col-md-6"><p className="eyebrow">{product.brand} · {product.category}</p><h1>{product.name}</h1><p className="h4">{product.currency} {product.price.toFixed(2)}</p><p>{product.description}</p><p>{product.rating.toFixed(1)} / 5 · {product.reviewCount} reviews</p><p>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p><label htmlFor="product-quantity">Quantity<input id="product-quantity" className="form-control" type="number" min="1" max={product.stock} value={quantity} disabled={product.stock === 0} onChange={(event) => setQuantity(Math.max(1, Math.min(product.stock, Number(event.target.value) || 1)))} /></label><button className="btn mt-3" disabled={product.stock === 0} type="button" onClick={() => { addCartItem({ id: Number(product.id), image: product.image, secondImage: product.secondImage ?? product.image, ProductName: product.name, price: `${product.currency} ${product.price.toFixed(2)}`, quantity }); toast.success('Product added to cart.'); }}>Add to cart</button></div></div><section className="mt-5" aria-labelledby="reviews"><h2 id="reviews">Customer reviews</h2>{reviews.length ? reviews.map((review) => <article className="border-top py-3" key={review.id}><strong>{review.rating} / 5 · {review.title}</strong><p>{review.body}</p></article>) : <p>No reviews yet.</p>}</section></main><ToastContainer /></>;
}
