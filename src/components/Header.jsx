import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/realisations', label: 'Realisations' },
    { to: '/a-propos', label: 'A propos' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  // Fonction pour scroll vers le haut quand on clique sur le logo
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-4 logo-title group" onClick={handleLogoClick}>
            <span className="text-2xl font-bold">
              <span className="logo-title-text">BBH</span><span className="logo-title-highlight">SERVICE</span>
            </span>
            {/* 3 rubans de vagues */}
            <div className="hidden md:flex wave-stack ml-3">
              <div className="wave-bar wave-1"></div>
              <div className="wave-bar wave-2"></div>
              <div className="wave-bar wave-3"></div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-500 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary ml-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Devis gratuit
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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

        {isMenuOpen && (
          <div className="md:hidden pb-4" id="mobile-menu" role="navigation">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'text-blue-500 bg-blue-50' : 'text-gray-700'
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
              <Link to="/contact" className="btn-primary mt-2 text-center" onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
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
