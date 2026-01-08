import { useState, useEffect } from 'react';

/**
 * Composant QuoteWizard - Parcours de demande de devis en étapes
 * 
 * Ce wizard guide l'utilisateur à travers plusieurs étapes pour qualifier
 * sa demande avant le formulaire de contact.
 * 
 * Étapes :
 * 1. Type de service (Conception, Rénovation, Entretien)
 * 2. Type de piscine
 * 3. Dimensions
 * 4. Terrain
 * 5. Budget
 * 6. Délai souhaité
 * 7. Coordonnées
 * 
 * @param {function} onComplete - Callback appelé avec les données complètes
 * @param {function} onClose - Callback pour fermer le wizard
 */

const TOTAL_STEPS = 7;

// Données des options pour chaque étape
const SERVICE_TYPES = [
  { 
    id: 'conception-installation', 
    label: 'Conception et Installation', 
    description: 'Créer une nouvelle piscine sur mesure',
    popular: true
  },
  { 
    id: 'renovation', 
    label: 'Rénovation de Piscine', 
    description: 'Rénover ou moderniser une piscine existante',
    popular: false
  },
  { 
    id: 'entretien', 
    label: 'Entretien de Piscine', 
    description: 'Contrat d\'entretien régulier',
    popular: false
  },
  { 
    id: 'installation-gazon', 
    label: 'Installation de Gazon', 
    description: 'Aménagement paysager et gazon autour de la piscine',
    popular: false
  },
];

const POOL_TYPES = [
  { 
    id: 'beton', 
    label: 'Piscine béton', 
    description: 'Sur mesure, durable, personnalisable à 100%',
    popular: true
  },
  { 
    id: 'coque', 
    label: 'Piscine coque', 
    description: 'Installation rapide, excellent rapport qualité-prix',
    popular: true
  },
  { 
    id: 'hors-sol', 
    label: 'Piscine hors-sol', 
    description: 'Économique, installation simple, démontable'
  },
  { 
    id: 'sur-mesure', 
    label: 'Projet sur-mesure', 
    description: 'Piscine miroir, naturelle, intérieure, débordement...'
  },
];

const DIMENSIONS = [
  { id: 'small', label: 'Petite', size: '< 20 m²', dimensions: '4x4m à 5x3m' },
  { id: 'medium', label: 'Moyenne', size: '20-40 m²', dimensions: '8x4m à 10x4m', popular: true },
  { id: 'large', label: 'Grande', size: '40-60 m²', dimensions: '10x5m à 12x5m' },
  { id: 'xlarge', label: 'Très grande', size: '> 60 m²', dimensions: '> 12x5m' },
];

const TERRAIN_TYPES = [
  { id: 'flat-easy', label: 'Plat, accès facile', description: 'Idéal pour l\'installation' },
  { id: 'flat-difficult', label: 'Plat, accès difficile', description: 'Passage étroit ou obstacles' },
  { id: 'slope-easy', label: 'En pente, accès facile', description: 'Terrassement nécessaire' },
  { id: 'slope-difficult', label: 'En pente, accès difficile', description: 'Étude technique requise' },
  { id: 'unknown', label: 'Je ne sais pas', description: 'Nous évaluerons sur place' },
];

const BUDGETS = [
  { id: 'under15k', label: 'Moins de 15 000 €', range: '< 15k' },
  { id: '15to25k', label: '15 000 - 25 000 €', range: '15-25k' },
  { id: '25to40k', label: '25 000 - 40 000 €', range: '25-40k', popular: true },
  { id: '40to70k', label: '40 000 - 70 000 €', range: '40-70k' },
  { id: 'over70k', label: 'Plus de 70 000 €', range: '> 70k' },
  { id: 'unknown', label: 'À définir ensemble', range: 'N/A' },
];

const TIMELINES = [
  { id: 'urgent', label: 'Dès que possible', delay: '< 3 mois' },
  { id: 'spring', label: 'Pour le printemps', delay: '3-6 mois' },
  { id: 'summer', label: 'Pour l\'été prochain', delay: '6-12 mois', popular: true },
  { id: 'flexible', label: 'Pas de rush', delay: '> 12 mois' },
  { id: 'info', label: 'Je me renseigne', delay: 'N/A' },
];

const QuoteWizard = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  
  // Données du formulaire
  const [formData, setFormData] = useState({
    serviceType: '',
    poolType: '',
    dimensions: '',
    terrain: '',
    budget: '',
    timeline: '',
    // Coordonnées
    name: '',
    email: '',
    phone: '',
    city: '',
    postalCode: '',
    message: '',
  });

  // Animation d'entrée
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Passe à l'étape suivante
   */
  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Revient à l'étape précédente
   */
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Met à jour une valeur du formulaire avec formatage automatique
   */
  const updateField = (field, value) => {
    let processedValue = value;
    
    // Formatage spécial pour le téléphone
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    // Formatage spécial pour le code postal
    if (field === 'postalCode') {
      processedValue = formatPostalCode(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
  };

  /**
   * formatPhoneNumber - Formate le numéro de téléphone automatiquement
   * Bloque les lettres, accepte uniquement les chiffres
   * Formate en 06 12 34 56 78
   */
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.substring(0, 10);
    
    if (limited.length === 0) return '';
    
    const pairs = limited.match(/.{1,2}/g) || [];
    return pairs.join(' ');
  };

  /**
   * formatPostalCode - Formate le code postal (5 chiffres max)
   */
  const formatPostalCode = (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.substring(0, 5);
  };

  /**
   * handlePhoneKeyPress - Bloque les caractères non numériques
   */
  const handlePhoneKeyPress = (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * handleNumberKeyPress - Bloque les caractères non numériques (pour code postal)
   */
  const handleNumberKeyPress = (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
    
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * Sélectionne une option et passe à l'étape suivante
   */
  const selectOption = (field, value) => {
    updateField(field, value);
    // Petit délai pour voir la sélection avant de passer à la suite
    setTimeout(() => nextStep(), 300);
  };

  /**
   * Vérifie si l'étape actuelle est valide
   */
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.serviceType !== '';
      case 2: return formData.poolType !== '';
      case 3: return formData.dimensions !== '';
      case 4: return formData.terrain !== '';
      case 5: return formData.budget !== '';
      case 6: return formData.timeline !== '';
      case 7: return formData.name && formData.email && formData.phone && formData.city;
      default: return false;
    }
  };

  /**
   * Calcule le pourcentage de progression
   */
  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  /**
   * Soumet le formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: 'loading', message: 'Envoi en cours...' });

    // Construire le message récapitulatif
    const serviceTypeLabel = SERVICE_TYPES.find(s => s.id === formData.serviceType)?.label || formData.serviceType;
    const poolTypeLabel = POOL_TYPES.find(p => p.id === formData.poolType)?.label || formData.poolType;
    const dimensionsLabel = DIMENSIONS.find(d => d.id === formData.dimensions)?.label || formData.dimensions;
    const terrainLabel = TERRAIN_TYPES.find(t => t.id === formData.terrain)?.label || formData.terrain;
    const budgetLabel = BUDGETS.find(b => b.id === formData.budget)?.label || formData.budget;
    const timelineLabel = TIMELINES.find(t => t.id === formData.timeline)?.label || formData.timeline;

    const fullMessage = `
DEMANDE DE DEVIS QUALIFIÉE

Service demandé : ${serviceTypeLabel}
Type de piscine : ${poolTypeLabel}
Dimensions : ${dimensionsLabel}
Terrain : ${terrainLabel}
Budget : ${budgetLabel}
Délai souhaité : ${timelineLabel}

Ville : ${formData.city} ${formData.postalCode}

Message complémentaire :
${formData.message || 'Aucun message supplémentaire'}
    `.trim();

    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api/quote';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: `${formData.city} ${formData.postalCode}`,
          projectType: 'nouvelle-piscine',
          message: fullMessage,
          // Données structurées pour le backend
          wizardData: {
            poolType: formData.poolType,
            dimensions: formData.dimensions,
            terrain: formData.terrain,
            budget: formData.budget,
            timeline: formData.timeline,
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setSubmitStatus({
        type: 'success',
        message: '✅ Votre demande a été envoyée ! Nous vous recontacterons sous 48h.',
      });

      if (onComplete) {
        onComplete(formData);
      }

    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Une erreur est survenue. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Rendu d'une carte d'option sélectionnable
   */
  const OptionCard = ({ option, field, selected }) => (
    <button
      type="button"
      onClick={() => selectOption(field, option.id)}
      className={`
        relative p-4 md:p-6 rounded-xl border-2 text-left transition-all duration-300
        hover:shadow-lg hover:scale-[1.02] hover:border-blue-400
        ${selected 
          ? 'border-secondary bg-secondary/10 shadow-md ring-2 ring-secondary/20' 
          : 'border-gray-200 bg-white hover:bg-gray-50'
        }
      `}
    >
      {option.popular && (
        <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Populaire
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${selected ? 'text-blue-700' : 'text-gray-900'}`}>
            {option.label}
          </h3>
          {option.description && (
            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
          )}
          {option.size && (
            <p className="text-sm text-gray-500 mt-1">{option.size} • {option.dimensions}</p>
          )}
          {option.delay && (
            <p className="text-sm text-gray-500 mt-1">{option.delay}</p>
          )}
          {option.range && !option.delay && (
            <p className="text-sm text-gray-500 mt-1">{option.range}</p>
          )}
        </div>
        {selected && (
          <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        )}
      </div>
    </button>
  );

  /**
   * Rendu du contenu selon l'étape
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Quel service recherchez-vous ?
              </h2>
              <p className="text-gray-500">Sélectionnez le type de service dont vous avez besoin</p>
            </div>
            <div className="grid gap-4">
              {SERVICE_TYPES.map(option => (
                <OptionCard 
                  key={option.id} 
                  option={option} 
                  field="serviceType"
                  selected={formData.serviceType === option.id}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Quel type de piscine souhaitez-vous ?
              </h2>
              <p className="text-gray-500">Choisissez le type qui correspond le mieux à votre projet</p>
            </div>
            <div className="grid gap-4">
              {POOL_TYPES.map(option => (
                <OptionCard 
                  key={option.id} 
                  option={option} 
                  field="poolType"
                  selected={formData.poolType === option.id}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Quelle taille de piscine ?
              </h2>
              <p className="text-gray-500">Une estimation suffit, nous affinerons ensemble</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {DIMENSIONS.map(option => (
                <OptionCard 
                  key={option.id} 
                  option={option} 
                  field="dimensions"
                  selected={formData.dimensions === option.id}
                />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Comment est votre terrain ?
              </h2>
              <p className="text-gray-500">Ces informations nous aident à préparer notre visite</p>
            </div>
            <div className="grid gap-4">
              {TERRAIN_TYPES.map(option => (
                <OptionCard 
                  key={option.id} 
                  option={option} 
                  field="terrain"
                  selected={formData.terrain === option.id}
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Quel est votre budget estimé ?
              </h2>
              <p className="text-gray-500">Nous adaptons nos propositions à votre enveloppe</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {BUDGETS.map(option => (
                <OptionCard 
                  key={option.id} 
                  option={option} 
                  field="budget"
                  selected={formData.budget === option.id}
                />
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Pour quand souhaitez-vous en profiter ?
              </h2>
              <p className="text-gray-500">Cela nous aide à planifier le chantier</p>
            </div>
            <div className="grid gap-4">
              {TIMELINES.map(option => (
                <OptionCard 
                  key={option.id} 
                  option={option} 
                  field="timeline"
                  selected={formData.timeline === option.id}
                />
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Parfait ! Comment vous contacter ?
              </h2>
              <p className="text-gray-500">Nous vous recontacterons sous 48h avec une proposition</p>
            </div>

            {/* Récapitulatif */}
            <div className="bg-secondary/5 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-3">Récapitulatif de votre projet</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-600">Service :</span>
                <span className="font-medium">{SERVICE_TYPES.find(s => s.id === formData.serviceType)?.label}</span>
                <span className="text-gray-600">Type :</span>
                <span className="font-medium">{POOL_TYPES.find(p => p.id === formData.poolType)?.label}</span>
                <span className="text-gray-600">Dimensions :</span>
                <span className="font-medium">{DIMENSIONS.find(d => d.id === formData.dimensions)?.label}</span>
                <span className="text-gray-600">Terrain :</span>
                <span className="font-medium">{TERRAIN_TYPES.find(t => t.id === formData.terrain)?.label}</span>
                <span className="text-gray-600">Budget :</span>
                <span className="font-medium">{BUDGETS.find(b => b.id === formData.budget)?.label}</span>
                <span className="text-gray-600">Délai :</span>
                <span className="font-medium">{TIMELINES.find(t => t.id === formData.timeline)?.label}</span>
              </div>
            </div>

            {/* Formulaire de contact */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    onKeyDown={handlePhoneKeyPress}
                    inputMode="numeric"
                    pattern="[0-9\s]{14}"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                    autoComplete="tel"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Format : 06 12 34 56 78 (chiffres uniquement)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="jean.dupont@email.com"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Versailles"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    onKeyDown={handleNumberKeyPress}
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="78000"
                    autoComplete="postal-code"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    5 chiffres uniquement
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Informations complémentaires (optionnel)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Décrivez votre projet, vos contraintes, vos envies..."
                />
              </div>

              {/* Status message */}
              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-800' :
                  submitStatus.type === 'error' ? 'bg-red-50 text-red-800' :
                  'bg-secondary/10 text-secondary'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transition-all duration-500 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header avec progression */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">Votre projet piscine</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Barre de progression */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 font-medium">{currentStep}/{TOTAL_STEPS}</span>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto p-6 pb-32" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {renderStepContent()}
        </div>

        {/* Footer avec navigation */}
        {currentStep < 7 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                ← Retour
              </button>
              
              {isStepValid() && (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-medium transition-all hover:scale-105"
                >
                  Continuer →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bouton retour pour l'étape 7 (finale) */}
        {currentStep === 7 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all"
              >
                ← Modifier
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid()}
                className={`
                  flex-1 py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
                  ${isSubmitting || !isStepValid()
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi...
                  </span>
                ) : (
                  'Recevoir mon devis gratuit'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteWizard;
