import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { projects } from '../data/projects';
import OptimizedImage from './OptimizedImage';

/**
 * Composant ProjectsGrid - Grille de projets avec disposition asymétrique
 * Style masonry : grande image à gauche, 2 images à droite
 * 
 * @param {number} limit - Nombre de projets à afficher
 * @param {boolean} featured - Afficher uniquement les projets phares
 * @param {boolean} asymmetric - Utiliser la disposition asymétrique (défaut: true pour 3 projets)
 */
const ProjectsGrid = ({ limit, featured, asymmetric = true }) => {
  let displayedProjects = projects;
  
  if (featured) {
    displayedProjects = projects.filter(p => p.featured);
  }
  
  if (limit) {
    displayedProjects = displayedProjects.slice(0, limit);
  }

  // Disposition asymétrique pour 3 projets (comme la maquette)
  // Grande image gauche - Petite image milieu - Grande image droite
  if (asymmetric && displayedProjects.length >= 3) {
    const [first, second, third] = displayedProjects.slice(0, 3);
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Grande image à gauche - Verticale */}
          <Link 
            to={`/realisations/${first.slug}`}
            className="group flex flex-col h-full"
          >
            <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-neutral-light">
              {first.imageAfter || first.imageBefore ? (
                <OptimizedImage 
                  src={first.imageAfter || first.imageBefore} 
                  alt={first.name}
                  width="800"
                  height="450"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#99DFEC] to-[#8FD7FE]">
                  <span className="text-primary/50 text-sm font-sans">Photo du projet</span>
                </div>
              )}
              {/* Overlay sombre au survol uniquement */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Description sous l'image */}
            <div className="mt-4 flex-1">
              <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-secondary transition-colors">{first.name}</h3>
              <p className="font-sans text-primary/60 text-sm mt-2 line-clamp-2">{first.description}</p>
            </div>
          </Link>

          {/* Colonne du milieu - Petite image + En savoir plus */}
          <div className="flex flex-col h-full">
            <Link 
              to={`/realisations/${second.slug}`}
              className="group flex flex-col flex-1"
            >
              <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-neutral-light">
                {second.imageAfter || second.imageBefore ? (
                  <OptimizedImage 
                    src={second.imageAfter || second.imageBefore} 
                    alt={second.name}
                    width="500"
                    height="450"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#99DFEC] to-[#8FD7FE]">
                    <span className="text-primary/50 text-sm font-sans">Photo du projet</span>
                  </div>
                )}
                {/* Overlay sombre au survol uniquement */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Description sous l'image */}
              <div className="mt-4 flex-1">
                <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-secondary transition-colors">{second.name}</h3>
                <p className="font-sans text-primary/60 text-sm mt-2 line-clamp-2">{second.description}</p>
              </div>
            </Link>
          </div>

          {/* Grande image à droite - Verticale */}
          <Link 
            to={`/realisations/${third.slug}`}
            className="group flex flex-col h-full"
          >
            <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-neutral-light">
              {third.imageAfter || third.imageBefore ? (
                <OptimizedImage 
                  src={third.imageAfter || third.imageBefore} 
                  alt={third.name}
                  width="500"
                  height="450"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#99DFEC] to-[#8FD7FE]">
                  <span className="text-primary/50 text-sm font-sans">Photo du projet</span>
                </div>
              )}
              {/* Overlay sombre au survol uniquement */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Description sous l'image */}
            <div className="mt-4 flex-1">
              <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-secondary transition-colors">{third.name}</h3>
              <p className="font-sans text-primary/60 text-sm mt-2 line-clamp-2">{third.description}</p>
            </div>
          </Link>
        </div>
      </>
    );
  }

  // Disposition classique en grille
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project) => (
          <Link 
            key={project.id}
            to={`/realisations/${project.slug}`}
            className="group"
          >
            <div className="relative h-[240px] rounded-xl overflow-hidden bg-neutral-light">
              {project.imageAfter || project.imageBefore ? (
                <OptimizedImage 
                  src={project.imageAfter || project.imageBefore} 
                  alt={project.name}
                  width="400"
                  height="240"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#99DFEC] to-[#8FD7FE]">
                  <span className="text-primary/50 text-sm font-sans">Photo du projet</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div className="mt-3">
              <h3 className="font-heading text-base font-semibold text-primary group-hover:text-secondary transition-colors">{project.name}</h3>
              <p className="font-sans text-primary/60 text-sm">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

ProjectsGrid.propTypes = {
  limit: PropTypes.number,
  featured: PropTypes.bool,
  asymmetric: PropTypes.bool,
};

export default ProjectsGrid;
