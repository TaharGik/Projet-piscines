/**
 * Logger conditionnel pour éviter les console.log en production
 * 
 * Utilisation :
 * import logger from '@/utils/logger';
 * 
 * logger.log('Message de debug'); // Seulement en dev
 * logger.warn('Avertissement'); // Seulement en dev
 * logger.error('Erreur'); // Toujours loggué
 */

const isDev = import.meta.env.DEV;

const logger = {
  /**
   * Log standard - Seulement en développement
   */
  log: (...args) => {
    if (isDev) {
      console.log(...args);
    }
  },

  /**
   * Warning - Seulement en développement
   */
  warn: (...args) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Erreur - Toujours loggué (pour monitoring)
   * 
   * @param {string|Error} error - Message d'erreur ou objet Error
   * @param {Object} context - Contexte additionnel
   */
  error: (error, context = {}) => {
    console.error(error, context);
  },

  /**
   * Debug détaillé - Seulement en développement
   */
  debug: (...args) => {
    if (isDev) {
      console.debug(...args);
    }
  },

  /**
   * Info - Seulement en développement
   */
  info: (...args) => {
    if (isDev) {
      console.info(...args);
    }
  },
};

export default logger;


