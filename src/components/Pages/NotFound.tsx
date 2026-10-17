import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="container py-5 text-center" aria-labelledby="not-found-title">
      <h1 id="not-found-title">{t('notFound.title')}</h1>
      <p className="mb-4">{t('notFound.text')}</p>
      <Link className="btn btn-primary" to="/">{t('common.backHome')}</Link>
    </main>
  );
}