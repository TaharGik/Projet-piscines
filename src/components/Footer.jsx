import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Logo en arrière-plan */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/logo/LogoBBH.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-lg font-bold text-white">
                BBH<span className="text-blue-400">SERVICE</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Expert en conception, installation et entretien de piscines en Ile-de-France depuis 9 ans.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Nos services</Link></li>
              <li><Link to="/realisations" className="hover:text-blue-400 transition-colors">Realisations</Link></li>
              <li><Link to="/a-propos" className="hover:text-blue-400 transition-colors">A propos</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services#conception-installation" className="hover:text-blue-400 transition-colors">Conception & Installation</Link></li>
              <li><Link to="/services#renovation-piscines" className="hover:text-blue-400 transition-colors">Renovation</Link></li>
              <li><Link to="/services#entretien-piscines" className="hover:text-blue-400 transition-colors">Entretien</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>Ile-de-France et alentours</li>
              <li>
                <a href="tel:+33640123456" className="hover:text-blue-400 transition-colors">06 40 12 34 56</a>
              </li>
              <li>
                <a href="mailto:bbhservice25@gmail.com" className="hover:text-blue-400 transition-colors">bbhservice25@gmail.com</a>
              </li>
              <li>Lun-Sam: 9h-18h</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>{currentYear} BBH SERVICE. Tous droits reserves.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-blue-400 transition-colors">Mentions legales</Link>
              <Link to="/confidentialite" className="hover:text-blue-400 transition-colors">Confidentialite</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
