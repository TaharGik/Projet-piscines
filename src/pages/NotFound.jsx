import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

/**
 * Page 404 - Page non trouvee
 * Affichee quand l'URL ne correspond a aucune route
 */
const NotFound = () => {
  useSEO({
    title: 'Page non trouvee',
    description: 'La page que vous recherchez n\'existe pas.',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        {/* Code 404 */}
        <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
        
        {/* Titre */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page non trouvee
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Desolee, la page que vous recherchez n'existe pas ou a ete deplacee.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Retour a l'accueil
          </Link>
          <Link 
            to="/contact" 
            className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
        
        {/* Suggestions */}
        <div className="mt-12">
          <p className="text-gray-500 text-sm mb-4">Vous cherchez peut-etre :</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/services" className="text-blue-500 hover:underline">Nos services</Link>
            <span className="text-gray-300">|</span>
            <Link to="/realisations" className="text-blue-500 hover:underline">Nos realisations</Link>
            <span className="text-gray-300">|</span>
            <Link to="/faq" className="text-blue-500 hover:underline">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
