import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import useSEO from '../hooks/useSEO';
import { BreadcrumbSchema, ServiceSchema } from '../components/StructuredData';

/**
 * Page Services
 * Liste détaillée de tous les services proposés
 */
const Services = () => {
  const location = useLocation();

  // SEO - Meta tags pour la page Services
  useSEO({
    title: 'Nos services - Construction, renovation et entretien piscines',
    description: 'Decouvrez nos services : piscines beton et coque sur mesure, piscines interieures, renovation et entretien annuel en Ile-de-France.',
    keywords: 'construction piscine, renovation piscine, entretien piscine, piscine beton, piscine coque, piscine interieure',
    canonicalUrl: 'https://www.bbhservice.fr/services',
  });

  // Scroll vers l'ancre si présente dans l'URL
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Petit délai pour laisser le temps à la page de se charger
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Structured Data pour SEO */}
      <BreadcrumbSchema items={[
        { name: 'Accueil', path: '/' },
        { name: 'Services', path: '/services' }
      ]} />
      
      {/* Hero Services */}
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
              Nos services
            </h1>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              De la conception à l'entretien, nous vous accompagnons dans tous vos projets 
              aquatiques avec expertise et passion.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.slug}
                className={`grid gap-6 sm:gap-8 md:grid-cols-2 items-center scroll-mt-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  {service.image ? (
                    <div className="rounded-2xl h-64 md:h-80 overflow-hidden shadow-lg">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        width="600"
                        height="320"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-200 rounded-2xl h-64 md:h-80 flex items-center justify-center">
                      <span className="text-6xl">{getServiceIcon(service.icon)}</span>
                    </div>
                  )}
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-3">Avantages :</h3>
                  <ul className="space-y-2 mb-6">
                    {service.advantages.map((advantage, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-[#2FB8B3] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/devis" className="btn-primary">
                    Demander un devis
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Notre processus"
            subtitle="Un accompagnement de A à Z pour votre projet"
          />
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              { step: '01', title: 'Étude', desc: 'Analyse de votre terrain, de vos besoins et de vos envies' },
              { step: '02', title: 'Conception', desc: 'Plans détaillés, choix des matériaux et devis complet' },
              { step: '03', title: 'Réalisation', desc: 'Construction par nos équipes avec suivi régulier' },
              { step: '04', title: 'Livraison', desc: 'Mise en eau, formation et remise des clés' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0F2A44] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-[#0F2A44] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-[#0F2A44] rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Un projet en tête ?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une étude gratuite et sans engagement
            </p>
            <Link to="/devis" className="inline-block bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Helper pour les icônes de services
const getServiceIcon = (icon) => {
  const icons = {
    pool: '🏊',
    waves: '🌊',
    home: '🏠',
    refresh: '🔄',
    tools: '🔧',
    calendar: '📅'
  };
  return icons[icon] || '🏊';
};

export default Services;
