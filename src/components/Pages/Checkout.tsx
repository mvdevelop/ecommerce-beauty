import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';
import { cartSubtotal } from '../../lib/cart';
import { getCart, saveCart } from '../../lib/storage';

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const items = getCart();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState(user?.email ?? '');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError('');
    if (!items.length) { setError('Your cart is empty.'); return; }
    if (!user) { navigate('/login', { state: { from: '/checkout' } }); return; }
    setSubmitting(true);
    try {
      const total = cartSubtotal(items);
      await createOrder({ userId: user.id, items: items.map(({ id, quantity }) => ({ productId: String(id), quantity })), status: 'pending', total, currency: 'USD', createdAt: new Date().toISOString() });
      saveCart([]); navigate('/account/orders');
    } catch { setError('Checkout is unavailable while the demo API is offline.'); } finally { setSubmitting(false); }
  };
  if (!items.length) return <main className="container py-5"><h1>Your cart is empty</h1><Link to="/shop">Continue shopping</Link></main>;
  return <main className="container py-5"><p className="eyebrow">Demo checkout</p><h1>Complete your order</h1><p>Payment is simulated in this local prototype. Never enter real card details.</p><form className="row g-4" onSubmit={submit}><div className="col-md-7"><label htmlFor="checkout-email">Email<input id="checkout-email" className="form-control" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="d-block mt-3" htmlFor="checkout-address">Shipping address<textarea id="checkout-address" className="form-control" required rows={4} /></label>{error && <p className="mt-3" role="alert">{error}</p>}<button className="btn mt-3" disabled={submitting} type="submit">{submitting ? 'Placing order…' : 'Place demo order'}</button></div><aside className="col-md-5"><div className="border p-4"><h2 className="h5">Order summary</h2><p>{items.length} item(s)</p><strong>Subtotal: ${cartSubtotal(items).toFixed(2)}</strong></div></aside></form></main>;
}
