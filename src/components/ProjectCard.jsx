import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OptimizedImage from './OptimizedImage';

/**
 * ProjectCard BBH SERVICE
 * Conforme à la charte graphique :
 * - Design sobre avec coins légèrement arrondis (rounded-lg)
 * - Pas de gradients complexes, ombres légères
 * - Couleurs : #0F2A44 (primaire), #2FB8B3 (CTA), #F3F5F9 (fond clair)
 * - Typographies : Montserrat (titres), Lato (texte)
 */
const ProjectCard = ({ project }) => {
  return (
    <article className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-card transition-all duration-300 group">
      {/* Image du projet */}
      <div className="relative h-64 bg-neutral-light overflow-hidden">
        {project.imageAfter || project.imageBefore ? (
          <OptimizedImage 
            src={project.imageAfter || project.imageBefore} 
            alt={project.name}
            width="400"
            height="256"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#99DFEC] to-[#8FD7FE]">
            <span className="text-primary/50 text-sm font-sans">Photo du projet</span>
          </div>
        )}
        
        {/* Overlay gradient au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badge projet phare - Design premium */}
        {project.featured && (
          <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Projet phare
          </div>
        )}
        
        {/* Bouton "Voir le projet" au hover (desktop uniquement) */}
        <div className="hidden md:flex absolute inset-0 items-end justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link 
            to={`/realisations/${project.slug}`}
            className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200 shadow-lg"
            aria-label={`Voir les détails du projet ${project.name}`}
          >
            Voir le projet
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        {/* En-tête avec nom et année */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading text-lg font-bold text-primary group-hover:text-secondary transition-colors duration-200 flex-1 line-clamp-2">
            {project.name}
          </h3>
          {project.year && (
            <span className="flex-shrink-0 px-3 py-1 bg-[#F3F4F6] text-[#6B7280] font-semibold text-sm rounded-full">
              {project.year}
            </span>
          )}
        </div>
        
        {/* Localisation avec icône */}
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className="font-sans text-secondary text-sm font-semibold">
            {project.city}
          </span>
        </div>
        
        {/* Type de projet */}
        <p className="font-sans text-primary/70 text-sm font-medium mb-3">
          {project.type}
        </p>
        
        {/* Description */}
        <p className="font-sans text-primary/60 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tags optimisés */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-[#F0F9FF] text-[#0284C7] font-sans text-xs font-semibold rounded-full hover:bg-[#E0F2FE] transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bouton CTA mobile */}
        <Link
          to={`/realisations/${project.slug}`}
          className="md:hidden w-full bg-secondary hover:bg-[#269e9a] text-white py-3 px-4 rounded-lg font-heading font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          aria-label={`En savoir plus sur le projet ${project.name}`}
        >
          <span>En savoir plus</span>
          <svg 
            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
