import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';
import type { Product } from '../../types/product';
import { TAG_LABELS } from '../../lib/products';

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onRemove?: (product: Product) => void;
  wishlisted?: boolean;
  priority?: boolean;
}

export function ProductCard({ product, className = 'col-6 col-md-4 col-lg-3', onAddToCart, onToggleWishlist, onRemove, wishlisted = false, priority = false }: ProductCardProps) {
  const hasActions = Boolean(onAddToCart || onToggleWishlist || onRemove);
  const { t } = useLanguage();
  return <article className={`product-card ${className}`}><Link to={`/product/${product.id}`}><div className="product-card__image"><img src={product.image} alt={product.ProductName} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />{product.tag && <span className={`product-card__badge product-card__badge--${product.tag.toLowerCase()}`}>{TAG_LABELS[product.tag]}</span>}</div><h3 className="product-card__name">{product.ProductName}</h3><p className="product-card__prices">{product.oldPrice && <s className="product-card__old-price">{product.oldPrice}</s>}{product.price}</p></Link>{hasActions && <div className="product-card__actions">{onToggleWishlist && <button type="button" aria-pressed={wishlisted} aria-label={t('product.wishlistAria', { name: product.ProductName, saved: wishlisted ? 1 : 0 })} onClick={() => onToggleWishlist(product)}><span aria-hidden="true">♡</span></button>}{onAddToCart && <button type="button" aria-label={t('product.addToCartAria', { name: product.ProductName })} onClick={() => onAddToCart(product)}><span aria-hidden="true">+</span></button>}{onRemove && <button type="button" onClick={() => onRemove(product)}>{t('common.remove')}</button>}</div>}</article>;
}
