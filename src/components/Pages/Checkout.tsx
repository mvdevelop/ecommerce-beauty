import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';
import { cartSubtotal } from '../../lib/cart';
import { getCart, saveCart } from '../../lib/storage';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Checkout() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const items = getCart();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState(user?.email ?? '');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError('');
    if (!items.length) { setError(t('checkout.emptyCart')); return; }
    if (!user) { navigate('/login', { state: { from: '/checkout' } }); return; }
    setSubmitting(true);
    try {
      const total = cartSubtotal(items);
      await createOrder({ userId: user.id, items: items.map(({ id, quantity }) => ({ productId: String(id), quantity })), status: 'pending', total, currency: 'USD', createdAt: new Date().toISOString() });
      saveCart([]); navigate('/account/orders');
    } catch { setError(t('checkout.unavailable')); } finally { setSubmitting(false); }
  };
  if (!items.length) return <main className="container py-5"><h1>{t('checkout.emptyTitle')}</h1><Link to="/shop">{t('common.continueShopping')}</Link></main>;
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('checkout.eyebrow')}</p>
      <h1>{t('checkout.title')}</h1>
      <p>{t('checkout.notice')}</p>
      <form className="row g-4" onSubmit={submit}>
        <div className="col-md-7">
          <label htmlFor="checkout-email">{t('common.email')}<input id="checkout-email" className="form-control" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="d-block mt-3" htmlFor="checkout-address">{t('checkout.address')}<textarea id="checkout-address" className="form-control" required rows={4} /></label>
          {error && <p className="mt-3" role="alert">{error}</p>}
          <button className="btn mt-3" disabled={submitting} type="submit">{submitting ? t('checkout.submitting') : t('checkout.submit')}</button>
        </div>
        <aside className="col-md-5">
          <div className="border p-4">
            <h2 className="h5">{t('checkout.orderSummary')}</h2>
            <p>{t('cart.itemCount', { count: items.length })}</p>
            <strong>{t('cart.totalValue', { value: `$${cartSubtotal(items).toFixed(2)}` })}</strong>
          </div>
        </aside>
      </form>
    </main>
  );
}