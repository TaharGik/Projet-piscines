import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects';

/**
 * Composant ProjectsGrid - Grille de projets avec modale
 * 
 * @param {number} limit - Nombre de projets à afficher
 * @param {boolean} featured - Afficher uniquement les projets phares
 */
const ProjectsGrid = ({ limit, featured }) => {
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

  let displayedProjects = projects;
  
  if (featured) {
    displayedProjects = projects.filter(p => p.featured);
  }
  
  if (limit) {
    displayedProjects = displayedProjects.slice(0, limit);
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      
      {/* Modale de détails du projet */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsGrid;
