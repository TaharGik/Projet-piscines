import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CONTACT } from '../utils/constants';

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
  const [_sloganWaveActive, setSloganWaveActive] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effet vague sur le slogan pendant 30 secondes à l'arrivée
  useEffect(() => {
    const timer = setTimeout(() => {
      setSloganWaveActive(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  // Détection du scroll pour changer l'opacité du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-soft' : 'bg-white/95 shadow-soft'
    }`}>
      {/* Bandeau contact supérieur - Masqué */}
      <div className="hidden">
        <div className="container-custom">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-6">
              <a 
                href={`tel:${CONTACT.phoneHref}`}
                className={`flex items-center gap-2 transition-colors font-medium ${
                  isScrolled ? 'text-[#0F2A44] hover:text-[#2FB8B3]' : 'text-white hover:text-[#2FB8B3]'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                {CONTACT.phone}
              </a>
              <span className={`flex items-center gap-2 ${
                isScrolled ? 'text-[#6B7280]' : 'text-white/80'
              }`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Île-de-France
              </span>
            </div>
            <div className={`flex items-center gap-2 ${
              isScrolled ? 'text-[#6B7280]' : 'text-white/80'
            }`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Lun-Sam: 8h-18h
            </div>
          </div>
        </div>
      </div>
      
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo BBH SERVICE - Image + Slogan */}
          <Link 
            to="/" 
            className="flex items-center group" 
            onClick={handleLogoClick}
            aria-label="Retour à l'accueil BBH SERVICE"
          >
            <img 
              src="/images/logo/LogoBBH.png" 
              alt="BBH SERVICE - Expert Piscines" 
              width="160"
              height="64"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col ml-3 border-l-2 border-secondary/30 pl-3">
              {/* <span className={`slogan-wave ${sloganWaveActive ? 'slogan-wave-active' : ''}`}>
                Votre projet, notre engagement
              </span> */}
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
              className="btn-primary ml-2 lg:ml-4 flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Demander un devis gratuit"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Menu mobile toggle */}
          <button
            className="md:hidden p-3 rounded-lg text-primary hover:bg-neutral-light transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
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
          <div className="md:hidden pb-4 pt-2 animate-fade-in" id="mobile-menu" role="navigation">
            {/* Contact rapide mobile */}
            <div className="px-4 py-3 mb-2 bg-[#F3F5F9] rounded-lg">
              <a 
                href="tel:+33640123456" 
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#2FB8B3] text-white font-semibold rounded-lg hover:bg-[#269E9A] transition-colors min-h-[48px]"
                aria-label="Appeler BBH SERVICE au 06 40 12 34 56"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Appeler : 06 40 12 34 56
              </a>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-[#6B7280]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Île-de-France
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-base font-medium font-sans min-h-[48px] flex items-center ${
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
