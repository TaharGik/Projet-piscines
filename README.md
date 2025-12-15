# 🏊 Aqua Prestige - Site Vitrine Piscines

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

**Aqua Prestige** est un site vitrine moderne conçu pour présenter les services d'une entreprise de construction de piscines haut de gamme en région parisienne.

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

### Fonctionnalités Techniques

- ✅ Single Page Application (SPA) avec React Router
- ✅ Design responsive (mobile-first)
- ✅ Animations au scroll
- ✅ Formulaire de contact fonctionnel (EmailJS)
- ✅ Carrousel d'images interactif
- ✅ SEO optimisé (meta tags dynamiques)
- ✅ Google Analytics 4 intégré
- ✅ Performance optimisée (code splitting, lazy loading)

---

## 🛠️ Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 19.x | Framework JavaScript |
| **Vite** | 7.x | Build tool rapide |
| **React Router** | 7.x | Routing SPA |
| **Tailwind CSS** | 4.x | Framework CSS utilitaire |
| **EmailJS** | 4.x | Envoi d'emails depuis le frontend |
| **Google Analytics** | GA4 | Tracking et analytics |

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
# EmailJS - Formulaire de contact
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics 4
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# URL du site
VITE_SITE_URL=https://www.aqua-prestige.fr
```

### Configuration EmailJS

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurer un service email (Gmail, Outlook...)
3. Créer un template d'email
4. Copier les IDs dans `.env`

📖 **Guide détaillé** : `docs/GUIDE_EMAILJS.md`

### Configuration Google Analytics

1. Créer une propriété GA4 sur [Google Analytics](https://analytics.google.com/)
2. Récupérer le Measurement ID (G-XXXXXXXXXX)
3. L'ajouter dans `.env`

📖 **Guide détaillé** : `docs/GUIDE_GOOGLE_ANALYTICS.md`

---

## 🌐 Déploiement

### Netlify (Recommandé)

```bash
# 1. Build local
npm run build

# 2. Sur Netlify
# - Connecter votre repo GitHub
# - Build command: npm run build
# - Publish directory: dist
# - Ajouter les variables d'environnement
```

### Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement
vercel env add VITE_EMAILJS_SERVICE_ID
```

📖 **Guide complet** : `docs/GUIDE_MISE_EN_PRODUCTION.md`

---

## 📚 Documentation

### Guides Disponibles

| Guide | Description |
|-------|-------------|
| `docs/CAHIER_DES_CHARGES.md` | Spécifications complètes du projet |
| `docs/GUIDE_IMAGES.md` | Comment ajouter et optimiser les images |
| `docs/GUIDE_EMAILJS.md` | Configuration du formulaire de contact |
| `docs/GUIDE_GOOGLE_ANALYTICS.md` | Tracking et analytics |
| `docs/GUIDE_SEARCH_CONSOLE.md` | SEO et indexation Google |
| `docs/GUIDE_MISE_EN_PRODUCTION.md` | Déploiement de A à Z |
| `DEPLOYMENT.md` | Options de déploiement détaillées |

### Structure du Projet

```
piscines-idf/
├── public/              # Assets statiques
│   ├── images/         # Images du site
│   ├── robots.txt      # Règles pour les robots
│   └── sitemap.xml     # Plan du site pour SEO
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── data/          # Données (projets, services, témoignages)
│   ├── hooks/         # Hooks personnalisés
│   ├── pages/         # Pages de l'application
│   ├── styles/        # Styles globaux
│   ├── App.jsx        # Composant racine
│   └── main.jsx       # Point d'entrée
├── docs/              # Documentation
├── .env.example       # Template des variables d'environnement
├── netlify.toml       # Config Netlify
├── vercel.json        # Config Vercel
└── vite.config.js     # Configuration Vite
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
4. Configurer vos clés EmailJS et GA
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

**Développé avec ❤️ pour Aqua Prestige**

*Dernière mise à jour : 12 décembre 2025*
