import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import type { BlogPost } from '../../types/blog';
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
  return <section className="home-hero" aria-labelledby="home-title"><div className="home-hero__content"><p className="eyebrow">Thoughtful beauty, everyday</p><h1 id="home-title">Beauty inspired by real life.</h1><p>Clean, considered essentials that make your everyday ritual feel extraordinary.</p><div className="d-flex gap-2 flex-wrap"><Link className="btn hero-btn" to="/shop">Shop the collection</Link><Link className="btn btn-outline-dark" to="/about">Our philosophy</Link></div></div><div className="home-hero__visual" style={{ backgroundImage: `url(${heroBackground})` }} role="img" aria-label="Blushify beauty collection" /></section>;
}

export function ServiceHighlights() {
  const services = [[serviceIcon1, 'Thoughtful formulas', 'Made with carefully selected ingredients.'], [serviceIcon2, 'Free shipping', 'Complimentary delivery on qualifying orders.'], [serviceIcon3, 'Here to help', 'Friendly support for your beauty ritual.']];
  return <section className="container py-5" aria-labelledby="service-heading"><h2 id="service-heading" className="visually-hidden">Why shop Blushify</h2><div className="row g-4">{services.map(([icon, title, text]) => <div className="col-md-4" key={title}><article className="service-card"><img src={icon} alt="" width="55" height="55" /><div><h3>{title}</h3><p>{text}</p></div></article></div>)}</div></section>;
}

interface ProductSectionProps { products: Product[]; onWishlist: (product: Product) => void; onCart: (product: Product) => void; }
export function FeaturedProductsSection({ products, onWishlist, onCart }: ProductSectionProps) {
  return <section className="container py-5" aria-labelledby="featured-products"><div className="section-heading"><div><p className="eyebrow">Curated for you</p><h2 id="featured-products">Bestsellers worth knowing</h2></div><Link to="/shop">View all products →</Link></div><div className="row g-4">{products.slice(0, 6).map((product) => <article className="col-6 col-md-4 col-lg-2 product-card" key={product.id}><Link to={`/product/${product.id}`}><div className="product-card__image"><img src={product.image} alt={product.ProductName} loading="lazy" />{product.tag && <span>{product.tag}</span>}</div><h3>{product.ProductName}</h3><p>{product.price}</p></Link><div className="product-card__actions"><button type="button" aria-label={`Add ${product.ProductName} to wishlist`} onClick={() => onWishlist(product)}>♡</button><button type="button" aria-label={`Add ${product.ProductName} to cart`} onClick={() => onCart(product)}>+</button></div></article>)}</div></section>;
}

export function PromoBannerSection() {
  return <section className="container py-5" aria-labelledby="campaign-heading"><div className="campaign-grid"><Link className="campaign-card campaign-card--mint" to="/shop"><img src={banner1} alt="Blushify beauty products" loading="lazy" /><div><p className="eyebrow">New ritual</p><h2 id="campaign-heading">Make space for your glow.</h2><span>Explore skincare →</span></div></Link><Link className="campaign-card campaign-card--warm" to="/shop"><img src={banner2} alt="Beauty essentials collection" loading="lazy" /><div><p className="eyebrow">Everyday essentials</p><h2>Small steps, beautiful results.</h2><span>Shop essentials →</span></div></Link></div></section>;
}

export function DiscoverSection() {
  return <section className="discover-section py-5" aria-labelledby="discover-heading"><div className="container"><div className="row g-4 align-items-center"><div className="col-md-6"><img className="discover-image" src={discover1} alt="A calm beauty ritual with natural textures" loading="lazy" /></div><div className="col-md-6 px-lg-5"><p className="eyebrow">Your ritual, your way</p><h2 id="discover-heading">Find beauty that feels like you.</h2><p>Build a simple routine around what your skin needs today. Discover gentle, effective essentials designed to fit real life.</p><Link className="btn" to="/shop">Discover your routine</Link></div></div></div></section>;
}

export function BrandShowcase() {
  const brands = [brandLogo1, brandLogo2, brandLogo3, brandLogo4, brandLogo5, brandLogo6];
  return <section className="container py-5 text-center" aria-labelledby="brands-heading"><p className="eyebrow">Loved by beauty lovers</p><h2 id="brands-heading">Brands we believe in</h2><div className="brand-grid">{brands.map((brand, index) => <img key={brand} src={brand} alt={`Partner brand ${index + 1}`} loading="lazy" />)}</div></section>;
}

export function EditorialSection({ posts }: { posts: BlogPost[] }) {
  return <section className="container py-5" aria-labelledby="journal-heading"><div className="section-heading"><div><p className="eyebrow">The Blushify journal</p><h2 id="journal-heading">Notes for your ritual</h2></div><Link to="/blog">Read the journal →</Link></div><div className="row g-4">{posts.slice(0, 3).map((post) => <article className="col-md-4" key={post.id}><Link className="editorial-card" to="/blog"><img src={post.image} alt="" loading="lazy" /><p>{post.title}</p><h3>{post.name}</h3><span>{post.date}</span></Link></article>)}</div></section>;
}

export function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); event.currentTarget.reset(); };
  return <section className="newsletter-section py-5" aria-labelledby="newsletter-heading"><div className="container text-center"><p className="eyebrow">Inspire-se com a Blushify</p><h2 id="newsletter-heading">Beleza sem excesso.</h2><p>Receba dicas, novidades e ofertas especiais.</p><form className="newsletter-form" onSubmit={submit}><label className="visually-hidden" htmlFor="newsletter-email">E-mail</label><input id="newsletter-email" type="email" required placeholder="Seu e-mail" /><button className="btn" type="submit">Assinar</button></form>{subscribed && <p className="mt-3" role="status" aria-live="polite">Inscrição registrada para demonstração. Obrigado!</p>}</div></section>;
}
