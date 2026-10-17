import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import type { BlogPost } from '../../types/blog';
import { ProductCard } from '../product/ProductCard';
import { useLanguage } from '../../i18n/LanguageProvider';
import serviceIcon1 from '../../assets/service-icon-1.svg';
import serviceIcon2 from '../../assets/service-icon-2.svg';
import serviceIcon3 from '../../assets/service-icon-3.svg';
import banner1 from '../../assets/banner-1.webp';
import banner2 from '../../assets/banner-2.webp';
import discover1 from '../../assets/discover-1.webp';
import heroBackground from '../../assets/hero-bg-1.webp';
import brandLogo1 from '../../assets/brand-logo-1.png';
import brandLogo2 from '../../assets/brand-logo-2.png';
import brandLogo3 from '../../assets/brand-logo-3.png';
import brandLogo4 from '../../assets/brand-logo-4.png';
import brandLogo5 from '../../assets/brand-logo-5.png';
import brandLogo6 from '../../assets/brand-logo-6.png';

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero__content">
        <p className="eyebrow">{t('home.heroEyebrow')}</p>
        <h1 id="home-title">{t('home.heroTitle')}</h1>
        <p>{t('home.heroText')}</p>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn hero-btn" to="/shop">{t('home.heroCta')}</Link>
          <Link className="btn btn-outline-dark" to="/about">{t('home.heroSecondaryCta')}</Link>
        </div>
      </div>
      <div className="home-hero__visual" style={{ backgroundImage: `url(${heroBackground})` }} role="img" aria-label={t('home.heroImageAlt')} />
    </section>
  );
}

export function ServiceHighlights() {
  const { t } = useLanguage();
  const services = [
    [serviceIcon1, t('home.service1Title'), t('home.service1Text')],
    [serviceIcon2, t('home.service2Title'), t('home.service2Text')],
    [serviceIcon3, t('home.service3Title'), t('home.service3Text')],
  ];
  return (
    <section className="container py-5" aria-labelledby="service-heading">
      <h2 id="service-heading" className="visually-hidden">{t('home.servicesHeading')}</h2>
      <div className="row g-4">
        {services.map(([icon, title, text]) => (
          <div className="col-md-4" key={title}>
            <article className="service-card">
              <img src={icon} alt="" width="55" height="55" />
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

interface ProductSectionProps { products: Product[]; onWishlist: (product: Product) => void; onCart: (product: Product) => void; wishlistedIds: number[] }
export function FeaturedProductsSection({ products, onWishlist, onCart, wishlistedIds }: ProductSectionProps) {
  const { t } = useLanguage();
  return (
    <section className="container py-5" aria-labelledby="featured-products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('home.featuredEyebrow')}</p>
          <h2 id="featured-products">{t('home.featuredTitle')}</h2>
        </div>
        <Link to="/shop">{t('home.featuredAll')}</Link>
      </div>
      <div className="row g-4">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} className="col-6 col-md-4 col-lg-2" product={product} onAddToCart={onCart} onToggleWishlist={onWishlist} wishlisted={wishlistedIds.includes(product.id)} />
        ))}
      </div>
    </section>
  );
}

export function PromoBannerSection() {
  const { t } = useLanguage();
  return (
    <section className="container py-5" aria-labelledby="campaign-heading">
      <div className="campaign-grid">
        <Link className="campaign-card campaign-card--mint" to="/shop">
          <img src={banner1} alt={t('home.promo1Alt')} loading="lazy" />
          <div>
            <p className="eyebrow">{t('home.promo1Eyebrow')}</p>
            <h2 id="campaign-heading">{t('home.promo1Title')}</h2>
            <span>{t('home.promo1Cta')}</span>
          </div>
        </Link>
        <Link className="campaign-card campaign-card--warm" to="/shop">
          <img src={banner2} alt={t('home.promo2Alt')} loading="lazy" />
          <div>
            <p className="eyebrow">{t('home.promo2Eyebrow')}</p>
            <h2>{t('home.promo2Title')}</h2>
            <span>{t('home.promo2Cta')}</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function DiscoverSection() {
  const { t } = useLanguage();
  return (
    <section className="discover-section py-5" aria-labelledby="discover-heading">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <img className="discover-image" src={discover1} alt={t('home.discoverAlt')} loading="lazy" />
          </div>
          <div className="col-md-6 px-lg-5">
            <p className="eyebrow">{t('home.discoverEyebrow')}</p>
            <h2 id="discover-heading">{t('home.discoverTitle')}</h2>
            <p>{t('home.discoverText')}</p>
            <Link className="btn" to="/shop">{t('home.discoverCta')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandShowcase() {
  const { t } = useLanguage();
  const brands = [brandLogo1, brandLogo2, brandLogo3, brandLogo4, brandLogo5, brandLogo6];
  return (
    <section className="container py-5 text-center" aria-labelledby="brands-heading">
      <p className="eyebrow">{t('home.brandsEyebrow')}</p>
      <h2 id="brands-heading">{t('home.brandsTitle')}</h2>
      <div className="brand-grid">
        {brands.map((brand, index) => (
          <img key={brand} src={brand} alt={t('home.brandAlt', { index: index + 1 })} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

export function EditorialSection({ posts }: { posts: BlogPost[] }) {
  const { t } = useLanguage();
  return (
    <section className="container py-5" aria-labelledby="journal-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('home.editorialEyebrow')}</p>
          <h2 id="journal-heading">{t('home.editorialTitle')}</h2>
        </div>
        <Link to="/blog">{t('home.editorialAll')}</Link>
      </div>
      <div className="row g-4">
        {posts.slice(0, 3).map((post) => (
          <article className="col-md-4" key={post.id}>
            <Link className="editorial-card" to="/blog">
              <img src={post.image} alt="" loading="lazy" />
              <p>{post.title}</p>
              <h3>{post.name}</h3>
              <span>{post.date}</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const { t } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); event.currentTarget.reset(); };
  return (
    <section className="newsletter-section py-5" aria-labelledby="newsletter-heading">
      <div className="container text-center">
        <p className="eyebrow">{t('home.newsletterEyebrow')}</p>
        <h2 id="newsletter-heading">{t('home.newsletterTitle')}</h2>
        <p>{t('home.newsletterText')}</p>
        <form className="newsletter-form" onSubmit={submit}>
          <label className="visually-hidden" htmlFor="newsletter-email">{t('home.newsletterEmail')}</label>
          <input id="newsletter-email" type="email" required placeholder={t('home.newsletterPlaceholder')} />
          <button className="btn" type="submit">{t('home.newsletterSubmit')}</button>
        </form>
        {subscribed && <p className="mt-3" role="status" aria-live="polite">{t('home.newsletterSuccess')}</p>}
      </div>
    </section>
  );
}