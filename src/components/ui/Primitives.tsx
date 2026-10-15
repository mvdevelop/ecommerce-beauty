import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function Button({ children, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline'; children: ReactNode }) {
  return <button className={`ui-button ui-button--${variant}`} {...props}>{children}</button>;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ui-input" {...props} />;
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`ui-skeleton ${className}`} />;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <section className="ui-state" aria-live="polite"><h2>{title}</h2><p>{description}</p></section>;
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return <section className="ui-state" role="alert"><h2>Something went wrong</h2><p>We could not load this content. Please try again.</p>{onRetry && <Button onClick={onRetry}>Try again</Button>}</section>;
}
