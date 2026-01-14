# 🚀 Installation & Démarrage - BBH SERVICE

## 📋 Prérequis

- **Node.js** : version 18.x ou supérieure
- **npm** : version 9.x ou supérieure
- **Git** : pour cloner le repository

Vérifier les versions installées :
```bash
node --version  # v18.x ou plus
npm --version   # v9.x ou plus
```

---

## 🔧 Installation Initiale

### 1. Cloner le projet

```bash
git clone <url-du-repository>
cd piscines-idf
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Installer Sentry (Monitoring)

⚠️ **IMPORTANT** : Sentry n'est pas dans les dépendances par défaut. Vous devez l'installer manuellement :

```bash
npm install @sentry/react
```

> **Note** : Sentry est optionnel. Si vous ne l'installez pas, le site fonctionnera normalement mais sans monitoring d'erreurs en production.

### 4. Configurer les variables d'environnement

Copier le fichier d'exemple :
```bash
cp .env.example .env
```

Éditer `.env` et remplir les valeurs réelles :

```env
# BREVO - Service d'emails
VITE_BREVO_API_KEY=xkeysib-votre-vraie-clé-api
BREVO_API_KEY=xkeysib-votre-vraie-clé-api
CONTACT_EMAIL=bbhservice25@gmail.com

# HCAPTCHA - Anti-spam
VITE_HCAPTCHA_SITEKEY=votre-site-key
VITE_HCAPTCHA_SECRET=votre-secret-key

# GOOGLE ANALYTICS
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# SENTRY - Monitoring (optionnel)
VITE_SENTRY_DSN=https://votre-dsn@sentry.io/projet
VITE_SENTRY_ENVIRONMENT=development
```

> **Où obtenir ces clés ?**
> - **Brevo** : [app.brevo.com](https://app.brevo.com/settings/keys/api)
> - **hCaptcha** : [dashboard.hcaptcha.com](https://dashboard.hcaptcha.com/)
> - **Google Analytics** : [analytics.google.com](https://analytics.google.com/)
> - **Sentry** : [sentry.io](https://sentry.io/signup/)

### 5. Vérifier l'installation

```bash
npm run dev
```

Le site devrait s'ouvrir sur `http://localhost:5173/`

---

## 🏃‍♂️ Commandes Disponibles

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# Le site sera accessible sur http://localhost:5173/
# Hot reload activé (modifications en temps réel)
```

### Build Production

```bash
# Créer le build optimisé
npm run build

# Les fichiers optimisés seront dans ./dist/
```

### Preview Production

```bash
# Prévisualiser le build de production en local
npm run preview

# Le site sera accessible sur http://localhost:4173/
```

### Linting

```bash
# Vérifier les erreurs de code
npm run lint

# Le linter vérifie :
# - Syntaxe JavaScript/React
# - Bonnes pratiques React (hooks, props)
# - Problèmes potentiels
```

### Optimisation d'images (si besoin)

```bash
# Optimiser les images du dossier public/images/
node scripts/optimize-images.js
```

---

## 📁 Structure du Projet

```
piscines-idf/
├── public/                # Fichiers statiques (images, sitemap, robots.txt)
│   ├── images/
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── components/        # Composants React réutilisables
│   ├── pages/             # Pages de l'application
│   ├── hooks/             # Hooks personnalisés
│   ├── context/           # Context API (état global)
│   ├── utils/             # Utilitaires (logger, formatters, constants, etc.)
│   ├── data/              # Données statiques (services, projets, témoignages)
│   ├── styles/            # Styles globaux
│   ├── App.jsx            # Composant racine + routes
│   └── main.jsx           # Point d'entrée React
├── api/                   # Serverless Functions (Vercel)
│   └── quote.js           # API formulaire de contact
├── docs/                  # Documentation
│   ├── GUIDE_SENTRY.md
│   └── ...
├── .env.example           # Template variables d'environnement
├── package.json           # Dépendances et scripts
├── vite.config.js         # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind CSS
└── README_INSTALL.md      # Ce fichier
```

---

## 🔐 Sécurité

### Fichiers à NE JAMAIS commiter

Le fichier `.gitignore` protège déjà ces fichiers :

```gitignore
.env              # Variables d'environnement (SECRETS)
.env.local
.env.production
node_modules/     # Dépendances (npm install)
dist/             # Build (npm run build)
```

### Bonnes pratiques

1. **Ne jamais commiter** le fichier `.env`
2. **Toujours préfixer** les variables client par `VITE_`
3. **Ne jamais exposer** les secrets serveur (HCAPTCHA_SECRET, BREVO_API_KEY) côté client
4. **Régénérer les clés** si elles sont compromises

---

## 🌐 Déploiement Vercel

### Déploiement Automatique

Le projet est configuré pour Vercel. Chaque push sur `main` déploie automatiquement.

### Configuration Vercel

1. **Importer le projet** sur [vercel.com](https://vercel.com)

2. **Configurer les variables d'environnement** :
   - Aller dans Settings > Environment Variables
   - Ajouter toutes les variables du fichier `.env.example`
   - Sélectionner environnement : `Production`, `Preview`, `Development`

3. **Configurer le domaine** :
   - Aller dans Settings > Domains
   - Ajouter votre domaine personnalisé

### Fonctionnalités Vercel Utilisées

- ✅ **Serverless Functions** : API route `/api/quote`
- ✅ **Vercel KV** : Rate limiting (Redis)
- ✅ **Speed Insights** : Monitoring des performances
- ✅ **Analytics** : Statistiques de traffic

---

## 🐛 Dépannage

### Problème : `npm install` échoue

**Solution** : Nettoyer le cache npm
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problème : Port 5173 déjà utilisé

**Solution** : Changer le port dans `vite.config.js`
```javascript
export default defineConfig({
  server: {
    port: 3000, // Changer ici
  },
});
```

Ou tuer le processus :
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Problème : Variables d'environnement non reconnues

**Solution** : Redémarrer le serveur de dev
```bash
# CTRL+C pour arrêter
npm run dev  # Relancer
```

> Les variables VITE_ sont injectées au build time, pas au runtime.

### Problème : Erreur "Module not found: @sentry/react"

**Solution** : Installer Sentry
```bash
npm install @sentry/react
```

Ou désactiver Sentry en supprimant `VITE_SENTRY_DSN` du fichier `.env`.

### Problème : Formulaire de contact ne fonctionne pas

**Vérifications** :
1. Variables Brevo configurées ? (`VITE_BREVO_API_KEY`)
2. Variables hCaptcha configurées ? (`VITE_HCAPTCHA_SITEKEY`)
3. CORS autorisé dans Brevo ?
4. Rate limit Vercel KV actif ? (seulement en production)

Tester en local sans rate limiting :
```javascript
// Dans api/quote.js, commenter temporairement :
// const rateLimitResult = await checkRateLimit(clientIp);
```

---

## 📊 Monitoring & Analytics

### Google Analytics

Une fois `VITE_GA_MEASUREMENT_ID` configuré :
- Tracking automatique des pages
- Événements personnalisés (clics, soumissions formulaires)

Dashboard : [analytics.google.com](https://analytics.google.com/)

### Sentry (Erreurs)

Une fois installé et configuré :
- Capture automatique des erreurs
- Stack traces complètes
- Contexte utilisateur (navigateur, OS, actions)

Dashboard : [sentry.io](https://sentry.io/)

Voir documentation complète : [docs/GUIDE_SENTRY.md](docs/GUIDE_SENTRY.md)

### Vercel Analytics

Activé automatiquement en production :
- Core Web Vitals
- Temps de chargement
- Performances par page

Dashboard : Vercel > Votre projet > Analytics

---

## 🧪 Tests

### Tests Manuels (Phase 1)

Checklist complète dans [PHASE1_CORRECTIONS.md](PHASE1_CORRECTIONS.md)

### Tests Automatisés (À venir - Phase 2)

Framework prévu : **Vitest** + **React Testing Library**

```bash
# Commandes futures
npm run test           # Lancer les tests
npm run test:watch     # Mode watch
npm run test:coverage  # Rapport de couverture
```

---

## 📚 Documentation Complémentaire

- [PHASE1_CORRECTIONS.md](PHASE1_CORRECTIONS.md) - Corrections urgentes effectuées
- [RECAP.md](RECAP.md) - Récapitulatif complet du projet
- [docs/GUIDE_SENTRY.md](docs/GUIDE_SENTRY.md) - Configuration Sentry
- [docs/CAHIER_DES_CHARGES.md](docs/CAHIER_DES_CHARGES.md) - Spécifications projet
- [TROUBLESHOOTING_VERCEL.md](TROUBLESHOOTING_VERCEL.md) - Résolution problèmes Vercel

---

## 💡 Tips Développement

### Vite Hot Reload

Vite recharge automatiquement lors de modifications :
- ✅ Composants React
- ✅ Styles CSS/Tailwind
- ✅ Configuration Vite
- ❌ Variables d'environnement (redémarrer required)

### Tailwind IntelliSense

Installer l'extension VSCode :
- `Tailwind CSS IntelliSense` par Tailwind Labs
- Autocomplétion classes Tailwind
- Preview couleurs et espacements

### React DevTools

Installer extension navigateur :
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Firefox](https://addons.mozilla.org/fr/firefox/addon/react-devtools/)

Permet d'inspecter :
- Composants React
- Props et State
- Context
- Profiler performances

---

## 🆘 Support

En cas de problème :
1. Consulter [TROUBLESHOOTING_VERCEL.md](TROUBLESHOOTING_VERCEL.md)
2. Vérifier les logs : `npm run dev` (messages d'erreur détaillés)
3. Vérifier les variables d'environnement
4. Nettoyer et réinstaller : `rm -rf node_modules && npm install`

---

## ✅ Checklist Premier Lancement

- [ ] Node.js 18+ installé
- [ ] Repository cloné
- [ ] `npm install` exécuté
- [ ] `npm install @sentry/react` exécuté (optionnel)
- [ ] Fichier `.env` créé et rempli
- [ ] `npm run dev` fonctionne
- [ ] Site accessible sur localhost:5173
- [ ] Formulaire de contact testé (avec vraies clés Brevo/hCaptcha)
- [ ] Pas d'erreurs dans la console

**Prêt à développer ! 🎉**
