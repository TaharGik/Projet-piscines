import { useState, useMemo } from 'react';

/**
 * ProjectFilters - Composant de filtres pour la page Réalisations
 * 
 * Fonctionnalités :
 * - Filtrage par catégorie (tous, béton, coque, intérieure, rénovation)
 * - Compteur de résultats par filtre
 * - Animations fluides
 * - Design cohérent avec la charte BBH SERVICE
 * 
 * @param {Array} projects - Liste complète des projets
 * @param {Function} onFilterChange - Callback appelé quand le filtre change
 */
const ProjectFilters = ({ projects = [], onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  /**
   * Catégories de filtres avec compteurs
   */
  const filters = useMemo(() => {
    const categories = [
      { id: 'all', label: 'Tous les projets', icon: '🏊' },
      { id: 'beton', label: 'Piscines béton', icon: '🏗️' },
      { id: 'coque', label: 'Piscines coque', icon: '🛡️' },
      { id: 'interieure', label: 'Piscines intérieures', icon: '🏠' },
      { id: 'renovation', label: 'Rénovations', icon: '🔧' },
      { id: 'debordement', label: 'À débordement', icon: '🌊' }
    ];

    return categories.map(category => {
      let count;
      if (category.id === 'all') {
        count = projects.length;
      } else {
        count = projects.filter(project => 
          project.tags?.some(tag => 
            tag.toLowerCase().includes(category.id) ||
            project.type?.toLowerCase().includes(category.id)
          )
        ).length;
      }

      return { ...category, count };
    });
  }, [projects]);

  /**
   * Gère le changement de filtre
   */
  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="mb-8">
      {/* Version mobile - Scroll horizontal */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {filters.map(filter => (
            filter.count > 0 && (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`
                  flex-shrink-0 px-4 py-2.5 rounded-full font-semibold text-sm
                  transition-all duration-300 whitespace-nowrap
                  flex items-center gap-2
                  ${activeFilter === filter.id
                    ? 'bg-[#0F2A44] text-white shadow-lg scale-105'
                    : 'bg-white text-[#0F2A44] border-2 border-[#E5E7EB] hover:border-[#2FB8B3]'
                  }
                `}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                  }
                `}>
                  {filter.count}
                </span>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Version desktop - Grid */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-3 justify-center">
          {filters.map(filter => (
            filter.count > 0 && (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`
                  group px-6 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-300
                  flex items-center gap-3
                  ${activeFilter === filter.id
                    ? 'bg-[#0F2A44] text-white shadow-xl scale-105 hover:bg-[#1a3a5c]'
                    : 'bg-white text-[#0F2A44] border-2 border-[#E5E7EB] hover:border-[#2FB8B3] hover:shadow-lg hover:scale-102'
                  }
                `}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                  {filter.icon}
                </span>
                <span>{filter.label}</span>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold
                  transition-all duration-300
                  ${activeFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#2FB8B3]/10 group-hover:text-[#2FB8B3]'
                  }
                `}>
                  {filter.count}
                </span>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="mt-6 text-center">
        <p className="text-[#6B7280] text-sm font-medium">
          {activeFilter === 'all' ? (
            <>
              <span className="text-[#2FB8B3] font-bold">{projects.length}</span> réalisation
              {projects.length > 1 ? 's' : ''} au total
            </>
          ) : (
            <>
              <span className="text-[#2FB8B3] font-bold">
                {filters.find(f => f.id === activeFilter)?.count || 0}
              </span> projet
              {(filters.find(f => f.id === activeFilter)?.count || 0) > 1 ? 's' : ''} trouvé
              {(filters.find(f => f.id === activeFilter)?.count || 0) > 1 ? 's' : ''}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProjectFilters;
