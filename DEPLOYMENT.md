# Guide de Déploiement - BBH SERVICE

Ce guide explique comment préparer et déployer le site BBH SERVICE en production.

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn
- **Méthode Sécurisée (Recommandée)** :
  - Compte hCaptcha pour protection anti-bot
  - Compte Brevo (ex-Sendinblue) pour envoi d'emails
- Compte Google Analytics (optionnel)

## 🔧 Configuration

### 1. Variables d'environnement

Copiez le fichier `.env.example` en `.env` et remplissez les valeurs :

```bash
cp .env.example .env
```

#### Méthode Sécurisée

```env
# ==============================================
# FORMULAIRE DE CONTACT (Méthode sécurisée)
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

# Mode debug
VITE_DEBUG_MODE=false
```

### 2. Configuration de la Protection Anti-Bot (hCaptcha)

1. Créez un compte sur [hCaptcha](https://www.hcaptcha.com/)
2. Créez un nouveau site
3. Notez la **Site Key** (clé publique) → `VITE_HCAPTCHA_SITE_KEY`
4. Notez la **Secret Key** (clé privée) → `HCAPTCHA_SECRET_KEY`

⚠️ **Important** : La Secret Key doit rester côté serveur uniquement.

### 3. Configuration de l'Envoi d'Emails (Brevo)

1. Créez un compte sur [Brevo](https://www.brevo.com/)
2. Allez dans **SMTP & API** > **API Keys**
3. Créez une nouvelle clé API
4. Copiez la clé → `BREVO_API_KEY`
5. Configurez l'email de destination → `CONTACT_EMAIL`

📖 **Guide détaillé** : [docs/GUIDE_DEPLOIEMENT_SECURISE.md](docs/GUIDE_DEPLOIEMENT_SECURISE.md)


## 🏗️ Build de production

```bash
# Installer les dépendances
npm install

# Build de production
npm run build
```

Le build génère un dossier `dist/` contenant :
- HTML minifié
- CSS optimisé
- JavaScript splitté et minifié
- Assets compressés

## 📁 Structure du build

```
dist/
├── index.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── js/
│   │   ├── index-[hash].js
│   │   ├── react-vendor-[hash].js
│   │   └── router-[hash].js
│   └── css/
│       └── index-[hash].css
└── images/              # Images statiques optimisées
```

## 🚀 Options de déploiement

### Option 1: Netlify (Recommandé)

#### Configuration Standard

1. Connectez votre repo GitHub à Netlify
2. Configuration Build :
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+
3. Ajoutez les variables d'environnement dans **Site settings** > **Environment variables**

#### Configuration avec Serverless Functions

Si vous utilisez la méthode sécurisée (hCaptcha + Brevo), Netlify détectera automatiquement le dossier `api/` :

1. **Structure des Functions** :
```
api/
└── quote.js    # Endpoint: /.netlify/functions/quote
```

2. **Variables d'environnement à ajouter sur Netlify** :
   - `VITE_HCAPTCHA_SITE_KEY` (visible côté client)
   - `HCAPTCHA_SECRET_KEY` (secret, côté serveur)
   - `BREVO_API_KEY` (secret, côté serveur)
   - `CONTACT_EMAIL`
   - `ALLOWED_ORIGIN`
   - `VITE_GA_TRACKING_ID`
   - `VITE_SITE_URL`

3. **Fichier netlify.toml** (déjà configuré) :

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
```

4. **Test de la function** :
   - URL : `https://votre-site.netlify.app/.netlify/functions/quote`
   - Méthode : POST
   - Vérifiez les logs dans **Functions** > **quote**

📖 **Guide complet** : [docs/GUIDE_DEPLOIEMENT_SECURISE.md](docs/GUIDE_DEPLOIEMENT_SECURISE.md)

### Option 2: Vercel

#### Configuration Standard

1. Importez le projet sur Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

#### Configuration avec API Routes

Pour la méthode sécurisée, Vercel utilise le dossier `api/` :

1. **Structure des API Routes** :
```
api/
└── quote.js    # Endpoint: /api/quote
```

2. **Variables d'environnement à ajouter sur Vercel** :
   - Même liste que pour Netlify
   - Via Dashboard > Settings > Environment Variables
   - Ou via CLI : `vercel env add VARIABLE_NAME`

3. **Fichier vercel.json** (déjà configuré) :

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### Option 3: Serveur Apache/Nginx

⚠️ **Important** : Pour la méthode sécurisée avec serverless functions, utilisez Netlify ou Vercel.

#### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

```nginx
server {
    listen 80;
    server_name www.bbhservice.fr;
    root /var/www/aqua-prestige/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔍 SEO Checklist

- [x] Meta tags dynamiques (useSEO hook)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org JSON-LD
- [x] Sitemap.xml
- [x] Robots.txt
- [x] URLs canoniques
- [ ] Vérifier Google Search Console
- [ ] Soumettre sitemap à Google
- [ ] Configurer Google Analytics

## 📊 Performance

### Optimisations incluses

- Code splitting (React, Router séparés)
- Lazy loading des images (à ajouter)
- Preconnect pour les fonts Google
- CSS minifié avec Tailwind purge
- JavaScript minifié avec esbuild

### Recommandations supplémentaires

1. **Images** : Convertir en WebP et ajouter des dimensions
2. **Fonts** : Utiliser `font-display: swap`
3. **Cache** : Configurer les headers de cache sur le serveur

## 🔐 Sécurité

### Variables Sensibles

- ✅ Variables sensibles dans `.env` (non committé)
- ✅ `.env.example` sans valeurs réelles
- ✅ `.gitignore` configuré pour exclure `.env`

### Protection des Clés API

**Côté Client (VITE_*)** :
- `VITE_HCAPTCHA_SITE_KEY` - OK, peut être publique
- `VITE_GA_TRACKING_ID` - OK, peut être publique
- `VITE_SITE_URL` - OK, peut être publique

**Côté Serveur (jamais exposées)** :
- `HCAPTCHA_SECRET_KEY` - ⚠️ SENSIBLE, uniquement serverless
- `BREVO_API_KEY` - ⚠️ SENSIBLE, uniquement serverless
- `CONTACT_EMAIL` - ℹ️ Peut être exposée mais mieux côté serveur

### Bonnes Pratiques

1. **HTTPS Obligatoire** en production
2. **Headers de Sécurité** :
   - Content-Security-Policy (CSP)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin

3. **CORS Configuré** :
   - `ALLOWED_ORIGIN` vérifié dans `api/quote.js`
   - Refuse les requêtes d'origines non autorisées

4. **Rate Limiting** :
   - Implémenté dans les serverless functions
   - Limite les abus de formulaire

5. **Validation** :
   - Validation côté client (UX)
   - Validation côté serveur (Sécurité)
   - Sanitization des données

### Netlify/Vercel

- Variables d'environnement chiffrées
- Pas d'accès direct aux secrets depuis le client
- Logs sécurisés des functions

## 🧪 Tests et Validation

### Tests Locaux

```bash
# 1. Build de production
npm run build

# 2. Preview du build
npm run preview
```

Ouvrez http://localhost:4173 et vérifiez :
- ✅ Navigation fonctionne sur toutes les pages
- ✅ Formulaire de contact envoie correctement
- ✅ Assistant de devis fonctionne
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Pas d'erreurs dans la console
- ✅ Images chargent correctement
- ✅ Animations fonctionnent
- ✅ SEO meta tags présents (vérifier avec DevTools)

### Tests Post-Déploiement

1. **Fonctionnalités** :
   - [ ] Formulaire de contact fonctionne
   - [ ] Assistant de devis envoie les emails
   - [ ] hCaptcha s'affiche et valide
   - [ ] Navigation entre pages
   - [ ] Carrousel d'images
   - [ ] Modales de projets

2. **Performance** :
   - [ ] Google PageSpeed Insights (score 90+)
   - [ ] GTmetrix
   - [ ] WebPageTest

3. **SEO** :
   - [ ] Google Search Console configuré
   - [ ] Sitemap soumis
   - [ ] Robots.txt accessible
   - [ ] Meta tags présents (extension SEO META in 1 CLICK)

4. **Analytics** :
   - [ ] Google Analytics track les pages
   - [ ] Événements personnalisés fonctionnent

5. **Sécurité** :
   - [ ] HTTPS actif
   - [ ] Certificat SSL valide
   - [ ] Headers de sécurité (avec securityheaders.com)

### Tests de Formulaires Sécurisés

```bash
# Tester l'endpoint serverless en local (Netlify CLI)
netlify dev

# ou Vercel CLI
vercel dev
```

Testez l'endpoint :
```bash
curl -X POST https://localhost:8888/.netlify/functions/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "0123456789",
    "projectType": "piscine-beton",
    "message": "Test message",
    "captchaToken": "test_token"
  }'
```

## 📱 PWA (Optionnel - Future)

Pour transformer le site en PWA, installez le plugin Vite PWA :

```bash
npm install -D vite-plugin-pwa
```

Fonctionnalités PWA possibles :
- Installation sur l'écran d'accueil
- Mode hors ligne
- Notifications push
- Cache des assets

## 🔍 SEO Checklist Complète

- [x] Meta tags dynamiques (useSEO hook)
- [x] Open Graph tags (Facebook, LinkedIn)
- [x] Twitter Card tags
- [x] Schema.org JSON-LD (LocalBusiness)
- [x] Sitemap.xml (11 URLs)
- [x] Robots.txt
- [x] URLs canoniques
- [x] Structure HTML5 sémantique
- [ ] Vérifier Google Search Console
- [ ] Soumettre sitemap à Google
- [ ] Configurer Google Analytics
- [ ] Google My Business
- [ ] Avis clients (Google, TrustPilot)

📖 **Guides détaillés** :
- [GUIDE_SEARCH_CONSOLE.md](docs/GUIDE_SEARCH_CONSOLE.md)
- [GUIDE_GOOGLE_ANALYTICS.md](docs/GUIDE_GOOGLE_ANALYTICS.md)
- [GUIDE_MISE_EN_PRODUCTION.md](docs/GUIDE_MISE_EN_PRODUCTION.md)

## 📊 Performance

### Optimisations Incluses

- ✅ Code splitting (React, Router séparés)
- ✅ Lazy loading des composants lourds
- ✅ Preconnect pour les fonts Google
- ✅ CSS minifié avec Tailwind purge
- ✅ JavaScript minifié avec esbuild
- ✅ Hash des fichiers pour cache long terme
- ✅ Tree shaking (suppression code inutilisé)

### Recommandations Supplémentaires

1. **Images** :
   - Convertir en WebP
   - Ajouter largeur/hauteur pour éviter CLS
   - Utiliser CDN (Cloudinary, ImageKit)
   - Lazy loading natif (`loading="lazy"`)

2. **Fonts** :
   - Utiliser `font-display: swap`
   - Sous-ensemble de caractères
   - Précharger les fonts critiques

3. **Cache** :
   - Configurer les headers de cache sur le serveur
   - Service Worker pour le cache avancé (PWA)

4. **Monitoring** :
   - Google Analytics pour le trafic
   - Sentry pour les erreurs
   - Hotjar pour l'UX

## 🐛 Dépannage

### Problème : Formulaire ne s'envoie pas

1. Vérifiez les variables d'environnement sur Netlify/Vercel
2. Consultez les logs des functions
3. Vérifiez la clé hCaptcha (site key vs secret key)
4. Testez l'API Brevo séparément

### Problème : 404 sur les routes

Vérifiez que les redirects sont configurés :
- Netlify : `netlify.toml` avec redirects
- Vercel : `vercel.json` avec rewrites
- Apache/Nginx : configuration serveur

### Problème : Variables d'environnement non chargées

- Variables côté client doivent commencer par `VITE_`
- Redémarrer le serveur après modification `.env`
- Sur Netlify/Vercel : redéployer après ajout de variables

## 📞 Support

Pour toute question technique :
- Consultez la [documentation](docs/)
- Vérifiez le [CHANGELOG.md](CHANGELOG.md)
- Contactez l'équipe de développement

## 🎯 Prochaines Étapes

Après déploiement :
1. ✅ Configurer Google Search Console
2. ✅ Soumettre le sitemap
3. ✅ Activer Google Analytics
4. ✅ Tester tous les formulaires
5. ✅ Vérifier les performances (PageSpeed)
6. ✅ Créer Google My Business
7. ✅ Demander premiers avis clients
8. ✅ Lancer campagne Google Ads (optionnel)

---

**Dernière mise à jour** : Janvier 2026  
**Version** : 2.0.0
