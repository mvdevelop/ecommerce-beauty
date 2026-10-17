import { useLanguage } from '../../i18n/LanguageProvider';
import { LOCALE_LABELS, LOCALE_SHORT } from '../../i18n/types';

interface LanguageSelectProps {
  compact?: boolean;
  onPick?: () => void;
}

// Reusable locale selector. In compact mode it renders the current short code
// (PT/EN/ES) inside a <select>; otherwise it renders the three locales as a list
// of buttons, used inside the mobile drawer.
export default function LanguageSelect({ compact = false, onPick }: LanguageSelectProps) {
  const { locale, setLocale } = useLanguage();

  if (compact) {
    return (
      <label className="nav-language" aria-label="Idioma">
        <span className="visually-hidden">Idioma</span>
        <select
          className="nav-language__select"
          value={locale}
          aria-label="Alterar idioma"
          onChange={(event) => setLocale(event.target.value as 'pt-BR' | 'en' | 'es')}
        >
          {(['pt-BR', 'en', 'es'] as const).map((code) => (
            <option key={code} value={code}>
              {LOCALE_SHORT[code]}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <ul className="nav-language-list" role="list">
      {(['pt-BR', 'en', 'es'] as const).map((code) => (
        <li key={code}>
          <button
            type="button"
            className={code === locale ? 'is-active' : undefined}
            aria-pressed={code === locale}
            onClick={() => {
              setLocale(code);
              onPick?.();
            }}
          >
            {LOCALE_LABELS[code]}
          </button>
        </li>
      ))}
    </ul>
  );
}
