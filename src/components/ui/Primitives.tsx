import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';

export function Button({ children, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline'; children: ReactNode }) {
  return <button className={`ui-button ui-button--${variant}`} {...props}>{children}</button>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ui-input" {...props} />;
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`ui-skeleton ${className}`} />;
}

export function EmptyState({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <section className="ui-state" aria-live="polite"><h2>{title}</h2><p>{description}</p>{children}</section>;
}

export function ErrorState({ onRetry, title, description }: { onRetry?: () => void; title?: string; description?: string }) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t('state.errorTitle');
  const resolvedDescription = description ?? t('state.errorDescription');
  return <section className="ui-state" role="alert"><h2>{resolvedTitle}</h2><p>{resolvedDescription}</p>{onRetry && <Button onClick={onRetry}>{t('common.retry')}</Button>}</section>;
}
