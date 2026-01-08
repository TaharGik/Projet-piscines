import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import useSEO from '../hooks/useSEO';

/**
 * Page Réalisations
 * Grille de tous les projets avec filtres
 */
const Projects = () => {
  // SEO - Meta tags pour la page Réalisations
  useSEO({
    title: 'Nos réalisations - Piscines sur mesure en région parisienne',
    description: 'Galerie de nos plus belles piscines réalisées en Ile-de-France : piscines à débordement, piscines intérieures, rénovations. Depuis 2016.',
    keywords: 'réalisations piscines, portfolio piscine, piscine débordement, piscine Versailles, piscine Saint-Germain-en-Laye',
    canonicalUrl: 'https://www.bbhservice.fr/realisations',
  });
  
  const [filter, setFilter] = useState('all');

  // Types de projets pour les filtres
  const projectTypes = [
    { value: 'all', label: 'Tous' },
    { value: 'beton', label: 'Piscines béton' },
    { value: 'coque', label: 'Piscines coque' },
    { value: 'interieure', label: 'Piscines intérieures' },
    { value: 'renovation', label: 'Rénovations' }
  ];

  // Filtrer les projets
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type.toLowerCase().includes(filter));

  return (
    <>
      {/* Hero Réalisations */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0F2A44 50%, #0a1e30 100%)' }}
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#2FB8B3] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2FB8B3] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Nos réalisations
            </h1>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Découvrez quelques-unes de nos plus belles créations en région parisienne. <br />
              Chaque projet est unique et réalisé sur mesure.
            </p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-[#F3F5F9] sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type.value
                    ? 'bg-[#0F2A44] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille de projets */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Compteur de résultats */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              <span className="font-semibold text-primary">{filteredProjects.length}</span> 
              {filteredProjects.length > 1 ? ' réalisations' : ' réalisation'}
              {filter !== 'all' && (
                <span className="ml-1">
                  pour <span className="font-medium">{projectTypes.find(t => t.value === filter)?.label}</span>
                </span>
              )}
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <>
              {/* Grille équilibrée - masonry-like */}
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className="w-full">
                    <ProjectCard 
                      project={project}
                    />
                  </div>
                ))}
              </div>
              
              {/* Message si très peu de résultats */}
              {filteredProjects.length <= 2 && filter !== 'all' && (
                <div className="text-center mt-12 p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-600 mb-4">
                    Peu de résultats pour ce filtre ? Découvrez toutes nos réalisations.
                  </p>
                  <button
                    onClick={() => setFilter('all')}
                    className="inline-flex items-center text-secondary hover:text-secondary/80 font-medium"
                  >
                    Voir toutes les réalisations
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucune réalisation trouvée
                </h3>
                <p className="text-gray-500 mb-6">
                  Nous n'avons pas encore de projet correspondant à ce filtre. 
                  Essayez un autre type ou consultez toutes nos réalisations.
                </p>
                <button
                  onClick={() => setFilter('all')}
                  className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Voir toutes les réalisations
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Votre projet sera le prochain ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <Link to="/devis" className="btn-primary">
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
};

export default Projects;
