import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCartItem, cartSubtotal, removeCartItem, updateCartQuantity } from '../../lib/cart';
import { getCart } from '../../lib/storage';
import { getSaved, saveSaved } from '../../lib/storage';
import { useLanguage } from '../../i18n/LanguageProvider';
import { MESSAGES } from '../../lib/messages';
import type { CartItem } from '../../types/product';
import { EmptyState } from '../ui/Primitives';
import { ProductSuggestions } from '../product/ProductSuggestions';
import { localProducts } from '../../lib/catalog';

export default function Cart() {
  const { t } = useLanguage();
  const [items, setItems] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<CartItem[]>([]);
  useEffect(() => { setItems(getCart()); setSaved(getSaved()); }, []);
  const refresh = (next: CartItem[]) => setItems(next);

  const handleSaveForLater = (item: CartItem) => {
    const nextCart = removeCartItem(item.id);
    const nextSaved = [...getSaved().filter((entry) => entry.id !== item.id), item];
    saveSaved(nextSaved);
    setItems(nextCart);
    setSaved(nextSaved);
    toast.info(MESSAGES.savedAdded);
  };

  const handleMoveToCart = (item: CartItem) => {
    const nextCart = addCartItem({ ...item, quantity: item.quantity });
    const nextSaved = getSaved().filter((entry) => entry.id !== item.id);
    saveSaved(nextSaved);
    setItems(nextCart);
    setSaved(nextSaved);
    toast.success(MESSAGES.savedMovedToCart);
  };

  const handleRemoveSaved = (id: number) => {
    const nextSaved = getSaved().filter((entry) => entry.id !== id);
    saveSaved(nextSaved);
    setSaved(nextSaved);
  };

  if (items.length === 0 && saved.length === 0) {
    return (
      <main className="container py-5">
        <p className="eyebrow">{t('cart.eyebrow')}</p>
        <h1 className="mb-4">{t('cart.title')}</h1>
        <EmptyState title={t('cart.emptyTitle')} description={t('cart.emptyDescription')}>
          <Link className="btn" to="/shop">{t('common.exploreShop')}</Link>
        </EmptyState>
        <ProductSuggestions products={localProducts} />
        <ToastContainer />
      </main>
    );
  }

  return (
    <main className="container py-5">
      <p className="eyebrow">{t('cart.eyebrow')}</p>
      <h1 className="mb-4">{t('cart.title')}</h1>
      {items.length === 0 ? (
        <p>{t('cart.emptyTitle')} <Link to="/shop">{t('common.continueShopping')}</Link></p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {items.map((item) => (
              <article key={item.id} className="d-flex align-items-center gap-3 border-bottom py-3">
                <img src={item.image} width="80" height="80" alt={item.ProductName} />
                <div className="flex-grow-1">
                  <h2 className="h6">{item.ProductName}</h2>
                  <p>{item.price}</p>
                </div>
                <label htmlFor={`quantity-${item.id}`} className="visually-hidden">{t('cart.quantityFor', { name: item.ProductName })}</label>
                <input id={`quantity-${item.id}`} type="number" min="1" max="99" value={item.quantity} onChange={(event) => refresh(updateCartQuantity(item.id, Number(event.target.value)))} className="form-control" style={{ maxWidth: 90 }} />
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleSaveForLater(item)}>{t('cart.saveForLater')}</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => refresh(removeCartItem(item.id))}>{t('common.remove')}</button>
              </article>
            ))}
          </div>
          <aside className="col-lg-4">
            <div className="border p-4">
              <h2 className="h5">{t('cart.summary')}</h2>
              <p>{t('cart.itemCount', { count: items.length })}</p>
              <strong className="d-block mb-3">{t('cart.totalValue', { value: `$${cartSubtotal(items).toFixed(2)}` })}</strong>
              <Link to="/checkout" className="btn btn-primary w-100">{t('common.checkout')}</Link>
            </div>
          </aside>
        </div>
      )}
      {saved.length > 0 && (
        <section className="mt-5">
          <h2 className="h5">{t('cart.savedTitle')}</h2>
          <p className="text-muted">{t('cart.savedDescription')}</p>
          {saved.map((item) => (
            <article key={item.id} className="d-flex align-items-center gap-3 border-bottom py-3">
              <img src={item.image} width="64" height="64" alt={item.ProductName} />
              <div className="flex-grow-1">
                <h3 className="h6 mb-0">{item.ProductName}</h3>
                <p className="mb-0">{item.price}</p>
              </div>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleMoveToCart(item)}>{t('cart.moveToCart')}</button>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveSaved(item.id)}>{t('cart.removeSaved')}</button>
            </article>
          ))}
        </section>
      )}
      <ToastContainer />
    </main>
  );
}