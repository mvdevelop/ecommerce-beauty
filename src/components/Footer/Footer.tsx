import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-top mt-5 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3">
            <strong>{t('common.brand')}</strong>
            <p className="mt-2 mb-0">{t('footer.tagline')}</p>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="h6">{t('footer.buy')}</h2>
            <nav className="d-grid gap-2" aria-label={t('footer.buyLinks')}>
              <Link to="/shop">{t('common.shop')}</Link>
              <Link to="/wishlist">{t('common.favorites')}</Link>
              <Link to="/cart">{t('common.cart')}</Link>
            </nav>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="h6">{t('footer.help')}</h2>
            <nav className="d-grid gap-2" aria-label={t('footer.helpLinks')}>
              <Link to="/contact">{t('footer.contact')}</Link>
              <Link to="/shipping">{t('footer.shipping')}</Link>
              <Link to="/returns">{t('footer.returns')}</Link>
            </nav>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="h6">{t('footer.company')}</h2>
            <nav className="d-grid gap-2" aria-label={t('footer.companyLinks')}>
              <Link to="/about">{t('footer.about')}</Link>
              <Link to="/blog">{t('footer.blog')}</Link>
              <Link to="/store">{t('footer.stores')}</Link>
              <Link to="/privacy">{t('footer.privacy')}</Link>
              <Link to="/terms">{t('footer.terms')}</Link>
            </nav>
          </div>
        </div>
        <p className="border-top mt-4 pt-3 mb-0">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}