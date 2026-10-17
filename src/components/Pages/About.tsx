import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function About() {
  const { t } = useLanguage();
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('about.eyebrow')}</p>
      <h1>{t('about.title')}</h1>
      <p className="lead">{t('about.lead')}</p>
      <div className="row g-4 mt-3">
        <div className="col-md-4"><h2 className="h5">{t('about.card1Title')}</h2><p>{t('about.card1Text')}</p></div>
        <div className="col-md-4"><h2 className="h5">{t('about.card2Title')}</h2><p>{t('about.card2Text')}</p></div>
        <div className="col-md-4"><h2 className="h5">{t('about.card3Title')}</h2><p>{t('about.card3Text')}</p></div>
      </div>
      <Link className="btn btn-primary mt-4" to="/shop">{t('common.exploreShop')}</Link>
    </main>
  );
}