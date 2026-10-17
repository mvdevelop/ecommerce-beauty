import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCartItem } from '../../lib/cart';
import { saveWishlist } from '../../lib/storage';
import { useWishlist } from '../../hooks/useWishlist';
import { MESSAGES } from '../../lib/messages';
import { ProductCard } from '../product/ProductCard';
import { EmptyState } from '../ui/Primitives';

export default function Wishlist() {
  const items = useWishlist();

  const remove = (id: number) => {
    saveWishlist(items.filter((item) => item.id !== id));
    toast.info(MESSAGES.wishlistRemoved);
  };

  const addToCart = (product: import('../../types/product').Product) => {
    addCartItem({ ...product, quantity: 1 });
    toast.success(MESSAGES.cartAdded);
  };

  return <main className="container py-5">
    <h1>Favoritos</h1>
    {items.length === 0 ? <EmptyState title="Sua lista de favoritos está vazia" description="Salve os produtos que você quer acompanhar e volte a eles quando quiser."><Link className="btn" to="/shop">Explorar a loja</Link></EmptyState> : <section aria-labelledby="wishlist-items" className="mt-4"><h2 id="wishlist-items" className="visually-hidden">Produtos salvos</h2><div className="row g-4">{items.map((item) => <ProductCard key={item.id} className="col-6 col-md-4" product={item} onAddToCart={addToCart} onRemove={(product) => remove(product.id)} wishlisted />)}</div></section>}
    <ToastContainer />
  </main>;
}
