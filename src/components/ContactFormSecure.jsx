import { useState, useRef } from 'react';
import HCaptcha from './HCaptcha';

/**
 * Composant ContactForm - Formulaire de contact sécurisé
 * 
 * Ce formulaire utilise :
 * - Une API serverless (/api/quote) pour l'envoi des emails
 * - hCaptcha pour la protection anti-bot
 * - Validation côté client et serveur
 * - Brevo (ex-Sendinblue) pour l'envoi des emails
 * 
 * Les clés API restent côté serveur (jamais exposées dans le navigateur)
 * 
 * @returns {JSX.Element} Formulaire de contact complet
 */

// Clé publique hCaptcha (côté client, peut être exposée)
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || '';

// URL de l'API (différente en dev et prod)
const API_URL = import.meta.env.VITE_API_URL || '/api/quote';

// Mode démo si hCaptcha n'est pas configuré
const IS_DEMO_MODE = !HCAPTCHA_SITE_KEY;

// Mode développement pour les logs
const IS_DEV = import.meta.env.DEV;

const ContactForm = () => {
  const hcaptchaRef = useRef();
  const [captchaToken, setCaptchaToken] = useState('');
  
  /**
   * État des données du formulaire
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    projectType: 'nouvelle-piscine',
    message: '',
  });
  
  /**
   * État du statut du formulaire
   */
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  /**
   * Liste des types de projets
   */
  const projectTypes = [
    { value: 'nouvelle-piscine', label: 'Nouvelle piscine' },
    { value: 'renovation', label: 'Rénovation de piscine' },
    { value: 'entretien', label: 'Contrat d\'entretien' },
    { value: 'autre', label: 'Autre demande' },
  ];

  /**
   * handleChange - Gère les changements dans les champs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * validateForm - Valide les champs côté client
   */
  const validateForm = () => {
    // Nom
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Veuillez entrer votre nom (minimum 2 caractères).' });
      return false;
    }
    
    // Email
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Veuillez entrer une adresse email valide.' });
      return false;
    }
    
    // Téléphone (format français)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      setStatus({ type: 'error', message: 'Veuillez entrer un numéro de téléphone valide (format français).' });
      return false;
    }
    
    // Message
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Veuillez décrire votre projet (minimum 10 caractères).' });
      return false;
    }
    
    // CAPTCHA
    if (!IS_DEMO_MODE && !captchaToken) {
      setStatus({ type: 'error', message: 'Veuillez compléter la vérification anti-robot.' });
      return false;
    }
    
    return true;
  };

  /**
   * handleSubmit - Gère la soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    // ============================================================
    // MODE DÉMO : Si pas configuré, simule l'envoi
    // ============================================================
    if (IS_DEMO_MODE) {
      setTimeout(() => {
        if (IS_DEV) {
          console.log('📧 Formulaire soumis (mode démo):', formData);
          console.warn('⚠️ hCaptcha non configuré. Ajoutez VITE_HCAPTCHA_SITE_KEY dans .env');
        }
        setStatus({
          type: 'success',
          message: '✅ Merci pour votre demande ! Nous vous recontacterons sous 48h. (Mode démo)',
        });
        resetForm();
      }, 1500);
      return;
    }

    // ============================================================
    // MODE PRODUCTION : Envoi via API serverless
    // ============================================================
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Erreur du serveur
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      // Succès
      setStatus({
        type: 'success',
        message: data.message || '✅ Merci pour votre demande ! Nous vous recontacterons sous 48h.',
      });
      resetForm();

    } catch (error) {
      if (IS_DEV) {
        console.error('Erreur envoi formulaire:', error);
      }
      setStatus({
        type: 'error',
        message: error.message || 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.',
      });
      
      // Reset le captcha en cas d'erreur
      if (hcaptchaRef.current) {
        hcaptchaRef.current.reset();
      }
      setCaptchaToken('');
    }
  };

  /**
   * resetForm - Réinitialise le formulaire
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      projectType: 'nouvelle-piscine',
      message: '',
    });
    setCaptchaToken('');
    if (hcaptchaRef.current) {
      hcaptchaRef.current.reset();
    }
  };

  /**
   * Callbacks hCaptcha
   */
  const onCaptchaVerify = (token) => {
    setCaptchaToken(token);
  };

  const onCaptchaExpire = () => {
    setCaptchaToken('');
    setStatus({ type: 'error', message: 'La vérification a expiré. Veuillez recommencer.' });
  };

  const onCaptchaError = () => {
    setCaptchaToken('');
    setStatus({ type: 'error', message: 'Erreur de vérification. Veuillez réessayer.' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Message de statut */}
      {status.message && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            status.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : status.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          {status.type === 'loading' && (
            <svg className="animate-spin h-5 w-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {status.type === 'success' && (
            <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {status.type === 'error' && (
            <svg className="h-5 w-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Nom */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Jean Dupont"
          maxLength={100}
          required
        />
      </div>

      {/* Email et Téléphone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="jean.dupont@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="06 12 34 56 78"
            required
          />
        </div>
      </div>

      {/* Ville et Type de projet */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Ville / Code postal
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Versailles (78000)"
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
            Type de projet
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Décrivez votre projet <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Décrivez votre projet : type de piscine souhaitée, dimensions, terrain, budget estimé..."
          maxLength={2000}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.message.length}/2000 caractères
        </p>
      </div>

      {/* hCaptcha */}
      {!IS_DEMO_MODE && (
        <div className="py-2">
          <HCaptcha
            ref={hcaptchaRef}
            siteKey={HCAPTCHA_SITE_KEY}
            onVerify={onCaptchaVerify}
            onExpire={onCaptchaExpire}
            onError={onCaptchaError}
          />
        </div>
      )}

      {/* Mode démo indicator */}
      {IS_DEMO_MODE && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          <strong>⚠️ Mode démo :</strong> hCaptcha n'est pas configuré. 
          Les emails ne seront pas envoyés. Voir le guide de configuration.
        </div>
      )}

      {/* Bouton submit */}
      <button
        type="submit"
        disabled={status.type === 'loading'}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
          status.type === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {status.type === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </span>
        ) : (
          'Envoyer ma demande de devis'
        )}
      </button>

      {/* Mentions légales */}
      <p className="text-xs text-gray-500 text-center">
        En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour 
        traiter votre demande. Voir notre{' '}
        <a href="/mentions-legales" className="text-blue-500 hover:underline">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
};

export default ContactForm;
