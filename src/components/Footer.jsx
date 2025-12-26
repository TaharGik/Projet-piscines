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
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              Expert en conception, installation et entretien de piscines en Île-de-France depuis 9 ans.
            </p>
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
