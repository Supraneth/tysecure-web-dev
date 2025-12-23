import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // 1) conteneur scroll custom (si votre layout scroll dans un div)
    const scrollContainer =
      (document.querySelector('[data-scroll-container]') as HTMLElement | null) ??
      null;

    // 2) scroll "standard" du document
    const scrollingElement =
      (document.scrollingElement as HTMLElement | null) ??
      (document.documentElement as HTMLElement | null);

    // Si on a un hash (#valeurs), on laisse le navigateur gérer l’ancre
    // (sinon on casserait le scroll vers la section).
    if (location.hash) return;

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    if (scrollingElement) {
      scrollingElement.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.key]);

  return null;
}
