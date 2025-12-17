/**
 * Composant ProjectCard - Carte de presentation d'un projet
 * 
 * Affiche un apercu du projet avec :
 * - Image placeholder (a remplacer par vraie photo)
 * - Badge "Projet phare" si featured
 * - Nom, ville, type, description
 * - Tags des caracteristiques
 * 
 * Au clic sur "En savoir plus", ouvre une modale avec les détails
 * 
 * @param {Object} project - Donnees du projet depuis projects.js
 * @param {Function} onOpenModal - Fonction pour ouvrir la modale
 */
const ProjectCard = ({ project, onOpenModal }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onOpenModal) {
      onOpenModal(project);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
        {/* Image du projet */}
        {project.imageAfter || project.imageBefore ? (
          <img 
            src={project.imageAfter || project.imageBefore} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Photo du projet</span>
          </div>
        )}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300"></div>
        {project.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            ⭐ Projet phare
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <span className="text-sm text-gray-500">{project.year}</span>
        </div>
        
        <p className="text-blue-500 text-sm font-medium mb-2">
          📍 {project.city}
        </p>
        
        <p className="text-gray-600 text-sm mb-3">
          {project.type}
        </p>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bouton En savoir plus */}
        <button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          <span>En savoir plus</span>
          <svg 
            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
