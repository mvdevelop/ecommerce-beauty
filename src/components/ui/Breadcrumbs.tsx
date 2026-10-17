import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface Crumb { label: string; to?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useLanguage();
  return <nav className="breadcrumbs" aria-label={t('common.home') === 'Início' ? 'Trilha de navegação' : 'Breadcrumb navigation'}><ol>{items.map((item, index) => {
    const isLast = index === items.length - 1;
    return <li key={`${item.label}-${index}`}>{isLast || !item.to ? <span aria-current={isLast ? 'page' : undefined}>{item.label}</span> : <Link to={item.to}>{item.label}</Link>}</li>;
  })}</ol></nav>;
}
