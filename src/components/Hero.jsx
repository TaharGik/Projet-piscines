import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * Composant Hero - Section d'en-tête principale de la page d'accueil
 * 
 * Ce composant affiche :
 * - Un badge "Expert pisciniste"
 * - Un titre accrocheur avec mise en avant de la zone géographique
 * - Une description des services
 * - Deux boutons CTA (Call-to-Action)
 * - Des points de réassurance (garanties, réalisations, délai devis)
 * 
 * Animations : Les éléments apparaissent progressivement au chargement
 * grâce à des transitions CSS avec délais échelonnés.
 * 
 * @param {function} onRequestQuote - Callback pour ouvrir le wizard de devis
 * @returns {JSX.Element} Section Hero animée
 */
const Hero = ({ onRequestQuote }) => {
  /**
   * État pour gérer l'animation d'entrée des éléments
   * - false : éléments masqués (opacity-0, translateY)
   * - true : éléments visibles (opacity-100, translateY-0)
   */
  const [isLoaded, setIsLoaded] = useState(false);
  
  /**
   * État pour l'effet vague sur le titre
   * - true : animation active
   * - false : animation inactive (réactivable au clic)
   */
  const [isWaveActive, setIsWaveActive] = useState(true);
  
  /**
   * État pour savoir si la période automatique (30s) est terminée
   */
  const [autoWaveEnded, setAutoWaveEnded] = useState(false);

  /**
   * useEffect - Déclenche l'animation au montage du composant
   * 
   * Au premier rendu, on passe isLoaded à true ce qui active
   * les classes CSS de transition sur tous les éléments enfants.
   * Chaque élément a un délai différent (delay-100, delay-200, etc.)
   * pour créer un effet d'apparition en cascade.
   */
  useEffect(() => {
    setIsLoaded(true);
    
    // L'effet vague se désactive après 30 secondes
    const timer = setTimeout(() => {
      setIsWaveActive(false);
      setAutoWaveEnded(true);
    }, 30000);
    
    return () => clearTimeout(timer);
  }, []); // [] = exécuté une seule fois au montage

  /**
   * Gère le clic sur le titre pour relancer l'effet vague
   */
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
      
      {/* Overlay bleu semi-transparent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-500/85 to-blue-700/85" />
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div 
              className={`inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Expert pisciniste depuis 2016
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${autoWaveEnded ? 'cursor-pointer' : ''}`}
              onClick={handleTitleClick}
              title={autoWaveEnded ? 'Cliquez pour l\'effet vague' : ''}
            >
              <span className={`water-title ${isWaveActive ? 'water-active' : ''}`}>
                <span className="water-title-text">Votre expert piscine, <span className="water-highlight">sur mesure et durable</span></span>
                <span className="water-underline"></span>
              </span>
            </h1>
            
            <p 
              className={`text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Avec BBH SERVICE, faites le choix d'un partenaire fiable pour réaliser la piscine dont vous rêvez. <br />
              Étude, installation, entretien : nos spécialistes prennent en charge l'ensemble de votre projet.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button 
                onClick={onRequestQuote}
                className="inline-block bg-amber-500 hover:bg-amber-600 hover:scale-105 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl cursor-pointer"
              >
                Lancer mon projet piscine
              </button>
              <Link 
                to="/realisations" 
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 text-center"
              >
                Voir nos réalisations
              </Link>
            </div>
            
            <div 
              className={`mt-12 flex flex-wrap gap-8 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>9 ans d'expérience</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Île-de-France et alentours</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Solutions personnalisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
