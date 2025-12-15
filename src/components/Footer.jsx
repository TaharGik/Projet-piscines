import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white">A</span>
              </div>
              <span className="text-lg font-bold text-white">
                Aqua<span className="text-blue-400">Prestige</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Expert en conception et realisation de piscines sur mesure en Ile-de-France depuis plus de 15 ans.
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
              <li><Link to="/services#piscines-beton" className="hover:text-blue-400 transition-colors">Piscines beton</Link></li>
              <li><Link to="/services#piscines-coque" className="hover:text-blue-400 transition-colors">Piscines coque</Link></li>
              <li><Link to="/services#piscines-interieures" className="hover:text-blue-400 transition-colors">Piscines interieures</Link></li>
              <li><Link to="/services#renovation-piscines" className="hover:text-blue-400 transition-colors">Renovation</Link></li>
              <li><Link to="/services#entretien-piscines" className="hover:text-blue-400 transition-colors">Entretien</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>15 Avenue des Champs-Elysees, 75008 Paris</li>
              <li>
                <a href="tel:+33140123456" className="hover:text-blue-400 transition-colors">01 40 12 34 56</a>
              </li>
              <li>
                <a href="mailto:contact@aqua-prestige.fr" className="hover:text-blue-400 transition-colors">contact@aqua-prestige.fr</a>
              </li>
              <li>Lun-Ven: 9h-18h | Sam: 9h-12h</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>{currentYear} Aqua Prestige. Tous droits reserves.</p>
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
