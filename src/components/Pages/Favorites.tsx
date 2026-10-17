import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCartItem } from '../../lib/cart';
import { saveWishlist } from '../../lib/storage';
import { useWishlist } from '../../hooks/useWishlist';
import { MESSAGES } from '../../lib/messages';
import { ProductCard } from '../product/ProductCard';
import { EmptyState } from '../ui/Primitives';

export default function Favorites() {
  const items = useWishlist();
  const remove = (id: number) => { saveWishlist(items.filter((item) => item.id !== id)); toast.info(MESSAGES.wishlistRemoved); };
  const addToCart = (product: import('../../types/product').Product) => { addCartItem({ ...product, quantity: 1 }); toast.success(MESSAGES.cartAdded); };
  return <><main className="container py-5"><p className="eyebrow">Minha conta</p><h1>Favoritos</h1>{items.length === 0 ? <EmptyState title="Você ainda não salvou produtos" description="Toque no coração de qualquer produto para guardá-lo aqui."><Link className="btn" to="/shop">Explorar a loja</Link></EmptyState> : <section aria-labelledby="favorites-items" className="mt-4"><h2 id="favorites-items" className="visually-hidden">Produtos favoritos</h2><div className="row g-4">{items.map((item) => <ProductCard key={item.id} product={item} onAddToCart={addToCart} onRemove={(product) => remove(product.id)} wishlisted />)}</div></section>}</main><ToastContainer /></>;
}
