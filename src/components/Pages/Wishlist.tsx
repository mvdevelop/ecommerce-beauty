import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import type { Product } from '../../types/product';

export default function Wishlist() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => setItems(getWishlist()), []);

  const remove = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveWishlist(updated);
  };

  const addToCart = (product: Product) => {
    const cart = getCart();
    if (!cart.some((item) => item.id === product.id)) saveCart([...cart, { ...product, quantity: 1 }]);
  };

  return <main className="container py-5">
    <h1>Wishlist</h1>
    {items.length === 0 ? <p>Your wishlist is empty. <Link to="/shop">Browse products</Link></p> : <div className="row">{items.map((item) => <article className="col-md-4 mb-4" key={item.id}>
      <img src={item.image} className="img-fluid" alt={item.ProductName} />
      <h2 className="h5 mt-2">{item.ProductName}</h2>
      <p>{item.price}</p>
      <button type="button" className="btn btn-primary me-2" onClick={() => addToCart(item)}>Add to cart</button>
      <button type="button" className="btn btn-outline-danger" onClick={() => remove(item.id)}>Remove</button>
    </article>)}</div>}
  </main>;
}
