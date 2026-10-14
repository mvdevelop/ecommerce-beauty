import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateCartTotal, formatPrice } from '../../lib/pricing';
import { getCart } from '../../lib/storage';
import type { CartItem } from '../../types/product';

export default function Checkout() {
  const [deliveryOption, setDeliveryOption] = useState<'ship' | 'pickup'>('ship');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => setCartItems(getCart()), []);

  const totalPrice = calculateCartTotal(cartItems);
  const estimatedTax = totalPrice * 0.1;

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully. This demo does not process payments.');
  };

  return (
    <>
      <main className="container my-5 pt-1">
        <div className="row g-4 mt-5">
          <section className="col-lg-7" aria-labelledby="checkout-title">
            <h1 id="checkout-title" className="h5">Contact and delivery</h1>
            <div className="mb-3">
              <label className="visually-hidden" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-control" placeholder="Email or mobile phone number" autoComplete="email" />
            </div>
            <h2 className="h5">Delivery</h2>
            <div className="mb-3" role="group" aria-label="Delivery option">
              <input type="radio" className="btn-check" name="deliveryOption" id="ship" checked={deliveryOption === 'ship'} onChange={() => setDeliveryOption('ship')} />
              <label className="btn ship-btn" htmlFor="ship">Ship</label>
              <input type="radio" className="btn-check" name="deliveryOption" id="pickup" checked={deliveryOption === 'pickup'} onChange={() => setDeliveryOption('pickup')} />
              <label className="btn pickup-btn" htmlFor="pickup">Pickup in store</label>
            </div>
            {deliveryOption === 'ship' && (
              <div className="row mb-3">
                <div className="col"><input className="form-control" placeholder="First name" autoComplete="given-name" /></div>
                <div className="col"><input className="form-control" placeholder="Last name" autoComplete="family-name" /></div>
                <div className="col-12 mt-3"><input className="form-control" placeholder="Address" autoComplete="street-address" /></div>
              </div>
            )}
            {deliveryOption === 'pickup' && <p className="alert alert-info">No stores are currently available for this demo.</p>}
            <h2 className="h5 mt-4">Payment</h2>
            <p className="text-muted">Payment is simulated. Do not enter real card details.</p>
            <button className="btn w-100 mt-3" type="button" onClick={handlePlaceOrder}>Place order</button>
          </section>
          <aside className="col-lg-5" aria-label="Order summary">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h2 className="h5 fw-bold mb-3">Order summary</h2>
              {cartItems.length === 0 ? <p className="text-muted">Your cart is empty.</p> : cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                  <img src={item.image} className="rounded" width="60" height="60" alt="" />
                  <div className="flex-grow-1 ms-2"><h3 className="h6 mb-1">{item.ProductName}</h3><small>Qty: {item.quantity}</small></div>
                  <strong>{formatPrice(calculateCartTotal([item]))}</strong>
                </div>
              ))}
              <div className="d-flex justify-content-between"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="d-flex justify-content-between"><span>Estimated tax</span><span>{formatPrice(estimatedTax)}</span></div>
              <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatPrice(totalPrice + estimatedTax)}</span></div>
              <Link to="/cart" className="btn mt-3">Back to cart</Link>
            </div>
          </aside>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
