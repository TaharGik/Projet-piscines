import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Loader BBH SERVICE - Simple et professionnel
 * 
 * Design épuré avec logo, spinner et couleurs de la charte BBH Service
 * Animation fluide d'apparition/disparition
 */
const Loader = ({ onLoadComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Chargement simulé plus court pour une meilleure UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Animation de sortie avant callback
      setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 400);
    }, 1500); // 1.5 secondes

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-all duration-500 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Logo BBH SERVICE */}
        <div className="mb-8">
          <img 
            src="/images/logo/LogoBBH.png" 
            alt="BBH SERVICE" 
            width="160"
            height="80"
            className="h-20 md:h-24 w-auto mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          />
        </div>

        {/* Titre BBH SERVICE */}
        <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F2A44] font-heading">
            BBH SERVICE
          </h1>
          <p className="text-[#0F2A44]/60 text-sm mt-2 font-medium">
            Expert Piscines Région Parisienne
          </p>
        </div>

        {/* Spinner professionnel */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <div className="relative w-16 h-16 mx-auto mb-6">
            {/* Cercle de fond */}
            <div className="absolute inset-0 border-4 border-[#F3F5F9] rounded-full"></div>
            {/* Cercle animé */}
            <div className="absolute inset-0 border-4 border-transparent border-t-[#2FB8B3] border-r-[#2FB8B3] rounded-full animate-spin-smooth"></div>
            {/* Point central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#2FB8B3] rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-[#0F2A44]/60 text-sm font-medium">
            Chargement en cours...
          </p>
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-smooth {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-spin-smooth {
          animation: spin-smooth 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
