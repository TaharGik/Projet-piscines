import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logger from '../utils/logger';

/**
 * Hook personnalisé pour Google Analytics 4 (GA4)
 * 
 * Ce hook gère :
 * - L'initialisation de Google Analytics
 * - Le tracking automatique des changements de page
 * - L'envoi d'événements personnalisés
 * 
 * CONFIGURATION :
 * 1. Créer un compte Google Analytics 4
 * 2. Obtenir votre MEASUREMENT_ID (format : G-XXXXXXXXXX)
 * 3. Ajouter VITE_GA_TRACKING_ID dans le fichier .env
 * 
 * UTILISATION :
 * Dans App.jsx, ajoutez simplement :
 * 
 * import useGoogleAnalytics from './hooks/useGoogleAnalytics';
 * 
 * function App() {
 *   useGoogleAnalytics(); // C'est tout !
 *   // ...
 * }
 * 
 * @returns {Object} Fonctions pour tracker des événements personnalisés
 */

// Mode développement pour les logs
const IS_DEV = import.meta.env.DEV;

const useGoogleAnalytics = () => {
  const location = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_TRACKING_ID;

  /**
   * Initialisation de Google Analytics
   * Charge le script gtag.js et initialise le tracking
   */
  useEffect(() => {
    // Si pas de tracking ID configuré, on ne fait rien
    if (!GA_MEASUREMENT_ID) {
      if (IS_DEV) {
        logger.warn('⚠️ Google Analytics non configuré. Ajoutez VITE_GA_TRACKING_ID dans votre fichier .env');
      }
      return;
    }

    // Vérifier si gtag est déjà chargé
    if (window.gtag) {
      return; // Déjà initialisé
    }

    // Créer le script gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialiser gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Désactivé car on gère manuellement
    });

    if (IS_DEV) {
      logger.log('✅ Google Analytics initialisé:', GA_MEASUREMENT_ID);
    }
  }, [GA_MEASUREMENT_ID]);

  /**
   * Tracking des changements de page
   * Se déclenche à chaque fois que l'URL change
   */
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    // Envoyer un événement page_view à GA4
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });

    if (IS_DEV) {
      logger.log('📊 GA4 - Page vue:', location.pathname);
    }
  }, [location, GA_MEASUREMENT_ID]);

  /**
   * Fonction pour tracker un événement personnalisé
   * 
   * @param {string} eventName - Nom de l'événement (ex: 'button_click')
   * @param {Object} params - Paramètres additionnels
   * 
   * @example
   * trackEvent('form_submit', {
   *   form_name: 'contact',
   *   project_type: 'nouvelle-piscine'
   * });
   */
  const trackEvent = (eventName, params = {}) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) {
      if (IS_DEV) {
        logger.log('📊 [Mode dev] Événement:', eventName, params);
      }
      return;
    }

    window.gtag('event', eventName, params);
    if (IS_DEV) {
      logger.log('📊 GA4 - Événement:', eventName, params);
    }
  };

  /**
   * Fonction pour tracker un clic sur un bouton
   * 
   * @param {string} buttonName - Nom du bouton
   * @param {string} location - Emplacement du bouton (page)
   * 
   * @example
   * trackButtonClick('Demander un devis', 'Hero');
   */
  const trackButtonClick = (buttonName, location = '') => {
    trackEvent('button_click', {
      button_name: buttonName,
      button_location: location,
    });
  };

  /**
   * Fonction pour tracker une soumission de formulaire
   * 
   * @param {string} formName - Nom du formulaire
   * @param {string} projectType - Type de projet sélectionné
   * 
   * @example
   * trackFormSubmit('contact', 'nouvelle-piscine');
   */
  const trackFormSubmit = (formName, projectType = '') => {
    trackEvent('form_submit', {
      form_name: formName,
      project_type: projectType,
    });
  };

  /**
   * Fonction pour tracker un clic sur un projet
   * 
   * @param {string} projectName - Nom du projet
   * @param {string} projectType - Type de projet
   * 
   * @example
   * trackProjectClick('Villa Saint-Germain', 'Piscine béton à débordement');
   */
  const trackProjectClick = (projectName, projectType = '') => {
    trackEvent('project_view', {
      project_name: projectName,
      project_type: projectType,
    });
  };

  /**
   * Fonction pour tracker un clic sur le téléphone
   * 
   * @example
   * trackPhoneClick();
   */
  const trackPhoneClick = () => {
    trackEvent('contact_phone', {
      contact_method: 'phone',
    });
  };

  /**
   * Fonction pour tracker un clic sur l'email
   * 
   * @example
   * trackEmailClick();
   */
  const trackEmailClick = () => {
    trackEvent('contact_email', {
      contact_method: 'email',
    });
  };

  // Retourner les fonctions de tracking
  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackProjectClick,
    trackPhoneClick,
    trackEmailClick,
  };
};

export default useGoogleAnalytics;
