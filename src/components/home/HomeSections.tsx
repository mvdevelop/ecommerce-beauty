import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import type { BlogPost } from '../../types/blog';
import { ProductCard } from '../product/ProductCard';
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
  return <section className="home-hero" aria-labelledby="home-title"><div className="home-hero__content"><p className="eyebrow">Beleza com propósito, todos os dias</p><h1 id="home-title">Beleza inspirada na vida real.</h1><p>Essenciais limpos e bem pensados para transformar o seu ritual diário em algo extraordinário.</p><div className="d-flex gap-2 flex-wrap"><Link className="btn hero-btn" to="/shop">Ver a coleção</Link><Link className="btn btn-outline-dark" to="/about">Nossa filosofia</Link></div></div><div className="home-hero__visual" style={{ backgroundImage: `url(${heroBackground})` }} role="img" aria-label="Coleção de beleza Blushify" /></section>;
}

export function ServiceHighlights() {
  const services = [[serviceIcon1, 'Fórmulas cuidadosas', 'Produzidas com ingredientes selecionados com atenção.'], [serviceIcon2, 'Frete grátis', 'Entrega cortesia em pedidos elegíveis.'], [serviceIcon3, 'Estamos aqui', 'Atendimento próximo para o seu ritual de beleza.']];
  return <section className="container py-5" aria-labelledby="service-heading"><h2 id="service-heading" className="visually-hidden">Por que comprar na Blushify</h2><div className="row g-4">{services.map(([icon, title, text]) => <div className="col-md-4" key={title}><article className="service-card"><img src={icon} alt="" width="55" height="55" /><div><h3>{title}</h3><p>{text}</p></div></article></div>)}</div></section>;
}

interface ProductSectionProps { products: Product[]; onWishlist: (product: Product) => void; onCart: (product: Product) => void; wishlistedIds: number[] }
export function FeaturedProductsSection({ products, onWishlist, onCart, wishlistedIds }: ProductSectionProps) {
  return <section className="container py-5" aria-labelledby="featured-products"><div className="section-heading"><div><p className="eyebrow">Selecionados para você</p><h2 id="featured-products">Mais vendidos que valem conhecer</h2></div><Link to="/shop">Ver todos os produtos →</Link></div><div className="row g-4">{products.slice(0, 6).map((product) => <ProductCard key={product.id} className="col-6 col-md-4 col-lg-2" product={product} onAddToCart={onCart} onToggleWishlist={onWishlist} wishlisted={wishlistedIds.includes(product.id)} />)}</div></section>;
}

export function PromoBannerSection() {
  return <section className="container py-5" aria-labelledby="campaign-heading"><div className="campaign-grid"><Link className="campaign-card campaign-card--mint" to="/shop"><img src={banner1} alt="Produtos de beleza Blushify" loading="lazy" /><div><p className="eyebrow">Novo ritual</p><h2 id="campaign-heading">Abra espaço para o seu brilho.</h2><span>Explorar skincare →</span></div></Link><Link className="campaign-card campaign-card--warm" to="/shop"><img src={banner2} alt="Coleção de essenciais de beleza" loading="lazy" /><div><p className="eyebrow">Essenciais do dia a dia</p><h2>Passos pequenos, resultados bonitos.</h2><span>Ver essenciais →</span></div></Link></div></section>;
}

export function DiscoverSection() {
  return <section className="discover-section py-5" aria-labelledby="discover-heading"><div className="container"><div className="row g-4 align-items-center"><div className="col-md-6"><img className="discover-image" src={discover1} alt="Um ritual de beleza tranquilo com texturas naturais" loading="lazy" /></div><div className="col-md-6 px-lg-5"><p className="eyebrow">Seu ritual, do seu jeito</p><h2 id="discover-heading">Encontre a beleza que tem a sua cara.</h2><p>Monte uma rotina simples em torno do que a sua pele precisa hoje. Descubra essenciais suaves e eficazes, pensados para a vida real.</p><Link className="btn" to="/shop">Descobrir seu ritual</Link></div></div></div></section>;
}

export function BrandShowcase() {
  const brands = [brandLogo1, brandLogo2, brandLogo3, brandLogo4, brandLogo5, brandLogo6];
  return <section className="container py-5 text-center" aria-labelledby="brands-heading"><p className="eyebrow">Amada por quem entende de beleza</p><h2 id="brands-heading">Marcas em que acreditamos</h2><div className="brand-grid">{brands.map((brand, index) => <img key={brand} src={brand} alt={`Marca parceira ${index + 1}`} loading="lazy" />)}</div></section>;
}

export function EditorialSection({ posts }: { posts: BlogPost[] }) {
  return <section className="container py-5" aria-labelledby="journal-heading"><div className="section-heading"><div><p className="eyebrow">O diário Blushify</p><h2 id="journal-heading">Notas para o seu ritual</h2></div><Link to="/blog">Ler o diário →</Link></div><div className="row g-4">{posts.slice(0, 3).map((post) => <article className="col-md-4" key={post.id}><Link className="editorial-card" to="/blog"><img src={post.image} alt="" loading="lazy" /><p>{post.title}</p><h3>{post.name}</h3><span>{post.date}</span></Link></article>)}</div></section>;
}

export function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); event.currentTarget.reset(); };
  return <section className="newsletter-section py-5" aria-labelledby="newsletter-heading"><div className="container text-center"><p className="eyebrow">Inspire-se com a Blushify</p><h2 id="newsletter-heading">Beleza sem excesso.</h2><p>Receba dicas, novidades e ofertas especiais.</p><form className="newsletter-form" onSubmit={submit}><label className="visually-hidden" htmlFor="newsletter-email">E-mail</label><input id="newsletter-email" type="email" required placeholder="Seu e-mail" /><button className="btn" type="submit">Assinar</button></form>{subscribed && <p className="mt-3" role="status" aria-live="polite">Inscrição registrada para demonstração. Obrigado!</p>}</div></section>;
}
