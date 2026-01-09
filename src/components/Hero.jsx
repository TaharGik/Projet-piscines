import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * Composant Hero BBH SERVICE - Optimisé Mobile-First
 * Version full-screen avec :
 * - Image plein écran immersive (header transparent au-dessus)
 * - Overlay sombre pour lisibilité optimale
 * - Preuve sociale immédiate (Google 5★)
 * - Hiérarchie simplifiée : Badge → Titre → Features → CTA
 * - CTA orange vif à fort contraste
 * - Scroll indicator animé
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
    <section className="relative text-white overflow-hidden min-h-screen flex items-center">
      {/* Image de fond - Full screen immersive */}
      <picture className="absolute inset-0">
        <source 
          media="(max-width: 768px)" 
          srcSet="/images/services/piscine-beton-mobile.webp, /images/services/piscine-beton.jpg" 
          type="image/webp"
        />
        <source 
          media="(min-width: 769px)" 
          srcSet="/images/services/piscine-beton.webp, /images/services/piscine-beton.jpg" 
          type="image/webp"
        />
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/images/services/piscine-beton.jpg')" }}
        />
      </picture>
      
      {/* Overlay sombre optimisé - Plus foncé pour meilleure lisibilité mobile */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, rgba(15, 42, 68, 0.75) 0%, rgba(15, 42, 68, 0.5) 40%, rgba(15, 42, 68, 0.7) 100%)'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="flex items-center min-h-screen pt-0 pb-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 w-full -mt-12 sm:mt-0">
            {/* Badge premium turquoise */}
            <div 
              className={`inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-xs sm:text-sm mb-1 sm:mb-8 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 bg-[#2FB8B3] rounded-full mr-2"></span>
              <span className="font-sans font-medium text-white">
                Piscines premium et maîtrisées
              </span>
            </div>
            
            {/* Titre principal avec effet vague */}
            <h1 
              className={`font-heading font-extrabold leading-[1.1] mb-5 sm:mb-8 transition-all duration-500 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${autoWaveEnded ? 'cursor-pointer' : ''}`}
              style={{ 
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 4px 40px rgba(47, 184, 179, 0.2)'
              }}
              onMouseEnter={handleTitleMouseEnter}
              onMouseLeave={handleTitleMouseLeave}
              onClick={handleTitleClick}
              title={autoWaveEnded ? 'Cliquez pour l\'effet vague' : ''}
            >
              {/* Version mobile - Court et impactant avec effet vague */}
              <span className="block sm:hidden text-5xl leading-tight">
                <span className={`water-title ${isWaveActive ? 'water-active' : ''}`}>
                  <span className="water-title-text" style={{ color: '#ffffff' }}>
                    Votre piscine
                    {isWaveActive && (
                      <svg className="inline-block w-5 h-5 mx-1 -mt-1 opacity-70" viewBox="0 0 24 24">
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
                    <br />
                    <span style={{ color: '#2FB8B3' }}>sur mesure</span>
                  </span>
                  <span className="water-underline"></span>
                </span>
              </span>
              
              {/* Version desktop avec effet vague */}
              <span className="hidden sm:block text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span className={`water-title ${isWaveActive ? 'water-active' : ''}`}>
                  <span className="water-title-text" style={{ color: '#ffffff' }}>
                    Solutions piscines fiables,
                    {isWaveActive && (
                      <svg className="inline-block w-6 h-6 md:w-8 md:h-8 mx-2 -mt-1" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id="dropGradientDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#99DFEC" />
                            <stop offset="50%" stopColor="#33A7E4" />
                            <stop offset="100%" stopColor="#0F2A44" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2c0 0-6 8-6 12a6 6 0 0 0 12 0c0-4-6-12-6-12z" fill="url(#dropGradientDesktop)"/>
                      </svg>
                    )}
                    <br />durables et <span style={{ color: '#2FB8B3' }}>maîtrisées</span>
                  </span>
                  <span className="water-underline"></span>
                </span>
              </span>
            </h1>
            
            {/* Features clés - Liste horizontale compacte */}
            <div 
              className={`flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-7 sm:mb-10 transition-all duration-500 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2FB8B3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-white font-medium text-sm sm:text-base">Devis 48h</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2FB8B3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-white font-medium text-sm sm:text-base">Garantie décennale</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2FB8B3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-white font-medium text-sm sm:text-base">Île-de-France</span>
              </div>
            </div>

            {/* CTA principal - Orange vif */}
            <div 
              className={`transition-all duration-500 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link 
                to="/devis"
                className="inline-flex items-center justify-center bg-[#FF6B35] hover:bg-[#E55A28] text-white font-heading font-bold text-lg sm:text-xl px-10 py-3 sm:px-12 sm:py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(255,107,53,0.4)] hover:scale-105 transform min-h-[52px] w-full sm:w-auto max-w-md mx-auto"
                style={{
                  boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)'
                }}
              >
                Devis gratuit sous 48h
              </Link>
              
              {/* Lien secondaire - Subtil */}
              <div className="mt-2 sm:mt-6 mb-2 sm:mb-0">
                <Link 
                  to="/realisations" 
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm sm:text-base transition-all group"
                >
                  <span className="border-b border-white/50 group-hover:border-white">Découvrir nos réalisations</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Invite à découvrir la suite - Mobile uniquement */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 delay-500 sm:hidden ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
          <span className="text-white/80 text-xs sm:text-sm font-medium">Découvrir</span>
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
