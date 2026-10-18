import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartSubtotal, removeCartItem } from '../../lib/cart';
import { CART_UPDATED_EVENT, SAVED_UPDATED_EVENT, getCart } from '../../lib/storage';
import { useLanguage } from '../../i18n/LanguageProvider';
import type { CartItem } from '../../types/product';

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => getCart());
  const titleId = useId();
  const { t } = useLanguage();
  useEffect(() => { const refresh = () => setItems(getCart()); window.addEventListener(CART_UPDATED_EVENT, refresh); window.addEventListener(SAVED_UPDATED_EVENT, refresh); return () => { window.removeEventListener(CART_UPDATED_EVENT, refresh); window.removeEventListener(SAVED_UPDATED_EVENT, refresh); }; }, []);
  return (
    <>
      <button type="button" className="mini-cart-trigger" onClick={() => setOpen(true)} aria-label={t('miniCart.triggerAria', { count: items.length })}>
        🛒 <span>{items.length}</span>
      </button>
      {open && (
        <div className="mini-cart-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <aside className="mini-cart" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center">
              <h2 id={titleId}>{t('miniCart.title')}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label={t('miniCart.close')}>×</button>
            </div>
            {items.length === 0 ? (
              <p>{t('miniCart.empty')}</p>
            ) : (
              <>
                {items.map((item) => (
                  <article className="mini-cart-item" key={item.id}>
                    <img src={item.image} alt="" width="56" height="56" />
                    <div>
                      <strong>{item.ProductName}</strong>
                      <p>{item.quantity} × {item.price}</p>
                    </div>
                    <button type="button" aria-label={t('miniCart.removeAria', { name: item.ProductName })} onClick={() => setItems(removeCartItem(item.id))}>×</button>
                  </article>
                ))}
                <strong className="d-block mt-3">{t('miniCart.subtotalValue', { value: `$${cartSubtotal(items).toFixed(2)}` })}</strong>
                <Link className="btn w-100 mt-3" to="/cart" onClick={() => setOpen(false)}>{t('miniCart.viewCart')}</Link>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
