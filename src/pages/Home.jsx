import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
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
    description: 'BBH SERVICE, expert pisciniste depuis 2016. Conception, realisation et entretien de piscines sur mesure en region parisienne. Devis gratuit sous 48h.',
    keywords: 'piscine sur mesure, pisciniste Ile-de-France, construction piscine Paris, piscine beton, piscine coque, renovation piscine',
    canonicalUrl: 'https://www.bbhservice.fr/',
  });

  // Données pour la section bénéfices
  const benefits = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Accompagnement personnalisé",
      description: "Un interlocuteur unique de l'étude à la livraison. Nous vous guidons à chaque étape pour un projet sans stress."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Qualité & durabilité",
      description: "Matériaux haut de gamme et techniques éprouvées. Votre piscine est conçue pour durer plus de 30 ans."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sérénité garantie",
      description: "Garantie décennale, assurance RC Pro et SAV réactif. Vous êtes protégé pendant et après les travaux."
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

      {/* Section Pourquoi nous choisir - Bénéfices clients */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4">
                Pourquoi choisir BBH SERVICE ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Depuis 2016, nous transformons vos rêves de piscine en réalité. Notre mission : vous offrir un projet serein et un résultat à la hauteur de vos attentes.
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
      <section className="py-20 bg-[#0F2A44]">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Comment ça se passe ?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Un processus simple et transparent, pour un projet maîtrisé du début à la fin.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="relative p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 h-full">
                  <span className="text-5xl font-bold text-[#2FB8B3]/40 absolute top-4 right-4">
                    {step.number}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-3 mt-8">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
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
                className="inline-flex items-center gap-2 bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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
              <h2 className="text-3xl font-bold mb-4 text-white">Nous intervenons près de chez vous</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Toute l'Île-de-France : Paris et petite couronne, Yvelines, Essonne, Val-d'Oise et Seine-et-Marne.
              </p>
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
