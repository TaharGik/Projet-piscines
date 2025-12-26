import { useEffect } from 'react';

/**
 * Hook personnalise pour gerer le titre de la page
 * Utile pour le SEO dans une application React
 * @param {string} title - Le titre de la page
 * @param {string} suffix - Suffixe optionnel (nom de l'entreprise)
 */
const useDocumentTitle = (title, suffix = 'BBH SERVICE') => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${suffix}` : suffix;
    
    // Nettoyer en restaurant le titre precedent si necessaire
    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};

export default useDocumentTitle;
