import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Stores() {
  const { t } = useLanguage();
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('stores.eyebrow')}</p>
      <h1>{t('stores.title')}</h1>
      <p>{t('stores.text')}</p>
      <div className="border p-4 mt-4 col-lg-7">
        <h2 className="h5">{t('stores.meantimeTitle')}</h2>
        <p>{t('stores.meantimeText')}</p>
        <Link className="btn btn-primary me-2" to="/shop">{t('common.exploreShop')}</Link>
        <Link className="btn btn-outline-secondary" to="/contact">{t('stores.contact')}</Link>
      </div>
    </main>
  );
}