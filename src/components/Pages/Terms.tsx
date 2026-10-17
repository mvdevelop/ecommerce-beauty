import { useLanguage } from '../../i18n/LanguageProvider';

export default function Terms() {
  const { t } = useLanguage();
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('terms.eyebrow')}</p>
      <h1>{t('terms.title')}</h1>
      <p>{t('terms.intro')}</p>
      <h2 className="h4 mt-4">{t('terms.useTitle')}</h2>
      <p>{t('terms.useText')}</p>
      <h2 className="h4 mt-4">{t('terms.limitsTitle')}</h2>
      <p>{t('terms.limitsText')}</p>
    </main>
  );
}