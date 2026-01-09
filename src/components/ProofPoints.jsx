import { useState, useEffect } from 'react';

/**
 * Section Proof Points - Indicateurs de crédibilité
 * À placer juste après le Hero pour renforcer la confiance
 */
const ProofPoints = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('proof-points');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const proofPoints = [
    {
      number: "50+",
      label: "Piscines réalisées",
      description: "Partout en France",
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      number: "15",
      label: "Années d'expérience",
      description: "Expertise confirmée",
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      number: "8",
      label: "Départements",
      description: "Île-de-France",
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    },
    {
      number: "5.0/5",
      label: "Avis clients",
      description: "15 avis Google",
      link: "https://share.google/J6oLTWaH3h9U3tmqB",
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )
    }
  ];

  return (
    <section 
      id="proof-points" 
      className="py-12 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {proofPoints.map((point, index) => {
            const Content = (
              <>
                {/* Icône */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full flex items-center justify-center">
                    {point.icon}
                  </div>
                </div>
                
                {/* Chiffre */}
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-heading font-bold text-primary">
                    {point.number}
                  </span>
                </div>
                
                {/* Label principal */}
                <h3 className="text-sm md:text-base font-heading font-semibold text-primary mb-1">
                  {point.label}
                </h3>
                
                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600">
                  {point.description}
                </p>
              </>
            );

            return point.link ? (
              <a
                key={index}
                href={point.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center transform transition-all duration-700 delay-${index * 100} hover:scale-105 cursor-pointer block ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {Content}
              </a>
            ) : (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofPoints;