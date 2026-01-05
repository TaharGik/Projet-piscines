import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import AnimatedSection from '../components/AnimatedSection';
import ImageCarousel from '../components/ImageCarousel';
import useSEO from '../hooks/useSEO';

/**
 * Page de detail d'un projet / realisation
 * 
 * Route dynamique : /realisations/:slug
 * Affiche toutes les informations detaillees d'un projet :
 * - Images avant/apres
 * - Description complete
 * - Caracteristiques techniques
 * - Equipements installes
 * - Projets similaires
 */
const ProjectDetail = () => {
  // Recuperation du slug depuis l'URL
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Recherche du projet correspondant au slug
  const project = projects.find(p => p.slug === slug);
  
  // SEO - Meta tags dynamiques pour chaque projet
  useSEO({
    title: project ? `${project.name} - Réalisation piscine ${project.city}` : 'Projet non trouvé',
    description: project 
      ? `Découvrez notre réalisation : ${project.type} à ${project.city}. ${project.description}` 
      : 'Ce projet n\'existe pas.',
    keywords: project 
      ? `piscine ${project.city}, ${project.type}, ${project.tags.join(', ')}` 
      : '',
    canonicalUrl: project 
      ? `https://www.bbhservice.fr/realisations/${project.slug}` 
      : '',
  });

  // Si le projet n'existe pas, afficher un message d'erreur
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projet non trouvé</h1>
          <p className="text-gray-600 mb-8">Ce projet n'existe pas ou a été supprimé.</p>
          <Link to="/realisations" className="btn-primary">
            Voir toutes les réalisations
          </Link>
        </div>
      </div>
    );
  }

  // Trouver des projets similaires (meme type ou tags communs)
  const similarProjects = projects
    .filter(p => p.id !== project.id)
    .filter(p => 
      p.type === project.type || 
      p.tags.some(tag => project.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero avec image */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0F2A44 50%, #0a1e30 100%)' }}
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#2FB8B3] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2FB8B3] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux réalisations
          </button>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.featured && (
                <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                  Projet phare
                </span>
              )}
              <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                {project.year}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ffffff' }}>
              {project.name}
            </h1>
            
            <p className="text-xl mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {project.type}
            </p>
            
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              📍 {project.city}, {project.department}
            </p>
          </div>
        </div>
      </section>

      {/* Galerie photos avec carrousel */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Galerie photos
            </h2>
            
            {/* Carrousel d'images du projet - utilise les vraies images */}
            <ImageCarousel 
              images={[
                project.imageAfter && {
                  src: project.imageAfter,
                  alt: `${project.name} - Vue d'ensemble`,
                  caption: `Vue d'ensemble de la ${project.type.toLowerCase()}`
                },
                project.imageBefore && {
                  src: project.imageBefore,
                  alt: `${project.name} - Avant travaux`,
                  caption: 'État initial avant travaux'
                },
              ].filter(Boolean)}
              showThumbnails={true}
              autoPlay={false}
              className="mb-12"
            />
            
            {/* Section Avant/Après */}
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center mt-12">
              Transformation Avant / Après
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group overflow-hidden rounded-xl">
                <div className="absolute top-4 left-4 z-10 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm">
                  Avant
                </div>
                {project.imageBefore ? (
                  <img 
                    src={project.imageBefore} 
                    alt={`${project.name} - Avant`}
                    className="h-64 md:h-80 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-64 md:h-80 bg-gray-300 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <span className="text-gray-500">Photo avant travaux</span>
                  </div>
                )}
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Après
                </div>
                {project.imageAfter ? (
                  <img 
                    src={project.imageAfter} 
                    alt={`${project.name} - Après`}
                    className="h-64 md:h-80 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-64 md:h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <span className="text-blue-600">Photo après travaux</span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description et details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  A propos de ce projet
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {project.longDescription ? (
                    project.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))
                  ) : (
                    <p>{project.description}</p>
                  )}
                </div>
                
                {/* Tags */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Caracteristiques</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Fiche technique */}
            <div>
              <AnimatedSection animation="fade-left" delay={200}>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Fiche technique
                  </h3>
                  
                  <ul className="space-y-4">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Dimensions</span>
                      <span className="font-medium text-gray-900">{project.dimensions}</span>
                    </li>
                    {project.depth && (
                      <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">Profondeur</span>
                        <span className="font-medium text-gray-900">{project.depth}</span>
                      </li>
                    )}
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Annee</span>
                      <span className="font-medium text-gray-900">{project.year}</span>
                    </li>
                    {project.duration && (
                      <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">Duree chantier</span>
                        <span className="font-medium text-gray-900">{project.duration}</span>
                      </li>
                    )}
                    {project.budget && (
                      <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600">Budget</span>
                        <span className="font-medium text-gray-900">{project.budget}</span>
                      </li>
                    )}
                  </ul>

                  {/* Details techniques */}
                  {project.details && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Details techniques</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <span className="text-gray-500">Filtration :</span>
                          <span className="block text-gray-900">{project.details.filtration}</span>
                        </li>
                        <li>
                          <span className="text-gray-500">Revetement :</span>
                          <span className="block text-gray-900">{project.details.revetement}</span>
                        </li>
                        <li>
                          <span className="text-gray-500">Margelles :</span>
                          <span className="block text-gray-900">{project.details.margelles}</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Equipements */}
                  {project.details?.equipements && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Equipements</h4>
                      <ul className="space-y-2">
                        {project.details.equipements.map((equip, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {equip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-8">
                    <Link 
                      to="/devis"
                      className="block w-full bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
                    >
                      Un projet similaire ?
                    </Link>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Devis gratuit sous 48h
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Projets similaires */}
      {similarProjects.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Projets similaires
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {similarProjects.map((p) => (
                  <Link 
                    key={p.id}
                    to={`/realisations/${p.slug}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Photo</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-blue-500">{p.city}</p>
                      <p className="text-sm text-gray-600">{p.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 bg-[#F3F5F9]">
        <div className="container-custom text-center">
          <AnimatedSection animation="zoom-in">
            <h2 className="text-3xl font-bold mb-4 text-[#0F2A44]">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Contactez-nous pour une étude personnalisée et un devis gratuit
            </p>
            <Link 
              to="/devis"
              className="inline-block bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
            >
              Demander un devis gratuit
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
