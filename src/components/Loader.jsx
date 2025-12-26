import { useEffect, useState } from 'react';

/**
 * Composant Loader - Écran de chargement au démarrage
 * 
 * Affiche une animation de vagues avec le logo pendant le chargement initial
 * Disparaît automatiquement après le chargement des ressources
 */
const Loader = ({ onLoadComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simuler le chargement des ressources
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Attendre la fin de l'animation de sortie avant de notifier
      setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 500);
    }, 2000); // 2 secondes de loader

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 transition-opacity duration-500 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Texte BBH SERVICE avec animation */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-bounce-slow">
          BBH <span className="text-blue-200">SERVICE</span>
        </h1>

        {/* Animation de vagues */}
        <div className="relative h-16 w-64 mx-auto overflow-hidden">
          {/* Vague 1 */}
          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-40">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-white/30"
              >
                <animate
                  attributeName="d"
                  dur="5s"
                  repeatCount="indefinite"
                  values="
                    M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z;
                    M321.39,70c58-5,114.16-20,172-30,82.39-12,168.19-10,250.45,5C823.78,55,906.67,80,985.66,95c70.05,12,146.53,15,214.34,0V0H0V40A600.21,600.21,0,0,0,321.39,70Z;
                    M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z
                  "
                />
              </path>
            </svg>
          </div>

          {/* Vague 2 */}
          <div className="absolute bottom-0 left-0 right-0 h-6 opacity-60">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                className="fill-white/40"
              >
                <animate
                  attributeName="d"
                  dur="7s"
                  repeatCount="indefinite"
                  values="
                    M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;
                    M0,0V60c47.79,10,103.59,20,158,18,70.36-3,136.33-20,206.8-25C438.64,45,512.34,60,583,75c69.27,15,138.3,20,209.4,10,36.15-4,69.85-12,104.45-20C989.49,40,1113,0,1200,60V0Z;
                    M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z
                  "
                />
              </path>
            </svg>
          </div>

          {/* Vague 3 */}
          <div className="absolute bottom-0 left-0 right-0 h-4 opacity-80">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-white/50"
              >
                <animate
                  attributeName="d"
                  dur="4s"
                  repeatCount="indefinite"
                  values="
                    M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z;
                    M985.66,105C906.67,90,823.78,50,743.84,30c-82.26-15-168.06-12-250.45,5-57.84,10-114,25-172,35A600.21,600.21,0,0,1,0,45V120H1200V110C1132.19,125,1055.71,120,985.66,105Z;
                    M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z
                  "
                />
              </path>
            </svg>
          </div>
        </div>

        {/* Texte de chargement */}
        <p className="text-blue-100 mt-6 text-sm animate-pulse">
          Chargement en cours...
        </p>
      </div>

      {/* Style pour les animations custom */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;
