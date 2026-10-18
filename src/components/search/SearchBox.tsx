import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCatalog } from '../../hooks/useCatalog';
import { useDismissable } from '../../hooks/useDismissable';
import { useLanguage } from '../../i18n/LanguageProvider';

const MAX_SUGGESTIONS = 6;

export default function SearchBox() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { products: catalogProducts } = useCatalog();
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('q') ?? '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const container = useDismissable<HTMLFormElement>(open, () => setOpen(false));
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the field in sync when navigation changes the query (e.g. back/forward).
  useEffect(() => { setQuery(new URLSearchParams(location.search).get('q') ?? ''); }, [location.search]);

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return catalogProducts.filter((product) => `${product.ProductName} ${product.description ?? ''}`.toLowerCase().includes(term)).slice(0, MAX_SUGGESTIONS);
  }, [catalogProducts, query]);

  const goToShop = (value: string) => {
    const trimmed = value.trim();
    setOpen(false);
    setActiveIndex(-1);
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = suggestions[activeIndex];
    goToShop(selected ? selected.ProductName : query);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') { setOpen(false); setActiveIndex(-1); return; }
    if (!suggestions.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((index) => (index + 1) % suggestions.length); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1)); }
    else if (event.key === 'Enter' && activeIndex >= 0) { event.preventDefault(); const selected = suggestions[activeIndex]; if (selected) { setOpen(false); navigate(`/product/${selected.id}`); } }
  };

  const listVisible = open && suggestions.length > 0;
  return <form className="nav-search" role="search" onSubmit={submit} ref={container}>
    <label className="visually-hidden" htmlFor="site-search">{t('search.label')}</label>
    <input id="site-search" ref={inputRef} value={query} autoComplete="off" role="combobox" aria-expanded={listVisible} aria-controls="search-suggestions" aria-autocomplete="list" aria-activedescendant={listVisible && activeIndex >= 0 ? `search-suggestion-${activeIndex}` : undefined} placeholder={t('search.placeholder')} onChange={(event) => { setQuery(event.target.value); setOpen(true); setActiveIndex(-1); }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown} />
    <button type="submit" aria-label={t('search.submit')}>⌕</button>
    {listVisible && <ul className="search-suggestions" id="search-suggestions" role="listbox" aria-label={t('search.suggestions')}>{suggestions.map((product, index) => <li key={product.id} id={`search-suggestion-${index}`} role="option" aria-selected={index === activeIndex} className={index === activeIndex ? 'is-active' : undefined} onMouseEnter={() => setActiveIndex(index)}><button type="button" onClick={() => { setOpen(false); navigate(`/product/${product.id}`); }}><img src={product.image} alt="" width="36" height="36" /><span>{product.ProductName}</span><small>{product.price}</small></button></li>)}</ul>}
  </form>;
}
