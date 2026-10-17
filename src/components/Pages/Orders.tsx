import { useEffect, useState } from 'react';
import { listOrders } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../i18n/LanguageProvider';
import { EmptyState, ErrorState } from '../ui/Primitives';
import type { ApiOrder } from '../../types/api';

export default function Orders() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setFailed(false);
    listOrders(user.id)
      .then(setOrders)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [user]);
  const statusLabel = (status: ApiOrder['status']) => t(`orders.status.${status}` as 'orders.status.pending');

  return (
    <main className="container py-5">
      <p className="eyebrow">{t('orders.eyebrow')}</p>
      <h1>{t('orders.title')}</h1>
      {loading ? (
        <p>{t('orders.loading')}</p>
      ) : failed ? (
        <ErrorState onRetry={() => { if (!user) return; setLoading(true); setFailed(false); listOrders(user.id).then(setOrders).catch(() => setFailed(true)).finally(() => setLoading(false)); }} title={t('orders.errorTitle')} description={t('orders.errorDescription')} />
      ) : orders.length === 0 ? (
        <EmptyState title={t('orders.empty')} description={t('orders.emptyDescription')} />
      ) : (
        <div className="d-grid gap-3">
          {orders.map((order) => (
            <article className="border p-3" key={order.id}>
              <div className="d-flex justify-content-between">
                <strong>{t('orders.orderLabel', { id: order.id })}</strong>
                <span>{statusLabel(order.status)}</span>
              </div>
              <p className="mb-0">{order.total.toFixed(2)} {order.currency}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

// removed unused placeholder