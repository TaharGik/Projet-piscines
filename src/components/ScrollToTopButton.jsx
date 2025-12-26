import { useState, useEffect, useCallback } from 'react';

/**
 * Composant ScrollToTopButton - Bouton de retour en haut de page
 * 
 * Ce composant affiche un bouton flottant qui :
 * - Apparaît après un certain seuil de scroll (300px par défaut)
 * - Est semi-transparent au repos, opaque au survol
 * - Anime le scroll vers le haut de manière fluide
 * - Est entièrement accessible (aria-label, bouton HTML natif)
 * 
 * @param {number} threshold - Seuil de scroll en pixels avant apparition (défaut: 300)
 * @param {boolean} showNearBottom - Si true, n'apparaît que proche du bas de page
 * @param {number} bottomOffset - Distance du bas de page pour showNearBottom (défaut: 500px)
 * 
 * @returns {JSX.Element|null} Bouton de scroll ou null si caché
 */
const ScrollToTopButton = ({ 
  threshold = 300, 
  showNearBottom = false, 
  bottomOffset = 500 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Vérifie la position du scroll et met à jour la visibilité
   */
  const checkScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Distance jusqu'au bas de la page
    const distanceToBottom = documentHeight - (scrollY + windowHeight);
    
    if (showNearBottom) {
      // Mode "proche du bas" : visible si scroll > threshold ET proche du bas
      setIsVisible(scrollY > threshold && distanceToBottom < bottomOffset);
    } else {
      // Mode standard : visible dès que scroll > threshold
      setIsVisible(scrollY > threshold);
    }
  }, [threshold, showNearBottom, bottomOffset]);

  /**
   * useEffect - Gestion du listener scroll
   * 
   * - Ajoute un écouteur d'événement scroll au montage
   * - Nettoie l'écouteur au démontage (cleanup)
   * - Utilise passive: true pour de meilleures performances
   */
  useEffect(() => {
    // Vérification initiale via microtask pour éviter le setState synchrone
    Promise.resolve().then(checkScrollPosition);
    
    // Ajout du listener avec option passive pour performance
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Cleanup : suppression du listener au démontage
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  /**
   * Gère le clic sur le bouton
   * Scroll fluide vers le haut de la page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Ne pas rendre le bouton s'il n'est pas visible
  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="Retour en haut de page"
      title="Retour en haut"
      className="scroll-to-top-button"
      style={{
        // Positionnement fixe en bas à droite
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 50,
        
        // Dimensions et forme
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        
        // Style du bouton
        border: 'none',
        backgroundColor: isHovered ? '#2563eb' : 'rgba(37, 99, 235, 0.6)',
        color: 'white',
        cursor: 'pointer',
        
        // Ombre et effets
        boxShadow: isHovered 
          ? '0 10px 25px rgba(37, 99, 235, 0.4)' 
          : '0 4px 15px rgba(0, 0, 0, 0.15)',
        
        // Transitions fluides
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-3px) scale(1.1)' : 'translateY(0) scale(1)',
        opacity: isHovered ? 1 : 0.7,
        
        // Flexbox pour centrer l'icône
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Icône flèche vers le haut (SVG inline pour éviter dépendances) */}
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
