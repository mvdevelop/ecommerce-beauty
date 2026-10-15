import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartSubtotal, removeCartItem, updateCartQuantity } from '../../lib/cart';
import { getCart } from '../../lib/storage';
import type { CartItem } from '../../types/product';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => setItems(getCart()), []);
  const refresh = (next: CartItem[]) => setItems(next);
  return <main className="container py-5"><p className="eyebrow">Your selection</p><h1 className="mb-4">Shopping cart</h1>{items.length === 0 ? <p>Your cart is empty. <Link to="/shop">Continue shopping</Link></p> : <div className="row g-4"><div className="col-lg-8">{items.map((item) => <article key={item.id} className="d-flex align-items-center gap-3 border-bottom py-3"><img src={item.image} width="80" height="80" alt={item.ProductName} /><div className="flex-grow-1"><h2 className="h6">{item.ProductName}</h2><p>{item.price}</p></div><label htmlFor={`quantity-${item.id}`} className="visually-hidden">Quantity for {item.ProductName}</label><input id={`quantity-${item.id}`} type="number" min="1" max="99" value={item.quantity} onChange={(event) => refresh(updateCartQuantity(item.id, Number(event.target.value)))} className="form-control" style={{ maxWidth: 90 }} /><button type="button" className="btn btn-outline-danger" onClick={() => refresh(removeCartItem(item.id))}>Remove</button></article>)}</div><aside className="col-lg-4"><div className="border p-4"><h2 className="h5">Summary</h2><p>{items.length} item(s)</p><strong className="d-block mb-3">Total: ${cartSubtotal(items).toFixed(2)}</strong><Link to="/checkout" className="btn btn-primary w-100">Checkout</Link></div></aside></div>}</main>;
}
