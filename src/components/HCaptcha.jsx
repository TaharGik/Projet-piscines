import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import logger from '../utils/logger';

/**
 * Composant HCaptcha - Intégration de hCaptcha pour la vérification anti-bot
 * 
 * hCaptcha est une alternative à reCAPTCHA qui respecte mieux la vie privée
 * et ne dépend pas de Google.
 * 
 * @param {string} siteKey - Clé publique hCaptcha
 * @param {function} onVerify - Callback appelé avec le token après vérification
 * @param {function} onExpire - Callback appelé quand le token expire
 * @param {function} onError - Callback appelé en cas d'erreur
 */
const HCaptcha = forwardRef(({ 
  siteKey, 
  onVerify, 
  onExpire, 
  onError,
  theme = 'light',
  size = 'normal'
}, ref) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Exposer la méthode reset au parent
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.hcaptcha) {
        window.hcaptcha.reset(widgetIdRef.current);
      }
    },
    execute: () => {
      if (widgetIdRef.current !== null && window.hcaptcha) {
        window.hcaptcha.execute(widgetIdRef.current);
      }
    }
  }));

  useEffect(() => {
    // Charger le script hCaptcha s'il n'est pas déjà chargé
    if (!window.hcaptcha) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsReady(true);
      };
      
      document.head.appendChild(script);
    } else {
      // Utiliser un microtask pour éviter le setState synchrone
      Promise.resolve().then(() => setIsReady(true));
    }
  }, []);

  useEffect(() => {
    if (!isReady || !containerRef.current || widgetIdRef.current !== null) return;

    // Rendre le widget hCaptcha
    try {
      widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
        sitekey: siteKey,
        theme: theme,
        size: size,
        callback: (token) => {
          if (onVerify) onVerify(token);
        },
        'expired-callback': () => {
          if (onExpire) onExpire();
        },
        'error-callback': (err) => {
          if (onError) onError(err);
        },
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        logger.error('Erreur rendu hCaptcha:', error);
      }
    }
  }, [isReady, siteKey, theme, size, onVerify, onExpire, onError]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== null && window.hcaptcha) {
        try {
          window.hcaptcha.remove(widgetIdRef.current);
        } catch {
          // Ignorer les erreurs de cleanup
        }
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div ref={containerRef} />
      {!isReady && (
        <div className="h-[78px] w-[302px] bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="animate-pulse text-gray-400 text-sm">
            Chargement de la vérification...
          </div>
        </div>
      )}
    </div>
  );
});

HCaptcha.displayName = 'HCaptcha';

HCaptcha.propTypes = {
  siteKey: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
  onExpire: PropTypes.func,
  onError: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  size: PropTypes.oneOf(['normal', 'compact', 'invisible']),
};

export default HCaptcha;
