import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateCartTotal, formatPrice } from '../../lib/pricing';
import { getCart, saveCart } from '../../lib/storage';
import type { CartItem } from '../../types/product';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => setItems(getCart()), []);

  const updateQuantity = (id: number, quantity: number) => {
    const updated = items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item);
    setItems(updated);
    saveCart(updated);
  };

  const removeItem = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveCart(updated);
  };

  return <main className="container py-5">
    <h1 className="mb-4">Shopping cart</h1>
    {items.length === 0 ? <p>Your cart is empty. <Link to="/shop">Continue shopping</Link></p> : <>
      {items.map((item) => <article key={item.id} className="d-flex align-items-center gap-3 border-bottom py-3">
        <img src={item.image} width="80" height="80" alt={item.ProductName} />
        <div className="flex-grow-1"><h2 className="h6">{item.ProductName}</h2><p>{item.price}</p></div>
        <label htmlFor={`quantity-${item.id}`} className="visually-hidden">Quantity for {item.ProductName}</label>
        <input id={`quantity-${item.id}`} type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} className="form-control" style={{ maxWidth: 90 }} />
        <strong>{formatPrice(calculateCartTotal([item]))}</strong>
        <button type="button" className="btn btn-outline-danger" onClick={() => removeItem(item.id)}>Remove</button>
      </article>)}
      <p className="text-end fw-bold mt-4">Total: {formatPrice(calculateCartTotal(items))}</p>
      <Link to="/checkout" className="btn btn-primary float-end">Checkout</Link>
    </>}
  </main>;
}
