import { useEffect, useRef, useState, type ReactNode } from 'react';

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: .12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export function FadeIn({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return <div ref={ref} className={`motion-fade ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}
