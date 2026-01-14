/**
 * Utilitaires de formatage pour les formulaires
 * 
 * Centralise toutes les fonctions de formatage pour éviter la duplication
 * de code dans ContactFormSecure, QuoteWizard et useFormValidation.
 */

/**
 * Formate un numéro de téléphone français
 * Supprime tous les caractères non numériques et formate en paires
 * 
 * @param {string} value - Valeur à formater
 * @returns {string} Numéro formaté (ex: "06 12 34 56 78")
 * 
 * @example
 * formatPhoneNumber("0612345678") // "06 12 34 56 78"
 * formatPhoneNumber("06.12.34.56.78") // "06 12 34 56 78"
 */
export const formatPhoneNumber = (value) => {
  if (!value) return '';
  
  // Supprime tous les caractères non numériques
  const cleaned = value.replace(/\D/g, '');
  
  // Limite à 10 chiffres
  const limited = cleaned.substring(0, 10);
  
  if (limited.length === 0) return '';
  
  // Formate par paires : 06 12 34 56 78
  const pairs = limited.match(/.{1,2}/g) || [];
  return pairs.join(' ');
};

/**
 * Formate un code postal français
 * Supprime tous les caractères non numériques et limite à 5 chiffres
 * 
 * @param {string} value - Valeur à formater
 * @returns {string} Code postal formaté (5 chiffres max)
 * 
 * @example
 * formatPostalCode("75001") // "75001"
 * formatPostalCode("750012") // "75001" (tronqué)
 */
export const formatPostalCode = (value) => {
  if (!value) return '';
  
  // Supprime tout sauf les chiffres et limite à 5
  return value.replace(/\D/g, '').substring(0, 5);
};

/**
 * Capitalise la première lettre de chaque mot
 * Utile pour les noms de personnes, villes, etc.
 * 
 * @param {string} value - Valeur à formater
 * @returns {string} Texte avec majuscules au début de chaque mot
 * 
 * @example
 * capitalizeName("jean dupont") // "Jean Dupont"
 * capitalizeName("PARIS") // "Paris"
 */
export const capitalizeName = (value) => {
  if (!value) return '';
  
  return value
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Nettoie et formate un email
 * Supprime les espaces et convertit en minuscules
 * 
 * @param {string} value - Valeur à formater
 * @returns {string} Email nettoyé
 * 
 * @example
 * formatEmail(" John.Doe@EXAMPLE.com ") // "john.doe@example.com"
 */
export const formatEmail = (value) => {
  if (!value) return '';
  
  return value.trim().toLowerCase();
};

/**
 * Empêche la saisie de caractères non numériques
 * À utiliser avec onKeyDown ou onKeyPress
 * 
 * @param {KeyboardEvent} e - Événement clavier
 * @returns {boolean} true si la touche est autorisée
 * 
 * @example
 * <input onKeyDown={handleNumericKeyPress} />
 */
export const handleNumericKeyPress = (e) => {
  // Touches de contrôle autorisées
  const allowedKeys = [
    'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
  ];
  
  // Autorise les touches de contrôle
  if (allowedKeys.includes(e.key)) {
    return true;
  }
  
  // Autorise Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if (e.ctrlKey || e.metaKey) {
    return true;
  }
  
  // Bloque tout ce qui n'est pas un chiffre
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
    return false;
  }
  
  return true;
};

/**
 * Validation regex centralisée
 */
export const patterns = {
  // Email standard
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Téléphone français (format flexible)
  phoneFR: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  
  // Code postal français
  postalCodeFR: /^[0-9]{5}$/,
  
  // URL
  url: /^https?:\/\/.+/,
};

/**
 * Messages d'erreur standardisés
 */
export const errorMessages = {
  required: 'Ce champ est requis',
  emailInvalid: 'Email invalide',
  phoneInvalid: 'Numéro invalide (format: 06 12 34 56 78)',
  postalCodeInvalid: 'Code postal invalide (5 chiffres)',
  minLength: (min) => `Minimum ${min} caractères`,
  maxLength: (max) => `Maximum ${max} caractères`,
};

export default {
  formatPhoneNumber,
  formatPostalCode,
  capitalizeName,
  formatEmail,
  handleNumericKeyPress,
  patterns,
  errorMessages,
};
