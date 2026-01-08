/* eslint-env node */
/**
 * API Serverless - Gestion des demandes de devis
 * 
 * Cette fonction gère :
 * - Validation des champs du formulaire
 * - Vérification du CAPTCHA (hCaptcha)
 * - Rate limiting (anti-spam)
 * - Sanitisation des entrées (anti-XSS)
 * - Envoi d'emails via Brevo (ex-Sendinblue)
 * 
 * Déployée automatiquement sur Vercel dans /api/quote
 */

// Store simple pour le rate limiting (en mémoire - reset au redéploiement)
// En production, utiliser Redis ou Upstash pour persistance
const rateLimitStore = new Map();

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

/**
 * Sanitize une chaîne pour prévenir les attaques XSS
 * @param {string} str - Chaîne à sanitiser
 * @returns {string} - Chaîne sanitisée
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Vérifie le rate limit pour une IP
 * @param {string} ip - Adresse IP du client
 * @returns {boolean} - true si la requête est autorisée
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW_MS;
  
  // Nettoyer les anciennes entrées
  if (rateLimitStore.has(ip)) {
    const requests = rateLimitStore.get(ip).filter(time => time > windowStart);
    rateLimitStore.set(ip, requests);
    
    if (requests.length >= CONFIG.RATE_LIMIT_MAX) {
      return false;
    }
    
    requests.push(now);
    rateLimitStore.set(ip, requests);
  } else {
    rateLimitStore.set(ip, [now]);
  }
  
  return true;
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
    console.error('❌ HCAPTCHA_SECRET_KEY non configurée');
    return false;
  }
  
  try {
    const response = await fetchWithTimeout('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    
    if (!response.ok) {
      console.error('❌ Erreur HTTP vérification CAPTCHA:', response.status);
      return false;
    }
    
    const data = await response.json();
    if (!data.success) {
      console.warn('⚠️ CAPTCHA invalide:', data['error-codes']);
    }
    return data.success === true;
  } catch (error) {
    console.error('❌ Erreur vérification CAPTCHA:', error.message);
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Email invalide');
  } else if (data.email.length > 254) { // RFC 5321
    errors.push('Email trop long');
  }
  
  // Validation du téléphone (format français)
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
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
        console.warn(`⚠️ ${errorMsg} - Tentative ${3 - retries}/3`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1s
        return sendEmailViaBrevo(emailData, apiKey, retries - 1);
      }
      
      throw new Error(errorMsg);
    }
    
    return response.json();
  } catch (error) {
    if (retries > 0 && error.message.includes('Timeout')) {
      console.warn(`⚠️ Timeout Brevo - Tentative ${3 - retries}/3`);
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
    console.error('❌ BREVO_API_KEY non configurée');
    return false;
  }
  
  if (!toEmail) {
    console.error('❌ CONTACT_EMAIL non configuré');
    return false;
  }
  
  // Sanitiser les données utilisateur avant insertion dans le HTML
  const sanitizedData = {
    name: sanitizeString(formData.name),
    email: sanitizeString(formData.email),
    phone: sanitizeString(formData.phone),
    city: sanitizeString(formData.city || ''),
    projectType: formData.projectType, // Validé contre une liste blanche
    message: sanitizeString(formData.message),
  };


  // Récupérer les données wizard si présentes
  const wizardData = formData.wizardData || {};
  const hasWizardData = Object.keys(wizardData).length > 0;
  
  // Générer le résumé business du projet
  const projectSummary = generateProjectSummary(wizardData);
  
  try {
    // Email 1 : Notification à l'entreprise
    const notificationEmail = {
      sender: { name: 'BBH Service - Site Web', email: 'bbhservice25@gmail.com' },
      to: [{ email: toEmail }],
      replyTo: { email: sanitizedData.email, name: sanitizedData.name },
      subject: `Nouvelle demande de devis - ${sanitizedData.name}`,
      htmlContent: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🏊 Nouvelle demande de devis</h1>
          </div>
          
          <!-- Corps du mail -->
          <div style="background: white; padding: 0;">
            
            ${hasWizardData && projectSummary ? `
            <!-- ========== RÉSUMÉ DU PROJET (Priorité #1) ========== -->
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; margin: 0;">
              <h2 style="color: white; margin: 0 0 12px 0; font-size: 18px;">📊 Résumé du projet</h2>
              <div style="background: rgba(255, 255, 255, 0.95); padding: 16px; border-radius: 8px; border-left: 5px solid #10b981;">
                <p style="margin: 0; font-size: 15px; line-height: 1.8; color: #1f2937;">
                  ${projectSummary}
                </p>
              </div>
            </div>
            ` : ''}
            
            <!-- ========== INFORMATIONS DU CONTACT (Priorité #2) ========== -->
            <div style="padding: 24px; background: #f8fafc;">
              <h2 style="color: #1e40af; margin: 0 0 16px 0; font-size: 18px; border-bottom: 3px solid #3b82f6; padding-bottom: 8px;">
                👤 Informations du contact
              </h2>
              <table style="width: 100%; border-collapse: collapse; background: white; padding: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 140px;">Nom</td>
                  <td style="padding: 10px 0; font-size: 15px;"><strong>${sanitizedData.name}</strong></td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">📧 Email</td>
                  <td style="padding: 10px 0;"><a href="mailto:${sanitizedData.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${sanitizedData.email}</a></td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">📞 Téléphone</td>
                  <td style="padding: 10px 0;"><a href="tel:${sanitizedData.phone}" style="color: #2563eb; text-decoration: none; font-weight: 600; font-size: 16px;">${sanitizedData.phone}</a></td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">📍 Ville</td>
                  <td style="padding: 10px 0;"><strong>${sanitizedData.city || 'Non renseignée'}</strong></td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Type de projet</td>
                  <td style="padding: 10px 0;">
                    <span style="background: #dbeafe; color: #1e40af; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 14px; display: inline-block;">
                      ${getLabel('projectType', sanitizedData.projectType)}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- ========== MESSAGE CLIENT (Priorité #3) ========== -->
            <div style="padding: 0 24px 24px 24px; background: #f8fafc;">
              <h2 style="color: #1e40af; margin: 0 0 16px 0; font-size: 18px; border-bottom: 3px solid #3b82f6; padding-bottom: 8px;">
                💬 Message du client
              </h2>
              <div style="background: #fff7ed; padding: 18px; border-radius: 8px; border-left: 5px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <p style="margin: 0; color: #78350f; line-height: 1.7; font-size: 15px; white-space: pre-wrap;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            ${hasWizardData ? `
            <!-- ========== DÉTAILS TECHNIQUES (Priorité #4) ========== -->
            <div style="padding: 0 24px 24px 24px; background: #f8fafc;">
              <h2 style="color: #1e40af; margin: 0 0 16px 0; font-size: 18px; border-bottom: 3px solid #3b82f6; padding-bottom: 8px;">
                🔧 Détails du projet
              </h2>
              <table style="width: 100%; border-collapse: collapse; background: white; padding: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                ${wizardData.serviceType ? `<tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 180px;">Service demandé</td>
                  <td style="padding: 10px 0; color: #1f2937;">${getLabel('serviceType', wizardData.serviceType)}</td>
                </tr>` : ''}
                ${wizardData.poolType ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Type de piscine</td>
                  <td style="padding: 10px 0; color: #1f2937;">${getLabel('poolType', wizardData.poolType)}</td>
                </tr>` : ''}
                ${wizardData.dimensions ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Dimensions</td>
                  <td style="padding: 10px 0; color: #1f2937;">${getLabel('dimensions', wizardData.dimensions)}</td>
                </tr>` : ''}
                ${wizardData.terrain ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Terrain</td>
                  <td style="padding: 10px 0; color: #1f2937;">${getLabel('terrain', wizardData.terrain)}</td>
                </tr>` : ''}
                ${wizardData.budget ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Budget estimé</td>
                  <td style="padding: 10px 0; color: #1f2937;"><strong style="color: #059669; font-size: 15px;">${getLabel('budget', wizardData.budget)}</strong></td>
                </tr>` : ''}
                ${wizardData.timeline ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Délai souhaité</td>
                  <td style="padding: 10px 0; color: #1f2937;">${getLabel('timeline', wizardData.timeline)}</td>
                </tr>` : ''}
                ${wizardData.postalCode ? `<tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: 600; color: #475569;">Code postal</td>
                  <td style="padding: 10px 0; color: #1f2937;"><strong>${sanitizeString(wizardData.postalCode)}</strong></td>
                </tr>` : ''}
              </table>
            </div>
            ` : ''}
            
            <!-- ========== ACTIONS RECOMMANDÉES (CTA) ========== -->
            <div style="padding: 0 24px 24px 24px; background: #f8fafc;">
              <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="color: white; margin: 0 0 12px 0; font-size: 16px;">📞 Action recommandée</h3>
                <p style="color: #e9d5ff; margin: 0; line-height: 1.6; font-size: 14px;">
                  <strong style="color: white;">Contacter le client par téléphone dans les 48h</strong> pour qualifier le projet, 
                  poser des questions complémentaires et programmer une visite technique si nécessaire.
                </p>
              </div>
            </div>
            
            <!-- ========== RAPPEL ENGAGEMENT ========== -->
            <div style="padding: 0 24px 24px 24px; background: #f8fafc;">
              <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 5px solid #f59e0b;">
                <p style="margin: 0; color: #78350f; font-size: 14px;">
                  <strong>⏰ Rappel :</strong> Notre engagement qualité : réponse sous 48h maximum pour maintenir la satisfaction client.
                </p>
              </div>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 12px 12px;">
            <p style="margin: 0; font-size: 12px;">
              Email généré automatiquement depuis le site BBH Service
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
      subject: '✅ Votre demande de devis a bien été reçue - Aqua Prestige',
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
              <h3 style="color: #0369a1; margin-top: 0;">📋 Récapitulatif de votre demande</h3>
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
            <p style="margin: 0 0 10px 0;">📞 06 40 12 34 56 | 📧 bbhservice25@gmail.com</p>
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
    
    console.log('✅ Emails envoyés avec succès:', { to: toEmail, client: sanitizedData.email });
    return true;
    
  } catch (error) {
    console.error('❌ Erreur envoi emails:', error.message);
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
    console.log('📬 Nouvelle demande de devis', { 
      ip, 
      timestamp: new Date().toISOString(),
      hasWizardData: !!req.body?.wizardData,
    });
    
    // Vérifier le rate limit
    if (!checkRateLimit(ip)) {
      console.warn('⚠️ Rate limit dépassé:', ip);
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
        console.warn('⚠️ CAPTCHA invalide:', ip);
        return res.status(400).json({ error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' });
      }
      console.log('✅ CAPTCHA validé');
    } else if (!hcaptchaSecret) {
      // Secret non configuré → mode dev, on accepte
      console.warn('⚠️ HCAPTCHA_SECRET_KEY non configurée - captcha désactivé');
    } else if (!captchaToken) {
      // Secret configuré mais pas de token → provient du wizard, on accepte
      console.log('ℹ️ Requête sans captcha (wizard) - acceptée');
    }
    
    // Valider les données
    const validation = validateFormData(formData);
    if (!validation.valid) {
      console.warn('⚠️ Validation échouée:', validation.errors);
      return res.status(400).json({ 
        error: 'Données invalides',
        details: validation.errors,
      });
    }
    
    // Envoyer les emails
    const emailSent = await sendEmails(formData);
    if (!emailSent) {
      console.error('❌ Échec envoi email');
      return res.status(500).json({ error: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
    }
    
    // Succès
    console.log('✅ Devis traité avec succès');
    return res.status(200).json({ 
      success: true,
      message: 'Votre demande a bien été envoyée. Nous vous répondrons sous 48h.',
    });
    
  } catch (error) {
    console.error('❌ Erreur API quote:', error.message, error.stack);
    return res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
}
