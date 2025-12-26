import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Header BBH SERVICE
 * Conforme à la charte graphique :
 * - Fond blanc, design épuré
 * - Typographie Montserrat pour le logo
 * - Couleurs : #0F2A44 (primaire), #2FB8B3 (accent CTA)
 * - Slogan avec effet vague à l'arrivée
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sloganWaveActive, setSloganWaveActive] = useState(true);

  // Effet vague sur le slogan pendant 30 secondes à l'arrivée
  useEffect(() => {
    const timer = setTimeout(() => {
      setSloganWaveActive(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/realisations', label: 'Réalisations' },
    { to: '/a-propos', label: 'À propos' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo BBH SERVICE - Image + Slogan */}
          <Link 
            to="/" 
            className="flex items-center group" 
            onClick={handleLogoClick}
          >
            <img 
              src="/images/logo/LogoBBH.png" 
              alt="BBH SERVICE - Expert Piscines" 
              className="h-20 md:h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col ml-3 border-l-2 border-secondary/30 pl-3">
              <span className={`slogan-wave ${sloganWaveActive ? 'slogan-wave-active' : ''}`}>
                Votre projet, notre engagement
              </span>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium font-sans transition-colors duration-200 ${
                    isActive
                      ? 'text-secondary bg-neutral-light'
                      : 'text-primary hover:text-secondary hover:bg-neutral-light'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {/* CTA Devis - Lien vers la page devis */}
            <Link 
              to="/devis"
              className="btn-primary ml-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Devis gratuit
            </Link>
          </div>

          {/* Menu mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-primary hover:bg-neutral-light transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in" id="mobile-menu" role="navigation">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium font-sans ${
                      isActive 
                        ? 'text-secondary bg-neutral-light' 
                        : 'text-primary hover:bg-neutral-light'
                    }`
                  }
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link 
                to="/devis"
                className="btn-primary mt-2 text-center w-full block"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Devis gratuit
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
