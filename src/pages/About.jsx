import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import useSEO from '../hooks/useSEO';

/**
 * Page À propos
 * Présentation de l'entreprise, équipe et valeurs
 */
const About = () => {
  // SEO - Meta tags pour la page À propos
  useSEO({
    title: 'A propos - Notre histoire et nos valeurs | BBH SERVICE',
    description: 'BBH SERVICE, pisciniste depuis 2016 en Ile-de-France. Decouvrez notre expertise de 9 ans dans la conception, installation et entretien de piscines.',
    keywords: 'pisciniste Ile-de-France, entreprise piscine Paris, constructeur piscine, histoire BBH SERVICE',
    canonicalUrl: 'https://www.bbhservice.fr/a-propos',
  });

  const values = [
    {
      icon: '🎯',
      title: 'Expertise & précision',
      description: 'Chaque projet est mené avec une maîtrise technique rigoureuse, de la conception jusqu\'à la mise en service. La précision d\'exécution garantit des installations fiables, performantes et pérennes.'
    },
    {
      icon: '⭐',
      title: 'Qualité premium & finitions soignées',
      description: 'Une attention particulière au choix des matériaux, à la qualité des équipements et au niveau de finition. Chaque piscine est pensée comme une réalisation durable, au standard premium.'
    },
    {
      icon: '🤝',
      title: 'Proximité & relation de confiance',
      description: 'Une relation client humaine et transparente, fondée sur l\'écoute, la disponibilité et l\'accompagnement à chaque étape du projet.'
    }
  ];

  const stats = [
    { value: '9', suffix: '+', label: 'années d\'expérience' },
    { value: '100', suffix: '%', label: 'sur mesure' },
    { value: 'IDF', suffix: '', label: 'Île-de-France' },
    { value: '7j', suffix: '/7', label: 'disponibilité' }
  ];

  return (
    <>
      {/* Hero About */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0F2A44 50%, #0a1e30 100%)' }}
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#2FB8B3] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2FB8B3] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        {/* Logo en arrière-plan */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/logo/LogoBBH.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              BBH SERVICE : l'excellence au service de votre piscine
            </h1>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Acteur premium et technique de l'installation de piscines, nous proposons des solutions 
              fiables, durables et parfaitement maîtrisées en Île-de-France et régions limitrophes.
            </p>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F2A44] mb-6">À propos de BBH SERVICE</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Portée par l'expertise de <strong className="text-[#0F2A44]">Hamza Ben Belkacem</strong>, 
                  <strong className="text-[#0F2A44]"> BBH SERVICE</strong> accompagne les particuliers dans la conception, 
                  l'installation et les services de piscines premium.
                </p>
                <p>
                  Chaque projet est pensé avec <strong>exigence, précision et durabilité</strong>, afin de garantir 
                  des installations fiables, performantes et parfaitement intégrées à leur environnement.
                </p>
                <p>
                  Notre entreprise s'adresse principalement à des particuliers exigeants, propriétaires 
                  de maisons individuelles, sensibles à la qualité, à la durabilité et au sérieux technique.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 text-[#2FB8B3] hover:text-[#269E9A] font-medium transition-colors duration-200 group mt-2"
                >
                  <span>En savoir plus</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
              <span className="text-gray-500">Photo de l'équipe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="stats-section">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">{stat.value}</span>
                  <span className="text-2xl md:text-3xl font-bold text-[#2FB8B3]">{stat.suffix}</span>
                </div>
                <div className="stat-label mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="section-padding bg-[#F3F5F9]">
        <div className="container-custom">
          <SectionTitle
            title="Nos valeurs"
            subtitle="Les principes qui guident notre travail au quotidien"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[#0F2A44] mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Une proximité qui fait la différence"
            subtitle="Île-de-France et régions limitrophes"
          />
          <div className="max-w-3xl mx-auto text-center text-gray-600">
            <p className="mb-6">
              Notre implantation en Île-de-France nous permet d'offrir une <strong>grande réactivité</strong>, 
              un <strong>suivi de chantier rigoureux</strong> et une <strong>relation client directe et personnalisée</strong>.
            </p>
            <p>
              Du premier contact à la remise des clés, vous bénéficiez d'un accompagnement professionnel 
              de bout en bout pour les porteurs de projets recherchant l'excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="section-padding bg-[#F3F5F9]">
        <div className="container-custom">
          <SectionTitle
            title="Nos garanties"
            subtitle="Votre tranquillité d'esprit est notre priorité"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#2FB8B3]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold text-[#0F2A44] mb-2">Garantie décennale</h3>
              <p className="text-gray-600 text-sm">
                Tous nos travaux sont couverts par une assurance décennale pour une protection optimale.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#2FB8B3]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-[#0F2A44] mb-2">SAV réactif</h3>
              <p className="text-gray-600 text-sm">
                Une équipe dédiée pour répondre à toutes vos questions et intervenir rapidement si besoin.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#2FB8B3]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-[#0F2A44] mb-2">Contrat clair</h3>
              <p className="text-gray-600 text-sm">
                Devis détaillé, planning précis, aucune mauvaise surprise. Transparence totale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-[#0F2A44] mb-4">
            Envie de nous rencontrer ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Prenez rendez-vous pour discuter de votre projet
          </p>
          <Link to="/contact" className="btn-primary">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
