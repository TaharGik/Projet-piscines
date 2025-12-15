import { useEffect, useRef, useState } from 'react';

/**
 * Hook personnalisé pour détecter quand un élément entre dans le viewport
 * 
 * Utilise l'API Intersection Observer pour déclencher des animations
 * au scroll de manière performante (pas d'événement scroll coûteux).
 * 
 * @param {Object} options - Options de configuration
 * @param {number} options.threshold - Pourcentage de visibilité requis (0 à 1, défaut: 0.1 = 10%)
 * @param {string} options.rootMargin - Marge autour du viewport (défaut: '0px 0px -50px 0px')
 * 
 * @returns {Array} Tuple [ref, isVisible]
 *   - ref: Référence à attacher à l'élément DOM à observer
 *   - isVisible: Boolean indiquant si l'élément est visible
 * 
 * @example
 * const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
 * return <div ref={ref} className={isVisible ? 'visible' : 'hidden'}>...</div>
 */
const useScrollAnimation = (options = {}) => {
  // Référence vers l'élément DOM à observer
  const ref = useRef(null);
  
  // État de visibilité - une fois true, reste true (animation one-shot)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Récupération de l'élément DOM via la ref
    const element = ref.current;
    
    // Si pas d'élément, on ne fait rien
    if (!element) return;

    /**
     * Création de l'Intersection Observer
     * 
     * L'observer surveille quand l'élément entre/sort du viewport.
     * Le callback reçoit un tableau d'entries (ici une seule).
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si l'élément est visible (entre dans le viewport)
        if (entry.isIntersecting) {
          // On active l'état visible
          setIsVisible(true);
          // On arrête d'observer (animation jouée une seule fois)
          observer.unobserve(element);
        }
      },
      {
        // threshold: pourcentage de l'élément qui doit être visible
        // 0.1 = 10% de l'élément visible déclenche le callback
        threshold: options.threshold || 0.1,
        
        // rootMargin: décalage par rapport au viewport
        // '-50px' en bas = déclenche 50px avant que l'élément atteigne le bas
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options,
      }
    );

    // Démarrage de l'observation
    observer.observe(element);

    /**
     * Fonction de nettoyage (cleanup)
     * 
     * Appelée quand le composant est démonté ou quand les deps changent.
     * Évite les fuites mémoire en arrêtant l'observation.
     */
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin]); // Re-exécute si les options changent

  // Retourne le tuple [ref à attacher, état de visibilité]
  return [ref, isVisible];
};

export default useScrollAnimation;
