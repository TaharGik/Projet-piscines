# Configuration Sentry - Monitoring d'erreurs en production

## 🎯 Objectif

Sentry permet de :
- **Capturer automatiquement** toutes les erreurs JavaScript non gérées
- **Monitorer les performances** avec des traces de transactions
- **Enregistrer les sessions** des utilisateurs ayant rencontré une erreur (replay)
- **Recevoir des alertes** en temps réel par email/Slack
- **Analyser les erreurs** avec contexte complet (navigateur, OS, breadcrumbs)

## 📦 Installation

### 1. Installer le package Sentry

```bash
npm install @sentry/react
```

### 2. Créer un compte Sentry

1. Aller sur [sentry.io](https://sentry.io)
2. Créer un compte gratuit (10 000 erreurs/mois)
3. Créer un nouveau projet **React**
4. Copier le **DSN** fourni (format : `https://xxx@yyy.ingest.sentry.io/zzz`)

### 3. Configurer les variables d'environnement

**Fichier `.env` (local) :**
```env
VITE_SENTRY_DSN=https://your-actual-dsn@sentry.io/project-id
VITE_SENTRY_ENVIRONMENT=development
```

**Vercel (production) :**
1. Aller dans Settings > Environment Variables
2. Ajouter :
   - `VITE_SENTRY_DSN` = votre DSN Sentry
   - `VITE_SENTRY_ENVIRONMENT` = `production`

⚠️ **Important** : Le DSN peut être exposé côté client, c'est normal. La sécurité est gérée par les **Inbound Filters** de Sentry.

## 🚀 Utilisation

### Monitoring automatique

Une fois configuré, Sentry capture automatiquement :
- ✅ Erreurs non gérées (throw, Promise rejection)
- ✅ Erreurs React (componentDidCatch, Error Boundaries)
- ✅ Erreurs réseau (fetch, XHR)
- ✅ Erreurs de performance

### Capture manuelle d'erreurs

```javascript
import { captureError, captureMessage, addBreadcrumb } from '@/utils/sentry';

// Capturer une erreur avec contexte
try {
  // Code risqué
} catch (error) {
  captureError(error, {
    component: 'ContactForm',
    userId: user.id,
    formData: { hasEmail: true }
  });
}

// Message informatif
captureMessage('Opération critique réussie', 'info');

// Ajouter un breadcrumb (trace navigation)
addBreadcrumb('Validation formulaire', { step: 2 });
```

### Logger intégré

Le logger existant est déjà intégré avec Sentry :

```javascript
import logger from '@/utils/logger';

// En production : loggué + envoyé à Sentry
logger.error('Erreur critique', { context: 'additional data' });

// En production : envoyé à Sentry avec niveau warning
logger.warn('Avertissement important');

// Seulement en développement
logger.log('Debug info');
```

### Error Boundary React

Utiliser le ErrorBoundary de Sentry pour capturer les erreurs de rendu React :

```jsx
import { ErrorBoundary } from '@/utils/sentry';

function App() {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      showDialog={false}
    >
      <YourApp />
    </ErrorBoundary>
  );
}

function ErrorFallback({ error, resetError }) {
  return (
    <div>
      <h1>Une erreur est survenue</h1>
      <p>{error.message}</p>
      <button onClick={resetError}>Réessayer</button>
    </div>
  );
}
```

### Monitoring de performances

```javascript
import { withTransaction } from '@/utils/sentry';

// Tracer une opération longue
const result = await withTransaction(
  'load-projects',
  async () => {
    const response = await fetch('/api/projects');
    return response.json();
  },
  'http.request'
);
```

## ⚙️ Configuration avancée

### Filtrer les erreurs

Le fichier [src/utils/sentry.js](src/utils/sentry.js) contient déjà des filtres pour ignorer :
- ❌ Erreurs CORS (hors de notre contrôle)
- ❌ Erreurs de loading chunks (rafraîchir la page)
- ❌ Erreurs réseau temporaires
- ❌ Erreurs d'extensions navigateur

Ajouter d'autres filtres dans `beforeSend()` :

```javascript
beforeSend(event, hint) {
  // Ignorer erreurs spécifiques
  if (event.exception?.values?.[0]?.value?.includes('Custom error to ignore')) {
    return null;
  }
  return event;
}
```

### Masquer données sensibles

Les données sensibles sont déjà masquées :
- 🔒 Mots de passe, emails, tokens dans les breadcrumbs
- 🔒 Cookies de session
- 🔒 Headers d'authentification

Configuration dans `beforeBreadcrumb()` de [sentry.js](src/utils/sentry.js).

### Taux d'échantillonnage

Par défaut :
- **Production** : 10% des transactions (performances)
- **Development** : 100% des transactions

Modifier dans `tracesSampleRate` :

```javascript
tracesSampleRate: isProduction ? 0.1 : 1.0, // 10% en prod, 100% en dev
```

### Session Replay

Enregistre une vidéo de la session utilisateur quand une erreur survient :
- **Seulement en production**
- **Seulement pour 10% des sessions avec erreur**
- **Masque automatiquement** les inputs sensibles (password, email, etc.)

Désactiver si nécessaire :

```javascript
// Dans sentry.js
replaysSessionSampleRate: 0, // Désactiver replay
```

## 📊 Dashboard Sentry

### Issues

Liste toutes les erreurs avec :
- Nombre d'occurrences
- Utilisateurs affectés
- Dernière occurrence
- Stack trace complète
- Breadcrumbs (actions avant l'erreur)
- Contexte navigateur/OS

### Performance

Analyse les performances :
- Temps de chargement des pages
- Latence des API
- Opérations lentes
- Goulots d'étranglement

### Releases

Associer les erreurs à une version du code :
```bash
# À chaque déploiement
npx sentry-cli releases new $(git rev-parse HEAD)
npx sentry-cli releases finalize $(git rev-parse HEAD)
```

### Alertes

Configurer des alertes :
1. Settings > Alerts > Create Alert Rule
2. Choisir conditions (ex: plus de 10 erreurs en 5min)
3. Choisir canaux (email, Slack, PagerDuty)

## 🧪 Tester l'intégration

### En développement

```javascript
// Dans la console navigateur
throw new Error('Test Sentry integration');

// Ou via logger
import logger from '@/utils/logger';
logger.error('Test error', { test: true });
```

### En production

1. Déployer avec `VITE_SENTRY_DSN` configuré
2. Provoquer une erreur (ex: cliquer sur un lien cassé)
3. Vérifier dans Sentry dashboard (délai ~30 secondes)

## 📋 Checklist déploiement

- [ ] Package `@sentry/react` installé
- [ ] Compte Sentry créé
- [ ] DSN copié dans variables d'environnement Vercel
- [ ] Variable `VITE_SENTRY_ENVIRONMENT=production` définie
- [ ] Test d'une erreur en production
- [ ] Alerte email configurée
- [ ] Données sensibles bien masquées

## 🔗 Liens utiles

- [Documentation Sentry React](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Dashboard Sentry](https://sentry.io/organizations/)
- [Best practices](https://docs.sentry.io/platforms/javascript/best-practices/)

## 💡 Tips

1. **Ne pas spammer Sentry** : utiliser `logger.log()` pour debug simple, `logger.error()` pour erreurs critiques
2. **Contexte enrichi** : toujours passer du contexte avec `captureError(error, { context })`
3. **Releases** : utiliser les releases pour associer erreurs aux versions
4. **Quotas** : plan gratuit = 10k erreurs/mois, après ça drop
5. **Privacy** : vérifier que pas de données sensibles dans les breadcrumbs

## 🆘 Désactiver Sentry

Si besoin de désactiver temporairement :

**Option 1** : Supprimer la variable d'environnement
```bash
# Vercel > Settings > Environment Variables
# Supprimer VITE_SENTRY_DSN
```

**Option 2** : Mettre DSN vide
```env
VITE_SENTRY_DSN=
```

Le code détecte automatiquement l'absence de DSN et désactive Sentry.
