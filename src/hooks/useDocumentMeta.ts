import { useEffect } from 'react';

interface DocumentMetaOptions {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

function setMeta(name: string, content: string | undefined): void {
  if (!content) return;
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function setProperty(property: string, content: string | undefined): void {
  if (!content) return;
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function useDocumentMeta({ title, description, image, url }: DocumentMetaOptions): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    setMeta('description', description);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:image', image);
    setProperty('og:url', url ?? window.location.href);
    return () => { document.title = previousTitle; };
  }, [description, image, title, url]);
}
