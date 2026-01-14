import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OptimizedImage from './OptimizedImage';

/**
 * ServiceCard BBH SERVICE
 * Conforme à la charte graphique :
 * - Design sobre avec coins légèrement arrondis (rounded-lg max)
 * - Ombres légères
 * - Couleurs : #0F2A44 (texte), #2FB8B3 (accent hover)
 * - Typographies : Montserrat (titres), Lato (texte)
 */
const ServiceCard = ({ service }) => {
  const icons = {
    pool: '🏊',
    waves: '🌊',
    home: '🏠',
    refresh: '🔄',
    tools: '🔧',
    calendar: '📅'
  };

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-card transition-all duration-200 group">
      {/* Image de service */}
      <div className="h-48 relative overflow-hidden">
        {service.image ? (
          <>
            <OptimizedImage 
              src={service.image} 
              alt={service.title}
              width="400"
              height="192"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
          </>
        ) : (
          <div className="h-full bg-neutral-light flex items-center justify-center">
            <span className="text-5xl">{icons[service.icon] || '🏊'}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Titre - Montserrat semibold */}
        <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-200">
          {service.title}
        </h3>
        
        {/* Description - Lato regular */}
        <p className="font-sans text-sm text-primary/70 mb-4 leading-relaxed">
          {service.shortDescription}
        </p>
        
        {/* Lien - Couleur secondaire */}
        <Link 
          to={`/services#${service.slug}`}
          className="font-sans text-secondary font-medium text-sm hover:text-[#269e9a] inline-flex items-center group/link"
        >
          En savoir plus
          <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
