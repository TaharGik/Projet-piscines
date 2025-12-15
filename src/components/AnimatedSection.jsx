import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * Composant wrapper pour animer les sections au scroll
 * 
 * Ce composant enveloppe n'importe quel contenu et lui applique
 * une animation d'entrée quand il devient visible dans le viewport.
 * 
 * TYPES D'ANIMATIONS DISPONIBLES :
 * - 'fade-up'    : Apparition du bas vers le haut (défaut)
 * - 'fade-down'  : Apparition du haut vers le bas
 * - 'fade-left'  : Apparition de droite vers gauche
 * - 'fade-right' : Apparition de gauche vers droite
 * - 'zoom-in'    : Apparition avec effet de zoom
 * - 'fade-in'    : Simple fondu sans mouvement
 * 
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Contenu à animer
 * @param {string} props.animation - Type d'animation (défaut: 'fade-up')
 * @param {number} props.delay - Délai avant l'animation en ms (défaut: 0)
 * @param {string} props.className - Classes CSS additionnelles
 * @param {number} props.threshold - Seuil de visibilité 0-1 (défaut: 0.1)
 * 
 * @example
 * <AnimatedSection animation="fade-up" delay={200}>
 *   <h2>Mon titre animé</h2>
 * </AnimatedSection>
 */
const AnimatedSection = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  className = '',
  threshold = 0.1 
}) => {
  /**
   * Utilisation du hook useScrollAnimation
   * - ref : à attacher au conteneur div
   * - isVisible : true quand l'élément entre dans le viewport
   */
  const [ref, isVisible] = useScrollAnimation({ threshold });

  /**
   * Dictionnaire des animations disponibles
   * 
   * Chaque animation définit :
   * - hidden : classes CSS quand l'élément n'est pas visible
   * - visible : classes CSS quand l'élément est visible
   * 
   * Les transitions sont gérées par Tailwind (transition-all, duration-700)
   */
  const animations = {
    'fade-up': {
      hidden: 'opacity-0 translate-y-8',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-down': {
      hidden: 'opacity-0 -translate-y-8',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-left': {
      hidden: 'opacity-0 translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    'fade-right': {
      hidden: 'opacity-0 -translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    'zoom-in': {
      hidden: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100',
    },
    'fade-in': {
      hidden: 'opacity-0',
      visible: 'opacity-100',
    },
  };

  const currentAnimation = animations[animation] || animations['fade-up'];
  const animationState = isVisible ? currentAnimation.visible : currentAnimation.hidden;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationState} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
