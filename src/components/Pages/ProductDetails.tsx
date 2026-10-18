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
import { useLanguage } from '../../i18n/LanguageProvider';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useMemo } from 'react';

function ProductJsonLd({ product }: { product: ProductView }) {
  const json = useMemo(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price.replace(/[^0-9.]/g, ''),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    ...(product.rating !== undefined && product.reviewCount !== undefined ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount } } : {}),
  }), [product]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
import { resolveLocalized } from '../../i18n/content';
import type { LocalizedText } from '../../i18n/content';

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

function fromApi(product: ApiProduct, locale: ReturnType<typeof useLanguage>['locale']): ProductView {
  const mapped = apiToProduct(product, locale);
  const view: ProductView = {
    id: mapped.id,
    name: resolveLocalized((product as { nameI18n?: LocalizedText }).nameI18n, locale, mapped.ProductName),
    image: mapped.image,
    secondImage: mapped.secondImage,
    price: mapped.price,
    currency: product.currency,
    brand: mapped.brand,
    category: mapped.category,
    description: resolveLocalized((product as { descriptionI18n?: LocalizedText }).descriptionI18n, locale, mapped.description ?? ''),
    rating: mapped.rating,
    reviewCount: mapped.reviewCount,
    stock: mapped.stock ?? 0,
  };
  if (mapped.oldPrice) view.compareAtPrice = mapped.oldPrice;
  if (mapped.tag) view.tag = mapped.tag;
  return view;
}

function fromLocal(product: Product, locale: ReturnType<typeof useLanguage>['locale']): ProductView {
  const view: ProductView = {
    id: product.id,
    name: resolveLocalized((product as { nameI18n?: LocalizedText }).nameI18n, locale, product.ProductName),
    image: product.image,
    secondImage: product.secondImage,
    price: product.price,
    currency: 'USD',
    brand: product.brand,
    category: product.category,
    description: resolveLocalized((product as { descriptionI18n?: LocalizedText }).descriptionI18n, locale, product.description ?? ''),
    rating: product.rating,
    reviewCount: product.reviewCount,
    stock: product.stock ?? 0,
  };
  if (product.oldPrice) view.compareAtPrice = product.oldPrice;
  if (product.tag) view.tag = product.tag;
  return view;
}

export default function ProductDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
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
      .then(([item, productReviews]) => { if (active) { const view = fromApi(item, locale); setProduct(view); setImage(view.image); setReviews(productReviews.filter((review) => review.status === 'published')); } })
      .catch(() => { if (active) { if (local) { const view = fromLocal(local, locale); setProduct(view); setImage(view.image); } else { setProduct(null); } setReviews([]); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, locale]);

  useEffect(() => { setWishlisted(getWishlist().some((item) => item.id === Number(id))); }, [id]);

  const toggleWishlist = (target: Product) => {
    const wishlist = getWishlist();
    const exists = wishlist.some((item) => item.id === target.id);
    if (exists) { saveWishlist(wishlist.filter((item) => item.id !== target.id)); setWishlisted(false); toast.info(MESSAGES.wishlistRemoved); return; }
    saveWishlist([...wishlist, target]); setWishlisted(true); toast.success(MESSAGES.wishlistAdded);
  };

  useDocumentMeta({ title: product ? `${product.name} · Blushify` : 'Blushify', description: product?.description, image: product?.image });

  if (loading) return <main className="container py-5"><p aria-live="polite">{t('product.loading')}</p></main>;
  if (!product) return <main className="container py-5"><h1>{t('product.notFoundTitle')}</h1><p>{t('product.notFoundDescription')}</p><Link to="/shop">{t('product.backToProducts')}</Link></main>;

  const gallery
 = [product.image, product.secondImage].filter((value): value is string => Boolean(value));
  const relatedSeed: Product = { id: product.id, image: product.image, secondImage: product.secondImage ?? product.image, ProductName: product.name, price: product.price, ...(product.category ? { category: product.category } : {}) };
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    const base = findLocalProduct(product.id);
    addCartItem({ ...(base ?? relatedSeed), quantity });
    toast.success(MESSAGES.cartAdded);
  };

  const handleToggleWishlist = () => {
    const base = findLocalProduct(product.id);
    toggleWishlist(base ?? relatedSeed);
  };

  return (
    <>
      <main className="container py-5">
        <Breadcrumbs items={[{ label: t('common.home'), to: '/' }, { label: t('common.shop'), to: '/shop' }, ...(product.category ? [{ label: categoryLabel(product.category), to: `/shop?category=${product.category}` }] : []), { label: product.name }]} />
        <div className="row g-5 mt-2">
          <div className="col-md-6">
            <img className="img-fluid" src={image} alt={product.name} />
            <div className="d-flex gap-2 mt-3">
              {gallery.map((item) => <button type="button" className="border-0 bg-transparent p-0" key={item} onClick={() => setImage(item)}><img src={item} alt="" width="72" height="72" /></button>)}
            </div>
          </div>
          <div className="col-md-6">
            <p className="eyebrow">{product.brand ?? 'Blushify'}{product.category ? ` · ${categoryLabel(product.category)}` : ''}</p>
            <h1>{product.name}</h1>
            {product.tag && <p><span className={`product-card__badge product-card__badge--${product.tag.toLowerCase()}`}>{TAG_LABELS[product.tag]}</span></p>}
            <p className="h4">{product.compareAtPrice && <s className="product-card__old-price">{product.compareAtPrice}</s>}{product.price}</p>
            {product.description && <p>{product.description}</p>}
            {product.rating !== undefined && <p>{t('product.rating', { rating: product.rating.toFixed(1), count: product.reviewCount ?? 0 })}</p>}
            <p>{inStock ? t('product.inStock', { count: product.stock }) : t('product.outOfStock')}</p>
            <label htmlFor="product-quantity">{t('common.quantity')}<input id="product-quantity" className="form-control" type="number" min="1" max={product.stock} value={quantity} disabled={!inStock} onChange={(event) => setQuantity(Math.max(1, Math.min(product.stock, Number(event.target.value) || 1)))} /></label>
            <button className="btn mt-3" disabled={!inStock} type="button" onClick={handleAddToCart}>{t('product.addToCart')}</button>
            <button className="btn btn-outline-dark mt-3 ms-2" type="button" aria-pressed={wishlisted} onClick={handleToggleWishlist}>{wishlisted ? t('product.removeFromFavorites') : t('product.addToFavorites')}</button>
          </div>
        </div>
        <section className="mt-5" aria-labelledby="reviews">
          <h2 id="reviews">{t('product.reviewsTitle')}</h2>
          {reviews.length ? reviews.map((review) => <article className="border-top py-3" key={review.id}><strong>{t('product.reviewSummary', { rating: review.rating, title: review.title })}</strong><p>{review.body}</p></article>) : <p>{t('product.noReviews')}</p>}
        </section>
        <RelatedProducts product={relatedSeed} onAddToCart={(item) => { addCartItem({ ...item, quantity: 1 }); toast.success(MESSAGES.cartAdded); }} onToggleWishlist={toggleWishlist} wishlistedIds={getWishlist().map((item) => item.id)} />
      </main>
      <ToastContainer />
    </>
  );
}