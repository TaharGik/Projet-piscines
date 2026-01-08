import { Link } from 'react-router-dom';

/**
 * Footer BBH SERVICE
 * Conforme à la charte graphique :
 * - Fond bleu foncé principal #0F2A44
 * - Texte blanc et gris clair
 * - Accents en #2FB8B3 (liens hover)
 * - Typographies : Montserrat (titres), Lato (texte)
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2A44] text-white relative overflow-hidden">
      {/* Logo en arrière-plan subtil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/images/logo/LogoBBH.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description avec effet visuel */}
          <div>
            <div className="flex items-center space-x-3 mb-4 logo-container">
              <span className="font-heading text-lg font-bold">
                <span className="text-white">BBH</span><span className="logo-service">SERVICE</span>
              </span>
            </div>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-4">
              Acteur premium de l'installation de piscines. Solutions fiables, durables et parfaitement maîtrisées en Île-de-France.
            </p>
            {/* Réseaux sociaux - Instagram, TikTok, Facebook - Taille optimisée */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/bbhservice" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Suivez BBH SERVICE sur Instagram"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@bbhservice" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white/10 hover:bg-black rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Suivez BBH SERVICE sur TikTok"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <path fill="#25F4EE" d="M9.37 23.5a7.37 7.37 0 0 1 0-14.74v3.03a4.34 4.34 0 1 0 4.34 4.34V.5h3.03a6.37 6.37 0 0 0 6.37 6.37v3.03a9.37 9.37 0 0 1-6.37-2.48v8.7a7.37 7.37 0 0 1-7.37 7.38z"/>
                  <path fill="#FE2C55" d="M10.87 23.5a7.37 7.37 0 0 1-7.37-7.37v-.87a7.37 7.37 0 0 1 14.74 0v.87a7.37 7.37 0 0 1-7.37 7.37zm5.87-15.13a6.37 6.37 0 0 1-3.4-5.87h-3.03v12.63a4.34 4.34 0 1 1-4.34-4.34V7.76a7.37 7.37 0 1 0 7.37 7.37V8.37a9.37 9.37 0 0 0 6.37 2.48V7.82a6.37 6.37 0 0 1-2.97-1.45z"/>
                  <path fill="#FFFFFF" d="M12 8.76a7.37 7.37 0 0 0-7.37 7.37 7.37 7.37 0 0 0 7.37 7.37 7.37 7.37 0 0 0 7.37-7.37V3.5h-3.03v12.63a4.34 4.34 0 1 1-4.34-4.34z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/bbhservice" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white/10 hover:bg-[#1877F2] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Suivez BBH SERVICE sur Facebook"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-heading text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm font-sans">
              <li><Link to="/" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Accueil</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Nos services</Link></li>
              <li><Link to="/realisations" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Réalisations</Link></li>
              <li><Link to="/a-propos" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">À propos</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">FAQ</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Nos services */}
          <div>
            <h3 className="font-heading text-white font-semibold mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm font-sans">
              <li><Link to="/services#conception-installation" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Conception & Installation</Link></li>
              <li><Link to="/services#renovation-piscines" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Rénovation</Link></li>
              <li><Link to="/services#entretien-piscines" className="text-white/70 hover:text-[#2FB8B3] transition-colors duration-200">Entretien</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm font-sans text-white/70">
              <li>Île-de-France et alentours</li>
              <li>
                <a href="tel:+33640123456" className="hover:text-[#2FB8B3] transition-colors duration-200">06 40 12 34 56</a>
              </li>
              <li>
                <a href="mailto:bbhservice25@gmail.com" className="hover:text-[#2FB8B3] transition-colors duration-200">bbhservice25@gmail.com</a>
              </li>
              <li>Lun-Sam: 9h-18h</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm font-sans">
            <p className="text-white/60">© {currentYear} BBH SERVICE. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="text-white/60 hover:text-[#2FB8B3] transition-colors duration-200">Mentions légales</Link>
              <Link to="/confidentialite" className="text-white/60 hover:text-[#2FB8B3] transition-colors duration-200">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
