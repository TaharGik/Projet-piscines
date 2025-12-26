import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import AnimatedSection from '../components/AnimatedSection';

/**
 * Page Devis - Parcours de demande de devis en étapes
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
 */

const TOTAL_STEPS = 7;

// Données des options pour chaque étape
const SERVICE_TYPES = [
  { 
    id: 'conception-installation', 
    label: 'Conception et Installation', 
    icon: '🏗️',
    description: 'Créer une nouvelle piscine sur mesure',
    popular: true
  },
  { 
    id: 'renovation', 
    label: 'Rénovation de Piscine', 
    icon: '🔄',
    description: 'Rénover ou moderniser une piscine existante',
    popular: false
  },
  { 
    id: 'entretien', 
    label: 'Entretien de Piscine', 
    icon: '🧽',
    description: 'Contrat d\'entretien régulier',
    popular: false
  },
];

const POOL_TYPES = [
  { 
    id: 'beton', 
    label: 'Piscine béton', 
    icon: '🏗️',
    description: 'Sur mesure, durable, personnalisable à 100%',
    popular: true
  },
  { 
    id: 'coque', 
    label: 'Piscine coque', 
    icon: '🐚',
    description: 'Installation rapide, excellent rapport qualité-prix',
    popular: true
  },
  { 
    id: 'hors-sol', 
    label: 'Piscine hors-sol', 
    icon: '🏊',
    description: 'Économique, installation simple, démontable'
  },
  { 
    id: 'sur-mesure', 
    label: 'Projet sur-mesure', 
    icon: '✨',
    description: 'Piscine miroir, naturelle, intérieure, débordement...'
  },
];

const DIMENSIONS = [
  { id: 'small', label: 'Petite', size: '< 20 m²', dimensions: '4x4m à 5x3m', icon: '📐' },
  { id: 'medium', label: 'Moyenne', size: '20-40 m²', dimensions: '8x4m à 10x4m', icon: '📏', popular: true },
  { id: 'large', label: 'Grande', size: '40-60 m²', dimensions: '10x5m à 12x5m', icon: '📐' },
  { id: 'xlarge', label: 'Très grande', size: '> 60 m²', dimensions: '> 12x5m', icon: '🏟️' },
];

const TERRAIN_TYPES = [
  { id: 'flat-easy', label: 'Plat, accès facile', icon: '✅', description: 'Idéal pour l\'installation' },
  { id: 'flat-difficult', label: 'Plat, accès difficile', icon: '🚧', description: 'Passage étroit ou obstacles' },
  { id: 'slope-easy', label: 'En pente, accès facile', icon: '⛰️', description: 'Terrassement nécessaire' },
  { id: 'slope-difficult', label: 'En pente, accès difficile', icon: '🏔️', description: 'Étude technique requise' },
  { id: 'unknown', label: 'Je ne sais pas', icon: '❓', description: 'Nous évaluerons sur place' },
];

const BUDGETS = [
  { id: 'under15k', label: 'Moins de 15 000 €', range: '< 15k', icon: '💰' },
  { id: '15to25k', label: '15 000 - 25 000 €', range: '15-25k', icon: '💰💰' },
  { id: '25to40k', label: '25 000 - 40 000 €', range: '25-40k', icon: '💰💰💰', popular: true },
  { id: '40to70k', label: '40 000 - 70 000 €', range: '40-70k', icon: '💰💰💰💰' },
  { id: 'over70k', label: 'Plus de 70 000 €', range: '> 70k', icon: '💎' },
  { id: 'unknown', label: 'À définir ensemble', range: 'N/A', icon: '❓' },
];

const TIMELINES = [
  { id: 'urgent', label: 'Dès que possible', delay: '< 3 mois', icon: '🚀' },
  { id: 'spring', label: 'Pour le printemps', delay: '3-6 mois', icon: '🌸' },
  { id: 'summer', label: 'Pour l\'été prochain', delay: '6-12 mois', icon: '☀️', popular: true },
  { id: 'flexible', label: 'Pas de rush', delay: '> 12 mois', icon: '🕐' },
  { id: 'info', label: 'Je me renseigne', delay: 'N/A', icon: '📋' },
];

const Devis = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  
  // SEO
  useSEO({
    title: 'Demande de devis gratuit - Projet piscine',
    description: 'Obtenez votre devis gratuit en quelques étapes. BBH SERVICE vous accompagne dans votre projet de piscine sur mesure en Île-de-France.',
    keywords: 'devis piscine, devis gratuit, projet piscine, estimation piscine',
    canonicalUrl: 'https://www.bbhservice.fr/devis',
  });

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

  /**
   * Passe à l'étape suivante
   */
  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Revient à l'étape précédente
   */
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Met à jour une valeur du formulaire
   */
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    setSubmitStatus({ type: '', message: '' });

    try {
      // Préparation des données pour l'envoi
      const dataToSend = {
        ...formData,
        source: 'quote-wizard-page',
        timestamp: new Date().toISOString(),
      };

      // Appel à l'API
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre demande a été envoyée avec succès ! Nous vous contacterons sous 48h.',
        });
        setIsSuccess(true);
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
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
        hover:shadow-lg hover:scale-[1.02] hover:border-[#2FB8B3]
        ${selected 
          ? 'border-[#2FB8B3] bg-[#2FB8B3]/10 shadow-md ring-2 ring-[#2FB8B3]/30' 
          : 'border-gray-200 bg-white hover:bg-gray-50'
        }
      `}
    >
      {option.popular && (
        <span className="absolute -top-2 -right-2 bg-[#2FB8B3] text-white text-xs font-bold px-2 py-1 rounded-full">
          Populaire
        </span>
      )}
      <div className="flex items-start gap-4">
        <span className="text-3xl">{option.icon}</span>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${selected ? 'text-[#0F2A44]' : 'text-gray-900'}`}>
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
          <span className="text-[#2FB8B3] text-xl">✓</span>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
                Quel type de piscine ?
              </h2>
              <p className="text-gray-500">Choisissez le type de piscine qui vous correspond</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
                Quelle taille de bassin ?
              </h2>
              <p className="text-gray-500">Estimez la surface souhaitée</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
                Comment est votre terrain ?
              </h2>
              <p className="text-gray-500">Ces informations nous aident à préparer votre projet</p>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
                Quel est votre budget ?
              </h2>
              <p className="text-gray-500">Une estimation pour mieux vous conseiller</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
                Pour quand souhaitez-vous votre piscine ?
              </h2>
              <p className="text-gray-500">Cela nous aide à planifier votre projet</p>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-2">
                Vos coordonnées
              </h2>
              <p className="text-gray-500">Pour vous recontacter avec votre devis personnalisé</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2FB8B3] focus:border-transparent transition-all"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2FB8B3] focus:border-transparent transition-all"
                    placeholder="jean@exemple.fr"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2FB8B3] focus:border-transparent transition-all"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2FB8B3] focus:border-transparent transition-all"
                    placeholder="Versailles"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2FB8B3] focus:border-transparent transition-all"
                  placeholder="78000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message ou précisions (optionnel)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2FB8B3] focus:border-transparent transition-all resize-none"
                  placeholder="Décrivez votre projet, vos contraintes particulières..."
                />
              </div>

              {/* Message d'erreur */}
              {submitStatus.type === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {submitStatus.message}
                </div>
              )}

              {/* Bouton de soumission */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  ← Retour
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !isStepValid()}
                  className={`
                    flex-1 py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
                    ${isSubmitting || !isStepValid()
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-[#2FB8B3] hover:bg-[#269E9A] text-white shadow-lg hover:shadow-xl'
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
                    '🚀 Recevoir mon devis gratuit'
                  )}
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  // Page de succès
  if (isSuccess) {
    return (
      <>
        {/* Hero minimaliste avec dégradé */}
        <section 
          className="py-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0F2A44 50%, #0a1e30 100%)' }}
        >
          {/* Éléments décoratifs */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2FB8B3] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2FB8B3] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
          <div className="container-custom text-center relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
              Demande envoyée !
            </h1>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-2xl">
            <AnimatedSection animation="zoom-in">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F2A44] mb-4">
                  Merci pour votre demande !
                </h2>
                
                <p className="text-gray-600 text-lg mb-6">
                  Notre équipe va étudier votre projet et vous recontacter <strong>sous 48h</strong> avec une estimation personnalisée.
                </p>

                <div className="bg-[#F3F5F9] rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-[#0F2A44] mb-3">Récapitulatif de votre demande :</h3>
                  <ul className="text-left text-gray-600 space-y-2">
                    <li>• Service : <strong>{SERVICE_TYPES.find(s => s.id === formData.serviceType)?.label}</strong></li>
                    <li>• Type : <strong>{POOL_TYPES.find(p => p.id === formData.poolType)?.label}</strong></li>
                    <li>• Dimensions : <strong>{DIMENSIONS.find(d => d.id === formData.dimensions)?.label}</strong></li>
                    <li>• Budget : <strong>{BUDGETS.find(b => b.id === formData.budget)?.label}</strong></li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/" 
                    className="btn-primary"
                  >
                    Retour à l'accueil
                  </Link>
                  <Link 
                    to="/realisations" 
                    className="px-6 py-3 rounded-lg font-semibold border-2 border-[#0F2A44] text-[#0F2A44] hover:bg-[#0F2A44] hover:text-white transition-colors"
                  >
                    Voir nos réalisations
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero minimaliste avec dégradé */}
      <section 
        className="py-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0F2A44 50%, #0a1e30 100%)' }}
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#2FB8B3] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2FB8B3] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
            Votre devis gratuit en 2 minutes
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Répondez à quelques questions pour recevoir une estimation personnalisée
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="section-padding bg-[#F3F5F9]">
        <div className="container-custom max-w-3xl">
          {/* Barre de progression */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Étape {currentStep} sur {TOTAL_STEPS}
              </span>
              <span className="text-sm font-medium text-[#2FB8B3]">
                {Math.round(progressPercent)}% complété
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#2FB8B3] to-[#0F2A44] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Contenu du wizard */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <AnimatedSection animation="fade-up" key={currentStep}>
              {renderStepContent()}
            </AnimatedSection>

            {/* Navigation (sauf dernière étape qui a son propre formulaire) */}
            {currentStep < 7 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all
                    ${currentStep === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  ← Retour
                </button>

                {/* Indicateur d'étapes */}
                <div className="flex gap-2">
                  {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i + 1 === currentStep 
                          ? 'w-6 bg-[#2FB8B3]' 
                          : i + 1 < currentStep 
                            ? 'bg-[#0F2A44]' 
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all
                    ${!isStepValid()
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#2FB8B3] hover:bg-[#2FB8B3]/10'
                    }
                  `}
                >
                  Suivant →
                </button>
              </div>
            )}
          </div>

          {/* Réassurance */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>🔒 Vos données sont sécurisées et ne seront jamais partagées</p>
            <p className="mt-1">✓ Devis gratuit et sans engagement • ✓ Réponse sous 48h</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Devis;
