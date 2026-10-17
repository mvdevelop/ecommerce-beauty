import { useLanguage } from '../../i18n/LanguageProvider';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product';

export function ProductSuggestions({ products, excludeIds = [] }: { products: Product[]; excludeIds?: number[] }) {
  const { t } = useLanguage();
  const visible = products.filter((product) => !excludeIds.includes(product.id)).slice(0, 4);
  if (visible.length === 0) return null;
  return (
    <section className="mt-4" aria-labelledby="product-suggestions">
      <h2 id="product-suggestions" className="h5">{t('product.suggestionsTitle')}</h2>
      <p className="text-muted">{t('product.suggestionsDescription')}</p>
      <div className="row g-4">
        {visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}