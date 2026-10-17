import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Shipping() {
  const { t } = useLanguage();
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('shipping.eyebrow')}</p>
      <h1>{t('shipping.title')}</h1>
      <p>{t('shipping.text')}</p>
      <h2 className="h4 mt-4">{t('shipping.futureTitle')}</h2>
      <p>{t('shipping.futureText')}</p>
      <p><Link to="/contact">{t('shipping.contactPrefix')}</Link> {t('shipping.contactSuffix')}</p>
    </main>
  );
}