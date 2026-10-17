import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, listReviews } from '../../api/client';
import { addCartItem } from '../../lib/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ApiProduct, Review } from '../../types/api';
import type { Product } from '../../types/product';
import { apiToProduct, TAG_LABELS } from '../../lib/products';
import { categoryLabel, findLocalProduct } from '../../lib/catalog';
import { getWishlist, saveWishlist } from '../../lib/storage';
import { MESSAGES } from '../../lib/messages';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import RelatedProducts from '../product/RelatedProducts';

// Local view model so the page can render from the API or from the bundled Product.json
// fallback (the production build has no API URL, so the fetch path always fails there).
interface ProductView {
  id: number;
  name: string;
  image: string;
  secondImage?: string;
  price: string;
  compareAtPrice?: string;
  currency: string;
  brand?: string;
  category?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  stock: number;
  tag?: Product['tag'];
}

function fromApi(product: ApiProduct): ProductView {
  const mapped = apiToProduct(product);
  return { id: mapped.id, name: mapped.ProductName, image: mapped.image, secondImage: mapped.secondImage, price: mapped.price, ...(mapped.oldPrice ? { compareAtPrice: mapped.oldPrice } : {}), currency: product.currency, brand: mapped.brand, category: mapped.category, description: mapped.description, rating: mapped.rating, reviewCount: mapped.reviewCount, stock: mapped.stock ?? 0, ...(mapped.tag ? { tag: mapped.tag } : {}) };
}

function fromLocal(product: Product): ProductView {
  return { id: product.id, name: product.ProductName, image: product.image, secondImage: product.secondImage, price: product.price, ...(product.oldPrice ? { compareAtPrice: product.oldPrice } : {}), currency: 'USD', brand: product.brand, category: product.category, description: product.description, rating: product.rating, reviewCount: product.reviewCount, stock: product.stock ?? 0, ...(product.tag ? { tag: product.tag } : {}) };
}

export default function ProductDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductView | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const local = findLocalProduct(Number(id));
    Promise.all([getProduct(id), listReviews(id)])
      .then(([item, productReviews]) => { if (active) { const view = fromApi(item); setProduct(view); setImage(view.image); setReviews(productReviews.filter((review) => review.status === 'published')); } })
      .catch(() => { if (active) { if (local) { const view = fromLocal(local); setProduct(view); setImage(view.image); } else { setProduct(null); } setReviews([]); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  useEffect(() => { setWishlisted(getWishlist().some((item) => item.id === Number(id))); }, [id]);

  const toggleWishlist = (target: Product) => {
    const wishlist = getWishlist();
    const exists = wishlist.some((item) => item.id === target.id);
    if (exists) { saveWishlist(wishlist.filter((item) => item.id !== target.id)); setWishlisted(false); toast.info(MESSAGES.wishlistRemoved); return; }
    saveWishlist([...wishlist, target]); setWishlisted(true); toast.success(MESSAGES.wishlistAdded);
  };

  if (loading) return <main className="container py-5"><p aria-live="polite">Carregando produto…</p></main>;
  if (!product) return <main className="container py-5"><h1>Produto não encontrado</h1><p>O produto que você procurou não existe ou foi removido.</p><Link to="/shop">Voltar para os produtos</Link></main>;

  const gallery = [product.image, product.secondImage].filter((value): value is string => Boolean(value));
  const relatedSeed: Product = { id: product.id, image: product.image, secondImage: product.secondImage ?? product.image, ProductName: product.name, price: product.price, ...(product.category ? { category: product.category } : {}) };
  const inStock = product.stock > 0;

  return <><main className="container py-5"><Breadcrumbs items={[{ label: 'Início', to: '/' }, { label: 'Loja', to: '/shop' }, ...(product.category ? [{ label: categoryLabel(product.category), to: `/shop?category=${product.category}` }] : []), { label: product.name }]} /><div className="row g-5 mt-2"><div className="col-md-6"><img className="img-fluid" src={image} alt={product.name} /><div className="d-flex gap-2 mt-3">{gallery.map((item) => <button type="button" className="border-0 bg-transparent p-0" key={item} onClick={() => setImage(item)}><img src={item} alt="" width="72" height="72" /></button>)}</div></div><div className="col-md-6"><p className="eyebrow">{product.brand ?? 'Blushify'}{product.category ? ` · ${categoryLabel(product.category)}` : ''}</p><h1>{product.name}</h1>{product.tag && <p><span className={`product-card__badge product-card__badge--${product.tag.toLowerCase()}`}>{TAG_LABELS[product.tag]}</span></p>}<p className="h4">{product.compareAtPrice && <s className="product-card__old-price">{product.compareAtPrice}</s>}{product.price}</p>{product.description && <p>{product.description}</p>}{product.rating !== undefined && <p>{product.rating.toFixed(1)} / 5 · {product.reviewCount ?? 0} avaliações</p>}<p>{inStock ? `${product.stock} disponíveis` : 'Esgotado'}</p><label htmlFor="product-quantity">Quantidade<input id="product-quantity" className="form-control" type="number" min="1" max={product.stock} value={quantity} disabled={!inStock} onChange={(event) => setQuantity(Math.max(1, Math.min(product.stock, Number(event.target.value) || 1)))} /></label><button className="btn mt-3" disabled={!inStock} type="button" onClick={() => { addCartItem({ ...(findLocalProduct(product.id) ?? relatedSeed), quantity }); toast.success(MESSAGES.cartAdded); }}>Adicionar ao carrinho</button><button className="btn btn-outline-dark mt-3 ms-2" type="button" aria-pressed={wishlisted} onClick={() => toggleWishlist(findLocalProduct(product.id) ?? relatedSeed)}>{wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</button></div></div><section className="mt-5" aria-labelledby="reviews"><h2 id="reviews">Avaliações de clientes</h2>{reviews.length ? reviews.map((review) => <article className="border-top py-3" key={review.id}><strong>{review.rating} / 5 · {review.title}</strong><p>{review.body}</p></article>) : <p>Ainda não há avaliações publicadas para este produto.</p>}</section><RelatedProducts product={relatedSeed} onAddToCart={(item) => { addCartItem({ ...item, quantity: 1 }); toast.success(MESSAGES.cartAdded); }} onToggleWishlist={toggleWishlist} wishlistedIds={getWishlist().map((item) => item.id)} /></main><ToastContainer /></>;
}
