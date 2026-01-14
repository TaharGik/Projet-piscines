/**
 * Module de gestion des erreurs centralisé
 * Fournit des messages d'erreur cohérents et des codes d'erreur standard
 */

/**
 * Codes d'erreur standardisés
 */
export const ERROR_CODES = {
  // Erreurs client (4xx)
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CAPTCHA_FAILED: 'CAPTCHA_FAILED',
  RATE_LIMIT: 'RATE_LIMIT_EXCEEDED',
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  
  // Erreurs serveur (5xx)
  SERVER_ERROR: 'SERVER_ERROR',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  
  // Erreurs réseau
  NETWORK_ERROR: 'NETWORK_ERROR',
  OFFLINE: 'OFFLINE',
};

/**
 * Messages d'erreur utilisateur (français)
 */
export const ERROR_MESSAGES = {
  [ERROR_CODES.VALIDATION_ERROR]: 'Données invalides. Veuillez vérifier le formulaire.',
  [ERROR_CODES.CAPTCHA_FAILED]: 'Vérification anti-robot échouée. Veuillez réessayer.',
  [ERROR_CODES.RATE_LIMIT]: 'Trop de tentatives. Veuillez patienter quelques minutes.',
  [ERROR_CODES.INVALID_REQUEST]: 'Requête invalide.',
  [ERROR_CODES.UNAUTHORIZED]: 'Accès non autorisé.',
  
  [ERROR_CODES.SERVER_ERROR]: 'Erreur serveur. Veuillez réessayer ou nous contacter.',
  [ERROR_CODES.EMAIL_SEND_FAILED]: 'Erreur lors de l\'envoi. Veuillez réessayer ou nous appeler.',
  [ERROR_CODES.DATABASE_ERROR]: 'Erreur de base de données. Veuillez réessayer.',
  [ERROR_CODES.EXTERNAL_API_ERROR]: 'Service temporairement indisponible. Veuillez réessayer.',
  [ERROR_CODES.TIMEOUT]: 'La requête a pris trop de temps. Vérifiez votre connexion.',
  
  [ERROR_CODES.NETWORK_ERROR]: 'Problème de connexion. Vérifiez votre réseau.',
  [ERROR_CODES.OFFLINE]: 'Vous êtes hors ligne. Vérifiez votre connexion internet.',
};

/**
 * Classe d'erreur personnalisée pour l'application
 */
export class AppError extends Error {
  constructor(code, message, statusCode = 500, details = null) {
    super(message || ERROR_MESSAGES[code] || 'Une erreur est survenue');
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
    
    // Capture la stack trace (utile pour le debug)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
  
  /**
   * Convertit l'erreur en objet JSON pour les réponses API
   */
  toJSON() {
    return {
      error: this.message,
      code: this.code,
      ...(this.details && { details: this.details }),
      timestamp: this.timestamp,
    };
  }
}

/**
 * Utilitaires pour créer des erreurs spécifiques
 */
export const createValidationError = (details) => 
  new AppError(ERROR_CODES.VALIDATION_ERROR, null, 400, details);

export const createCaptchaError = () => 
  new AppError(ERROR_CODES.CAPTCHA_FAILED, null, 400);

export const createRateLimitError = (retryAfter) => 
  new AppError(ERROR_CODES.RATE_LIMIT, null, 429, { retryAfter });

export const createServerError = (originalError) => 
  new AppError(ERROR_CODES.SERVER_ERROR, null, 500, { 
    message: originalError?.message 
  });

export const createEmailError = () => 
  new AppError(ERROR_CODES.EMAIL_SEND_FAILED, null, 500);

export const createTimeoutError = () => 
  new AppError(ERROR_CODES.TIMEOUT, null, 408);

/**
 * Détecte le type d'erreur et retourne une AppError appropriée
 * Utilisé pour normaliser les erreurs provenant de sources externes
 */
export function parseError(error) {
  // Déjà une AppError
  if (error instanceof AppError) {
    return error;
  }
  
  // Erreur réseau
  if (error.name === 'TypeError' && !navigator.onLine) {
    return new AppError(ERROR_CODES.OFFLINE, null, 0);
  }
  
  // Timeout
  if (error.name === 'AbortError' || error.message?.includes('timeout')) {
    return createTimeoutError();
  }
  
  // Erreur HTTP basée sur le code de statut
  if (error.statusCode || error.status) {
    const statusCode = error.statusCode || error.status;
    
    if (statusCode === 429) {
      return createRateLimitError(error.retryAfter);
    }
    
    if (statusCode === 400) {
      return createValidationError(error.details || error.message);
    }
    
    if (statusCode >= 500) {
      return createServerError(error);
    }
  }
  
  // Erreur générique
  return createServerError(error);
}

/**
 * Handler pour les réponses fetch
 * Parse la réponse et lève une AppError appropriée si nécessaire
 */
export async function handleFetchResponse(response) {
  // Succès
  if (response.ok) {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      try {
        return await response.json();
      } catch (parseError) {
        throw new AppError(
          ERROR_CODES.SERVER_ERROR,
          'Réponse serveur invalide (JSON mal formé)',
          500,
          { parseError: parseError.message }
        );
      }
    }
    
    // Pas de contenu JSON
    return { success: true };
  }
  
  // Erreur - tenter de parser le JSON d'erreur
  let errorData = null;
  const contentType = response.headers.get('content-type');
  
  if (contentType?.includes('application/json')) {
    try {
      errorData = await response.json();
    } catch (e) {
      // Impossible de parser le JSON d'erreur
    }
  }
  
  // Créer l'erreur appropriée
  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after') || 
                      errorData?.retryAfter || 
                      600; // 10 minutes par défaut
    throw createRateLimitError(retryAfter);
  }
  
  if (response.status === 400) {
    throw createValidationError(
      errorData?.details || errorData?.error || 'Validation échouée'
    );
  }
  
  if (response.status >= 500) {
    throw new AppError(
      ERROR_CODES.SERVER_ERROR,
      errorData?.error || `Erreur serveur (${response.status})`,
      response.status,
      errorData
    );
  }
  
  // Autre erreur
  throw new AppError(
    ERROR_CODES.SERVER_ERROR,
    errorData?.error || `Erreur HTTP ${response.status}`,
    response.status,
    errorData
  );
}

/**
 * Logger d'erreur conditionnel
 * En production, pourrait être connecté à Sentry/LogRocket
 */
export function logError(error, context = {}) {
  const isDev = process.env.NODE_ENV !== 'production';
  
  const errorLog = {
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    timestamp: error.timestamp || new Date().toISOString(),
    context,
    ...(isDev && { stack: error.stack }),
  };
  
  if (isDev) {
    console.error('🔴 [ERROR]', errorLog);
  } else {
    // En production, envoyer à un service de monitoring
    console.error(JSON.stringify(errorLog));
    
    // TODO: Intégrer Sentry
    // Sentry.captureException(error, { extra: context });
  }
}

export default {
  ERROR_CODES,
  ERROR_MESSAGES,
  AppError,
  createValidationError,
  createCaptchaError,
  createRateLimitError,
  createServerError,
  createEmailError,
  createTimeoutError,
  parseError,
  handleFetchResponse,
  logError,
};
