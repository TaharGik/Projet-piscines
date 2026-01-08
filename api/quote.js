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
 * Configuration
 */
const CONFIG = {
  // Rate limiting : 5 requêtes max par IP toutes les 10 minutes
  RATE_LIMIT_MAX: 5,
  RATE_LIMIT_WINDOW_MS: 10 * 60 * 1000, // 10 minutes
  
  // Validation
  MAX_MESSAGE_LENGTH: 2000,
  MAX_NAME_LENGTH: 100,
  MAX_CITY_LENGTH: 100,
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
 * Vérifie le token hCaptcha
 * @param {string} token - Token hCaptcha du frontend
 * @returns {Promise<boolean>}
 */
async function verifyCaptcha(token) {
  if (!token) return false;
  
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('HCAPTCHA_SECRET_KEY non configurée');
    return false;
  }
  
  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Erreur vérification CAPTCHA:', error);
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
  
  // Champs obligatoires
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Le nom est requis (minimum 2 caractères)');
  }
  if (data.name && data.name.length > CONFIG.MAX_NAME_LENGTH) {
    errors.push(`Le nom ne doit pas dépasser ${CONFIG.MAX_NAME_LENGTH} caractères`);
  }
  
  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Email invalide');
  }
  
  // Téléphone (format français)
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Numéro de téléphone invalide (format français attendu)');
  }
  
  // Ville
  if (data.city && data.city.length > CONFIG.MAX_CITY_LENGTH) {
    errors.push(`La ville ne doit pas dépasser ${CONFIG.MAX_CITY_LENGTH} caractères`);
  }
  
  // Type de projet
  const validProjectTypes = ['nouvelle-piscine', 'renovation', 'entretien', 'autre'];
  if (!data.projectType || !validProjectTypes.includes(data.projectType)) {
    errors.push('Type de projet invalide');
  }
  
  // Message
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Le message est requis (minimum 10 caractères)');
  }
  if (data.message && data.message.length > CONFIG.MAX_MESSAGE_LENGTH) {
    errors.push(`Le message ne doit pas dépasser ${CONFIG.MAX_MESSAGE_LENGTH} caractères`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Envoie les emails via Brevo (Sendinblue)
 * @param {Object} formData - Données du formulaire
 * @returns {Promise<boolean>}
 */
async function sendEmails(formData) {
  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || 'bbhservice25@gmail.com';
  
  if (!apiKey) {
    console.error('BREVO_API_KEY non configurée');
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
  
  const projectTypeLabels = {
    'nouvelle-piscine': 'Nouvelle piscine',
    'renovation': 'Rénovation',
    'entretien': 'Contrat d\'entretien',
    'autre': 'Autre demande',
  };
  
  try {
    // Email 1 : Notification à l'entreprise
    const notificationEmail = {
      sender: { name: 'BBH Service - Site Web', email: 'bbhservice25@gmail.com' },
      to: [{ email: toEmail }],
      replyTo: { email: sanitizedData.email, name: sanitizedData.name },
      subject: `Nouvelle demande de devis - ${sanitizedData.name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Nouvelle demande de devis</h1>
          </div>
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              Informations du contact
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Nom :</td>
                <td style="padding: 8px 0;">${sanitizedData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email :</td>
                <td style="padding: 8px 0;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Téléphone :</td>
                <td style="padding: 8px 0;"><a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Ville :</td>
                <td style="padding: 8px 0;">${sanitizedData.city || 'Non renseignée'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Type de projet :</td>
                <td style="padding: 8px 0;">
                  <span style="background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px;">
                    ${projectTypeLabels[sanitizedData.projectType] || sanitizedData.projectType}
                  </span>
                </td>
              </tr>
            </table>
            
            <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">
              Message
            </h2>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </div>
            
            ${hasWizardData ? `
            <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">
              Détails du wizard
            </h2>
            <table style="width: 100%; border-collapse: collapse; background: white; padding: 15px; border-radius: 8px;">
              ${wizardData.serviceType ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.serviceType)}</td>
              </tr>` : ''}
              ${wizardData.poolType ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Type piscine :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.poolType)}</td>
              </tr>` : ''}
              ${wizardData.dimensions ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Dimensions :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.dimensions)}</td>
              </tr>` : ''}
              ${wizardData.terrain ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Terrain :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.terrain)}</td>
              </tr>` : ''}
              ${wizardData.budget ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Budget :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.budget)}</td>
              </tr>` : ''}
              ${wizardData.timeline ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Délai souhaité :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.timeline)}</td>
              </tr>` : ''}
              ${wizardData.postalCode ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Code postal :</td>
                <td style="padding: 8px 0;">${sanitizeString(wizardData.postalCode)}</td>
              </tr>` : ''}
            </table>
            ` : ''}
            
            <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
              <strong>⏰ Rappel :</strong> Répondre sous 48h pour maintenir notre engagement qualité.
            </div>
          </div>
          <div style="background: #1e293b; color: #94a3b8; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
            Email généré automatiquement depuis le site BBH Service
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
              <p style="margin: 5px 0;"><strong>Type de projet :</strong> ${projectTypeLabels[sanitizedData.projectType]}</p>
              <p style="margin: 5px 0;"><strong>Ville :</strong> ${sanitizedData.city || 'Non renseignée'}</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              En attendant, n'hésitez pas à consulter nos 
              <a href="https://piscines-idf.vercel.app/realisations" style="color: #2FB8B3;">réalisations</a> 
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
    
    // Envoi des emails via l'API Brevo
    const sendEmail = async (emailData) => {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Erreur Brevo: ${error}`);
      }
      
      return response.json();
    };
    
    // Envoyer les deux emails
    await Promise.all([
      sendEmail(notificationEmail),
      sendEmail(confirmationEmail),
    ]);
    
    return true;
  } catch (error) {
    console.error('Erreur envoi email:', error);
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
  
  // CORS headers - restreindre l'origine en production
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://www.aqua-prestige.fr';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  try {
    // Récupérer l'IP du client
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.headers['x-real-ip'] || 
               req.connection?.remoteAddress || 
               'unknown';
    
    // Vérifier le rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.',
        retryAfter: Math.ceil(CONFIG.RATE_LIMIT_WINDOW_MS / 1000),
      });
    }
    
    const { captchaToken, ...formData } = req.body;
    
    // Vérifier le CAPTCHA (seulement si configuré)
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;
    if (hcaptchaSecret) {
      const captchaValid = await verifyCaptcha(captchaToken);
      if (!captchaValid) {
        return res.status(400).json({ error: 'Vérification CAPTCHA échouée. Veuillez réessayer.' });
      }
    } else {
      // Mode dev : captcha non configuré, on accepte sans vérification
      console.warn('⚠️ HCAPTCHA_SECRET_KEY non configurée - captcha désactivé');
    }
    
    // Valider les données
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: 'Données invalides',
        details: validation.errors,
      });
    }
    
    // Envoyer les emails
    const emailSent = await sendEmails(formData);
    if (!emailSent) {
      return res.status(500).json({ error: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
    }
    
    // Succès
    return res.status(200).json({ 
      success: true,
      message: 'Votre demande a bien été envoyée. Nous vous répondrons sous 48h.',
    });
    
  } catch (error) {
    console.error('Erreur API quote:', error);
    return res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
}
