import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactFormSecure';
import AnimatedSection from '../components/AnimatedSection';
import useSEO from '../hooks/useSEO';

/**
 * Page Contact
 * Formulaire de contact et informations de l'entreprise
 */
const Contact = () => {
  // SEO - Meta tags pour la page Contact
  useSEO({
    title: 'Contact - Devis gratuit piscine en Ile-de-France',
    description: 'Demandez votre devis gratuit pour votre projet piscine. Reponse sous 48h. Contactez BBH SERVICE au 06 40 12 34 56 ou via notre formulaire.',
    keywords: 'devis piscine gratuit, contact pisciniste, piscine Ile-de-France, constructeur piscine Paris',
    canonicalUrl: 'https://www.bbhservice.fr/contact',
  });

  return (
    <>
      {/* Hero Contact */}
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
              Contactez-nous
            </h1>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Vous avez un projet de piscine ? Parlons-en ! Notre équipe est à votre 
              disposition pour répondre à vos questions et vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire et infos */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Demande de devis gratuit
                </h2>
                <p className="text-gray-600 mb-8">
                  Remplissez le formulaire ci-dessous et nous vous recontacterons sous 48h 
                  pour discuter de votre projet.
                </p>
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Informations de contact */}
            <div>
              <AnimatedSection animation="fade-left" delay={200}>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations de contact
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Adresse</div>
                        <div className="text-gray-600">10 Pl. des Tilleuls, 95310 Saint-Ouen-l'Aumône<br/>Société de construction de piscine</div>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Téléphone</div>
                        <a href="tel:+33140123456" className="text-secondary hover:text-[#269E9A] hover:underline font-medium transition-colors">01 40 12 34 56</a>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <a href="mailto:bbhservice25@gmail.com" className="text-secondary hover:text-[#269E9A] hover:underline transition-colors">bbhservice25@gmail.com</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-left" delay={300}>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Horaires d'ouverture
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="font-medium text-gray-900">9h - 18h</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-medium text-gray-900">9h - 12h</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="text-gray-400">Ferme</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-left" delay={400}>
                <div className="bg-neutral-50 border border-secondary/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Zone d'intervention
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Nous intervenons dans toute l'Ile-de-France :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Paris 75', 
                      'Hauts-de-Seine 92', 
                      'Yvelines 78', 
                      'Val-de-Marne 94', 
                      'Essonne 91', 
                      'Seine-Saint-Denis 93', 
                      'Val-d\'Oise 95', 
                      'Seine-et-Marne 77'
                    ].map((dept) => (
                      <span key={dept} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
                <div className="font-semibold text-gray-900">Réponse rapide</div>
                <div className="text-sm text-gray-600">Sous 48h ouvrées</div>
              </div>
              <div className="group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📋</div>
                <div className="font-semibold text-gray-900">Devis gratuit</div>
                <div className="text-sm text-gray-600">Sans engagement</div>
              </div>
              <div className="group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏠</div>
                <div className="font-semibold text-gray-900">Visite sur site</div>
                <div className="text-sm text-gray-600">Étude personnalisée</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bandeau appel */}
      <section className="py-12 bg-[#F3F5F9]">
        <div className="container-custom">
          <AnimatedSection animation="zoom-in">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0F2A44]">
                Vous préférez nous appeler ?
              </h2>
              <p className="text-gray-600 mb-6">
                Notre équipe est disponible du lundi au vendredi de 9h à 18h
              </p>
              <a 
                href="tel:+33140123456" 
                className="inline-flex items-center bg-[#2FB8B3] hover:bg-[#269E9A] text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                01 40 12 34 56
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Contact;
