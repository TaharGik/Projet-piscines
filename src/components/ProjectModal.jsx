import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ImageCarousel from './ImageCarousel';

/**
 * Composant ProjectModal - Modale de détail d'un projet
 * 
 * Affiche les détails complets d'un projet dans une modale :
 * - Carrousel d'images
 * - Informations détaillées
 * - Tags et caractéristiques
 * 
 * @param {Object} project - Données du projet
 * @param {boolean} isOpen - État d'ouverture de la modale
 * @param {Function} onClose - Fonction pour fermer la modale
 */
const ProjectModal = ({ project, isOpen, onClose }) => {
  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay sombre avec animation */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Contenu de la modale avec animation */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] xl:max-w-7xl max-h-[95vh] overflow-hidden animate-modalSlideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Fermer la modale"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto max-h-[95vh]">
          {/* Section images avant/après */}
          <div className="relative">
            {/* Images côte à côte sur desktop, empilées sur mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image AVANT */}
              {project.imageBefore && (
                <div className="relative h-72 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem] bg-gray-100">
                  <img 
                    src={project.imageBefore} 
                    alt={`${project.name} - Avant`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Avant
                  </div>
                </div>
              )}
              
              {/* Image APRES */}
              {project.imageAfter && (
                <div className="relative h-72 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem] bg-gray-100">
                  <img 
                    src={project.imageAfter} 
                    alt={`${project.name} - Après`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Après
                  </div>
                </div>
              )}
            </div>
            
            {/* Badges par-dessus les images */}
            <div className="absolute top-4 left-4 flex gap-2">
              {project.featured && (
                <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full shadow-lg">
                  ⭐ Projet phare
                </span>
              )}
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full">
                {project.year}
              </span>
            </div>
          </div>

          {/* Informations du projet */}
          <div className="p-6 md:p-8 lg:p-10 xl:p-12">
            {/* En-tête */}
            <div className="mb-6 lg:mb-8">
              <h2 id="modal-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {project.name}
              </h2>
              <div className="flex items-center gap-4 text-gray-600 text-sm md:text-base">
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.city}
                </span>
                <span className="text-blue-500 font-medium">{project.type}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Description du projet</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {project.description}
              </p>
              {project.fullDescription && (
                <p className="text-gray-600 leading-relaxed mt-3 text-base md:text-lg">
                  {project.fullDescription}
                </p>
              )}
            </div>

            {/* Caractéristiques techniques */}
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📐</span> Caractéristiques
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {project.dimensions && (
                    <li className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Dimensions</span>
                      <span className="font-medium text-gray-900">{project.dimensions}</span>
                    </li>
                  )}
                  {project.depth && (
                    <li className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Profondeur</span>
                      <span className="font-medium text-gray-900">{project.depth}</span>
                    </li>
                  )}
                  <li className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Année</span>
                    <span className="font-medium text-gray-900">{project.year}</span>
                  </li>
                  <li className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Localisation</span>
                    <span className="font-medium text-gray-900">{project.city}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 lg:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">✨</span> Points forts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white text-blue-600 text-sm md:text-base rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4 lg:pt-6 border-t">
              <a 
                href="/contact" 
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-3 lg:py-4 px-6 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                Un projet similaire ? Contactez-nous
              </a>
              <button 
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-3 lg:py-4 px-6 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
