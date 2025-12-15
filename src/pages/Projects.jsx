import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projects } from '../data/projects';
import useSEO from '../hooks/useSEO';

/**
 * Page Réalisations
 * Grille de tous les projets avec filtres et modale de détails
 */
const Projects = () => {
  // SEO - Meta tags pour la page Réalisations
  useSEO({
    title: 'Nos realisations - Piscines sur mesure en region parisienne',
    description: 'Galerie de nos plus belles piscines realisees en Ile-de-France : piscines a debordement, piscines interieures, renovations. Plus de 250 projets depuis 2009.',
    keywords: 'realisations piscines, portfolio piscine, piscine debordement, piscine Versailles, piscine Saint-Germain-en-Laye',
    canonicalUrl: 'https://www.aqua-prestige.fr/realisations',
  });
  
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ouvrir la modale avec un projet
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos réalisations
            </h1>
            <p className="text-xl text-primary-100">
              Découvrez quelques-unes de nos plus belles créations en région parisienne. <br />
              Chaque projet est unique et réalisé sur mesure.
            </p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-gray-50 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type.value
                    ? 'bg-primary-500 text-white'
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
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune réalisation trouvée pour ce filtre.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">250+</div>
              <div className="text-primary-100">Piscines réalisées</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-primary-100">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-primary-100">Départements couverts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-100">Clients satisfaits</div>
            </div>
          </div>
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
          <a href="/contact" className="btn-primary">
            Demander un devis gratuit
          </a>
        </div>
      </section>

      {/* Modale de détails du projet */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;
