import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServicesSection from '../components/ServicesSection';
import ProjectsGrid from '../components/ProjectsGrid';
import TestimonialsSection from '../components/TestimonialsSection';
import AnimatedSection from '../components/AnimatedSection';
import QuoteWizard from '../components/QuoteWizard';
import useSEO from '../hooks/useSEO';

/**
 * Page d'accueil
 * Affiche le hero, services, réalisations et témoignages
 */
const Home = () => {
  // État pour afficher/masquer le wizard de devis
  const [showQuoteWizard, setShowQuoteWizard] = useState(false);

  // SEO - Meta tags pour la page d'accueil
  useSEO({
    title: 'Piscines sur mesure en Ile-de-France',
    description: 'Aqua Prestige, expert pisciniste depuis 2009. Conception, realisation et entretien de piscines sur mesure en region parisienne. Devis gratuit sous 48h.',
    keywords: 'piscine sur mesure, pisciniste Ile-de-France, construction piscine Paris, piscine beton, piscine coque, renovation piscine',
    canonicalUrl: 'https://www.aqua-prestige.fr/',
  });

  return (
    <>
      {/* Hero Section */}
      <Hero onRequestQuote={() => setShowQuoteWizard(true)} />

      {/* Wizard de demande de devis */}
      {showQuoteWizard && (
        <QuoteWizard 
          onClose={() => setShowQuoteWizard(false)}
          onComplete={(data) => {
            console.log('Devis envoyé:', data);
            // Fermer après un délai pour voir le message de succès
            setTimeout(() => setShowQuoteWizard(false), 3000);
          }}
        />
      )}

      {/* Section Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <SectionTitle
              title="Nos services"
              subtitle="De la conception à l'entretien, nous vous accompagnons dans tous vos projets piscine"
            />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <ServicesSection limit={3} />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-10">
              <Link to="/services" className="btn-primary">
                Découvrir tous nos services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section Réalisations */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <SectionTitle
              title="Nos réalisations"
              subtitle="Découvrez quelques-unes de nos plus belles créations en région parisienne"
            />
          </AnimatedSection>
          <AnimatedSection animation="zoom-in" delay={200}>
            <ProjectsGrid limit={3} featured={true} />
          </AnimatedSection>
          <div className="text-center mt-10">
            <Link to="/realisations" className="btn-primary">
              Voir toutes nos réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <SectionTitle
              title="Ils nous font confiance"
              subtitle="L'avis de nos clients est notre meilleure carte de visite"
            />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <TestimonialsSection limit={3} />
          </AnimatedSection>
        </div>
      </section>

      {/* Bandeau Zone d'intervention */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Zone d'intervention</h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Nous intervenons dans toute l'Île-de-France : Paris, Hauts-de-Seine, Yvelines, Val-de-Marne, 
                Essonne, Seine-Saint-Denis, Val-d'Oise et Seine-et-Marne.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {['Paris 75', 'Hauts-de-Seine 92', 'Yvelines 78', 'Val-de-Marne 94', 'Essonne 91', 'Seine-Saint-Denis 93'].map((dept) => (
                  <span key={dept} className="px-4 py-2 bg-white/20 rounded-full">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection animation="zoom-in">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à concrétiser votre projet ?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Configurez votre projet en quelques clics et recevez une estimation personnalisée.
              </p>
              <button 
                onClick={() => setShowQuoteWizard(true)}
                className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer"
              >
                Lancer mon projet piscine
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;
