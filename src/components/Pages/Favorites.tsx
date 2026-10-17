import { Link } from 'react-router-dom';
import { addCartItem } from '../../lib/cart';
import { saveWishlist } from '../../lib/storage';
import { useWishlist } from '../../hooks/useWishlist';

export default function Favorites() {
  const items = useWishlist();
  const remove = (id: number) => saveWishlist(items.filter((item) => item.id !== id));
  return <main className="container py-5"><p className="eyebrow">Minha conta</p><h1>Favoritos</h1>{items.length === 0 ? <p>Você ainda não salvou produtos. <Link to="/shop">Explorar a loja</Link></p> : <div className="row g-4">{items.map((item) => <article className="col-6 col-md-3" key={item.id}><Link to={`/product/${item.id}`}><img className="img-fluid" src={item.image} alt={item.ProductName} /><h2 className="h5 mt-2">{item.ProductName}</h2></Link><p>{item.price}</p><button className="btn btn-sm btn-primary me-2" type="button" onClick={() => addCartItem({ ...item, quantity: 1 })}>Adicionar ao carrinho</button><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => remove(item.id)}>Remover</button></article>)}</div>}</main>;
}
