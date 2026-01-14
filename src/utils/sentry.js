/**
 * Configuration et initialisation de Sentry pour le monitoring d'erreurs
 * 
 * ⚠️ CE MODULE EST OPTIONNEL
 * Si @sentry/react n'est pas installé, toutes les fonctions retournent
 * des no-ops (ne font rien) et le site fonctionne normalement.
 * 
 * INSTALLATION :
 * npm install @sentry/react
 * 
 * CONFIGURATION :
 * 1. Créer un compte sur sentry.io
 * 2. Créer un nouveau projet React
 * 3. Copier le DSN dans .env : VITE_SENTRY_DSN=your-dsn-here
 * 4. En production, définir aussi VITE_SENTRY_ENVIRONMENT=production
 */

// Variable globale pour stocker l'instance Sentry une fois chargée
let SentrySDK = null;
let sentryInitialized = false;

/**
 * Charge Sentry de manière asynchrone (optionnel)
 * @returns {Promise<boolean>} true si Sentry est chargé, false sinon
 */
async function loadSentry() {
  if (SentrySDK) return true;
  
  try {
    SentrySDK = await import('@sentry/react');
    return true;
  } catch (error) {
    console.log('[Sentry] Package non installé - monitoring désactivé');
    return false;
  }
}

/**
 * Initialise Sentry avec la configuration appropriée
 * @returns {Promise<boolean>} true si initialisé avec succès
 */
export async function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.MODE;
  const isProduction = environment === 'production';
  
  // Ne pas initialiser si pas de DSN configuré
  if (!dsn) {
    console.log('[Sentry] DSN non configuré - monitoring désactivé');
    return false;
  }

  // Charger Sentry de manière asynchrone
  const loaded = await loadSentry();
  if (!loaded) return false;

  try {
    SentrySDK.init({
      dsn,
      environment,
      
      // Performance Monitoring
      tracesSampleRate: isProduction ? 0.1 : 1.0,
      
      // Session Replay (enregistre la session si erreur)
      replaysSessionSampleRate: 0, // Pas d'enregistrement sans erreur
      replaysOnErrorSampleRate: isProduction ? 0.1 : 1.0,
      
      integrations: [
        new SentrySDK.BrowserTracing({
          tracePropagationTargets: ['localhost', /^https:\/\/.*\.vercel\.app$/, /^https:\/\/bbh-service\.fr$/],
        }),
        new SentrySDK.Replay({
          maskAllText: true,
          blockAllMedia: true,
          maskAllInputs: true,
        }),
      ],
      
      // Filtrer les erreurs non pertinentes
      beforeSend(event, hint) {
        const error = hint.originalException;
        
        // Ignorer erreurs CORS (hors de notre contrôle)
        if (error && error.message && error.message.includes('CORS')) {
          return null;
        }
        
        // Ignorer erreurs de loading chunks (rafraîchir la page suffit)
        if (error && error.message && error.message.includes('Loading chunk')) {
          return null;
        }
        
        // Ignorer erreurs réseau temporaires
        if (error && error.message && /network|fetch|timeout/i.test(error.message)) {
          return null;
        }
        
        // Ignorer erreurs d'extensions navigateur
        if (event.exception?.values?.some(e => 
          e.stacktrace?.frames?.some(frame => 
            /extension|chrome-extension|moz-extension/i.test(frame.filename || '')
          )
        )) {
          return null;
        }
        
        return event;
      },
      
      // Masquer données sensibles dans les breadcrumbs
      beforeBreadcrumb(breadcrumb) {
        // Masquer données de formulaire
        if (breadcrumb.category === 'ui.input' || breadcrumb.category === 'ui.click') {
          if (breadcrumb.message) {
            breadcrumb.message = breadcrumb.message.replace(/password|email|token|api[-_]?key/gi, '[REDACTED]');
          }
        }
        
        // Masquer cookies
        if (breadcrumb.category === 'xhr' || breadcrumb.category === 'fetch') {
          if (breadcrumb.data?.headers) {
            if (breadcrumb.data.headers.Cookie) {
              breadcrumb.data.headers.Cookie = '[REDACTED]';
            }
            if (breadcrumb.data.headers.Authorization) {
              breadcrumb.data.headers.Authorization = '[REDACTED]';
            }
          }
        }
        
        return breadcrumb;
      },
    });

    sentryInitialized = true;
    console.log('[Sentry] Monitoring initialisé');
    return true;
  } catch (error) {
    console.error('[Sentry] Erreur initialisation:', error);
    return false;
  }
}

/**
 * Configure le contexte utilisateur pour Sentry
 * @param {Object} user - Informations utilisateur (sans données sensibles)
 */
export async function setSentryUser(user) {
  if (!SentrySDK) {
    await loadSentry();
  }
  if (!SentrySDK) return; // Sentry non disponible
  
  if (!user) {
    SentrySDK.setUser(null);
    return;
  }
  
  SentrySDK.setUser({
    id: user.id || 'anonymous',
    location: user.city || undefined,
  });
}

/**
 * Capture une erreur manuellement avec contexte
 * @param {Error} error - L'erreur à capturer
 * @param {Object} context - Contexte additionnel
 */
export async function captureError(error, context = {}) {
  if (!SentrySDK) {
    await loadSentry();
  }
  if (!SentrySDK) return; // Sentry non disponible
  
  SentrySDK.captureException(error, {
    extra: context,
    level: 'error',
  });
}

/**
 * Capture un message manuel
 * @param {string} message - Message à capturer
 * @param {string} level - Niveau (info, warning, error)
 * @param {Object} context - Contexte additionnel
 */
export async function captureMessage(message, level = 'info', context = {}) {
  if (!SentrySDK) {
    await loadSentry();
  }
  if (!SentrySDK) return; // Sentry non disponible
  
  SentrySDK.captureMessage(message, {
    level,
    extra: context,
  });
}

/**
 * Ajoute un breadcrumb personnalisé
 * @param {string} message - Message du breadcrumb
 * @param {Object} data - Données additionnelles
 */
export async function addBreadcrumb(message, data = {}) {
  if (!SentrySDK) {
    await loadSentry();
  }
  if (!SentrySDK) return; // Sentry non disponible
  
  SentrySDK.addBreadcrumb({
    message,
    data,
    level: 'info',
    timestamp: Date.now() / 1000,
  });
}

/**
 * Mesure le temps d'exécution d'une opération
 * @param {string} name - Nom de la transaction
 * @param {Function} callback - Fonction à mesurer
 * @param {string} op - Type d'opération
 * @returns {Promise} Résultat de la fonction
 */
export async function withTransaction(name, callback, op = 'task') {
  if (!SentrySDK) {
    await loadSentry();
  }
  if (!SentrySDK) return callback(); // Sentry non disponible, exécuter quand même
  
  const transaction = SentrySDK.startTransaction({ name, op });
  
  try {
    const result = await callback();
    transaction.setStatus('ok');
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
}

/**
 * ErrorBoundary React pour capturer les erreurs de rendu
 * Utilisation : Récupérer avec getSentryErrorBoundary() puis utiliser dans un composant .jsx
 * 
 * @returns {Component|null} Le composant ErrorBoundary de Sentry ou null
 */
export async function getSentryErrorBoundary() {
  if (!SentrySDK) {
    await loadSentry();
  }
  return SentrySDK?.ErrorBoundary || null;
}

// Export par défaut
export default {
  initSentry,
  setSentryUser,
  captureError,
  captureMessage,
  addBreadcrumb,
  withTransaction,
  getSentryErrorBoundary,
};
