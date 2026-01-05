import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant ScrollToTop
 * Scroll automatiquement en haut de la page à chaque changement de route
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
