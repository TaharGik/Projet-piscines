# Guide de Déploiement - BBH SERVICE

Ce guide explique comment préparer et déployer le site BBH SERVICE en production.

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn
- Compte EmailJS pour le formulaire de contact
- (Optionnel) Compte Google Analytics

## 🔧 Configuration

### 1. Variables d'environnement

Copiez le fichier `.env.example` en `.env` et remplissez les valeurs :

```bash
cp .env.example .env
```

Éditez `.env` avec vos clés :

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxx
VITE_SITE_URL=https://www.votre-domaine.fr
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 2. Configuration EmailJS

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Créez un nouveau service (Gmail, Outlook, etc.)
3. Créez un template avec les variables :
   - `{{from_name}}` - Nom de l'expéditeur
   - `{{from_email}}` - Email de l'expéditeur
   - `{{phone}}` - Téléphone
   - `{{city}}` - Ville
   - `{{project_type}}` - Type de projet
   - `{{message}}` - Message
4. Copiez les IDs dans votre `.env`

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
```

## 🚀 Options de déploiement

### Option 1: Netlify (Recommandé)

1. Connectez votre repo GitHub à Netlify
2. Configuration :
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Ajoutez les variables d'environnement dans Netlify

Fichier `netlify.toml` (créez-le à la racine) :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 2: Vercel

1. Importez le projet sur Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

Fichier `vercel.json` (créez-le à la racine) :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Option 3: Serveur Apache/Nginx

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

## 🧪 Test avant déploiement

```bash
# Preview du build
npm run preview
```

Ouvrez http://localhost:4173 et vérifiez :
- Navigation fonctionne
- Formulaire de contact
- Responsive design
- Pas d'erreurs console

## 📱 PWA (Optionnel)

Pour transformer le site en PWA, installez le plugin Vite PWA :

```bash
npm install -D vite-plugin-pwa
```

## 🔐 Sécurité

- Variables sensibles dans `.env` (non committé)
- HTTPS obligatoire en production
- Headers de sécurité (CSP, X-Frame-Options)

## 📞 Support

Pour toute question technique, contactez l'équipe de développement.
