import { useState, useEffect, useCallback } from 'react';

/**
 * Composant ImageCarousel - Carrousel d'images interactif
 * 
 * Fonctionnalites :
 * - Navigation par fleches gauche/droite
 * - Indicateurs de position (dots)
 * - Autoplay optionnel
 * - Pause au hover
 * - Touch/swipe sur mobile (basique)
 * - Mode plein ecran optionnel
 * 
 * @param {Object} props
 * @param {Array} props.images - Tableau d'objets {src, alt, caption}
 * @param {boolean} props.autoPlay - Active le defilement automatique
 * @param {number} props.interval - Intervalle en ms (defaut: 5000)
 * @param {boolean} props.showDots - Affiche les indicateurs
 * @param {boolean} props.showArrows - Affiche les fleches
 * @param {boolean} props.showCaptions - Affiche les legendes
 * @param {string} props.aspectRatio - Ratio d'aspect (16/9, 4/3, 1/1, auto)
 */
const ImageCarousel = ({
  images = [],
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  showCaptions = true,
  aspectRatio = '16/9',
}) => {
  // Index de l'image active
  const [currentIndex, setCurrentIndex] = useState(0);
  // Pause du autoplay au hover
  const [isPaused, setIsPaused] = useState(false);
  // Position tactile pour swipe
  const [touchStart, setTouchStart] = useState(null);

  // Nombre total d'images
  const totalImages = images.length;

  /**
   * Passe a l'image suivante
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  /**
   * Passe a l'image precedente
   */
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  /**
   * Va a une image specifique
   */
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  /**
   * Autoplay - defilement automatique
   */
  useEffect(() => {
    if (!autoPlay || isPaused || totalImages <= 1) return;

    const timer = setInterval(nextSlide, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, nextSlide, totalImages]);

  /**
   * Gestion du swipe tactile - debut
   */
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  /**
   * Gestion du swipe tactile - fin
   */
  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe minimum de 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // Swipe gauche = suivant
      } else {
        prevSlide(); // Swipe droite = precedent
      }
    }

    setTouchStart(null);
  };

  // Si pas d'images, ne rien afficher
  if (totalImages === 0) return null;

  // Calcul du style d'aspect ratio
  const aspectRatioStyle = aspectRatio === 'auto' 
    ? {} 
    : { aspectRatio };

  return (
    <div 
      className="relative overflow-hidden rounded-xl bg-gray-100 group"
      style={aspectRatioStyle}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container des slides */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Image ou placeholder */}
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt || `Image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                <span className="text-blue-600">{image.alt || `Image ${index + 1}`}</span>
              </div>
            )}

            {/* Caption */}
            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm md:text-base">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fleche gauche */}
      {showArrows && totalImages > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
          aria-label="Image precedente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Fleche droite */}
      {showArrows && totalImages > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
          aria-label="Image suivante"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Indicateurs (dots) */}
      {showDots && totalImages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller a l'image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Compteur */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {totalImages}
      </div>
    </div>
  );
};

export default ImageCarousel;
