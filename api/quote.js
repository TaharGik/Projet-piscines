/* eslint-env node */
/**
 * API Serverless - Gestion des demandes de devis
 * 
 * Cette fonction gère :
 * - Validation des champs du formulaire
 * - Vérification du CAPTCHA (hCaptcha)
 * - Rate limiting (anti-spam) avec Vercel KV
 * - Sanitisation des entrées (anti-XSS) - MODULE DÉDIÉ
 * - Envoi d'emails via Brevo (ex-Sendinblue)
 * 
 * Déployée automatiquement sur Vercel dans /api/quote
 */

import { kv } from '@vercel/kv';
import { sanitizeString, sanitizeWithLineBreaks, sanitizeFormData } from './sanitizer.js';

// Patterns de validation - SYNCHRONISÉS avec src/utils/validation.js
const EMAIL_PATTERN = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const POSTAL_CODE_PATTERN = /^\d{5}$/;

// Logger conditionnel - logs uniquement en développement
const isDev = process.env.NODE_ENV !== 'production';
const logger = {
  log: (...args) => isDev && console.log(...args),
  warn: (...args) => isDev && console.warn(...args),
  error: (...args) => console.error(...args), // Toujours logger les erreurs
};

/**
 * Configuration centralisée
 */
const CONFIG = {
  // Rate limiting : 5 requêtes max par IP toutes les 10 minutes
  RATE_LIMIT_MAX: 5,
  RATE_LIMIT_WINDOW_MS: 10 * 60 * 1000, // 10 minutes
  
  // Validation des champs
  MAX_MESSAGE_LENGTH: 2000,
  MAX_NAME_LENGTH: 100,
  MAX_CITY_LENGTH: 100,
  MIN_NAME_LENGTH: 2,
  MIN_MESSAGE_LENGTH: 10,
  
  // Timeout pour les requêtes externes (Brevo, hCaptcha)
  FETCH_TIMEOUT_MS: 10000, // 10 secondes
  
  // URLs
  SITE_URL: process.env.SITE_URL || 'https://piscines-idf.vercel.app',
  
  // Email par défaut (seulement si CONTACT_EMAIL n'est pas défini)
  DEFAULT_CONTACT_EMAIL: process.env.CONTACT_EMAIL || null, // Pas de fallback hardcodé
};

/**
 * Labels humains pour le mapping des valeurs techniques
 * Centralisé pour éviter la duplication
 */
const LABELS = {
  projectType: {
    'nouvelle-piscine': 'Nouvelle piscine',
    'renovation': 'Rénovation',
    'entretien': "Contrat d'entretien",
    'autre': 'Autre demande',
  },
  serviceType: {
    'conception-installation': 'Conception & installation complète',
    'renovation': 'Rénovation de piscine existante',
    'entretien': "Contrat d'entretien annuel",
    'installation-gazon': 'Installation de gazon autour de la piscine',
  },
  poolType: {
    'beton': 'Béton (structure traditionnelle)',
    'coque': 'Coque polyester (prête à poser)',
    'liner': 'Avec revêtement liner',
    'carrelage': 'Avec carrelage haut de gamme',
    'debordement': 'Piscine à débordement',
    'interieure': 'Piscine intérieure',
    'naturelle': 'Piscine naturelle / écologique',
  },
  dimensions: {
    'small': 'Petite (moins de 20 m²)',
    'medium': 'Moyenne (20 à 40 m²)',
    'large': 'Grande (40 à 70 m²)',
    'xlarge': 'Très grande (plus de 70 m²)',
    'custom': 'Sur mesure (dimensions à définir)',
  },
  terrain: {
    'flat-easy': '✅ Terrain plat, accès facile',
    'flat-difficult': '⚠️ Terrain plat, accès difficile',
    'slope-easy': '⚠️ Terrain en pente, accès facile',
    'slope-difficult': '🔴 Terrain en pente, accès difficile',
    'unknown': 'À évaluer lors de la visite technique',
  },
  budget: {
    'under15k': 'Moins de 15 000 €',
    '15to25k': '15 000 € – 25 000 €',
    '25to40k': '25 000 € – 40 000 €',
    '40to70k': '40 000 € – 70 000 €',
    'over70k': 'Plus de 70 000 €',
    'unknown': 'À définir ensemble',
  },
  timeline: {
    'urgent': '🔴 Urgent (moins de 2 mois)',
    'normal': 'Normal (2 à 6 mois)',
    'flexible': '✅ Flexible (plus de 6 mois)',
    'unknown': 'À discuter',
  },
};

// Fallback rate limiting en mémoire (si Vercel KV indisponible)
// Note: Ne persiste que durant la durée de vie de la fonction (cold start)
const inMemoryRateLimits = new Map();

/**
 * Nettoie les entrées expirées du rate limiting en mémoire
 */
function cleanupInMemoryRateLimits() {
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW_MS;
  
  for (const [ip, requests] of inMemoryRateLimits.entries()) {
    const recentRequests = requests.filter(time => time > windowStart);
    
    if (recentRequests.length === 0) {
      inMemoryRateLimits.delete(ip);
    } else {
      inMemoryRateLimits.set(ip, recentRequests);
    }
  }
}

/**
 * Rate limiting en mémoire (fallback)
 * @param {string} ip - Adresse IP du client
 * @returns {boolean} - true si la requête est autorisée
 */
function checkRateLimitInMemory(ip) {
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW_MS;
  
  // Récupérer les requêtes existantes
  const requests = inMemoryRateLimits.get(ip) || [];
  
  // Filtrer les requêtes dans la fenêtre de temps
  const recentRequests = requests.filter(time => time > windowStart);
  
  // Vérifier si la limite est dépassée
  if (recentRequests.length >= CONFIG.RATE_LIMIT_MAX) {
    logger.warn(`⚠️ Rate limit dépassé (in-memory) pour ${ip}: ${recentRequests.length} requêtes`);
    return false;
  }
  
  // Ajouter la nouvelle requête
  recentRequests.push(now);
  inMemoryRateLimits.set(ip, recentRequests);
  
  // Nettoyer périodiquement (1 chance sur 10)
  if (Math.random() < 0.1) {
    cleanupInMemoryRateLimits();
  }
  
  return true;
}

/**
 * Vérifie le rate limit pour une IP avec Vercel KV (Redis) + fallback en mémoire
 * @param {string} ip - Adresse IP du client
 * @returns {Promise<boolean>} - true si la requête est autorisée
 */
async function checkRateLimit(ip) {
  const key = `ratelimit:${ip}`;
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW_MS;
  
  try {
    // Récupérer les timestamps des requêtes récentes depuis KV
    const requests = await kv.get(key) || [];
    
    // Filtrer les requêtes dans la fenêtre de temps
    const recentRequests = requests.filter(time => time > windowStart);
    
    // Vérifier si la limite est dépassée
    if (recentRequests.length >= CONFIG.RATE_LIMIT_MAX) {
      logger.warn(`⚠️ Rate limit dépassé (KV) pour ${ip}: ${recentRequests.length} requêtes`);
      return false;
    }
    
    // Ajouter la nouvelle requête
    recentRequests.push(now);
    
    // Sauvegarder avec expiration (fenêtre de temps)
    await kv.set(key, recentRequests, {
      px: CONFIG.RATE_LIMIT_WINDOW_MS // Expire après la fenêtre de temps
    });
    
    return true;
  } catch (error) {
    // FALLBACK: Utiliser rate limiting en mémoire si KV échoue
    logger.warn('⚠️ Vercel KV indisponible, utilisation du fallback en mémoire:', error.message);
    return checkRateLimitInMemory(ip);
  }
}

/**
 * Wrapper pour fetch avec timeout
 * @param {string} url - URL à appeler
 * @param {Object} options - Options fetch
 * @param {number} timeout - Timeout en ms
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Timeout après ${timeout}ms`);
    }
    throw error;
  }
}

/**
 * Vérifie le token hCaptcha
 * @param {string} token - Token hCaptcha du frontend
 * @returns {Promise<boolean>}
 */
async function verifyCaptcha(token) {
  if (!token) return false;
  
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) {
    logger.error('❌ HCAPTCHA_SECRET_KEY non configurée');
    return false;
  }
  
  try {
    const response = await fetchWithTimeout('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    
    if (!response.ok) {
      logger.error('❌ Erreur HTTP vérification CAPTCHA:', response.status);
      return false;
    }
    
    const data = await response.json();
    if (!data.success) {
      logger.warn('⚠️ CAPTCHA invalide:', data['error-codes']);
    }
    return data.success === true;
  } catch (error) {
    logger.error('❌ Erreur vérification CAPTCHA:', error.message);
    return false;
  }
}

/**
 * Valide les données du formulaire
 * @param {Object} data - Données du formulaire
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateFormData(data) {
  const errors = [];
  
  // Validation du nom
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Le nom est requis');
  } else if (data.name.trim().length < CONFIG.MIN_NAME_LENGTH) {
    errors.push(`Le nom doit contenir au moins ${CONFIG.MIN_NAME_LENGTH} caractères`);
  } else if (data.name.length > CONFIG.MAX_NAME_LENGTH) {
    errors.push(`Le nom ne doit pas dépasser ${CONFIG.MAX_NAME_LENGTH} caractères`);
  }
  
  // Validation de l'email
  if (!data.email || !EMAIL_PATTERN.test(data.email.trim().toLowerCase())) {
    errors.push('Email invalide');
  } else if (data.email.length > 254) { // RFC 5321
    errors.push('Email trop long');
  }
  
  // Validation du téléphone (format français)
  if (!data.phone || !PHONE_PATTERN.test(data.phone.trim())) {
    errors.push('Numéro de téléphone invalide (format français attendu)');
  }
  
  // Validation de la ville (optionnelle)
  if (data.city && data.city.length > CONFIG.MAX_CITY_LENGTH) {
    errors.push(`La ville ne doit pas dépasser ${CONFIG.MAX_CITY_LENGTH} caractères`);
  }
  
  // Validation du type de projet
  const validProjectTypes = Object.keys(LABELS.projectType);
  if (!data.projectType || !validProjectTypes.includes(data.projectType)) {
    errors.push('Type de projet invalide');
  }
  
  // Validation du message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Le message est requis');
  } else if (data.message.trim().length < CONFIG.MIN_MESSAGE_LENGTH) {
    errors.push(`Le message doit contenir au moins ${CONFIG.MIN_MESSAGE_LENGTH} caractères`);
  } else if (data.message.length > CONFIG.MAX_MESSAGE_LENGTH) {
    errors.push(`Le message ne doit pas dépasser ${CONFIG.MAX_MESSAGE_LENGTH} caractères`);
  }
  
  // Validation des données wizard si présentes
  if (data.wizardData && typeof data.wizardData === 'object') {
    const wd = data.wizardData;
    
    // Valider chaque champ wizard contre les listes blanches
    if (wd.serviceType && !Object.keys(LABELS.serviceType).includes(wd.serviceType)) {
      errors.push('Type de service invalide');
    }
    if (wd.poolType && !Object.keys(LABELS.poolType).includes(wd.poolType)) {
      errors.push('Type de piscine invalide');
    }
    if (wd.dimensions && !Object.keys(LABELS.dimensions).includes(wd.dimensions)) {
      errors.push('Dimensions invalides');
    }
    if (wd.terrain && !Object.keys(LABELS.terrain).includes(wd.terrain)) {
      errors.push('Type de terrain invalide');
    }
    if (wd.budget && !Object.keys(LABELS.budget).includes(wd.budget)) {
      errors.push('Budget invalide');
    }
    if (wd.timeline && !Object.keys(LABELS.timeline).includes(wd.timeline)) {
      errors.push('Délai invalide');
    }
    
    // Validation du code postal (optionnel)
    if (wd.postalCode) {
      const postalCodeRegex = /^\d{5}$/;
      if (!postalCodeRegex.test(wd.postalCode)) {
        errors.push('Code postal invalide (5 chiffres attendus)');
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Helper : convertir valeur technique → label humain
 * @param {string} category - Catégorie (serviceType, poolType, etc.)
 * @param {string} value - Valeur technique
 * @returns {string} Label lisible
 */
function getLabel(category, value) {
  if (!value) return 'Non renseigné';
  return LABELS[category]?.[value] || value;
}

/**
 * Génère le résumé business du projet
 * @param {Object} wizardData - Données du wizard
 * @returns {string} Résumé HTML
 */
function generateProjectSummary(wizardData) {
  if (!wizardData || Object.keys(wizardData).length === 0) {
    return '';
  }
  
  const parts = [];
  
  if (wizardData.serviceType) {
    parts.push(`<strong>${getLabel('serviceType', wizardData.serviceType)}</strong>`);
  }
  
  if (wizardData.poolType) {
    const poolLabel = getLabel('poolType', wizardData.poolType);
    const dimLabel = wizardData.dimensions ? getLabel('dimensions', wizardData.dimensions) : '';
    parts.push(`${poolLabel}${dimLabel ? ', ' + dimLabel : ''}`);
  }
  
  if (wizardData.budget) {
    parts.push(`Budget : <strong>${getLabel('budget', wizardData.budget)}</strong>`);
  }
  
  if (wizardData.timeline) {
    parts.push(`Délai : ${getLabel('timeline', wizardData.timeline)}`);
  }
  
  if (wizardData.terrain) {
    parts.push(`Terrain : ${getLabel('terrain', wizardData.terrain)}`);
  }
  
  return parts.join(' • ');
}

/**
 * Envoie un email via l'API Brevo avec retry
 * @param {Object} emailData - Données de l'email
 * @param {string} apiKey - Clé API Brevo
 * @param {number} retries - Nombre de tentatives restantes
 * @returns {Promise<Object>} Réponse de l'API
 */
async function sendEmailViaBrevo(emailData, apiKey, retries = 2) {
  try {
    const response = await fetchWithTimeout('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      const errorMsg = `Erreur Brevo ${response.status}: ${errorText}`;
      
      // Retry sur erreurs serveur (5xx) si tentatives restantes
      if (response.status >= 500 && retries > 0) {
        logger.warn(`⚠️ ${errorMsg} - Tentative ${3 - retries}/3`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1s
        return sendEmailViaBrevo(emailData, apiKey, retries - 1);
      }
      
      throw new Error(errorMsg);
    }
    
    return response.json();
  } catch (error) {
    if (retries > 0 && error.message.includes('Timeout')) {
      logger.warn(`⚠️ Timeout Brevo - Tentative ${3 - retries}/3`);
      return sendEmailViaBrevo(emailData, apiKey, retries - 1);
    }
    throw error;
  }
}

/**
 * Envoie les emails via Brevo (Sendinblue)
 * @param {Object} formData - Données du formulaire
 * @returns {Promise<boolean>}
 */
async function sendEmails(formData) {
  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = CONFIG.DEFAULT_CONTACT_EMAIL;
  
  if (!apiKey) {
    logger.error('❌ BREVO_API_KEY non configurée');
    return false;
  }
  
  if (!toEmail) {
    logger.error('❌ CONTACT_EMAIL non configuré');
    return false;
  }
  
  // Sanitiser les données utilisateur avec le module dédié (protection XSS renforcée)
  let sanitizedData;
  try {
    sanitizedData = sanitizeFormData(formData);
  } catch (error) {
    logger.error('❌ Erreur sanitisation:', error.message);
    return false;
  }

  // Récupérer les données wizard si présentes
  const wizardData = formData.wizardData || {};
  const hasWizardData = Object.keys(wizardData).length > 0;
  
  // Générer le résumé business du projet
  const projectSummary = generateProjectSummary(wizardData);
  
  // Générer ID unique de demande + timestamp
  const requestId = `DEV-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const timestamp = new Date().toLocaleString('fr-FR', { 
    timeZone: 'Europe/Paris',
    dateStyle: 'full',
    timeStyle: 'short'
  });
  
  // Déterminer l'urgence
  const isUrgent = wizardData.timeline && ['moins-2-mois', 'urgent'].includes(wizardData.timeline);
  const urgencyBadge = isUrgent 
    ? '<span style="background: #dc2626; color: white; padding: 8px 16px; border-radius: 6px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(220,38,38,0.3);">URGENT - Moins de 2 mois</span>'
    : '<span style="background: #059669; color: white; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">Délai standard</span>';
  
  try {
    // Email 1 : Notification à l'entreprise
    const notificationEmail = {
      sender: { name: 'BBH Service - Site Web', email: 'bbhservice25@gmail.com' },
      to: [{ email: toEmail }],
      replyTo: { email: sanitizedData.email, name: sanitizedData.name },
      subject: `${isUrgent ? '[URGENT] ' : ''}Nouveau devis #${requestId.split('-')[2]} - ${sanitizedData.name}`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 680px; margin: 0 auto; background: #ffffff;">
          
          <!-- ==================== HEADER PREMIUM ==================== -->
          <div style="background: linear-gradient(135deg, #0F2A44 0%, #1a4d7a 100%); padding: 32px 24px; text-align: center;">
            <div style="background: white; display: inline-block; padding: 12px 24px; border-radius: 8px; margin-bottom: 16px;">
              <h1 style="margin: 0; color: #0F2A44; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">BBH SERVICE</h1>
              <p style="margin: 4px 0 0 0; color: #2FB8B3; font-size: 13px; font-weight: 600;">EXPERT PISCINES PREMIUM</p>
            </div>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Nouvelle demande de devis reçue</p>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0 0; font-size: 12px;">${timestamp}</p>
          </div>
          
          <!-- ==================== URGENCE & ID (Priorité #1) ==================== -->
          <div style="background: ${isUrgent ? '#fef2f2' : '#f0fdf4'}; padding: 20px 24px; border-bottom: 3px solid ${isUrgent ? '#dc2626' : '#059669'};">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div>
                ${urgencyBadge}
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">ID Demande</p>
                <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #0F2A44; font-family: 'Courier New', monospace;">${requestId}</p>
              </div>
            </div>
          </div>
          
          ${hasWizardData && projectSummary ? `
          <!-- ==================== RÉSUMÉ PROJET (Priorité #2) ==================== -->
          <div style="background: linear-gradient(135deg, #2FB8B3 0%, #269E9A 100%); padding: 24px; margin: 0;">
            <h2 style="color: white; margin: 0 0 14px 0; font-size: 17px; font-weight: 700; letter-spacing: -0.3px;">RÉSUMÉ DU PROJET</h2>
            <div style="background: rgba(255, 255, 255, 0.98); padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
              <p style="margin: 0; font-size: 16px; line-height: 1.8; color: #1f2937; font-weight: 500;">
                ${projectSummary}
              </p>
            </div>
          </div>
          ` : ''}
          
          <!-- ==================== CONTACT CLIENT (Priorité #3) ==================== -->
          <div style="padding: 28px 24px; background: #f8fafc;">
            <h2 style="color: #0F2A44; margin: 0 0 18px 0; font-size: 17px; font-weight: 700; letter-spacing: -0.3px; border-bottom: 3px solid #2FB8B3; padding-bottom: 10px;">
              INFORMATIONS CLIENT
            </h2>
            
            <!-- Boutons CTA en haut -->
            <div style="margin: 0 0 20px 0; display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="tel:${sanitizedData.phone}" style="flex: 1; min-width: 200px; background: #2FB8B3; color: white; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: 700; font-size: 15px; text-align: center; display: block; box-shadow: 0 2px 8px rgba(47,184,179,0.3); transition: all 0.2s;">
                APPELER ${sanitizedData.phone}
              </a>
              <a href="mailto:${sanitizedData.email}" style="flex: 1; min-width: 200px; background: #0F2A44; color: white; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: 700; font-size: 15px; text-align: center; display: block; box-shadow: 0 2px 8px rgba(15,42,68,0.3);">
                ENVOYER EMAIL
              </a>
            </div>
            
            <!-- Informations détaillées -->
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Nom</td>
                  <td style="padding: 12px 0; font-size: 17px; font-weight: 700; color: #0F2A44;">${sanitizedData.name}</td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Téléphone</td>
                  <td style="padding: 12px 0;"><a href="tel:${sanitizedData.phone}" style="color: #2FB8B3; text-decoration: none; font-weight: 700; font-size: 18px;">${sanitizedData.phone}</a></td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                  <td style="padding: 12px 0;"><a href="mailto:${sanitizedData.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${sanitizedData.email}</a></td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Ville</td>
                  <td style="padding: 12px 0; font-weight: 600; color: #0F2A44; font-size: 15px;">${sanitizedData.city || 'Non renseignée'}</td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Type</td>
                  <td style="padding: 12px 0;">
                    <span style="background: linear-gradient(135deg, #2FB8B3, #269E9A); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 13px; display: inline-block; box-shadow: 0 2px 4px rgba(47,184,179,0.3);">
                      ${getLabel('projectType', sanitizedData.projectType)}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          
          <!-- ==================== MESSAGE CLIENT (Priorité #4) ==================== -->
          <div style="padding: 0 24px 28px 24px; background: #f8fafc;">
            <h2 style="color: #0F2A44; margin: 0 0 18px 0; font-size: 17px; font-weight: 700; letter-spacing: -0.3px; border-bottom: 3px solid #2FB8B3; padding-bottom: 10px;">
              MESSAGE DU CLIENT
            </h2>
            <div style="background: #fffbeb; padding: 24px; border-radius: 10px; border-left: 5px solid #f59e0b; box-shadow: 0 2px 8px rgba(0,0,0,0.05); position: relative;">
              <div style="position: absolute; top: 16px; left: 16px; font-size: 48px; opacity: 0.1; color: #f59e0b;">"</div>
              <p style="margin: 0; color: #92400e; line-height: 1.8; font-size: 15px; white-space: pre-wrap; font-style: italic; padding-left: 32px;">${sanitizeWithLineBreaks(formData.message)}</p>
            </div>
          </div>
          
          ${hasWizardData && (wizardData.budget || Object.keys(wizardData).length > 2) ? `
          <!-- ==================== BUDGET & DÉTAILS (Priorité #5) ==================== -->
          <div style="padding: 0 24px 28px 24px; background: #f8fafc;">
            ${wizardData.budget ? `
            <!-- Budget mis en avant -->
            <div style="background: linear-gradient(135deg, #059669, #047857); padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(5,150,105,0.2);">
              <p style="margin: 0 0 8px 0; color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">BUDGET ESTIMÉ</p>
              <p style="margin: 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">${getLabel('budget', wizardData.budget)}</p>
            </div>
            ` : ''}
            
            <h2 style="color: #0F2A44; margin: 0 0 18px 0; font-size: 17px; font-weight: 700; letter-spacing: -0.3px; border-bottom: 3px solid #2FB8B3; padding-bottom: 10px;">
              DÉTAILS TECHNIQUES
            </h2>
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <table style="width: 100%; border-collapse: collapse;">
                ${wizardData.serviceType ? `<tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; width: 180px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
                  <td style="padding: 12px 0; color: #0F2A44; font-weight: 600; font-size: 15px;">${getLabel('serviceType', wizardData.serviceType)}</td>
                </tr>` : ''}
                ${wizardData.poolType ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Piscine</td>
                  <td style="padding: 12px 0; color: #0F2A44; font-weight: 600; font-size: 15px;">${getLabel('poolType', wizardData.poolType)}</td>
                </tr>` : ''}
                ${wizardData.dimensions ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Dimensions</td>
                  <td style="padding: 12px 0; color: #0F2A44; font-weight: 500;">${getLabel('dimensions', wizardData.dimensions)}</td>
                </tr>` : ''}
                ${wizardData.terrain ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Terrain</td>
                  <td style="padding: 12px 0; color: #0F2A44; font-weight: 500;">${getLabel('terrain', wizardData.terrain)}</td>
                </tr>` : ''}
                ${wizardData.timeline ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Délai</td>
                  <td style="padding: 12px 0; color: #0F2A44; font-weight: 600; font-size: 15px;">${getLabel('timeline', wizardData.timeline)}</td>
                </tr>` : ''}
                ${wizardData.postalCode ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Code postal</td>
                  <td style="padding: 12px 0; color: #0F2A44; font-weight: 700; font-size: 16px;">${sanitizeString(wizardData.postalCode)}</td>
                </tr>` : ''}
              </table>
            </div>
          </div>
          ` : ''}
          
          <!-- ==================== ACTION RECOMMANDÉE (CTA) ==================== -->
          <div style="padding: 0 24px 28px 24px; background: #f8fafc;">
            <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 24px; border-radius: 12px; box-shadow: 0 6px 16px rgba(124,58,237,0.25);">
              <h3 style="color: white; margin: 0 0 14px 0; font-size: 18px; font-weight: 700;">PROCHAINE ÉTAPE</h3>
              <p style="color: #e9d5ff; margin: 0 0 18px 0; line-height: 1.7; font-size: 15px;">
                <strong style="color: white;">Contactez ${sanitizedData.name} dans les 48h</strong> pour :
              </p>
              <ul style="color: #e9d5ff; margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px;">
                <li>Qualifier précisément le projet</li>
                <li>Poser les questions techniques complémentaires</li>
                <li>Programmer une visite sur site si nécessaire</li>
                <li>Établir un devis personnalisé</li>
              </ul>
            </div>
          </div>
          
          <!-- ==================== RAPPEL ENGAGEMENT ==================== -->
          <div style="padding: 0 24px 32px 24px; background: #f8fafc;">
            <div style="background: #fef3c7; padding: 18px 20px; border-radius: 10px; border-left: 5px solid #f59e0b; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
              <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                <strong style="color: #78350f;">Engagement qualité BBH Service :</strong> Réponse sous 48h maximum pour garantir la satisfaction client et maximiser le taux de conversion.
              </p>
            </div>
          </div>
          
          <!-- ==================== FOOTER PREMIUM ==================== -->
          <div style="background: linear-gradient(135deg, #0F2A44, #1a4d7a); padding: 28px 24px; text-align: center;">
            <p style="margin: 0 0 8px 0; color: rgba(255,255,255,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email généré automatiquement</p>
            <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px;">
              BBH Service © ${new Date().getFullYear()} - Site web professionnel
            </p>
          </div>
        </div>
      `,
    };
    
    // Email 2 : Confirmation au client
    const confirmationEmail = {
      sender: { name: 'BBH Service', email: 'bbhservice25@gmail.com' },
      to: [{ email: sanitizedData.email, name: sanitizedData.name }],
      replyTo: { email: toEmail },
      subject: 'Votre demande de devis a bien été reçue - BBH Service',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F2A44, #1a3a5c); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">BBH Service</h1>
            <p style="color: #93c5fd; margin: 10px 0 0 0;">Piscines sur mesure en Île-de-France</p>
          </div>
          <div style="background: white; padding: 30px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e40af;">Bonjour ${sanitizedData.name},</h2>
            <p style="color: #475569; line-height: 1.6;">
              Nous avons bien reçu votre demande de devis et nous vous en remercions !
            </p>
            <p style="color: #475569; line-height: 1.6;">
              Notre équipe va étudier votre projet avec attention et reviendra vers vous 
              <strong>sous 48 heures ouvrées</strong> avec une proposition personnalisée.
            </p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">Récapitulatif de votre demande</h3>
              <p style="margin: 5px 0;"><strong>Type de projet :</strong> ${getLabel('projectType', sanitizedData.projectType)}</p>
              <p style="margin: 5px 0;"><strong>Ville :</strong> ${sanitizedData.city || 'Non renseignée'}</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              En attendant, n'hésitez pas à consulter nos 
              <a href="${CONFIG.SITE_URL}/realisations" style="color: #2FB8B3;">réalisations</a> 
              pour découvrir notre savoir-faire.
            </p>
            
            <p style="color: #475569; line-height: 1.6;">
              À très bientôt,<br>
              <strong>L'équipe BBH Service</strong>
            </p>
          </div>
          <div style="background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="margin: 0 0 10px 0;">Tél : 06 40 12 34 56 | Email : bbhservice25@gmail.com</p>
            <p style="margin: 0; font-size: 12px;">
              Cet email a été envoyé suite à votre demande sur notre site web.
            </p>
          </div>
        </div>
      `,
    };
    
    // Envoyer les deux emails avec retry automatique
    await Promise.all([
      sendEmailViaBrevo(notificationEmail, apiKey),
      sendEmailViaBrevo(confirmationEmail, apiKey),
    ]);
    
    logger.log('✅ Emails envoyés avec succès:', { to: toEmail, client: sanitizedData.email });
    return true;
    
  } catch (error) {
    logger.error('❌ Erreur envoi emails:', error.message);
    return false;
  }
}

/**
 * Handler principal de la fonction serverless
 */
export default async function handler(req, res) {
  // Headers de sécurité
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'none'");
  
  // CORS headers - liste des origines autorisées
  const allowedOrigins = [
    'https://piscines-idf.vercel.app',
    'https://www.piscines-idf.vercel.app',
    process.env.SITE_URL,
    process.env.ALLOWED_ORIGIN,
  ].filter(Boolean); // Retirer les undefined
  
  const origin = req.headers.origin || req.headers.referer;
  const isAllowedOrigin = allowedOrigins.some(allowed => origin?.startsWith(allowed));
  
  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    // En dev, accepter localhost
    if (origin?.includes('localhost') || origin?.includes('127.0.0.1')) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight 24h
  
  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  try {
    // Récupérer l'IP du client (Vercel forwarding)
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.headers['x-real-ip'] || 
               req.socket?.remoteAddress ||
               'unknown';
    
    // Log de la requête (sans données sensibles)
    logger.log('📬 Nouvelle demande de devis', { 
      ip, 
      timestamp: new Date().toISOString(),
      hasWizardData: !!req.body?.wizardData,
    });
    
    // Vérifier le rate limit (async avec Vercel KV)
    const rateLimitOk = await checkRateLimit(ip);
    if (!rateLimitOk) {
      logger.warn('⚠️ Rate limit dépassé:', ip);
      return res.status(429).json({ 
        error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.',
        retryAfter: Math.ceil(CONFIG.RATE_LIMIT_WINDOW_MS / 1000),
      });
    }
    
    // Validation du body
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Requête invalide' });
    }
    
    const { captchaToken, ...formData } = req.body;
    
    // Vérifier le CAPTCHA (seulement si token fourni ET secret configuré)
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;
    if (hcaptchaSecret && captchaToken) {
      // Token fourni + secret configuré → vérification obligatoire
      const captchaValid = await verifyCaptcha(captchaToken);
      if (!captchaValid) {
        logger.warn('⚠️ CAPTCHA invalide:', ip);
        return res.status(400).json({ error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' });
      }
      logger.log('✅ CAPTCHA validé');
    } else if (!hcaptchaSecret) {
      // Secret non configuré → mode dev, on accepte
      logger.warn('⚠️ HCAPTCHA_SECRET_KEY non configurée - captcha désactivé');
    } else if (!captchaToken) {
      // Secret configuré mais pas de token → provient du wizard, on accepte
      logger.log('ℹ️ Requête sans captcha (wizard) - acceptée');
    }
    
    // Valider les données
    const validation = validateFormData(formData);
    if (!validation.valid) {
      logger.warn('⚠️ Validation échouée:', validation.errors);
      return res.status(400).json({ 
        error: 'Données invalides',
        details: validation.errors,
      });
    }
    
    // Envoyer les emails
    const emailSent = await sendEmails(formData);
    if (!emailSent) {
      logger.error('❌ Échec envoi email');
      return res.status(500).json({ error: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
    }
    
    // Succès
    logger.log('✅ Devis traité avec succès');
    return res.status(200).json({ 
      success: true,
      message: 'Votre demande a bien été envoyée. Nous vous répondrons sous 48h.',
    });
    
  } catch (error) {
    logger.error('❌ Erreur API quote:', error.message, error.stack);
    return res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
}
