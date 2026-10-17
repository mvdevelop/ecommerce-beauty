import { useState, type FormEvent } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };
  return (
    <main className="container py-5">
      <p className="eyebrow">{t('contact.eyebrow')}</p>
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.text')}</p>
      <form onSubmit={submit} className="col-lg-6">
        <label htmlFor="name" className="form-label">{t('common.name')}</label>
        <input id="name" className="form-control mb-3" required />
        <label htmlFor="email" className="form-label">{t('common.email')}</label>
        <input id="email" type="email" className="form-control mb-3" required />
        <label htmlFor="message" className="form-label">{t('common.message')}</label>
        <textarea id="message" className="form-control mb-3" required rows={5} />
        <button className="btn btn-primary" type="submit">{t('contact.submit')}</button>
        {sent && <p className="mt-3" role="status" aria-live="polite">{t('contact.success')}</p>}
      </form>
    </main>
  );
}