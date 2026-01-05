/**
 * Section Trust Badges - Badges de confiance et certifications
 * Affiche les assurances, certifications et garanties de l'entreprise
 */
const TrustBadges = ({ variant = 'default', className = '' }) => {
  const badges = [
    {
      id: 'decennale',
      title: 'Assurance Décennale',
      subtitle: 'Protection 10 ans',
      description: 'Garantie sur tous nos travaux',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'green'
    },
    {
      id: 'rc_pro',
      title: 'RC Professionnelle',
      subtitle: 'Responsabilité civile',
      description: 'Couverture complète',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'qualibat',
      title: 'Qualibat',
      subtitle: 'Certification',
      description: 'Professionnel qualifié',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: 'yellow'
    },
    {
      id: 'rge',
      title: 'RGE QualiPac',
      subtitle: 'Énergies renouvelables',
      description: 'Pompes à chaleur',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'emerald'
    },
    {
      id: 'garantie',
      title: 'Garantie Travaux',
      subtitle: '2 ans minimum',
      description: 'Sur tous nos travaux',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'red'
    },
    {
      id: 'sav',
      title: 'SAV Réactif',
      subtitle: 'Service après-vente',
      description: 'Intervention sous 48h',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75c0-1.793-.648-3.432-1.713-4.647L12 2.25z" />
        </svg>
      ),
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200'
    };
    return colors[color] || colors.green;
  };

  if (variant === 'horizontal') {
    return (
      <div className={`bg-gray-50 py-8 ${className}`}>
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {badges.map((badge) => (
              <div key={badge.id} className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 border ${getColorClasses(badge.color)}`}>
                  {badge.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-primary text-sm">{badge.title}</div>
                  <div className="text-xs text-gray-600">{badge.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white ${className}`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Vos garanties et notre engagement
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Assurances, certifications et garanties pour vous offrir une sérénité totale
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-105 ${getColorClasses(badge.color)}`}>
                {badge.icon}
              </div>
              <h4 className="font-semibold text-primary text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-gray-600 mb-1">{badge.subtitle}</p>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Message de réassurance */}
        <div className="text-center mt-12 bg-[#F3F5F9] rounded-2xl p-8">
          <h4 className="text-xl font-semibold text-primary mb-3">
            Votre tranquillité d'esprit, notre priorité
          </h4>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Chaque installation est couverte par nos assurances et certifications. 
            Notre équipe qualifiée vous accompagne de A à Z avec un service après-vente réactif 
            et des garanties étendues sur tous nos travaux.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;