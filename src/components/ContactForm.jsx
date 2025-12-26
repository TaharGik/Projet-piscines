import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Composant ContactForm - Formulaire de contact avec intégration EmailJS
 * 
 * Ce formulaire permet aux visiteurs de demander un devis.
 * Il gère la validation, l'affichage des états (loading, success, error)
 * et l'envoi des données via EmailJS.
 * 
 * CONFIGURATION EMAILJS :
 * 1. Créer un compte gratuit sur https://www.emailjs.com/
 * 2. Ajouter un service email (Gmail, Outlook, etc.)
 * 3. Créer un template avec les variables :
 *    - {{from_name}} : Nom du client
 *    - {{from_email}} : Email du client
 *    - {{phone}} : Téléphone
 *    - {{city}} : Ville
 *    - {{project_type}} : Type de projet
 *    - {{message}} : Message
 * 4. Créer un fichier .env à la racine avec vos clés (voir .env.example)
 * 
 * @returns {JSX.Element} Formulaire de contact complet
 */

// ============================================================
// CONFIGURATION EMAILJS - Chargée depuis les variables d'environnement
// ============================================================
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Mode démo si les clés ne sont pas configurées
const IS_DEMO_MODE = !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY;

const ContactForm = () => {
  /**
   * Référence vers le formulaire DOM
   * Nécessaire pour emailjs.sendForm() qui lit directement les champs
   */
  const formRef = useRef();
  
  /**
   * État des données du formulaire
   * Chaque propriété correspond à un champ input (attribut name)
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
   * - type: 'loading' | 'success' | 'error' | ''
   * - message: Texte à afficher à l'utilisateur
   */
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  /**
   * Liste des types de projets pour le select
   * value: valeur envoyée, label: texte affiché
   */
  const projectTypes = [
    { value: 'nouvelle-piscine', label: 'Nouvelle piscine' },
    { value: 'renovation', label: 'Rénovation de piscine' },
    { value: 'entretien', label: 'Contrat d\'entretien' },
    { value: 'spa', label: 'Installation spa / balnéo' },
    { value: 'autre', label: 'Autre demande' },
  ];

  /**
   * handleChange - Gère les changements dans les champs du formulaire
   * 
   * Utilise la déstructuration pour extraire name et value de l'event.
   * Met à jour uniquement le champ modifié grâce au spread operator.
   * 
   * @param {Event} e - Événement onChange de l'input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,        // Garde les autres champs inchangés
      [name]: value,  // Met à jour le champ ciblé (computed property)
    }));
  };

  /**
   * validateForm - Valide les champs obligatoires avant envoi
   * 
   * Vérifie :
   * - Nom non vide
   * - Email au format valide (regex simple)
   * - Téléphone non vide
   * - Message non vide
   * 
   * @returns {boolean} true si valide, false sinon (avec message d'erreur)
   */
  const validateForm = () => {
    // Validation du nom
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Veuillez entrer votre nom.' });
      return false;
    }
    
    // Validation de l'email avec regex
    // Regex simple : texte@texte.texte (ne gère pas tous les cas edge)
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Veuillez entrer une adresse email valide.' });
      return false;
    }
    
    // Validation du téléphone
    if (!formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Veuillez entrer votre numéro de téléphone.' });
      return false;
    }
    
    // Validation du message
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Veuillez décrire votre projet.' });
      return false;
    }
    
    return true;
  };

  /**
   * handleSubmit - Gère la soumission du formulaire
   * 
   * Étapes :
   * 1. Empêche le rechargement de la page (preventDefault)
   * 2. Valide les champs
   * 3. Affiche l'état "loading"
   * 4. Envoie via EmailJS (ou simule en mode démo)
   * 5. Affiche succès ou erreur
   * 6. Réinitialise le formulaire si succès
   * 
   * @param {Event} e - Événement onSubmit du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Validation - arrête si invalide
    if (!validateForm()) return;

    // Affichage de l'état de chargement
    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    // ============================================================
    // MODE DÉMO : Si EmailJS n'est pas configuré, on simule l'envoi
    // ============================================================
    if (IS_DEMO_MODE) {
      setTimeout(() => {
        console.log('Formulaire soumis (mode démo):', formData);
        console.warn('⚠️ EmailJS n\'est pas configuré. Créez un fichier .env avec vos clés (voir .env.example)');
        setStatus({
          type: 'success',
          message: 'Merci pour votre demande ! Nous vous recontacterons sous 48h. (Mode démo - EmailJS non configuré)',
        });
        // Réinitialisation du formulaire
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          projectType: 'nouvelle-piscine',
          message: '',
        });
      }, 1500); // Simule un délai réseau
      return;
    }

    // ============================================================
    // MODE PRODUCTION : Envoi réel via EmailJS
    // ============================================================
    try {
      // emailjs.sendForm() lit automatiquement les champs du formulaire
      // grâce à la ref et aux attributs "name" des inputs
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,  // Référence au formulaire DOM
        EMAILJS_PUBLIC_KEY
      );

      // Succès : affichage du message et reset du formulaire
      setStatus({
        type: 'success',
        message: 'Merci pour votre demande ! Nous vous recontacterons sous 48h.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        projectType: 'nouvelle-piscine',
        message: '',
      });
    } catch (error) {
      // Erreur : log console + message utilisateur
      console.error('Erreur EmailJS:', error);
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.',
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Message de statut */}
      {status.message && (
        <div
          className={`p-4 rounded-md font-sans text-sm ${
            status.type === 'success'
              ? 'bg-secondary/10 text-secondary border border-secondary/20'
              : status.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-accent-light/10 text-accent-light border border-accent-light/20'
          }`}
        >
          <div className="flex items-center">
            {status.type === 'loading' && (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {status.type === 'success' && (
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {status.type === 'error' && (
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{status.message}</span>
          </div>
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
          className="w-full px-4 py-3 border border-neutral-light rounded-md font-sans focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          placeholder="Jean Dupont"
        />
      </div>

      {/* Email et Téléphone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-sans font-medium text-primary mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-light rounded-md font-sans focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            placeholder="jean.dupont@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-sans font-medium text-primary mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-light rounded-md font-sans focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      {/* Ville et Type de projet */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-sans font-medium text-primary mb-1">
            Ville / Code postal
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-light rounded-md font-sans focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            placeholder="Versailles (78)"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-sans font-medium text-primary mb-1">
            Type de projet
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-light rounded-md font-sans focus:ring-2 focus:ring-secondary focus:border-transparent transition-all bg-white"
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
        <label htmlFor="message" className="block text-sm font-sans font-medium text-primary mb-1">
          Décrivez votre projet <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border border-neutral-light rounded-md font-sans focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
          placeholder="Décrivez votre projet : dimensions souhaitées, type de piscine, budget approximatif, contraintes du terrain..."
        />
      </div>

      {/* Bouton submit - Couleur secondaire BBH SERVICE */}
      <button
        type="submit"
        disabled={status.type === 'loading'}
        className={`w-full py-4 px-6 rounded-md font-heading font-semibold text-white transition-all duration-200 ${
          status.type === 'loading'
            ? 'bg-primary/50 cursor-not-allowed'
            : 'bg-secondary hover:bg-[#269e9a] hover:shadow-card'
        }`}
      >
        {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
      </button>

      {/* Mention RGPD */}
      <p className="font-sans text-xs text-primary/50 text-center">
        En soumettant ce formulaire, vous acceptez que vos données soient traitées pour répondre à votre demande. 
        Consultez notre politique de confidentialité pour en savoir plus.
      </p>
    </form>
  );
};

export default ContactForm;
