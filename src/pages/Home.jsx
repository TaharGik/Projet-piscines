import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProofPoints from '../components/ProofPoints';
import TrustBadges from '../components/TrustBadges';
import SectionTitle from '../components/SectionTitle';
import ServicesSection from '../components/ServicesSection';
import ProjectsGrid from '../components/ProjectsGrid';
import TestimonialsSection from '../components/TestimonialsSection';
import AnimatedSection from '../components/AnimatedSection';
import useSEO from '../hooks/useSEO';

/**
 * Page d'accueil
 * Affiche le hero, services, réalisations et témoignages
 */
const Home = () => {
  // SEO - Meta tags pour la page d'accueil
  useSEO({
    title: 'Piscines sur mesure en Ile-de-France',
    description: 'BBH SERVICE, expert pisciniste depuis 2016. Conception, réalisation et entretien de piscines sur mesure en région parisienne. Devis gratuit sous 48h.',
    keywords: 'piscine sur mesure, pisciniste Ile-de-France, construction piscine Paris, piscine beton, piscine coque, renovation piscine',
    canonicalUrl: 'https://www.bbhservice.fr/',
  });

  // Données pour la section bénéfices - 3 Valeurs ADN BBH SERVICE
  const benefits = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Expertise & précision",
      description: "Chaque projet est mené avec une maîtrise technique rigoureuse, de la conception jusqu'à la mise en service. La précision d'exécution garantit des installations fiables et pérennes."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Qualité premium & finitions soignées",
      description: "BBH SERVICE accorde une attention particulière au choix des matériaux, à la qualité des équipements et au niveau de finition. Chaque piscine est pensée comme une réalisation durable, au standard premium."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Proximité & relation de confiance",
      description: "Une relation client humaine et transparente, fondée sur l'écoute, la disponibilité et l'accompagnement à chaque étape du projet."
    }
  ];

  // Données pour les étapes du processus
  const processSteps = [
    {
      number: "01",
      title: "Prise de contact",
      description: "Échange téléphonique pour comprendre votre projet, vos envies et votre budget."
    },
    {
      number: "02",
      title: "Visite & étude technique",
      description: "Analyse du terrain, contraintes et opportunités. Nous vous proposons les meilleures solutions."
    },
    {
      number: "03",
      title: "Devis détaillé",
      description: "Un devis transparent et complet, sans surprise. Tout est clair avant de démarrer."
    },
    {
      number: "04",
      title: "Réalisation & livraison",
      description: "Chantier suivi de A à Z avec des points d'étape réguliers. Votre piscine prête à plonger."
    }
  ];

  // Données pour les chiffres clés
  const keyFigures = [
    { value: "9", suffix: "ans", label: "d'expérience" },
    { value: "150", suffix: "+", label: "piscines réalisées" },
    { value: "98", suffix: "%", label: "clients satisfaits" },
    { value: "48", suffix: "h", label: "pour un devis" }
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Proof Points Section */}
      <ProofPoints />

      {/* Section Pourquoi nous choisir - Bénéfices clients */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4">
                Pourquoi choisir BBH SERVICE ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Acteur premium de l'installation de piscines, nous proposons des solutions fiables, durables et parfaitement maîtrisées pour les particuliers exigeants.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
                <div className="text-center p-8 rounded-2xl bg-[#F3F5F9] hover:bg-[#2FB8B3]/10 transition-all duration-300 h-full group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2FB8B3]/15 text-[#2FB8B3] mb-6 group-hover:bg-[#2FB8B3] group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F2A44] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ça se passe - Processus */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Un accompagnement professionnel de bout en bout
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Grande réactivité, suivi de chantier rigoureux et relation client directe : votre projet est entre de bonnes mains.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="relative p-6 rounded-xl bg-white border border-gray-200 shadow-sm h-full">
                  <span className="text-5xl font-bold text-secondary/30 absolute top-4 right-4">
                    {step.number}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-primary mb-3 mt-8">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={500}>
            <div className="text-center mt-12">
              <Link 
                to="/devis"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
              >
                <span>Je lance mon projet</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section Chiffres clés - Rassurance */}
      <section className="py-16 bg-[#F3F5F9]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyFigures.map((figure, index) => (
              <AnimatedSection key={index} animation="zoom-in" delay={index * 100}>
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-[#0F2A44]">{figure.value}</span>
                    <span className="text-2xl md:text-3xl font-bold text-[#2FB8B3]">{figure.suffix}</span>
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">{figure.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <SectionTitle
              title="Des solutions adaptées à chaque projet"
              subtitle="Piscine béton, coque polyester, rénovation ou entretien : nous avons l'expertise pour répondre à tous vos besoins."
            />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <ServicesSection limit={3} />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link to="/services" className="inline-flex items-center gap-2 btn-primary">
                <span>Explorer nos solutions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section Réalisations */}
      <section className="py-20 bg-[#F3F5F9]">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <SectionTitle
              title="Nos dernières réalisations"
              subtitle="Chaque projet est unique. Découvrez comment nous avons transformé les jardins de nos clients en véritables espaces de vie."
            />
          </AnimatedSection>
          <AnimatedSection animation="zoom-in" delay={200}>
            <ProjectsGrid limit={3} featured={true} />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link to="/realisations" className="inline-flex items-center gap-2 btn-primary">
                <span>Voir tous nos projets</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="mt-4 text-gray-500 text-sm">
                Et si votre piscine était la prochaine ?
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section Trust Badges - Assurances et Garanties */}
      <AnimatedSection animation="fade-up">
        <TrustBadges variant="horizontal" className="border-t border-b" />
      </AnimatedSection>

      {/* Section Témoignages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <SectionTitle
              title="Ils nous ont fait confiance"
              subtitle="La satisfaction de nos clients est notre plus belle récompense. Découvrez leurs témoignages."
            />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <TestimonialsSection limit={3} />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-8">
              <p className="text-gray-600 italic">
                "Vous aussi, rejoignez nos clients satisfaits"
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section Engagements - Rassurance renforcée */}
      <section className="py-20 bg-[#F3F5F9]">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4">
                Nos engagements qualité
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des garanties concrètes pour un projet en toute sérénité.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🛡️", title: "Garantie décennale", desc: "Couverture complète pendant 10 ans" },
              { icon: "📋", title: "Devis détaillé", desc: "Sans engagement, sous 48h" },
              { icon: "👷", title: "Équipe qualifiée", desc: "Artisans certifiés et expérimentés" },
              { icon: "🤝", title: "SAV réactif", desc: "Assistance après livraison incluse" }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-card transition-shadow">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-semibold text-[#0F2A44] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau Zone d'intervention */}
      <section className="py-16 bg-[#0F2A44] text-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Île-de-France et régions limitrophes</h2>
              <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
                Cette proximité géographique permet :
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg border border-white/20">
                  <svg className="w-6 h-6 text-[#2FB8B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-white font-medium">Une grande réactivité</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg border border-white/20">
                  <svg className="w-6 h-6 text-[#2FB8B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span className="text-white font-medium">Un suivi de chantier rigoureux</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg border border-white/20">
                  <svg className="w-6 h-6 text-[#2FB8B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white font-medium">Une relation client directe et personnalisée</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {['Paris 75', 'Hauts-de-Seine 92', 'Yvelines 78', 'Val-de-Marne 94', 'Essonne 91', 'Val-d\'Oise 95', 'Seine-et-Marne 77'].map((dept) => (
                  <span key={dept} className="px-4 py-2 bg-white/20 rounded-full border border-white/40 text-white">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final - Plus engageant */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="zoom-in">
            <div className="bg-[#0F2A44] rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden">
              {/* Élément décoratif */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2FB8B3]/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2FB8B3]/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Prêt à vous lancer ?
                </h2>
                <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
                  Votre projet de piscine commence ici. Répondez à quelques questions et recevez une estimation personnalisée.
                </p>
                <p className="text-white/60 mb-8">
                  ✓ Gratuit &nbsp;&nbsp; ✓ Sans engagement &nbsp;&nbsp; ✓ Réponse sous 48h
                </p>
                <Link 
                  to="/devis"
                  className="inline-flex items-center gap-3 bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  <span>Démarrer mon projet piscine</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;
