import { useEffect, useState } from 'react';
import { listOrders } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';
import type { ApiOrder } from '../../types/api';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!user) return; listOrders(user.id).then(setOrders).catch(() => setOrders([])).finally(() => setLoading(false)); }, [user]);
  return <main className="container py-5"><p className="eyebrow">Your account</p><h1>Orders</h1>{loading ? <p>Loading orders…</p> : orders.length === 0 ? <p>No orders yet.</p> : <div className="d-grid gap-3">{orders.map((order) => <article className="border p-3" key={order.id}><div className="d-flex justify-content-between"><strong>Order {order.id}</strong><span>{order.status}</span></div><p className="mb-0">{order.total.toFixed(2)} {order.currency}</p></article>)}</div>}</main>;
}
