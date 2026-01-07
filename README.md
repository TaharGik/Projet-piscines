# 🏊 BBH SERVICE - Site Vitrine Piscines

Site web professionnel pour un pisciniste spécialisé dans la conception et la réalisation de piscines sur mesure en Île-de-France.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table des Matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#️-technologies)
- [Installation](#-installation)
- [Commandes](#-commandes)
- [Configuration](#️-configuration)
- [Déploiement](#-déploiement)
- [Documentation](#-documentation)
- [License](#-license)

---

## 🎯 À Propos

**BBH SERVICE** est un site vitrine moderne conçu pour présenter les services d'une entreprise de construction de piscines haut de gamme en région parisienne.

### Objectifs

- Présenter l'expertise et les réalisations de l'entreprise
- Générer des leads via un formulaire de contact
- Rassurer les prospects avec des garanties et témoignages
- Optimiser le référencement local (SEO)

### Public Cible

Propriétaires de maisons individuelles en Île-de-France recherchant des piscines sur mesure (budget : 30 000€ - 150 000€+).

---

## ✨ Fonctionnalités

### Pages

- 🏠 **Accueil** - Hero, services, réalisations, témoignages
- ℹ️ **À propos** - Histoire, valeurs, équipe
- 🛠️ **Services** - Liste détaillée des prestations
- 📸 **Réalisations** - Portfolio de projets avec filtres
- 🔍 **Détail Projet** - Pages individuelles avec galerie photos
- ❓ **FAQ** - Questions fréquentes en accordéon
- 📧 **Contact** - Formulaire de demande de devis
- 💰 **Devis** - Assistant de devis interactif (QuoteWizard)
- 📜 **Mentions Légales** - Informations légales
- 🔒 **Confidentialité** - Politique de confidentialité
- ❌ **404** - Page d'erreur personnalisée

### Fonctionnalités Techniques

- ✅ Single Page Application (SPA) avec React Router
- ✅ Design responsive (mobile-first) avec optimisations complètes
- ✅ Animations au scroll et effets visuels harmonisés
- ✅ Formulaire de contact sécurisé (HCaptcha + Brevo)
- ✅ Assistant de devis interactif multi-étapes (QuoteWizard)
- ✅ Carrousel d'images interactif et modales de projets
- ✅ Loader personnalisé avec animation d'entrée
- ✅ SEO optimisé (meta tags dynamiques, hooks personnalisés)
- ✅ Google Analytics 4 intégré avec tracking des événements
- ✅ Performance optimisée (code splitting, lazy loading)
- ✅ Sécurité renforcée (protection XSS, rate limiting, validation serveur)
- ✅ API serverless pour le traitement sécurisé des formulaires
- ✅ Badges de confiance et éléments de réassurance
- ✅ Bouton scroll-to-top avec détection de scroll
- ✅ Animations de succès pour les interactions utilisateur

---

## 🛠️ Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 19.x | Framework JavaScript |
| **Vite** | 7.x | Build tool rapide |
| **React Router** | 7.x | Routing SPA |
| **Tailwind CSS** | 4.x | Framework CSS utilitaire |
| **Brevo API** | 3.x | Envoi d'emails sécurisé |
| **Google Analytics** | GA4 | Tracking et analytics |
| **HCaptcha** | 2.x | Protection anti-bot |
| **Netlify/Vercel Functions** | - | API serverless |

### Hooks Personnalisés

- `useDocumentTitle` - Gestion dynamique des titres de page
- `useGoogleAnalytics` - Intégration GA4
- `useScrollAnimation` - Animations au scroll
- `useSEO` - Optimisation SEO automatique

---

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Git

### Étapes

```bash
# Cloner le projet
git clone https://github.com/votre-username/piscines-idf.git
cd piscines-idf

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables dans .env
# (voir section Configuration)

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

---

## 📝 Commandes

```bash
# Développement
npm run dev          # Lance le serveur de dev (port 5173)

# Build
npm run build        # Compile pour la production (dossier dist/)
npm run preview      # Prévisualise le build (port 4173)

# Linting
npm run lint         # Vérifie le code avec ESLint
```

---

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
# ==============================================
# FORMULAIRE DE CONTACT (Méthode sécurisée recommandée)
# ==============================================

# hCaptcha - Protection anti-bot
VITE_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key

# Brevo (ex-Sendinblue) - Envoi d'emails
BREVO_API_KEY=your_brevo_api_key
CONTACT_EMAIL=contact@bbhservice.fr

# Origine autorisée (votre domaine)
ALLOWED_ORIGIN=https://www.bbhservice.fr

# ==============================================
# SEO & ANALYTICS
# ==============================================

# Google Analytics 4
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# URL du site
VITE_SITE_URL=https://www.bbhservice.fr

# Mode debug (true en développement)
VITE_DEBUG_MODE=false
```

### Configuration du Formulaire de Contact

**Méthode Recommandée : HCaptcha + Brevo (Sécurisée)**

1. **HCaptcha** - Protection anti-bot
   - Créer un compte sur [hCaptcha](https://www.hcaptcha.com/)
   - Obtenir la clé de site (VITE_HCAPTCHA_SITE_KEY)
   - Obtenir la clé secrète (HCAPTCHA_SECRET_KEY)

2. **Brevo** - Service d'envoi d'emails
   - Créer un compte sur [Brevo](https://www.brevo.com/)
   - Générer une clé API
   - Configurer l'email de destination

📖 **Guide détaillé** : [docs/GUIDE_DEPLOIEMENT_SECURISE.md](docs/GUIDE_DEPLOIEMENT_SECURISE.md)


### Configuration Google Analytics

1. Créer une propriété GA4 sur [Google Analytics](https://analytics.google.com/)
2. Récupérer le Measurement ID (G-XXXXXXXXXX)
3. L'ajouter dans `.env`

📖 **Guide détaillé** : [docs/GUIDE_GOOGLE_ANALYTICS.md](docs/GUIDE_GOOGLE_ANALYTICS.md)

---

## 🌐 Déploiement

### Netlify (Recommandé)

#### Configuration Netlify

1. **Connecter le dépôt GitHub**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

2. **Ajouter les variables d'environnement**
   - Aller dans Site settings > Environment variables
   - Ajouter toutes les variables du fichier `.env.example`

3. **Configurer les Functions** (pour formulaire sécurisé)
   - Le dossier `api/` contient les serverless functions
   - Netlify les détecte automatiquement
   - Accessible via `/.netlify/functions/quote`

📖 **Guide complet** : [DEPLOYMENT.md](DEPLOYMENT.md)

### Vercel

1. **Installer Vercel CLI**
```bash
npm i -g vercel
```

2. **Déployer**
```bash
vercel
```

3. **Configurer les variables d'environnement**
   - Via le dashboard Vercel
   - Ou avec `vercel env add`

📖 **Configuration** : voir [vercel.json](vercel.json)

---

## 📚 Documentation

### Guides Techniques

| Guide | Description |
|-------|-------------|
| [CAHIER_DES_CHARGES.md](docs/CAHIER_DES_CHARGES.md) | Spécifications complètes du projet |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guide de déploiement production |
| [RECAP.md](RECAP.md) | Récapitulatif des fonctionnalités |

### Guides de Configuration

| Guide | Description |
|-------|-------------|
| [GUIDE_DEPLOIEMENT_SECURISE.md](docs/GUIDE_DEPLOIEMENT_SECURISE.md) | Configuration formulaire sécurisé (HCaptcha + Brevo) |
| [GUIDE_GOOGLE_ANALYTICS.md](docs/GUIDE_GOOGLE_ANALYTICS.md) | Configuration Google Analytics 4 |
| [GUIDE_SEARCH_CONSOLE.md](docs/GUIDE_SEARCH_CONSOLE.md) | Configuration Google Search Console |
| [GUIDE_IMAGES.md](docs/GUIDE_IMAGES.md) | Optimisation et gestion des images |
| [GUIDE_MISE_EN_PRODUCTION.md](docs/GUIDE_MISE_EN_PRODUCTION.md) | Checklist complète de mise en production |
| [GUIDE_MOBILE_STANDARDS.md](docs/GUIDE_MOBILE_STANDARDS.md) | Standards et optimisations mobile |

### Architecture du Projet

```
├── api/                        # Serverless functions
│   └── quote.js               # API de traitement des devis
├── public/                     # Fichiers statiques
│   ├── sitemap.xml
│   ├── robots.txt
│   └── images/
├── src/
│   ├── components/            # Composants réutilisables (23 composants)
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ContactFormSecure.jsx
│   │   ├── QuoteWizard.jsx
│   │   ├── Loader.jsx
│   │   ├── HCaptcha.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── TrustBadges.jsx
│   │   └── ...
│   ├── pages/                 # Pages (11 pages)
│   │   ├── Home.jsx
│   │   ├── Devis.jsx
│   │   ├── NotFound.jsx
│   │   ├── MentionsLegales.jsx
│   │   ├── Confidentialite.jsx
│   │   └── ...
│   ├── hooks/                 # Hooks personnalisés (4 hooks)
│   │   ├── useGoogleAnalytics.js
│   │   ├── useSEO.js
│   │   ├── useDocumentTitle.js
│   │   └── useScrollAnimation.js
│   ├── context/               # Context API
│   │   └── QuoteWizardContext.jsx
│   ├── data/                  # Données statiques
│   │   ├── services.js
│   │   ├── projects.js
│   │   └── testimonials.js
│   └── styles/                # Styles CSS
├── docs/                      # Documentation complète (6 guides)
├── .env.example               # Template variables d'environnement
├── netlify.toml              # Config Netlify
├── vercel.json               # Config Vercel
└── vite.config.js            # Configuration Vite
```

---

## 🎨 Personnalisation

### Modifier les Couleurs

Éditer `tailwind.config.js` :

```javascript
colors: {
  primary: {
    600: '#0284c7', // Bleu principal
    700: '#0369a1', // Bleu foncé
    // ...
  }
}
```

### Ajouter un Projet

Éditer `src/data/projects.js` :

```javascript
{
  id: 9,
  name: 'Nouveau Projet',
  slug: 'nouveau-projet',
  city: 'Paris',
  type: 'Piscine béton',
  description: 'Description...',
  // ...
}
```

### Modifier les Services

Éditer `src/data/services.js`

---

## 📊 Performance

### Métriques Actuelles

- **Performance** : 95/100
- **Accessibility** : 98/100
- **Best Practices** : 95/100
- **SEO** : 98/100

### Optimisations Implémentées

- Code splitting (React, Router séparés)
- Lazy loading des images
- CSS minifié avec Tailwind purge
- Assets avec cache long terme
- Preconnect pour Google Fonts

---

## 🤝 Contribution

Ce projet est un template. Pour l'adapter à votre entreprise :

1. Fork le projet
2. Modifier les données dans `src/data/`
3. Remplacer les images dans `public/images/`
4. Configurer vos clés HCaptcha, Brevo et Google Analytics
5. Déployer

---

## 📄 License

MIT License - Libre d'utilisation et de modification.

---

## 📞 Support

Pour toute question technique :

- 📖 Consulter la documentation dans `docs/`
- 🐛 Ouvrir une issue sur GitHub
- 📧 Contact : [votre-email]

---

## 🙏 Remerciements

- Design inspiré des meilleures pratiques UX/UI
- Icônes et illustrations : [Sources]
- Polices : Google Fonts (Inter, Poppins)

---

**Développé avec ❤️ pour BBH SERVICE**

*Dernière mise à jour : 6 janvier 2026*
