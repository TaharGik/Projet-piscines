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
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/services/vacances-piscine.png')" }}
      />
      
      {/* Overlay bleu foncé BBH SERVICE - #0F2A44 avec transparence */}
      <div className="absolute inset-0 bg-primary/90" />
      
      {/* Formes décoratives subtiles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            {/* Badge - Style sobre */}
            <div 
              className={`inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm rounded-md text-sm mb-6 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
              <span className="font-sans font-medium">Expert pisciniste depuis 2016</span>
            </div>
            
            {/* Titre principal - Montserrat bold avec effet vague interactif */}
            <h1 
              className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-500 delay-100 hero-glow ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${autoWaveEnded ? 'cursor-pointer' : ''}`}
              style={{ color: '#ffffff' }}
              onMouseEnter={handleTitleMouseEnter}
              onMouseLeave={handleTitleMouseLeave}
              onClick={handleTitleClick}
              title={autoWaveEnded ? 'Survolez ou cliquez pour l\'effet vague' : ''}
            >
              Votre expert piscine,{' '}
              <span className={`water-title ${isWaveActive ? 'water-active' : ''}`}>
                <span className="water-title-text" style={{ color: '#ffffff' }}>sur mesure et durable</span>
                <span className="water-underline"></span>
              </span>
            </h1>
            
            {/* Sous-titre - Lato regular */}
            <p 
              className={`font-sans text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-500 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Avec <span className="font-semibold text-white">BBH SERVICE</span>, faites le choix d'un partenaire fiable 
              pour réaliser la piscine dont vous rêvez. Étude, installation, entretien : 
              nos spécialistes prennent en charge l'ensemble de votre projet.
            </p>
            
            {/* CTA Buttons - Style uniforme */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link 
                to="/devis"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F2A44] font-heading font-semibold text-lg px-8 py-4 rounded-md transition-all duration-200 text-center"
              >
                Lancer mon projet piscine
              </Link>
              <Link 
                to="/realisations" 
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F2A44] font-heading font-semibold text-lg px-8 py-4 rounded-md transition-all duration-200 text-center"
              >
                Voir nos réalisations
              </Link>
            </div>
            
            {/* Points de réassurance */}
            <div 
              className={`mt-12 flex flex-wrap gap-8 transition-all duration-500 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans text-sm">9 ans d'expérience</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans text-sm">Île-de-France et alentours</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans text-sm">Solutions personnalisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
