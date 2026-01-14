/**
 * Constantes globales de l'application BBH SERVICE
 * Centralise toutes les valeurs fixes pour éviter la duplication et les incohérences
 */

// ============================================================
// INFORMATIONS ENTREPRISE
// ============================================================

export const COMPANY = {
  name: 'BBH SERVICE',
  legalName: 'BBH SERVICE',
  fullName: 'BBH SERVICE - Expert Piscines Premium',
  slogan: 'Votre projet, notre engagement',
  description: 'Acteur premium de l\'installation de piscines. Solutions fiables, durables et parfaitement maîtrisées en Île-de-France.',
};

// ============================================================
// COORDONNÉES DE CONTACT
// ============================================================

export const CONTACT = {
  // Téléphone principal (format affiché)
  phone: '06 40 12 34 56',
  // Téléphone au format international pour href="tel:"
  phoneHref: '+33640123456',
  // Email principal
  email: 'bbhservice25@gmail.com',
  // Adresse physique
  address: {
    street: '10 Pl. des Tilleuls',
    postalCode: '95310',
    city: 'Saint-Ouen-l\'Aumône',
    fullAddress: '10 Pl. des Tilleuls, 95310 Saint-Ouen-l\'Aumône',
  },
  // Horaires
  hours: {
    weekdays: 'Lun-Sam: 8h-19h',
    availability: '7j/7',
  },
  // Zone d'intervention
  zone: 'Île-de-France',
  departments: ['75', '77', '78', '91', '92', '94', '95'],
};

// ============================================================
// RÉSEAUX SOCIAUX
// ============================================================

export const SOCIAL = {
  instagram: 'https://www.instagram.com/bbhservice',
  tiktok: '', // À compléter
  facebook: '', // À compléter
  linkedin: '', // À compléter
};

// ============================================================
// URLS & LIENS
// ============================================================

export const URLS = {
  site: 'https://www.bbhservice.fr',
  googleBusiness: '', // À compléter avec le lien Google My Business
  googleReviews: '', // À compléter avec le lien des avis Google
};

// ============================================================
// STATISTIQUES & CHIFFRES CLÉS
// ============================================================

export const STATS = {
  yearsExperience: '9+',
  projectsCompleted: '50+',
  satisfactionRate: '100%',
  responseTime: '48h',
};

// ============================================================
// PARAMÈTRES TECHNIQUES
// ============================================================

export const SETTINGS = {
  // Scroll
  scrollToTopThreshold: 300, // Pixels avant d'afficher le bouton
  
  // Animations
  waveAnimationDuration: 30000, // 30 secondes
  waveAnimationDurationShort: 3000, // 3 secondes (au clic)
  
  // Formulaires
  form: {
    maxNameLength: 100,
    minNameLength: 2,
    maxMessageLength: 2000,
    minMessageLength: 10,
    maxCityLength: 100,
    phonePattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    postalCodePattern: /^\d{5}$/,
  },
  
  // Rate limiting (pour référence frontend, appliqué côté serveur)
  rateLimit: {
    maxRequests: 5,
    windowMs: 10 * 60 * 1000, // 10 minutes
  },
};

// ============================================================
// MESSAGES SYSTÈME
// ============================================================

export const MESSAGES = {
  success: {
    formSubmitted: 'Merci pour votre demande ! Nous vous recontacterons sous 48h.',
    subscribed: 'Inscription confirmée ! Merci.',
  },
  errors: {
    generic: 'Une erreur est survenue. Veuillez réessayer.',
    network: 'Problème de connexion. Vérifiez votre réseau.',
    rateLimit: 'Trop de tentatives. Veuillez patienter quelques minutes.',
    timeout: 'La requête a pris trop de temps. Vérifiez votre connexion.',
    captchaFailed: 'Vérification CAPTCHA échouée. Veuillez réessayer.',
    captchaExpired: 'La vérification a expiré. Veuillez recommencer.',
    invalidData: 'Données invalides. Veuillez vérifier le formulaire.',
  },
};

// ============================================================
// TYPES DE PROJETS
// ============================================================

export const PROJECT_TYPES = {
  'nouvelle-piscine': 'Nouvelle piscine',
  'renovation': 'Rénovation de piscine',
  'entretien': 'Contrat d\'entretien',
  'autre': 'Autre demande',
};

export const SERVICE_TYPES = {
  'conception-installation': 'Conception et Installation',
  'renovation': 'Rénovation de Piscine',
  'entretien': 'Entretien de Piscine',
  'installation-gazon': 'Installation de Gazon',
};

// ============================================================
// EXPORTS PAR DÉFAUT (pour compatibilité)
// ============================================================

export default {
  COMPANY,
  CONTACT,
  SOCIAL,
  URLS,
  STATS,
  SETTINGS,
  MESSAGES,
  PROJECT_TYPES,
  SERVICE_TYPES,
};
