# Cahier des Charges - BBH SERVICE

## Site Vitrine pour Pisciniste en Île-de-France

---

## 📋 Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Contexte et objectifs](#2-contexte-et-objectifs)
3. [Cible et personas](#3-cible-et-personas)
4. [Spécifications fonctionnelles](#4-spécifications-fonctionnelles)
5. [Architecture technique](#5-architecture-technique)
6. [Structure des pages](#6-structure-des-pages)
7. [Composants réutilisables](#7-composants-réutilisables)
8. [Gestion des données](#8-gestion-des-données)
9. [Design et ergonomie](#9-design-et-ergonomie)
10. [SEO et référencement](#10-seo-et-référencement)
11. [Performance et optimisation](#11-performance-et-optimisation)
12. [Déploiement](#12-déploiement)
13. [Évolutions futures](#13-évolutions-futures)

---

## 1. Présentation du projet

### 1.1 Nom du projet
**BBH SERVICE** - Site vitrine professionnel

### 1.2 Description
Site web Single Page Application (SPA) pour une entreprise spécialisée dans la conception, la réalisation et l'entretien de piscines sur mesure en région parisienne.

### 1.3 Type de site
- Site vitrine / corporate
- Single Page Application (SPA)
- Responsive (mobile-first)

### 1.4 URL prévue
`https://www.bbhservice.fr`

---

## 2. Contexte et objectifs

### 2.1 Contexte métier

**Activité principale :**
- Création de piscines sur mesure (béton, coque, intérieure)
- Rénovation de piscines existantes
- Contrats d'entretien annuel

**Zone d'intervention :**
- Paris (75)
- Hauts-de-Seine (92)
- Yvelines (78)
- Val-de-Marne (94)
- Essonne (91)
- Seine-et-Marne (77)
- Val-d'Oise (95)

**Positionnement :**
- Haut de gamme
- Sur mesure
- Accompagnement personnalisé de A à Z

### 2.2 Objectifs du site

| Objectif | Description | KPI |
|----------|-------------|-----|
| **Visibilité** | Améliorer la présence en ligne | Trafic organique, positionnement Google |
| **Génération de leads** | Obtenir des demandes de devis | Nombre de formulaires soumis |
| **Crédibilité** | Rassurer les prospects | Temps passé sur site, taux de rebond |
| **Showcase** | Mettre en valeur les réalisations | Pages vues sur /realisations |

### 2.3 Proposition de valeur

- **15+ années d'expérience**
- **250+ piscines réalisées**
- **98% de clients satisfaits**
- **Garantie décennale**
- **Accompagnement personnalisé**
- **Matériaux premium**

---

## 3. Cible et personas

### 3.1 Cible principale

**Propriétaires de maisons individuelles en Île-de-France**
- CSP+ (Catégorie Socio-Professionnelle supérieure)
- Budget : 30 000€ - 150 000€+
- Propriétaires de maisons avec jardin
- Recherchent la qualité et le sur-mesure

### 3.2 Personas

#### Persona 1 : "Le Cadre Supérieur"
- **Profil** : Homme/Femme, 45-60 ans
- **Situation** : Cadre dirigeant, propriétaire à Versailles
- **Besoin** : Piscine de prestige pour valoriser sa propriété
- **Comportement** : Recherche qualité, délègue, budget non limitant
- **Attentes** : Accompagnement complet, garanties, références

#### Persona 2 : "La Famille Aisée"
- **Profil** : Couple, 35-50 ans, enfants
- **Situation** : Profession libérale, maison à Saint-Germain-en-Laye
- **Besoin** : Piscine familiale sécurisée
- **Comportement** : Compare les devis, cherche le meilleur rapport qualité/prix
- **Attentes** : Sécurité, garanties, délais respectés

#### Persona 3 : "L'Investisseur"
- **Profil** : Homme/Femme, 40-55 ans
- **Situation** : Propriétaire de bien locatif de prestige
- **Besoin** : Piscine pour augmenter la valeur du bien
- **Comportement** : ROI-oriented, recherche fiabilité
- **Attentes** : Travail soigné, respect des délais, SAV réactif

---

## 4. Spécifications fonctionnelles

### 4.1 Fonctionnalités principales

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| Navigation | Menu responsive avec liens vers toutes les pages | P0 |
| Page d'accueil | Hero, services, réalisations, témoignages | P0 |
| Catalogue services | Liste détaillée des prestations | P0 |
| Portfolio projets | Galerie de réalisations avec filtres | P0 |
| Fiches projets | Pages détaillées par réalisation | P1 |
| FAQ | Questions fréquentes en accordéon | P1 |
| Formulaire contact sécurisé | Demande de devis avec validation, hCaptcha, rate limiting | P0 |
| Wizard de devis | Formulaire en 6 étapes pour leads qualifiés | P0 |
| Carrousel images | Galerie interactive sur fiches projets | P1 |
| Bouton scroll-to-top | Retour en haut de page fluide | P1 |
| Hero animé | Effet d'eau sur titre (auto + clic) | P1 |

### 4.2 Fonctionnalités secondaires

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| Animations scroll | Apparition progressive des éléments | P2 |
| Mode sombre | Thème alternatif | P3 |
| Blog | Articles conseils piscine | P3 |
| Chatbot | Assistant en ligne | P3 |
| Configurateur | Devis en ligne automatisé | P3 |

### 4.3 Formulaire de contact

**Champs requis :**
- Nom complet *
- Email *
- Téléphone *
- Ville / Code postal *
- Type de projet * (liste déroulante)
  - Nouvelle piscine
  - Rénovation
  - Entretien
  - Autre
- Message (optionnel)

**Comportement :**
- Validation côté client
- Protection anti-spam avec hCaptcha
- Sanitization des données contre XSS
- Envoi via API serverless (Brevo)
- Rate limiting (5 requêtes/10 minutes par IP)
- Headers de sécurité (CSP, X-Frame-Options)
- Message de confirmation
- Notification par email au client

---

## 5. Architecture technique

### 5.1 Stack technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Framework JS | React | 19.x |
| Build tool | Vite | 7.x |
| Routing | React Router DOM | 7.x |
| Styling | Tailwind CSS | 4.x |
| Emails | Brevo API | - |
| Anti-spam | hCaptcha | - |
| Analytics | Google Analytics | 4 |
| Langage | JavaScript (ES6+) | - |

### 5.2 Arborescence du projet

```
piscines-idf/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── AnimatedSection.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ContactFormSecure.jsx
│   │   ├── FAQItem.jsx
│   │   ├── Footer.jsx
│   │   ├── HCaptcha.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ImageCarousel.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── ProjectsGrid.jsx
│   │   ├── QuoteWizard.jsx
│   │   ├── ScrollToTopButton.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── TestimonialCard.jsx
│   │   └── TestimonialsSection.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── services.js
│   │   └── testimonials.js
│   ├── hooks/
│   │   ├── useDocumentTitle.js
│   │   ├── useGoogleAnalytics.js
│   │   ├── useSEO.js
│   │   └── useScrollAnimation.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Projects.jsx
│   │   └── Services.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── docs/
│   ├── CAHIER_DES_CHARGES.md
│   ├── GUIDE_DEPLOIEMENT_SECURISE.md
│   ├── GUIDE_GOOGLE_ANALYTICS.md
│   ├── GUIDE_IMAGES.md
│   ├── GUIDE_MISE_EN_PRODUCTION.md
│   └── GUIDE_SEARCH_CONSOLE.md
├── api/
│   └── quote.js
├── .env.example
├── DEPLOYMENT.md
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

### 5.3 Routing

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home.jsx | Page d'accueil |
| `/a-propos` | About.jsx | Présentation entreprise |
| `/services` | Services.jsx | Liste des services |
| `/realisations` | Projects.jsx | Portfolio projets |
| `/realisations/:slug` | ProjectDetail.jsx | Fiche projet détaillée |
| `/faq` | FAQ.jsx | Questions fréquentes |
| `/contact` | Contact.jsx | Formulaire de contact |
| `*` | NotFound.jsx | Page 404 |

---

## 6. Structure des pages

### 6.1 Page d'accueil (Home)

```
┌─────────────────────────────────────┐
│           HEADER / NAV              │
├─────────────────────────────────────┤
│                                     │
│         HERO SECTION                │
│   Titre animé (effet d'eau)         │
│   CTA "Demander un devis"           │
│   CTA "Obtenir un devis personnalisé"│
│                                     │
├─────────────────────────────────────┤
│                                     │
│         NOS SERVICES                │
│   [Card] [Card] [Card] [Card]       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      QUELQUES RÉALISATIONS          │
│   [Projet] [Projet] [Projet]        │
│         Voir tout →                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         TÉMOIGNAGES                 │
│   [Avis] [Avis] [Avis]              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      ZONE D'INTERVENTION            │
│         Carte + Liste               │
│                                     │
├─────────────────────────────────────┤
│             FOOTER                  │
│      [Scroll to Top Button]         │
└─────────────────────────────────────┘

+ QuoteWizard Modal (overlay)
```

### 6.2 Page À propos (About)

**Sections :**
1. Hero avec titre
2. Histoire de l'entreprise (timeline)
3. Chiffres clés (stats animées)
4. Nos valeurs (4 blocs)
5. L'équipe (texte)
6. CTA vers contact

### 6.3 Page Services (Services)

**Sections :**
1. Hero avec titre
2. Liste des services (alternance image/texte)
3. Processus de travail (étapes)
4. Garanties et certifications
5. CTA devis gratuit

### 6.4 Page Réalisations (Projects)

**Sections :**
1. Hero avec titre
2. Filtres par type de projet
3. Grille de projets (cards cliquables)
4. Pagination ou "Voir plus"

### 6.5 Page Détail Projet (ProjectDetail)

**Sections :**
1. Hero avec infos projet
2. Galerie photos (carrousel)
3. Section Avant/Après
4. Description détaillée
5. Fiche technique (sidebar)
6. Équipements installés
7. Projets similaires
8. CTA contact

### 6.6 Page FAQ

**Sections :**
1. Hero avec titre
2. Accordéon de questions/réponses
3. CTA "Vous avez d'autres questions ?"

### 6.7 Page Contact

**Sections :**
1. Hero avec titre
2. Formulaire de contact (2/3)
3. Informations de contact (1/3)
   - Téléphone
   - Email
   - Horaires
   - Zone d'intervention

---

## 7. Composants réutilisables

### 7.1 Liste des composants

| Composant | Description | Props |
|-----------|-------------|-------|
| `Header` | Navigation principale | - |
| `Footer` | Pied de page | - |
| `Hero` | Section hero accueil avec effet d'eau | - |
| `SectionTitle` | Titre de section | `title`, `subtitle` |
| `ServiceCard` | Carte service | `service` (objet) |
| `ProjectCard` | Carte projet | `project` (objet) |
| `ProjectModal` | Modal détail projet | `project`, `onClose` |
| `TestimonialCard` | Carte témoignage | `testimonial` (objet) |
| `FAQItem` | Item accordéon FAQ | `question`, `answer` |
| `ContactForm` | Formulaire contact legacy | - |
| `ContactFormSecure` | Formulaire contact sécurisé avec hCaptcha | - |
| `QuoteWizard` | Wizard de devis en 6 étapes | `isOpen`, `onClose` |
| `HCaptcha` | Composant anti-spam hCaptcha | `onVerify`, `onError`, `onExpire` |
| `ScrollToTopButton` | Bouton retour haut de page | - |
| `AnimatedSection` | Wrapper animation | `animation`, `delay`, `children` |
| `ImageCarousel` | Carrousel images | `images`, `autoPlay`, `showThumbnails` |

### 7.2 Hooks personnalisés

| Hook | Description | Paramètres |
|------|-------------|------------|
| `useDocumentTitle` | Change le titre de l'onglet | `title` (string) |
| `useScrollAnimation` | Animation au scroll | `options` (threshold, etc.) |
| `useSEO` | Gestion des meta tags | `{ title, description, keywords, canonicalUrl }` |
| `useGoogleAnalytics` | Tracking Google Analytics (pageviews, events) | `trackingId` |

---

## 8. Gestion des données

### 8.1 Structure des données

#### Services (`src/data/services.js`)

```javascript
{
  id: 1,
  title: "Piscines béton sur mesure",
  slug: "piscines-beton",
  description: "Description courte...",
  longDescription: "Description détaillée...",
  icon: "concrete-pool",
  advantages: ["Avantage 1", "Avantage 2"],
  image: "/images/services/beton.jpg"
}
```

#### Projets (`src/data/projects.js`)

```javascript
{
  id: 1,
  name: "Villa Saint-Germain",
  slug: "villa-saint-germain",
  city: "Saint-Germain-en-Laye",
  department: "Yvelines (78)",
  type: "Piscine béton à débordement",
  description: "Description courte...",
  longDescription: "Description longue...",
  year: 2024,
  dimensions: "12m x 5m",
  depth: "1.20m - 2.00m",
  duration: "14 semaines",
  budget: "85 000€ - 100 000€",
  tags: ["débordement", "terrasse bois", "éclairage LED"],
  details: ["Détail 1", "Détail 2"],
  featured: true,
  image: "/images/projects/saint-germain.jpg"
}
```

#### Témoignages (`src/data/testimonials.js`)

```javascript
{
  id: 1,
  name: "Jean-Pierre M.",
  city: "Versailles",
  rating: 5,
  text: "Témoignage client...",
  date: "2024"
}
```

---

## 9. Design et ergonomie

### 9.1 Charte graphique

#### Couleurs principales

| Nom | Code HEX | Usage |
|-----|----------|-------|
| Primary 600 | `#0284c7` | Boutons, liens, accents |
| Primary 700 | `#0369a1` | Hover, headers |
| Primary 100 | `#e0f2fe` | Backgrounds clairs |
| Gray 900 | `#111827` | Textes principaux |
| Gray 600 | `#4b5563` | Textes secondaires |
| Gray 100 | `#f3f4f6` | Backgrounds |
| White | `#ffffff` | Fond principal |

#### Typographie

| Usage | Police | Poids |
|-------|--------|-------|
| Titres (H1-H3) | Poppins | 600-700 |
| Corps de texte | Inter | 400-500 |
| Boutons | Inter | 600 |

### 9.2 Breakpoints responsive

| Breakpoint | Largeur | Cible |
|------------|---------|-------|
| `sm` | 640px | Mobiles paysage |
| `md` | 768px | Tablettes |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Grands écrans |

### 9.3 Composants UI

- **Boutons** : Coins arrondis (rounded-lg), hover avec transition
- **Cards** : Ombre légère, hover avec élévation
- **Formulaires** : Labels au-dessus, validation inline
- **Navigation** : Sticky header, menu burger mobile

---

## 10. SEO et référencement

### 10.1 Optimisations techniques

| Élément | Implémentation |
|---------|----------------|
| Meta title | Hook `useSEO` dynamique par page |
| Meta description | Hook `useSEO` avec texte unique |
| Meta keywords | Keywords ciblés par page |
| URLs canoniques | Définies par page |
| Open Graph | Tags OG pour réseaux sociaux |
| Twitter Cards | Tags Twitter summary_large_image |
| Schema.org | JSON-LD LocalBusiness |
| Sitemap | sitemap.xml statique |
| Robots.txt | Autorise indexation |

### 10.2 Mots-clés ciblés

**Principaux :**
- piscine sur mesure Île-de-France
- pisciniste Paris
- construction piscine 78
- piscine béton région parisienne

**Secondaires :**
- rénovation piscine
- entretien piscine Yvelines
- piscine à débordement
- piscine intérieure luxe

### 10.3 Structure sémantique

- `<header>` pour le header
- `<nav>` pour la navigation
- `<main>` pour le contenu principal
- `<section>` pour chaque section
- `<article>` pour les fiches projets
- `<footer>` pour le footer
- Hiérarchie H1 > H2 > H3 respectée

---

## 11. Performance et optimisation

### 11.1 Métriques cibles (Core Web Vitals)

| Métrique | Cible | Description |
|----------|-------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |

### 11.2 Optimisations implémentées

| Optimisation | Description |
|--------------|-------------|
| Code splitting | React et Router en bundles séparés |
| Tree shaking | Suppression code non utilisé |
| Minification | CSS et JS minifiés (esbuild) |
| Preconnect | Fonts Google préconnectées |
| Lazy loading | Images chargées à la demande |
| Cache headers | Assets avec cache long terme |
| XSS Protection | Sanitization des inputs utilisateur |
| Rate Limiting | Limitation requêtes API (5/10min/IP) |
| Security Headers | CSP, X-Frame-Options, HSTS |
| CORS Restriction | Origine vérifiée côté API |

### 11.3 Taille des bundles

| Bundle | Taille | Gzip |
|--------|--------|------|
| CSS | 39.83 KB | 7.04 KB |
| React vendor | 11.32 KB | 4.07 KB |
| Router | 32.65 KB | 12.03 KB |
| App | 268.33 KB | 78.58 KB |

---

## 12. Déploiement

### 12.1 Environnements

| Environnement | URL | Usage |
|---------------|-----|-------|
| Local | localhost:5173 | Développement |
| Preview | localhost:4173 | Test du build |
| Production | bbhservice.fr | Site public |

### 12.2 Plateformes recommandées

1. **Netlify** (recommandé)
   - Déploiement automatique depuis Git
   - SSL gratuit
   - CDN global

2. **Vercel**
   - Alternative à Netlify
   - Excellent pour React/Vite

3. **Serveur dédié**
   - Apache ou Nginx
   - Configuration SPA requise

### 12.3 Variables d'environnement

```env
# API Brevo (Contact Form)
VITE_BREVO_API_KEY=xxx
VITE_BREVO_SENDER_EMAIL=bbhservice25@gmail.com
VITE_BREVO_SENDER_NAME=BBH SERVICE
VITE_BREVO_RECIPIENT_EMAIL=devis@bbhservice.fr

# hCaptcha (Anti-spam)
VITE_HCAPTCHA_SITE_KEY=xxx

# Site Configuration
VITE_SITE_URL=https://www.bbhservice.fr

# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 12.4 Checklist pré-production

- [x] Variables d'environnement configurées
- [x] API Brevo fonctionnelle
- [x] hCaptcha configuré
- [x] Protection XSS implémentée
- [x] Rate limiting activé
- [x] Security headers configurés
- [ ] Images optimisées uploadées
- [x] Favicon en place
- [ ] SSL activé
- [ ] Domaine configuré
- [ ] Google Search Console configurée
- [x] Google Analytics configuré
- [ ] Tests sur mobile effectués
- [x] Repository Git configuré
- [x] Code poussé sur GitHub

---

## 13. Évolutions futures

### 13.1 Court terme (3-6 mois)

| Fonctionnalité | Description | Effort |
|----------------|-------------|--------|
| Images réelles | Remplacer les placeholders | Faible |
| Tests E2E | Tests automatisés Playwright/Cypress | Moyen |
| Formulaire avancé | Upload de photos terrain | Moyen |
| Mode sombre | Thème alternatif | Moyen |
| Monitoring | Sentry pour error tracking | Faible |

### 13.2 Moyen terme (6-12 mois)

| Fonctionnalité | Description | Effort |
|----------------|-------------|--------|
| Blog | Articles conseils piscine | Élevé |
| Espace client | Suivi de chantier | Élevé |
| Configurateur | Devis en ligne automatisé | Élevé |
| Multi-langue | Version anglaise | Moyen |

### 13.3 Long terme (12+ mois)

| Fonctionnalité | Description | Effort |
|----------------|-------------|--------|
| Application mobile | App de suivi client | Très élevé |
| Réalité augmentée | Visualisation 3D piscine | Très élevé |
| Chatbot IA | Assistant intelligent | Élevé |
| CRM intégré | Gestion relation client | Élevé |

---

## 📎 Annexes

### A. Commandes utiles

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint
```

### B. Contacts techniques

| Rôle | Contact |
|------|---------|
| Développeur | [À définir] |
| Designer | [À définir] |
| Chef de projet | [À définir] |

### C. Historique des versions

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | Dec 2024 | Version initiale |
| 1.1.0 | Dec 2024 | Ajout QuoteWizard, ScrollToTopButton, Hero animé |
| 1.2.0 | Dec 2024 | Migration Brevo, sécurisation (hCaptcha, XSS, rate limiting) |
| 1.3.0 | Dec 2024 | Suppression contenu Spa/Balnéo, Google Analytics |

---

*Document mis à jour le 16 décembre 2024*
*Projet : BBH SERVICE - Site vitrine pisciniste*
*Repository : https://github.com/TaharGik/Projet-piscines*
