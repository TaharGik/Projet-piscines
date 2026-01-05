import { useEffect, useState } from 'react';

/**
 * Composant SuccessAnimation - Animation de succès après envoi de formulaire
 * 
 * Affiche une animation de gouttes d'eau avec un message de confirmation
 * Se ferme automatiquement après 4 secondes
 */
const SuccessAnimation = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setIsVisible(true), 10);

    // Auto-fermeture après 4 secondes
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Attendre la fin de l'animation de sortie
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={() => {
        setIsVisible(false);
        setTimeout(onClose, 500);
      }}
    >
      <div
        className={`bg-white rounded-2xl p-8 max-w-md mx-4 text-center transform transition-all duration-500 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animation de gouttes d'eau */}
        <div className="relative mb-6">
          {/* Cercle principal avec check */}
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-scale-in">
            <svg
              className="w-12 h-12 text-white animate-check-draw"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Gouttes animées autour */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-secondary rounded-full animate-water-drop"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-60px)`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.6,
                }}
              >
                <div className="w-full h-full bg-secondary/70 rounded-full animate-ping"></div>
              </div>
            ))}
          </div>

          {/* Ondulations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ripple opacity-40"></div>
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ripple animation-delay-200 opacity-30"></div>
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ripple animation-delay-400 opacity-20"></div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in-up">
          Message envoyé !
        </h3>
        <p className="text-gray-600 animate-fade-in-up animation-delay-200">
          Merci pour votre demande !<br />
          Nous vous recontacterons sous 48h.
        </p>

        {/* Bouton fermer */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
          }}
          className="mt-6 px-6 py-2 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg transition-colors animate-fade-in-up animation-delay-400"
        >
          Fermer
        </button>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dasharray: 0, 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100, 0;
            opacity: 1;
          }
        }

        @keyframes water-drop {
          0% {
            transform: rotate(var(--rotation, 0deg)) translateY(0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: rotate(var(--rotation, 0deg)) translateY(-80px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-check-draw {
          animation: check-draw 0.6s ease-in-out 0.3s forwards;
          stroke-dasharray: 0, 100;
        }

        .animate-water-drop {
          animation: water-drop 1.5s ease-out infinite;
        }

        .animate-ripple {
          animation: ripple 1.5s ease-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
