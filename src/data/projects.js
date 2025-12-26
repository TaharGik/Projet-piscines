/**
 * Donnees des projets / realisations de l'entreprise
 * 
 * Chaque projet contient :
 * - id : Identifiant unique
 * - slug : URL-friendly identifier pour les routes dynamiques
 * - name : Nom du projet
 * - city, department : Localisation
 * - type : Type de piscine/travaux
 * - description, longDescription : Textes descriptifs
 * - tags : Mots-clés pour filtrage
 * - dimensions, year : Caractéristiques techniques
 * - images : Avant/après
 * - featured : Projet mis en avant
 * - details : Informations supplémentaires (durée, budget, équipements)
 */
export const projects = [
  {
    id: 1,
    slug: 'piscine-universite-nantes',
    name: 'Piscine de l\'université de Nantes',
    city: 'Nantes',
    department: 'Loire-Atlantique (44)',
    type: 'Piscine municipale',
    description: 'Réalisation d\'une piscine pour l\'université de Nantes. Bassin olympique avec équipements de haute qualité.',
    longDescription: `Projet d'envergure réalisé pour l'université de Nantes. Ce bassin a été conçu pour répondre aux normes universitaires et sportives les plus strictes.

La piscine comprend un bassin principal de dimensions olympiques, des vestiaires collectifs, et un système de filtration de dernière génération.

Le projet a été livré dans les délais impartis, permettant aux étudiants de profiter de ces installations de qualité professionnelle.`,
    tags: ['municipale', 'olympique', 'universitaire', 'professionnel'],
    dimensions: '25m x 12m',
    depth: '1.20m à 3.00m',
    year: 2018,
    duration: '8 mois',
    budget: 'Sur devis',
    imageBefore: '/images/projects/realisation1.png',
    imageAfter: '/images/projects/realisation1.png',
    featured: true,
    details: {
      filtration: 'Système de filtration professionnel',
      revetement: 'Carrelage antidérapant bleu',
      margelles: 'Margelles béton',
      equipements: ['Système de chronométrage', 'Plongeoirs', 'Lignes d\'eau professionnelles', 'Traitement automatique']
    }
  },
  {
    id: 2,
    slug: 'piscine-club-prive-lyon',
    name: 'Piscine du club privé de Lyon',
    city: 'Lyon',
    department: 'Rhône (69)',
    type: 'Piscine club privé',
    description: 'Installation d\'une piscine de luxe pour un club privé à Lyon. Design contemporain et équipements haut de gamme.',
    longDescription: `Ce projet prestigieux a été réalisé pour un club privé huppé de Lyon. Le cahier des charges exigeait un design contemporain et des équipements de très haute qualité.

La piscine de 15m x 6m dispose d'un système de débordement sur trois côtés, créant un effet visuel saisissant. Les finitions en mosaïque italienne et l'éclairage LED subaquatique apportent une touche luxueuse.

Le système de chauffage par pompe à chaleur Inverter assure une température constante de 28°C, et le volet roulant automatique garantit sécurité et économies d'énergie.`,
    tags: ['luxe', 'club privé', 'débordement', 'haut de gamme'],
    dimensions: '15m x 6m',
    depth: '1.40m à 2.20m',
    year: 2018,
    duration: '5 mois',
    budget: 'Sur devis',
    imageBefore: '/images/projects/realisation2.jpg',
    imageAfter: '/images/projects/realisation3.jpg',
    featured: true,
    details: {
      filtration: 'Electrolyseur au sel haut de gamme',
      revetement: 'Mosaïque italienne bleu turquoise',
      margelles: 'Pierre naturelle de Provence',
      equipements: ['Volet roulant automatique', 'Pompe à chaleur Inverter', 'Nage à contre-courant', 'Éclairage LED RGB', 'Spa intégré']
    }
  },
  {
    id: 3,
    slug: 'maison-architecte',
    name: 'Maison d\'Architecte',
    city: 'Boulogne-Billancourt',
    department: 'Hauts-de-Seine (92)',
    type: 'Piscine intérieure',
    description: 'Piscine intérieure de 10x4m dans une extension contemporaine. Système de déshumidification intégré et baie vitrée motorisée.',
    longDescription: `Ce projet d'exception a été réalisé dans une maison d'architecte contemporaine. Le client souhaitait profiter de sa piscine toute l'année, d'où le choix d'une piscine intérieure.

L'extension de 80m² a été conçue en étroite collaboration avec l'architecte du client. Elle comprend le bassin de 10x4m, une zone de détente et un local technique.

Le système de déshumidification Zodiac assure un confort optimal et protège le bâti de l'humidité. La baie vitrée motorisée de 8m de large peut s'ouvrir entièrement en été.
Le chauffage par échangeur thermique raccordé à la chaudière de la maison permet de maintenir l'eau à 28°C en permanence.`,
    tags: ['interieure', 'contemporain', 'déshumidification', 'baie vitrée'],
    dimensions: '10m x 4m',
    depth: '1.40m uniforme',
    year: 2022,
    duration: '6 mois',
    budget: '150 000 - 180 000 EUR',
    imageBefore: '/images/services/piscine-interieur.jpg',
    imageAfter: '/images/services/piscine-interieur.jpg',
    featured: true,
    details: {
      filtration: 'Ozone + chlore residuel',
      revetement: 'Carrelage blanc grand format',
      margelles: 'Dallage interieur assorti',
      equipements: ['Deshumidificateur Zodiac', 'Baie vitree motorisee', 'Chauffage echangeur', 'Nage a contre-courant']
    }
  },
  {
    id: 4,
    slug: 'propriete-du-parc',
    name: 'Propriete du Parc',
    city: 'Le Vesinet',
    department: 'Yvelines (78)',
    type: 'Piscine béton forme libre',
    description: 'Piscine de forme libre intégrée dans un parc arboré centenaire. Finition en mosaïque bleu cobalt et terrasse en teck.',
    longDescription: `Cette propriété exceptionnelle disposait d'un parc arboré centenaire. Le défi était d'intégrer une piscine sans dénaturer ce cadre d'exception.

Nous avons opté pour une forme libre organique qui épouse les courbes naturelles du terrain. Le bassin de 14x7m s'inscrit harmonieusement entre les arbres centenaires.

La finition en mosaïque bleu cobalt évoque les lagons méditerranéens et contraste élégamment avec la verdure environnante.

La terrasse en teck certifié FSC complète l'ensemble, offrant de généreux espaces de bronzage et de détente.`,
    tags: ['forme libre', 'mosaïque', 'terrasse teck', 'paysager'],
    dimensions: '14m x 7m',
    depth: '1.00m a 2.20m',
    year: 2023,
    duration: '5 mois',
    budget: '95 000 - 120 000 EUR',
    imageBefore: '/images/services/Piscines-beton-sur-mesure.jpg',
    imageAfter: '/images/services/Piscines-beton-sur-mesure.jpg',
    featured: false,
    details: {
      filtration: 'Electrolyseur au sel',
      revetement: 'Mosaique bleu cobalt 2x2cm',
      margelles: 'Teck certifie FSC',
      equipements: ['Plage immergee', 'Cascade naturelle', 'Eclairage LED', 'Pompe a chaleur']
    }
  },
  {
    id: 5,
    slug: 'renovation-totale',
    name: 'Renovation Totale',
    city: 'Neuilly-sur-Seine',
    department: 'Hauts-de-Seine (92)',
    type: 'Renovation complete',
    description: 'Renovation complete d\'une piscine des annees 80. Nouveau liner, systeme de filtration au sel, eclairage LED et volet roulant.',
    longDescription: `Cette piscine des annees 80 necessitait une renovation complete. Le bassin en bon etat structurel a ete entierement remis au gout du jour.

Travaux realises :
- Remplacement du liner vieillissant par un liner arme gris clair
- Modernisation du local technique avec filtration au sel
- Installation d'un volet roulant immerge pour la securite et le maintien en temperature
- Eclairage LED couleur pilotable par smartphone
- Rénovation des margelles en pierre reconstituée

Le résultat : une piscine comme neuve, aux normes actuelles, avec un coût maîtrisé par rapport à une construction neuve.`,
    tags: ['rénovation', 'liner', 'sel', 'LED', 'volet'],
    dimensions: '10m x 5m',
    depth: '1.20m a 1.80m',
    year: 2024,
    duration: '4 semaines',
    budget: '35 000 - 45 000 EUR',
    imageBefore: '/images/services/plusieurs-realisations.png',
    imageAfter: '/images/services/plusieurs-realisations.png',
    featured: true,
    details: {
      filtration: 'Electrolyseur au sel Hayward',
      revetement: 'Liner armé gris clair 150/100',
      margelles: 'Pierre reconstituée beige',
      equipements: ['Volet roulant immergé', 'LED couleur connectée', 'Pompe à vitesse variable', 'régulation automatique pH']
    }
  },
  {
    id: 6,
    slug: 'jardin-zen',
    name: 'Jardin Zen',
    city: 'Rueil-Malmaison',
    department: 'Hauts-de-Seine (92)',
    type: 'Piscine miroir',
    description: 'Piscine miroir à fond mobile intégrée dans un jardin d\'inspiration japonaise. Margelles affleurantes et débordement périmétral.',
    longDescription: `Pour ce jardin d'inspiration japonaise, nous avons créé une piscine miroir qui se fond dans le paysage comme un plan d'eau naturel.

Le débordement périmétral sur les 4 côtés crée un effet miroir parfait. L'eau semble affleurer le niveau du sol, en harmonie avec l'esprit zen du jardin.

La particularité de ce bassin : son fond mobile hydraulique. En quelques minutes, la piscine peut se transformer en terrasse plane, libérant l'espace pour d'autres usages.

L'éclairage sous-marin subtil met en valeur le bassin la nuit, comme une lanterne japonaise géante.`,
    tags: ['miroir', 'fond mobile', 'zen', 'debordement'],
    dimensions: '9m x 4m',
    depth: '0m a 1.50m (fond mobile)',
    year: 2022,
    duration: '5 mois',
    budget: '120 000 - 150 000 EUR',
    imageBefore: '/images/services/vacances-piscine.png',
    imageAfter: '/images/services/vacances-piscine.png',
    featured: false,
    details: {
      filtration: 'UV + chlore',
      revetement: 'Carrelage anthracite mat',
      margelles: 'Pierre naturelle noire',
      equipements: ['Fond mobile hydraulique', 'Débordement 4 côtés', 'Éclairage LED ambiance', 'Filtration débordement']
    }
  },
  {
    id: 7,
    slug: 'demeure-de-caractere',
    name: 'Demeure de Caractère',
    city: 'Enghien-les-Bains',
    department: 'Val-d\'Oise (95)',
    type: 'Piscine naturelle',
    description: 'Piscine naturelle avec zone de filtration végétale. Baignade sans produits chimiques dans un écrin de verdure.',
    longDescription: `Ce projet unique répond à une demande croissante : une baignade 100% naturelle, sans aucun produit chimique.

La piscine naturelle se compose de deux zones :
- La zone de baignade (11x6m) avec une profondeur de 1.60m
- La zone de lagunage (30m²) où des plantes aquatiques filtrent naturellement l'eau
Le principe : l'eau circule entre les deux zones. Les plantes (iris, joncs, nenuphars) absorbent les nutriments et les bactéries se chargent de la désinfection biologique.

Le résultat : une eau cristalline, douce pour la peau, dans un cadre paysager exceptionnel. Un véritable écosystème aquatique privé.`,
    tags: ['naturelle', 'ecologique', 'plantes', 'sans chlore'],
    dimensions: '11m x 6m (zone baignade)',
    depth: '0.50m a 1.60m',
    year: 2023,
    duration: '4 mois',
    budget: '70 000 - 90 000 EUR',
    imageBefore: '/images/services/petite-fille-jouant-dans-une-piscine-dans-un-jardin-d-ete.jpg',
    imageAfter: '/images/services/petite-fille-jouant-dans-une-piscine-dans-un-jardin-d-ete.jpg',
    featured: false,
    details: {
      filtration: 'Biologique (lagunage)',
      revetement: 'EPDM noir',
      margelles: 'Pierres naturelles locales',
      equipements: ['Zone lagunage 30m²', 'Plantes aquatiques', 'Cascade naturelle', 'Pompe basse consommation']
    }
  }
];

export default projects;
