import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Returns() {
  const { t } = useLanguage();
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('returns.eyebrow')}</p>
      <h1>{t('returns.title')}</h1>
      <p>{t('returns.text')}</p>
      <h2 className="h4 mt-4">{t('returns.futureTitle')}</h2>
      <p>{t('returns.futureText')}</p>
      <p><Link to="/contact">{t('returns.contactPrefix')}</Link> {t('returns.contactSuffix')}</p>
    </main>
  );
}