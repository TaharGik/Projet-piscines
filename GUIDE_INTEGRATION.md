# 🚀 Guide d'Intégration - Nouveaux Composants

## Vue d'ensemble
Ce guide vous explique comment intégrer les nouveaux composants et hooks créés dans votre application BBH SERVICE.

---

## 1. Hook useFormValidation

### 📍 Fichier : `src/hooks/useFormValidation.js`

### Intégration dans QuoteWizard (Étape 7)

**Fichier à modifier :** `src/components/QuoteWizard.jsx`

```jsx
import useFormValidation from '../hooks/useFormValidation';

// Dans le composant QuoteWizard
const QuoteWizard = ({ onComplete, onClose }) => {
  // ... code existant ...

  // Définir les règles de validation
  const validationRules = {
    name: ['required', { type: 'minLength', min: 2 }],
    email: ['required', 'email'],
    phone: ['required', 'phone'],
    city: ['required'],
    postalCode: ['postalCode'] // Optionnel mais validé si rempli
  };

  // Initialiser le hook (remplace useState pour formData)
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    getFieldState
  } = useFormValidation(
    {
      name: '',
      email: '',
      phone: '',
      city: '',
      postalCode: '',
      message: ''
    },
    validationRules
  );

  // Dans le rendu de l'étape 7 (coordonnées)
  return (
    <div>
      <label>
        Nom complet <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        className={`
          w-full px-4 py-3 border-2 rounded-lg
          ${getFieldState('name') === 'valid' ? 'border-green-500 bg-green-50' : ''}
          ${getFieldState('name') === 'error' ? 'border-red-500 bg-red-50' : ''}
          ${getFieldState('name') === 'pristine' ? 'border-gray-300' : ''}
        `}
        placeholder="Jean Dupont"
      />
      {errors.name && touched.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
      )}

      {/* Répéter pour email, phone, city, postalCode */}
    </div>
  );
};
```

### Intégration dans ContactFormSecure

**Fichier à modifier :** `src/components/ContactFormSecure.jsx`

```jsx
import useFormValidation from '../hooks/useFormValidation';

const ContactFormSecure = () => {
  const validationRules = {
    name: ['required'],
    email: ['required', 'email'],
    phone: ['phone'],
    message: ['required', { type: 'minLength', min: 10 }]
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset
  } = useFormValidation(
    { name: '', email: '', phone: '', message: '' },
    validationRules
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valider tous les champs avant l'envoi
    if (!validateAll()) {
      return; // Arrêter si validation échoue
    }

    // Envoyer le formulaire
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        reset(); // Réinitialiser le formulaire
        // Afficher message de succès
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champs avec validation */}
    </form>
  );
};
```

---

## 2. Composant ProjectFilters

### 📍 Fichier : `src/components/ProjectFilters.jsx`

### Intégration dans la page Projects

**Fichier à modifier :** `src/pages/Projects.jsx`

```jsx
import { useState } from 'react';
import ProjectFilters from '../components/ProjectFilters';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filtrer les projets selon le filtre actif
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    
    return project.tags?.some(tag => 
      tag.toLowerCase().includes(activeFilter) ||
      project.type?.toLowerCase().includes(activeFilter)
    );
  });

  return (
    <div className="container-custom py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
        Nos Réalisations
      </h1>

      {/* Composant de filtres */}
      <ProjectFilters 
        projects={projects}
        onFilterChange={setActiveFilter}
      />

      {/* Grille de projets filtrés */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucun projet ne correspond à ce filtre.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
```

### Animation des résultats filtrés (optionnel)

Ajouter une animation fade-in lors du changement de filtre :

```jsx
import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFilterChange = (filterId) => {
    setIsAnimating(true);
    setActiveFilter(filterId);
    
    // Réactiver l'animation après un court délai
    setTimeout(() => setIsAnimating(false), 50);
  };

  return (
    <div>
      <ProjectFilters 
        projects={projects}
        onFilterChange={handleFilterChange}
      />

      <div 
        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {filteredProjects.map(project => (
          <AnimatedSection key={project.id} animation="fadeInUp" delay={0.1}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};
```

---

## 3. Styles CSS à vérifier

Assurez-vous que ces classes sont bien dans `src/index.css` :

```css
/* Scrollbar hide pour les filtres mobiles */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Scale au hover */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.10);
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 4. Tests Recommandés

### Test du hook de validation

```jsx
// Dans un fichier de test ou directement dans la console
import useFormValidation from './hooks/useFormValidation';

// Test 1 : Validation email
const rules = { email: ['required', 'email'] };
const { handleChange, errors } = useFormValidation({ email: '' }, rules);

handleChange('email', 'test@test.com'); // Devrait être valide
handleChange('email', 'invalid'); // Devrait afficher une erreur

// Test 2 : Formatage téléphone
const phoneRules = { phone: ['phone'] };
const { values } = useFormValidation({ phone: '' }, phoneRules);

handleChange('phone', '0612345678'); // Devrait formater en "06 12 34 56 78"
```

### Test des filtres

```jsx
// Vérifier que chaque filtre retourne les bons projets
const testFilters = () => {
  console.log('Projets béton:', projects.filter(p => 
    p.tags?.some(t => t.toLowerCase().includes('beton'))
  ).length);
  
  console.log('Projets coque:', projects.filter(p => 
    p.tags?.some(t => t.toLowerCase().includes('coque'))
  ).length);
};
```

---

## 5. Migration Progressive

### Étape 1 : Tester en local
1. Intégrer `useFormValidation` dans un seul formulaire
2. Vérifier que la validation fonctionne
3. Tester sur mobile

### Étape 2 : Déployer ProjectFilters
1. Ajouter le composant à la page Projects
2. Vérifier les animations
3. Tester le responsive

### Étape 3 : Généraliser
1. Utiliser `useFormValidation` partout
2. Documenter les patterns d'utilisation
3. Former l'équipe

---

## 6. Troubleshooting

### Le hook ne valide pas
```jsx
// Vérifier que les règles sont bien passées
console.log('Rules:', validationRules);
console.log('Values:', values);
console.log('Errors:', errors);
```

### Les filtres ne fonctionnent pas
```jsx
// Vérifier la structure des tags dans projects.js
console.log('Tags projet 1:', projects[0].tags);

// S'assurer que les tags contiennent bien les mots-clés
// Exemple : ['béton', 'sur-mesure', 'moderne']
```

### Les animations ne se déclenchent pas
```css
/* Vérifier que les keyframes sont bien définies */
@keyframes menuSlideIn { /* ... */ }
@keyframes fadeInUp { /* ... */ }
```

---

## 7. Checklist d'Intégration

- [ ] Hook `useFormValidation` importé
- [ ] Règles de validation définies
- [ ] Champs connectés avec handleChange/handleBlur
- [ ] Messages d'erreur affichés
- [ ] Formatage automatique vérifié
- [ ] `ProjectFilters` ajouté à Projects.jsx
- [ ] State `activeFilter` créé
- [ ] Logique de filtrage implémentée
- [ ] Animations testées sur mobile
- [ ] Tests sur différents navigateurs
- [ ] Performance vérifiée

---

**Besoin d'aide ?** Consultez [OPTIMISATIONS_UX_UI.md](./OPTIMISATIONS_UX_UI.md) pour plus de détails.
