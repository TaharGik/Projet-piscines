/**
 * Donnees des services proposes par l'entreprise
 * Chaque service contient : id, titre, description, avantages, icone
 */
export const services = [
  {
    id: 1,
    slug: 'piscines-beton',
    title: 'Piscines beton sur mesure',
    shortDescription: 'Construction de piscines en beton arme, entierement personnalisables selon vos envies.',
    description: 'Notre specialite : la construction de piscines en beton arme, la technique la plus noble et la plus durable. Chaque projet est unique et concu sur mesure selon vos envies, votre terrain et votre budget. Le beton permet toutes les formes, toutes les dimensions et toutes les finitions.',
    advantages: [
      'Forme et dimensions 100% personnalisables',
      'Duree de vie exceptionnelle (50 ans et plus)',
      'Possibilite d\'integrer tous types d\'equipements',
      'Finitions haut de gamme (carrelage, mosaique, enduit)',
      'Valorisation importante de votre bien immobilier'
    ],
    icon: 'pool',
    image: '/images/service-beton.jpg'
  },
  {
    id: 2,
    slug: 'piscines-coque',
    title: 'Piscines coque polyester',
    shortDescription: 'Installation rapide de piscines coque, ideale pour un projet maitrise en temps et budget.',
    description: 'La piscine coque polyester offre un excellent rapport qualite-prix avec une installation rapide. Nous selectionnons les meilleures coques du marche, fabriquees en France, et assurons une pose dans les regles de l\'art pour une etancheite parfaite et durable.',
    advantages: [
      'Installation rapide (1 a 2 semaines)',
      'Budget maitrise et transparent',
      'Surface lisse et agreable au toucher',
      'Entretien facilite',
      'Large choix de formes et coloris'
    ],
    icon: 'waves',
    image: '/images/service-coque.jpg'
  },
  {
    id: 3,
    slug: 'piscines-interieures',
    title: 'Piscines interieures',
    shortDescription: 'Conception de piscines d\'interieur avec gestion de l\'hygrometrie et de la ventilation.',
    description: 'La piscine interieure est un projet technique qui necessite une expertise particuliere. Nous concevons des espaces aquatiques interieurs en integrant tous les aspects techniques : ventilation, deshumidification, chauffage et traitement acoustique.',
    advantages: [
      'Baignade toute l\'annee',
      'Protection contre les intemperies',
      'Integration architecturale soignee',
      'Systeme de deshumidification performant',
      'Espace bien-etre privatif'
    ],
    icon: 'home',
    image: '/images/service-interieure.jpg'
  },
  {
    id: 4,
    slug: 'renovation-piscines',
    title: 'Renovation de piscines',
    shortDescription: 'Remise en etat complete ou partielle de votre piscine existante.',
    description: 'Votre piscine a besoin d\'un coup de jeune ? Nous intervenons pour tous types de renovations : changement de liner, remplacement du systeme de filtration, refection de l\'etancheite, modernisation des equipements ou relooking complet de votre bassin.',
    advantages: [
      'Diagnostic complet offert',
      'Solutions adaptees a votre budget',
      'Mise aux normes de securite',
      'Amelioration des performances energetiques',
      'Garantie decennale sur les travaux'
    ],
    icon: 'refresh',
    image: '/images/service-renovation.jpg'
  },
  {
    id: 5,
    slug: 'entretien-piscines',
    title: 'Contrats d\'entretien',
    shortDescription: 'Formules d\'entretien regulier pour une piscine toujours impeccable.',
    description: 'Profitez de votre piscine en toute serenite grace a nos contrats d\'entretien. Nos techniciens qualifies assurent le suivi regulier de votre bassin : analyse de l\'eau, nettoyage, verification des equipements et hivernage/remise en route.',
    advantages: [
      'Interventions regulieres planifiees',
      'Produits de traitement inclus',
      'Assistance telephonique prioritaire',
      'Tarifs preferentiels sur les reparations',
      'Tranquillite d\'esprit garantie'
    ],
    icon: 'calendar',
    image: '/images/service-entretien.jpg'
  }
];

export default services;
