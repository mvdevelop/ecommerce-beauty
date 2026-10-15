import { useEffect, type ReactNode } from 'react';

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  useEffect(() => { if (!open) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown); }, [onClose, open]);
  if (!open) return null;
  return <div className="ui-modal-backdrop" role="presentation" onClick={onClose}><section className="ui-modal" role="dialog" aria-modal="true" aria-labelledby="ui-modal-title" onClick={(event) => event.stopPropagation()}><div className="d-flex justify-content-between align-items-center"><h2 id="ui-modal-title">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog">×</button></div>{children}</section></div>;
}
