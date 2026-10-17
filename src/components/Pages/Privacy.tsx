import { useLanguage } from '../../i18n/LanguageProvider';

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('privacy.eyebrow')}</p>
      <h1>{t('privacy.title')}</h1>
      <p>{t('privacy.intro')}</p>
      <h2 className="h4 mt-4">{t('privacy.localTitle')}</h2>
      <p>{t('privacy.localText')}</p>
      <h2 className="h4 mt-4">{t('privacy.productionTitle')}</h2>
      <p>{t('privacy.productionText')}</p>
    </main>
  );
}