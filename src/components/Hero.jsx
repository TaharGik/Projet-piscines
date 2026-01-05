import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * Composant Hero BBH SERVICE
 * Conforme à la charte graphique :
 * - Design sobre et professionnel
 * - Couleurs : #0F2A44 (primaire), #2FB8B3 (CTA), #F3F5F9 (fond clair)
 * - Typographie : Montserrat pour les titres, Lato pour le texte
 * - Animations légères (fade/slide)
 * - Effet vague sur le titre (30s auto + hover/click)
 */
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // État pour l'effet vague sur le titre
  const [isWaveActive, setIsWaveActive] = useState(true);
  const [autoWaveEnded, setAutoWaveEnded] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsLoaded(true));
    
    // L'effet vague se désactive après 30 secondes
    const timer = setTimeout(() => {
      setIsWaveActive(false);
      setAutoWaveEnded(true);
    }, 30000);
    
    return () => clearTimeout(timer);
  }, []);

  // Gère le hover pour réactiver l'effet vague
  const handleTitleMouseEnter = () => {
    if (autoWaveEnded) {
      setIsWaveActive(true);
    }
  };

  const handleTitleMouseLeave = () => {
    if (autoWaveEnded) {
      setIsWaveActive(false);
    }
  };

  // Gère le clic pour activer l'effet vague temporairement
  const handleTitleClick = () => {
    if (autoWaveEnded && !isWaveActive) {
      setIsWaveActive(true);
      // Désactive après 3 secondes d'animation
      setTimeout(() => setIsWaveActive(false), 3000);
    }
  };

  return (
    <section className="relative text-white overflow-hidden">
      {/* Image de fond - Piscine béton */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/services/piscine-beton.jpg')" }}
      />
      
      {/* Overlay bleu foncé BBH SERVICE - #0F2A44 avec transparence réduite */}
      <div className="absolute inset-0 bg-[#0F2A44]/60" />
      
      {/* Formes décoratives subtiles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="py-16 sm:py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            {/* Badge - Style sobre */}
            <div 
              className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/15 backdrop-blur-sm rounded-md text-xs sm:text-sm mb-4 sm:mb-6 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
              <span className="font-sans font-medium">Expert piscine - installation & service</span>
            </div>
            
            {/* Titre principal - Montserrat bold centré avec effet vague */}
            <h1 
              className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 transition-all duration-500 delay-100 hero-glow ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${autoWaveEnded ? 'cursor-pointer' : ''}`}
              style={{ color: '#ffffff' }}
              onMouseEnter={handleTitleMouseEnter}
              onMouseLeave={handleTitleMouseLeave}
              onClick={handleTitleClick}
              title={autoWaveEnded ? 'Survolez ou cliquez pour l\'effet vague' : ''}
            >
              <span className={`water-title ${isWaveActive ? 'water-active' : ''}`}>
                <span className="water-title-text" style={{ color: '#ffffff' }}>
                  Solutions piscines fiables,
                  {isWaveActive && (
                    <svg className="inline-block w-6 h-6 md:w-8 md:h-8 mx-2 -mt-1" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="dropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#99DFEC" />
                          <stop offset="50%" stopColor="#33A7E4" />
                          <stop offset="100%" stopColor="#0F2A44" />
                        </linearGradient>
                      </defs>
                      <path d="M12 2c0 0-6 8-6 12a6 6 0 0 0 12 0c0-4-6-12-6-12z" fill="url(#dropGradient)"/>
                    </svg>
                  )}
                  <br />durables et maîtrisées
                </span>
                <span className="water-underline"></span>
              </span>
            </h1>
            
            {/* Sous-titre - Style classe */}
            <p 
              className={`font-sans text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 leading-relaxed transition-all duration-500 delay-200 italic ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              Votre projet, notre engagement
            </p>
            
            {/* Promesse concrète */}
            <div 
              className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed transition-all duration-500 delay-250 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: 'rgba(255, 255, 255, 0.95)' }}
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-2">
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Devis sous 48h
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Garantie décennale
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Région parisienne
                </span>
              </div>
            </div>
            
            {/* CTA Collaborons ! */}
            <div 
              className={`mb-8 transition-all duration-500 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link 
                to="/devis"
                className="inline-flex items-center justify-center text-[#2FB8B3] hover:text-[#269E9A] font-sans font-medium text-xl transition-all duration-300 hover:scale-105"
              >
                Collaborons !
              </Link>
            </div>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-500 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link 
                to="/devis"
                className="inline-flex items-center justify-center bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-heading font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:-translate-y-1 min-h-[48px] w-full sm:w-auto max-w-sm mx-auto"
              >
                Lancer mon projet piscine
              </Link>
              <Link 
                to="/realisations" 
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F2A44] font-heading font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-200 text-center min-h-[48px] w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
