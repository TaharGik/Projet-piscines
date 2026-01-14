/* eslint-env node */
/**
 * Module de sanitisation pour la sécurité des emails
 * Protection contre les attaques XSS dans le contenu HTML des emails
 * 
 * Ce module fournit une sanitisation robuste sans dépendances externes,
 * en utilisant une approche whitelist stricte.
 * 
 * IMPORTANT : Les patterns de validation doivent correspondre à src/utils/validation.js
 */

// Patterns de validation - SYNCHRONISÉS avec src/utils/validation.js
const EMAIL_PATTERN = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

/**
 * Caractères HTML à échapper
 */
const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Sanitize une chaîne pour prévenir les attaques XSS
 * Échappe tous les caractères HTML spéciaux
 * 
 * @param {string} str - Chaîne à sanitiser
 * @returns {string} - Chaîne sanitisée
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .trim()
    .replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Sanitize une chaîne tout en préservant les sauts de ligne
 * Convertit \n en <br> de manière sécurisée
 * 
 * @param {string} str - Chaîne à sanitiser
 * @returns {string} - Chaîne sanitisée avec <br>
 */
function sanitizeWithLineBreaks(str) {
  if (typeof str !== 'string') return '';
  
  // 1. Sanitiser la chaîne complète
  const sanitized = sanitizeString(str);
  
  // 2. Remplacer les \n par <br> après sanitisation
  // Comme la chaîne est déjà sanitisée, on peut insérer <br> en toute sécurité
  return sanitized.replace(/\n/g, '<br>');
}

/**
 * Valide et sanitize une adresse email
 * 
 * @param {string} email - Email à valider
 * @returns {string|null} - Email sanitisé ou null si invalide
 */
function sanitizeEmail(email) {
  if (typeof email !== 'string') return null;
  
  const trimmed = email.trim().toLowerCase();
  
  // Validation avec pattern centralisé
  if (!EMAIL_PATTERN.test(trimmed)) {
    return null;
  }
  
  // Longueur max RFC 5321
  if (trimmed.length > 254) {
    return null;
  }
  
  return trimmed;
}

/**
 * Valide et sanitize un numéro de téléphone français
 * 
 * @param {string} phone - Téléphone à valider
 * @returns {string|null} - Téléphone formaté ou null si invalide
 */
function sanitizePhone(phone) {
  if (typeof phone !== 'string') return null;
  
  const trimmed = phone.trim();
  
  // Valider avec pattern centralisé (accepte formats avec espaces/tirets)
  if (!PHONE_PATTERN.test(trimmed)) {
    return null;
  }
  
  // Retourner le format original (avec espaces)
  return trimmed;
}
  
  return phone.trim();
}

/**
 * Sanitize un objet complet de données de formulaire
 * Applique la sanitisation appropriée à chaque champ
 * 
 * @param {Object} data - Données du formulaire
 * @returns {Object} - Données sanitisées
 */
function sanitizeFormData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Les données du formulaire doivent être un objet');
  }
  
  const sanitized = {
    name: sanitizeString(data.name || ''),
    email: sanitizeEmail(data.email || ''),
    phone: sanitizePhone(data.phone || ''),
    city: sanitizeString(data.city || ''),
    projectType: data.projectType || '', // Validé contre whitelist ailleurs
    message: sanitizeString(data.message || ''),
  };
  
  // Valider que les champs critiques ne sont pas null
  if (!sanitized.email) {
    throw new Error('Email invalide');
  }
  
  if (!sanitized.phone) {
    throw new Error('Téléphone invalide');
  }
  
  // Sanitiser les données du wizard si présentes
  if (data.wizardData && typeof data.wizardData === 'object') {
    sanitized.wizardData = {
      serviceType: data.wizardData.serviceType || '',
      poolType: data.wizardData.poolType || '',
      dimensions: data.wizardData.dimensions || '',
      terrain: data.wizardData.terrain || '',
      budget: data.wizardData.budget || '',
      timeline: data.wizardData.timeline || '',
      postalCode: sanitizeString(data.wizardData.postalCode || ''),
    };
  }
  
  return sanitized;
}

/**
 * Génère du HTML sécurisé pour les emails
 * Utilise uniquement les valeurs sanitisées
 * 
 * @param {Object} sanitizedData - Données déjà sanitisées
 * @param {string} htmlTemplate - Template HTML avec placeholders {{key}}
 * @returns {string} - HTML final sécurisé
 */
function generateSecureHTML(sanitizedData, htmlTemplate) {
  if (typeof htmlTemplate !== 'string') {
    throw new Error('Le template doit être une chaîne');
  }
  
  // Remplacer les placeholders par les valeurs sanitisées
  let html = htmlTemplate;
  
  for (const [key, value] of Object.entries(sanitizedData)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(placeholder, value || 'Non renseigné');
  }
  
  return html;
}

/**
 * Liste blanche de balises HTML autorisées dans les emails
 * Utilisé pour valider les templates
 */
const ALLOWED_HTML_TAGS = [
  'div', 'p', 'span', 'a', 'strong', 'em', 'br', 'table', 'tr', 'td', 'th',
  'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'img'
];

/**
 * Attributs HTML autorisés par balise
 */
const ALLOWED_ATTRIBUTES = {
  'a': ['href', 'style', 'class', 'target', 'rel'],
  'img': ['src', 'alt', 'width', 'height', 'style'],
  'div': ['style', 'class'],
  'span': ['style', 'class'],
  'p': ['style', 'class'],
  'table': ['style', 'class', 'cellpadding', 'cellspacing', 'border'],
  'td': ['style', 'class', 'colspan', 'rowspan'],
  'th': ['style', 'class', 'colspan', 'rowspan'],
};

module.exports = {
  sanitizeString,
  sanitizeWithLineBreaks,
  sanitizeEmail,
  sanitizePhone,
  sanitizeFormData,
  generateSecureHTML,
  ALLOWED_HTML_TAGS,
  ALLOWED_ATTRIBUTES,
};
