# 🧙‍♂️ Wizard Devis Intelligent - Documentation

## Vue d'ensemble

Le wizard de devis (`/devis`) adapte automatiquement son parcours selon le **service choisi** à l'étape 1, offrant une qualification optimale pour chaque type de demande.

---

## 📊 Flux par Service

### 🏊 Conception & Installation (7 étapes)

**Objectif :** Qualifier un projet de piscine neuve de A à Z

| Étape | Question | Options | Champ |
|-------|----------|---------|-------|
| 1 | Type de service | Conception/Rénovation/Entretien/Gazon | `serviceType` |
| 2 | Type de piscine | Béton/Coque/Hors-sol/Sur-mesure | `poolType` |
| 3 | Dimensions | Petite/Moyenne/Grande/Très grande | `dimensions` |
| 4 | Terrain | Plat facile/Plat difficile/Pente/Je ne sais pas | `terrain` |
| 5 | Budget | < 15k / 15-25k / 25-40k / 40-70k / > 70k / À définir | `budget` |
| 6 | Délai | Urgent / Printemps / Été / Flexible / Info | `timeline` |
| 7 | Coordonnées | Nom, Email, Téléphone, Ville, Code postal, Message | `name, email, phone, city, postalCode, message` |

---

### 🔧 Rénovation de Piscine (6 étapes)

**Objectif :** Comprendre l'existant et le besoin de rénovation

| Étape | Question | Options | Champ |
|-------|----------|---------|-------|
| 1 | Type de service | Conception/Rénovation/Entretien/Gazon | `serviceType` |
| 2 | Type piscine existante | Béton/Coque/Hors-sol/Sur-mesure | `existingPoolType` |
| 3 | Problème/Besoin | Liner/Filtration/Fuite/Carrelage/Sécurité/Esthétique/Structure | `renovationProblem` |
| 4 | Urgence | Urgent/Sous 1 mois/Sous 3 mois/Flexible | `renovationUrgency` |
| 5 | Budget | < 15k / 15-25k / 25-40k / 40-70k / > 70k / À définir | `budget` |
| 6 | Coordonnées | Nom, Email, Téléphone, Ville, Code postal, Message | `name, email, phone, city, postalCode, message` |

**Avantages :**
- ❌ Pas de questions sur dimensions/terrain (non pertinentes pour la rénov)
- ✅ Focus sur le problème à résoudre
- ✅ Qualification de l'urgence
- ⚡ **Plus court = meilleure conversion**

---

### 🧹 Entretien de Piscine (5 étapes)

**Objectif :** Qualifier le contrat d'entretien

| Étape | Question | Options | Champ |
|-------|----------|---------|-------|
| 1 | Type de service | Conception/Rénovation/Entretien/Gazon | `serviceType` |
| 2 | Type d'intervention | Contrat régulier/Ponctuel/Hivernage/Remise en route/Dépannage | `entretienType` |
| 3 | Fréquence | 1x/semaine / 2x/mois / 1x/mois / Saison uniquement | `entretienFrequency` |
| 4 | Délai de démarrage | Urgent / Printemps / Été / Flexible / Info | `timeline` |
| 5 | Coordonnées | Nom, Email, Téléphone, Ville, Code postal, Message | `name, email, phone, city, postalCode, message` |

**Avantages :**
- ❌ Pas de type piscine, dimensions, terrain, budget (friction inutile)
- ✅ Questions ciblées : type + fréquence + quand
- ⚡ **Parcours ultra-court = conversion maximale**

---

### 🌱 Installation de Gazon (6 étapes)

**Objectif :** Qualifier l'aménagement paysager

| Étape | Question | Options | Champ |
|-------|----------|---------|-------|
| 1 | Type de service | Conception/Rénovation/Entretien/Gazon | `serviceType` |
| 2 | Type de gazon | Naturel/Synthétique/Mix/Conseil | `gazonType` |
| 3 | Surface | < 50m² / 50-150m² / 150-300m² / > 300m² | `gazonSurface` |
| 4 | État terrain | Prêt / Dépose ancien / Nivellement / Préparation complète | `gazonTerrain` |
| 5 | Délai | Urgent / Printemps / Été / Flexible / Info | `timeline` |
| 6 | Coordonnées | Nom, Email, Téléphone, Ville, Code postal, Message | `name, email, phone, city, postalCode, message` |

**Avantages :**
- ❌ Pas de "type de piscine" (hors-sujet)
- ✅ Questions spécifiques gazon : type, surface, préparation
- ✅ Adaptée au métier aménagement paysager

---

## 🎯 Bénéfices du Wizard Intelligent

### Pour l'utilisateur
- ✅ **Parcours plus court** selon le besoin (5-7 étapes au lieu de 7 fixes)
- ✅ **Questions pertinentes** uniquement
- ✅ **Moins de friction** = meilleure expérience
- ✅ **Clarté** : on ne demande que ce qui sert

### Pour l'entreprise
- ✅ **Meilleure qualification** : données ciblées par service
- ✅ **Taux de conversion** : moins d'abandon grâce à des tunnels courts
- ✅ **Efficacité commerciale** : devis mieux qualifiés
- ✅ **Données structurées** : facilite le traitement backend

---

## 🛠️ Architecture Technique

### Structure des données

```javascript
// État formulaire adaptatif
const [formData, setFormData] = useState({
  serviceType: '',
  // Conception/Installation
  poolType: '',
  dimensions: '',
  terrain: '',
  budget: '',
  timeline: '',
  // Rénovation
  existingPoolType: '',
  renovationProblem: '',
  renovationUrgency: '',
  // Entretien
  entretienType: '',
  entretienFrequency: '',
  // Gazon
  gazonType: '',
  gazonSurface: '',
  gazonTerrain: '',
  // Coordonnées communes
  name: '',
  email: '',
  phone: '',
  city: '',
  postalCode: '',
  message: '',
});
```

### Calcul dynamique des étapes

```javascript
const getTotalSteps = () => {
  switch (formData.serviceType) {
    case 'conception-installation': return 7;
    case 'renovation': return 6;
    case 'entretien': return 5;
    case 'installation-gazon': return 6;
    default: return 7;
  }
};
```

### Validation conditionnelle

```javascript
const isStepValid = () => {
  const service = formData.serviceType;
  
  if (currentStep === 1) return service !== '';
  
  switch (service) {
    case 'conception-installation':
      if (currentStep === 2) return formData.poolType !== '';
      if (currentStep === 3) return formData.dimensions !== '';
      // ...
      break;
    
    case 'renovation':
      if (currentStep === 2) return formData.existingPoolType !== '';
      if (currentStep === 3) return formData.renovationProblem !== '';
      // ...
      break;
    // ...
  }
};
```

### Rendu conditionnel

```javascript
const renderStepContent = () => {
  const service = formData.serviceType;

  // Étape 1 : commune à tous
  if (currentStep === 1) {
    return <ServiceSelection />;
  }

  // Flux Conception
  if (service === 'conception-installation') {
    if (currentStep === 2) return <PoolTypeSelection />;
    if (currentStep === 3) return <DimensionsSelection />;
    // ...
  }

  // Flux Rénovation
  if (service === 'renovation') {
    if (currentStep === 2) return <ExistingPoolTypeSelection />;
    if (currentStep === 3) return <ProblemSelection />;
    // ...
  }

  // Coordonnées (dernière étape de chaque flux)
  const isLastStep = currentStep === TOTAL_STEPS;
  if (isLastStep) return <ContactForm />;
};
```

---

## 📝 Nouvelles Constantes

### Rénovation
```javascript
const RENOVATION_PROBLEMS = [
  { id: 'liner', label: 'Remplacement liner' },
  { id: 'filtration', label: 'Système de filtration', popular: true },
  { id: 'fuite', label: 'Fuite / Étanchéité' },
  { id: 'carrelage', label: 'Carrelage / Revêtement' },
  { id: 'securite', label: 'Mise aux normes sécurité' },
  { id: 'esthetique', label: 'Modernisation esthétique' },
  { id: 'structure', label: 'Structure / Maçonnerie' },
];

const RENOVATION_URGENCY = [
  { id: 'urgent', label: 'Urgent', popular: true },
  { id: '1month', label: 'Sous 1 mois' },
  { id: '3months', label: 'Sous 3 mois' },
  { id: 'flexible', label: 'Pas d\'urgence' },
];
```

### Entretien
```javascript
const ENTRETIEN_TYPES = [
  { id: 'contrat-regulier', label: 'Contrat d\'entretien régulier', popular: true },
  { id: 'ponctuel', label: 'Intervention ponctuelle' },
  { id: 'hivernage', label: 'Hivernage' },
  { id: 'remise-route', label: 'Remise en route' },
  { id: 'depannage', label: 'Dépannage urgent' },
];

const ENTRETIEN_FREQUENCY = [
  { id: '1week', label: '1 fois par semaine', popular: true },
  { id: '2weeks', label: 'Toutes les 2 semaines' },
  { id: '1month', label: '1 fois par mois' },
  { id: 'saison', label: 'Saison uniquement' },
];
```

### Gazon
```javascript
const GAZON_TYPES = [
  { id: 'naturel', label: 'Gazon naturel en plaques', popular: true },
  { id: 'synthetique', label: 'Gazon synthétique' },
  { id: 'mix', label: 'Mix (selon zones)' },
  { id: 'conseil', label: 'Je ne sais pas' },
];

const GAZON_SURFACE = [
  { id: 'small', label: 'Petite surface', size: '< 50 m²' },
  { id: 'medium', label: 'Surface moyenne', size: '50 - 150 m²', popular: true },
  { id: 'large', label: 'Grande surface', size: '150 - 300 m²' },
  { id: 'xlarge', label: 'Très grande surface', size: '> 300 m²' },
];

const GAZON_TERRAIN = [
  { id: 'clean', label: 'Terrain prêt' },
  { id: 'depose', label: 'Dépose ancien gazon', popular: true },
  { id: 'nivellement', label: 'Nivellement requis' },
  { id: 'complet', label: 'Préparation complète' },
];
```

---

## ✅ Tests Recommandés

### Parcours Conception
1. Choisir "Conception et Installation"
2. Vérifier 7 étapes affichées
3. Compléter : Béton > Moyenne > Plat facile > 25-40k > Été > Coordonnées
4. Valider l'envoi

### Parcours Rénovation
1. Choisir "Rénovation"
2. Vérifier 6 étapes affichées
3. Compléter : Coque > Filtration > Urgent > 15-25k > Coordonnées
4. Vérifier que dimensions/terrain ne sont PAS demandées

### Parcours Entretien
1. Choisir "Entretien"
2. Vérifier 5 étapes affichées
3. Compléter : Contrat régulier > 1x/semaine > Printemps > Coordonnées
4. Vérifier que type piscine/budget ne sont PAS demandées

### Parcours Gazon
1. Choisir "Installation de Gazon"
2. Vérifier 6 étapes affichées
3. Compléter : Synthétique > 50-150m² > Dépose > Été > Coordonnées
4. Vérifier que "type de piscine" ne sort PAS

---

## 🚀 Évolutions Futures

### Court terme
- [ ] Ajouter conditions d'affichage du budget selon urgence (rénov)
- [ ] Question "autour piscine oui/non" pour flux gazon
- [ ] Récapitulatif adaptatif selon service

### Moyen terme
- [ ] Estimation budget automatique (conception)
- [ ] Upload photo pour rénovation
- [ ] Calendrier interactif pour entretien

### Long terme
- [ ] IA pour suggestion type piscine selon terrain
- [ ] Configurateur 3D piscine
- [ ] Chatbot qualification automatique

---

**Wizard intelligent opérationnel** ✅  
**4 parcours optimisés** ✅  
**Meilleure conversion attendue** ✅
