import { useEffect, useId, type ReactNode } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  const { t } = useLanguage();
  const titleId = useId();
  useEffect(() => { if (!open) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown); }, [onClose, open]);
  if (!open) return null;
  return <div className="ui-modal-backdrop" role="presentation" onClick={onClose}><section className="ui-modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}><div className="d-flex justify-content-between align-items-center"><h2 id={titleId}>{title}</h2><button type="button" onClick={onClose} aria-label={t('a11y.closeDialog')}>×</button></div>{children}</section></div>;
}
