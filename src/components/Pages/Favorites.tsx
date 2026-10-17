import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCartItem } from '../../lib/cart';
import { saveWishlist } from '../../lib/storage';
import { useWishlist } from '../../hooks/useWishlist';
import { MESSAGES } from '../../lib/messages';
import { ProductCard } from '../product/ProductCard';
import { EmptyState } from '../ui/Primitives';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Favorites() {
  const items = useWishlist();
  const { t } = useLanguage();
  const remove = (id: number) => { saveWishlist(items.filter((item) => item.id !== id)); toast.info(MESSAGES.wishlistRemoved); };
  const addToCart = (product: import('../../types/product').Product) => { addCartItem({ ...product, quantity: 1 }); toast.success(MESSAGES.cartAdded); };
  return (
    <>
      <main className="container py-5">
        <p className="eyebrow">{t('favorites.eyebrow')}</p>
        <h1>{t('favorites.title')}</h1>
        {items.length === 0 ? (
          <EmptyState title={t('favorites.emptyTitle')} description={t('favorites.emptyDescription')}>
            <Link className="btn" to="/shop">{t('common.exploreShop')}</Link>
          </EmptyState>
        ) : (
          <section aria-labelledby="favorites-items" className="mt-4">
            <h2 id="favorites-items" className="visually-hidden">{t('favorites.items')}</h2>
            <div className="row g-4">{items.map((item) => <ProductCard key={item.id} product={item} onAddToCart={addToCart} onRemove={(product) => remove(product.id)} wishlisted />)}</div>
          </section>
        )}
      </main>
      <ToastContainer />
    </>
  );
}