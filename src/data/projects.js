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
    slug: 'villa-méditerranée',
    name: 'Villa méditerranée',
    city: 'Saint-Germain-en-Laye',
    department: 'Yvelines (78)',
    type: 'Piscine beton a debordement',
    description: 'Piscine a debordement de 12x5m avec vue panoramique sur le jardin paysager. Finition en carrelage gris anthracite et margelles en pierre naturelle.',
    longDescription: `Ce projet exceptionnel a ete realise pour une villa de style mediterraneen situee dans un quartier residentiel prisé de Saint-Germain-en-Laye.

Le client souhaitait une piscine a debordement offrant une vue degagee sur son jardin paysager de 2000m². Nous avons concu un bassin de 12m x 5m avec un debordement sur toute la longueur, creant un effet miroir spectaculaire.

La finition en carrelage gris anthracite 30x30 apporte une touche contemporaine, tandis que les margelles en pierre naturelle de Bourgogne assurent une integration harmonieuse avec l'architecture existante.

Le systeme de filtration au sel garantit une eau douce et agreable, sans les inconvenients du chlore traditionnel.`,
    tags: ['debordement', 'béton', 'carrelage', 'haut de gamme'],
    dimensions: '12m x 5m',
    depth: '1.20m a 2.00m',
    year: 2023,
    duration: '4 mois',
    budget: '80 000 - 100 000 EUR',
    imageBefore: '/images/projects/villa-med-before.jpg',
    imageAfter: '/images/projects/villa-med-after.jpg',
    featured: true,
    details: {
      filtration: 'Electrolyseur au sel Zodiac',
      revetement: 'Carrelage gris anthracite 30x30',
      margelles: 'Pierre naturelle de Bourgogne',
      equipements: ['Eclairage LED couleur', 'Volet roulant immerge', 'Nage a contre-courant', 'Pompe a chaleur Inverter']
    }
  },
  {
    id: 2,
    slug: 'residence-les-music',
    name: 'Residence Les Music',
    city: 'Versailles',
    department: 'Yvelines (78)',
    type: 'Piscine coque avec pool house',
    description: 'Installation d\'une piscine coque 8x4m avec construction d\'un pool house en bois. Plage immergee et escalier roman.',
    longDescription: `Pour cette residence versaillaise, le choix s'est porte sur une piscine coque pour sa rapidite d'installation et son excellent rapport qualite-prix.

La coque polyester 8x4m a ete installee en seulement 3 semaines. Elle dispose d'une plage immergee parfaite pour la detente et d'un escalier roman facilitant l'acces.

En complement, nous avons concu et realise un pool house en bois de 20m² comprenant un local technique, des vestiaires et un espace detente avec vue sur la piscine.

La terrasse en bois composite entoure l'ensemble, creant un veritable espace de vie exterieur.`,
    tags: ['coque', 'pool house', 'plage immergee', 'bois'],
    dimensions: '8m x 4m',
    depth: '1.10m a 1.60m',
    year: 2023,
    duration: '6 semaines',
    budget: '45 000 - 55 000 EUR',
    imageBefore: '/images/projects/residence-before.jpg',
    imageAfter: '/images/projects/residence-after.jpg',
    featured: true,
    details: {
      filtration: 'Filtration a cartouche',
      revetement: 'Coque polyester blanc nacre',
      margelles: 'Bois composite gris',
      equipements: ['Pool house 20m²', 'Douche exterieure', 'Eclairage LED', 'Bache a barres']
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
    imageBefore: '/images/projects/archi-before.jpg',
    imageAfter: '/images/projects/archi-after.jpg',
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
    imageBefore: '/images/projects/parc-before.jpg',
    imageAfter: '/images/projects/parc-after.jpg',
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
    imageBefore: '/images/projects/renov-before.jpg',
    imageAfter: '/images/projects/renov-after.jpg',
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
    imageBefore: '/images/projects/zen-before.jpg',
    imageAfter: '/images/projects/zen-after.jpg',
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
    imageBefore: '/images/projects/nature-before.jpg',
    imageAfter: '/images/projects/nature-after.jpg',
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
