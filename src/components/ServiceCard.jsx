import { Link } from 'react-router-dom';

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      {/* Image de service */}
      <div className="h-48 relative overflow-hidden">
        {service.image ? (
          <>
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-6xl">{icons[service.icon] || '🏊'}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {service.shortDescription}
        </p>
        <Link 
          to={`/services#${service.slug}`}
          className="text-blue-500 font-medium text-sm hover:text-blue-600 inline-flex items-center group/link"
        >
          En savoir plus
          <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
