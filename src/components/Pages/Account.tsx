import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Account() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  if (!user) return null;
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('account.eyebrow')}</p>
      <h1>{t('account.greeting', { name: user.displayName })}</h1>
      <p>{user.email}</p>
      <p className="text-muted">{t('account.subtitle')}</p>
      <div className="row g-3 mt-3">
        <div className="col-md-4">
          <Link className="d-block border p-4 h-100 text-decoration-none" to="/account/orders">
            <h2 className="h5">{t('account.myOrders')}</h2>
            <p>{t('account.myOrdersDescription')}</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link className="d-block border p-4 h-100 text-decoration-none" to="/account/favorites">
            <h2 className="h5">{t('account.myFavorites')}</h2>
            <p>{t('account.myFavoritesDescription')}</p>
          </Link>
        </div>
        <div className="col-md-4">
          <Link className="d-block border p-4 h-100 text-decoration-none" to="/shop">
            <h2 className="h5">{t('account.continueShopping')}</h2>
            <p>{t('account.continueShoppingDescription')}</p>
          </Link>
        </div>
      </div>
      <button className="btn btn-outline-secondary mt-4" type="button" onClick={logout}>{t('account.logout')}</button>
    </main>
  );
}