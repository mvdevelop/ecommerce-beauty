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
import { ProductSuggestions } from '../product/ProductSuggestions';
import { localProducts } from '../../lib/catalog';

export default function Wishlist() {
  const items = useWishlist();
  const { t } = useLanguage();
  const remove = (id: number) => {
    saveWishlist(items.filter((item) => item.id !== id));
    toast.info(MESSAGES.wishlistRemoved);
  };
  const addToCart = (product: import('../../types/product').Product) => {
    addCartItem({ ...product, quantity: 1 });
    toast.success(MESSAGES.cartAdded);
  };
  return (
    <main className="container py-5">
      <h1>{t('wishlist.title')}</h1>
      {items.length === 0 ? (
        <>
          <EmptyState title={t('wishlist.emptyTitle')} description={t('wishlist.emptyDescription')}>
            <Link className="btn" to="/shop">{t('common.exploreShop')}</Link>
          </EmptyState>
          <ProductSuggestions products={localProducts} />
        </>
      ) : (
        <section aria-labelledby="wishlist-items" className="mt-4">
          <h2 id="wishlist-items" className="visually-hidden">{t('wishlist.items')}</h2>
          <div className="row g-4">{items.map((item) => <ProductCard key={item.id} className="col-6 col-md-4" product={item} onAddToCart={addToCart} onRemove={(product) => remove(product.id)} wishlisted />)}</div>
        </section>
      )}
      <ToastContainer />
    </main>
  );
}