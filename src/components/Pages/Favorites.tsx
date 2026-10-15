import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listFavorites } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';
import type { ApiProduct } from '../../types/api';

export default function Favorites() {
  const { user } = useAuth();
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!user) return; listFavorites(user.id).then(setItems).catch(() => setItems([])).finally(() => setLoading(false)); }, [user]);
  return <main className="container py-5"><p className="eyebrow">Your account</p><h1>Favorites</h1>{loading ? <p>Loading favorites…</p> : items.length === 0 ? <p>You have not saved any products yet.</p> : <div className="row g-4">{items.map((item) => <article className="col-6 col-md-3" key={item.id}><Link to={`/product/${item.id}`}><img className="img-fluid" src={item.image} alt={item.name} /><h2 className="h5 mt-2">{item.name}</h2></Link><p>{item.price.toFixed(2)} {item.currency}</p></article>)}</div>}</main>;
}
