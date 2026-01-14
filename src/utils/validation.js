/**
 * Schémas de validation centralisés
 * 
 * Ce module contient tous les patterns de validation utilisés dans l'application,
 * à la fois côté client (React) et côté serveur (API Vercel).
 * 
 * Utilisation :
 * import { validateEmail, validatePhone, VALIDATION_PATTERNS } from '@/utils/validation';
 * 
 * if (!validateEmail(email)) {
 *   throw new Error('Email invalide');
 * }
 */

/**
 * Patterns de validation regex
 */
export const VALIDATION_PATTERNS = {
  // Email : format standard RFC 5322 simplifié
  email: /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  
  // Téléphone français : formats acceptés
  // - 06 12 34 56 78
  // - 0612345678
  // - +33 6 12 34 56 78
  // - +33612345678
  // - 0033612345678
  phoneFR: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  
  // Code postal français : 5 chiffres
  postalCodeFR: /^\d{5}$/,
  
  // Nom/Prénom : lettres, espaces, tirets, apostrophes
  // Minimum 2 caractères, maximum 50
  name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  
  // Ville : lettres, espaces, tirets
  city: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  
  // Message : au moins 10 caractères, max 2000
  message: /^.{10,2000}$/s,
  
  // Surface : nombre positif (peut avoir décimales)
  surface: /^\d+(\.\d{1,2})?$/,
  
  // Budget : nombre positif entier
  budget: /^\d+$/,
};

/**
 * Longueurs min/max pour les champs texte
 */
export const VALIDATION_LENGTHS = {
  name: { min: 2, max: 50 },
  email: { min: 5, max: 100 },
  phone: { min: 10, max: 20 },
  city: { min: 2, max: 50 },
  postalCode: { min: 5, max: 5 },
  message: { min: 10, max: 2000 },
  subject: { min: 5, max: 100 },
};

/**
 * Messages d'erreur de validation
 */
export const VALIDATION_MESSAGES = {
  required: (field) => `Le champ ${field} est obligatoire`,
  email: 'L\'adresse email n\'est pas valide',
  phone: 'Le numéro de téléphone n\'est pas valide (format français attendu)',
  postalCode: 'Le code postal doit contenir 5 chiffres',
  name: 'Le nom doit contenir entre 2 et 50 caractères (lettres uniquement)',
  city: 'La ville doit contenir entre 2 et 50 caractères',
  message: 'Le message doit contenir entre 10 et 2000 caractères',
  minLength: (field, min) => `${field} doit contenir au moins ${min} caractères`,
  maxLength: (field, max) => `${field} ne doit pas dépasser ${max} caractères`,
  surface: 'La surface doit être un nombre positif',
  budget: 'Le budget doit être un nombre entier positif',
};

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} true si valide
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return (
    trimmed.length >= VALIDATION_LENGTHS.email.min &&
    trimmed.length <= VALIDATION_LENGTHS.email.max &&
    VALIDATION_PATTERNS.email.test(trimmed)
  );
}

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Téléphone à valider
 * @returns {boolean} true si valide
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  
  // Nettoyer le numéro pour vérification (enlever espaces/tirets)
  const cleaned = trimmed.replace(/[\s.-]/g, '');
  
  return (
    cleaned.length >= VALIDATION_LENGTHS.phone.min &&
    cleaned.length <= VALIDATION_LENGTHS.phone.max &&
    VALIDATION_PATTERNS.phoneFR.test(trimmed)
  );
}

/**
 * Valide un code postal français
 * @param {string} postalCode - Code postal à valider
 * @returns {boolean} true si valide
 */
export function validatePostalCode(postalCode) {
  if (!postalCode || typeof postalCode !== 'string') return false;
  const trimmed = postalCode.trim();
  return VALIDATION_PATTERNS.postalCodeFR.test(trimmed);
}

/**
 * Valide un nom ou prénom
 * @param {string} name - Nom à valider
 * @returns {boolean} true si valide
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return (
    trimmed.length >= VALIDATION_LENGTHS.name.min &&
    trimmed.length <= VALIDATION_LENGTHS.name.max &&
    VALIDATION_PATTERNS.name.test(trimmed)
  );
}

/**
 * Valide une ville
 * @param {string} city - Ville à valider
 * @returns {boolean} true si valide
 */
export function validateCity(city) {
  if (!city || typeof city !== 'string') return false;
  const trimmed = city.trim();
  return (
    trimmed.length >= VALIDATION_LENGTHS.city.min &&
    trimmed.length <= VALIDATION_LENGTHS.city.max &&
    VALIDATION_PATTERNS.city.test(trimmed)
  );
}

/**
 * Valide un message
 * @param {string} message - Message à valider
 * @returns {boolean} true si valide
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') return false;
  const trimmed = message.trim();
  return (
    trimmed.length >= VALIDATION_LENGTHS.message.min &&
    trimmed.length <= VALIDATION_LENGTHS.message.max
  );
}

/**
 * Valide une surface (nombre décimal positif)
 * @param {string|number} surface - Surface à valider
 * @returns {boolean} true si valide
 */
export function validateSurface(surface) {
  if (surface === null || surface === undefined || surface === '') return false;
  const str = String(surface).trim();
  if (!VALIDATION_PATTERNS.surface.test(str)) return false;
  const num = parseFloat(str);
  return num > 0 && num < 10000; // Max 10 000 m²
}

/**
 * Valide un budget (nombre entier positif)
 * @param {string|number} budget - Budget à valider
 * @returns {boolean} true si valide
 */
export function validateBudget(budget) {
  if (budget === null || budget === undefined || budget === '') return false;
  const str = String(budget).trim();
  if (!VALIDATION_PATTERNS.budget.test(str)) return false;
  const num = parseInt(str, 10);
  return num > 0 && num < 1000000; // Max 1 000 000 €
}

/**
 * Valide un objet de données de formulaire complet
 * @param {Object} data - Données à valider
 * @param {Object} schema - Schéma de validation { field: 'required'|'optional' }
 * @returns {{ valid: boolean, errors: Object }} Résultat de validation
 * 
 * @example
 * const result = validateFormData(formData, {
 *   name: 'required',
 *   email: 'required',
 *   phone: 'required',
 *   message: 'optional'
 * });
 * 
 * if (!result.valid) {
 *   console.error(result.errors); // { name: 'Le champ nom est obligatoire' }
 * }
 */
export function validateFormData(data, schema) {
  const errors = {};
  let valid = true;
  
  // Valider chaque champ selon le schéma
  for (const [field, requirement] of Object.entries(schema)) {
    const value = data[field];
    
    // Champ requis mais vide
    if (requirement === 'required' && (!value || String(value).trim() === '')) {
      errors[field] = VALIDATION_MESSAGES.required(field);
      valid = false;
      continue;
    }
    
    // Champ optionnel et vide : skip validation
    if (!value || String(value).trim() === '') {
      continue;
    }
    
    // Valider selon le type de champ
    switch (field) {
      case 'email':
        if (!validateEmail(value)) {
          errors[field] = VALIDATION_MESSAGES.email;
          valid = false;
        }
        break;
        
      case 'phone':
        if (!validatePhone(value)) {
          errors[field] = VALIDATION_MESSAGES.phone;
          valid = false;
        }
        break;
        
      case 'postalCode':
        if (!validatePostalCode(value)) {
          errors[field] = VALIDATION_MESSAGES.postalCode;
          valid = false;
        }
        break;
        
      case 'name':
      case 'firstName':
      case 'lastName':
        if (!validateName(value)) {
          errors[field] = VALIDATION_MESSAGES.name;
          valid = false;
        }
        break;
        
      case 'city':
        if (!validateCity(value)) {
          errors[field] = VALIDATION_MESSAGES.city;
          valid = false;
        }
        break;
        
      case 'message':
        if (!validateMessage(value)) {
          errors[field] = VALIDATION_MESSAGES.message;
          valid = false;
        }
        break;
        
      case 'surface':
        if (!validateSurface(value)) {
          errors[field] = VALIDATION_MESSAGES.surface;
          valid = false;
        }
        break;
        
      case 'budget':
        if (!validateBudget(value)) {
          errors[field] = VALIDATION_MESSAGES.budget;
          valid = false;
        }
        break;
    }
  }
  
  return { valid, errors };
}

/**
 * Nettoie un numéro de téléphone (enlève espaces, tirets, points)
 * @param {string} phone - Téléphone à nettoyer
 * @returns {string} Téléphone nettoyé
 */
export function cleanPhone(phone) {
  if (!phone) return '';
  return phone.replace(/[\s.-]/g, '');
}

/**
 * Normalise un email (trim + lowercase)
 * @param {string} email - Email à normaliser
 * @returns {string} Email normalisé
 */
export function normalizeEmail(email) {
  if (!email) return '';
  return email.trim().toLowerCase();
}

// Export par défaut
export default {
  VALIDATION_PATTERNS,
  VALIDATION_LENGTHS,
  VALIDATION_MESSAGES,
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateName,
  validateCity,
  validateMessage,
  validateSurface,
  validateBudget,
  validateFormData,
  cleanPhone,
  normalizeEmail,
};
