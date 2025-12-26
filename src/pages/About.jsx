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
      title: 'Qualité',
      description: 'Nous sélectionnons les meilleurs matériaux et travaillons avec des artisans qualifiés pour garantir une finition irréprochable.'
    },
    {
      icon: '🛡️',
      title: 'Sécurité',
      description: 'Toutes nos installations sont conformes aux normes en vigueur. Nous assurons la sécurité de votre famille.'
    },
    {
      icon: '🤝',
      title: 'Proximité',
      description: 'Une équipe à votre écoute, disponible et réactive. Un interlocuteur unique tout au long de votre projet.'
    },
    {
      icon: '⏱️',
      title: 'Respect des délais',
      description: 'Nous nous engageons sur des délais réalistes et mettons tout en œuvre pour les respecter.'
    }
  ];

  const stats = [
    { number: '9+', label: 'Années d\'expérience' },
    { number: '100%', label: 'Sur mesure' },
    { number: 'IDF', label: 'Île-de-France' },
    { number: '7j/7', label: 'Disponibilité' }
  ];

  return (
    <>
      {/* Hero About */}
      <section className="hero-section relative overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de BBH SERVICE
            </h1>
            <p className="text-xl">
              Depuis 9 ans, nous accompagnons nos clients en Île-de-France et alentours 
              avec des solutions personnalisées, conçues pour durer.
            </p>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F2A44] mb-6">Notre histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  BBH SERVICE est menée par un entrepreneur dynamique, fort de 9 années d'expérience 
                  dans la construction et l'installation des piscines d'extérieur et d'intérieur.
                </p>
                <p>
                  Un pisciniste qui choisit avec soin ses équipes et forme ses techniciens en leur 
                  transmettant toute son expérience et compétences. Le savoir-faire BBH SERVICE, 
                  c'est la garantie d'un travail bien fait et une technique unique reconnue pour 
                  sa qualité et sa durabilité.
                </p>
                <p>
                  Avec BBH SERVICE, faites le choix d'un partenaire fiable pour réaliser la piscine 
                  dont vous rêvez. Étude, installation, entretien : nos spécialistes prennent en charge 
                  l'ensemble de votre projet pour vous garantir une piscine belle, performante et facile à vivre.
                </p>
                <p className="font-semibold text-[#2FB8B3]">
                  BBH SERVICE : votre projet mérite la meilleure expertise.
                </p>
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
                <div className="stat-number text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            title="Notre équipe"
            subtitle="Des professionnels passionnés à votre service"
          />
          <div className="max-w-3xl mx-auto text-center text-gray-600">
            <p className="mb-6">
              BBH SERVICE réunit des techniciens qualifiés et formés avec soin pour vous garantir 
              un travail de qualité. Notre entrepreneur transmet son expérience et ses compétences 
              à chaque membre de l'équipe.
            </p>
            <p>
              Du premier contact à la remise des clés, vous bénéficiez d'un accompagnement personnalisé 
              qui vous guide à chaque étape de votre projet.
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
