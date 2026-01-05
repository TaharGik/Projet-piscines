import { Link } from 'react-router-dom';

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
    <div className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-card transition-all duration-200 group">
      {/* Image du projet */}
      <div className="h-56 bg-neutral-light relative overflow-hidden">
        {project.imageAfter || project.imageBefore ? (
          <img 
            src={project.imageAfter || project.imageBefore} 
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary/50 text-sm font-sans">Photo du projet</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[#0F2A44]/0 group-hover:bg-[#0F2A44]/10 transition-colors duration-200"></div>
        
        {/* Badge projet phare - Couleur secondaire */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-sans font-medium px-3 py-1 rounded-md shadow-soft">
            ⭐ Projet phare
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* En-tête avec nom et année */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
            {project.name}
          </h3>
          <span className="font-sans text-sm text-primary/50">{project.year}</span>
        </div>
        
        {/* Localisation */}
        <p className="font-sans text-secondary text-sm font-medium mb-2">
          📍 {project.city}
        </p>
        
        {/* Type de projet */}
        <p className="font-sans text-primary/70 text-sm mb-3">
          {project.type}
        </p>
        
        {/* Description */}
        <p className="font-sans text-primary/60 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-neutral-light text-primary/70 font-sans text-xs rounded-md group-hover:bg-accent-pastel/30 group-hover:text-primary transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bouton CTA - Couleur secondaire, pas de gradient */}
        <Link
          to={`/realisations/${project.slug}`}
          className="w-full bg-secondary hover:bg-[#269e9a] text-white py-2.5 px-4 rounded-md font-heading font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <span>En savoir plus</span>
          <svg 
            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
