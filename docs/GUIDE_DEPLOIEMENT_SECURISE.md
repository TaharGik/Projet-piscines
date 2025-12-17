# 🚀 Guide de déploiement sécurisé - Aqua Prestige

Ce guide explique comment configurer et déployer le site avec le formulaire de contact sécurisé.

## 📋 Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Frontend      │────▶│  API Serverless  │────▶│   Brevo     │
│   (React/Vite)  │     │  (/api/quote)    │     │  (Emails)   │
└─────────────────┘     └──────────────────┘     └─────────────┘
        │                       │
        ▼                       ▼
   ┌─────────┐            ┌──────────┐
   │ hCaptcha │            │ Rate     │
   │ (anti-bot)│           │ Limiting │
   └─────────┘            └──────────┘
```

## 1️⃣ Configurer hCaptcha

### Créer un compte hCaptcha

1. Allez sur [hcaptcha.com](https://www.hcaptcha.com/)
2. Créez un compte gratuit
3. Ajoutez un nouveau site :
   - **Nom** : Aqua Prestige
   - **Domaine** : `aqua-prestige.fr` (et `localhost` pour le dev)

### Récupérer les clés

- **Site Key** (publique) → `VITE_HCAPTCHA_SITE_KEY`
- **Secret Key** (secrète) → `HCAPTCHA_SECRET_KEY`

## 2️⃣ Configurer Brevo (ex-Sendinblue)

### Créer un compte Brevo

1. Allez sur [brevo.com](https://www.brevo.com/)
2. Créez un compte gratuit (300 emails/jour inclus)
3. Vérifiez votre domaine email (recommandé pour éviter le spam)

### Récupérer la clé API

1. **Mon compte** → **SMTP & API** → **Clés API**
2. Créez une nouvelle clé API
3. Copiez la clé → `BREVO_API_KEY`

### Configurer l'expéditeur

1. **Paramètres** → **Expéditeurs & IP**
2. Ajoutez un expéditeur vérifié : `noreply@aqua-prestige.fr`

## 3️⃣ Déployer sur Vercel

### Prérequis

- Compte GitHub avec le repo du projet
- Compte Vercel (gratuit)

### Étapes

1. Connectez-vous à [vercel.com](https://vercel.com/)
2. Importez votre repo GitHub
3. **Framework Preset** : Vite
4. **Build Command** : `npm run build`
5. **Output Directory** : `dist`

### Variables d'environnement

Dans **Settings** → **Environment Variables**, ajoutez :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `VITE_HCAPTCHA_SITE_KEY` | `votre_cle_publique` | Production |
| `HCAPTCHA_SECRET_KEY` | `votre_cle_secrete` | Production |
| `BREVO_API_KEY` | `votre_cle_brevo` | Production |
| `CONTACT_EMAIL` | `bbhservice25@gmail.com` | Production |
| `ALLOWED_ORIGIN` | `https://www.aqua-prestige.fr` | Production |
| `VITE_GA_TRACKING_ID` | `G-XXXXXXXXXX` | Production |

### Déployer

```bash
# Via CLI
npm i -g vercel
vercel --prod

# Ou via l'interface web (push sur main)
git push origin main
```

## 4️⃣ Alternative : Netlify

### Configuration

1. Importez depuis GitHub sur [netlify.com](https://netlify.com/)
2. **Build command** : `npm run build`
3. **Publish directory** : `dist`

### Adapter l'API

Pour Netlify, l'API doit être dans `/netlify/functions/` :

```bash
# Structure Netlify
/netlify
  /functions
    quote.js  # Copie de /api/quote.js avec adaptations
```

**Modifications pour Netlify Functions :**

```javascript
// netlify/functions/quote.js
export const handler = async (event, context) => {
  // Adapter le handler pour Netlify
  const body = JSON.parse(event.body);
  // ... reste du code
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
```

## 5️⃣ Tester localement

### Installer Vercel CLI

```bash
npm i -g vercel
```

### Lancer le dev avec les functions

```bash
vercel dev
```

Cela va :
- Démarrer Vite sur le frontend
- Démarrer les serverless functions dans `/api`

### Variables d'env locales

Créez un fichier `.env.local` (non commité) :

```env
VITE_HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001
HCAPTCHA_SECRET_KEY=0x0000000000000000000000000000000000000000
BREVO_API_KEY=votre_cle_brevo
CONTACT_EMAIL=votre@email.com
```

> La clé `10000000-ffff-ffff-ffff-000000000001` est une clé de test hCaptcha qui valide toujours.

## 6️⃣ Sécurité

### ✅ Ce qui est protégé

- **Rate limiting** : 5 requêtes / 10 min / IP
- **CAPTCHA** : Protection anti-bot
- **Validation serveur** : Toutes les données sont re-validées
- **Clés API** : Jamais exposées côté client
- **CORS** : Origines autorisées uniquement

### ⚠️ Recommandations supplémentaires

1. **En production** : Utilisez Redis (Upstash) pour le rate limiting persistant
2. **Logs** : Activez les logs Vercel pour surveiller les abus
3. **Domaine** : Configurez SPF/DKIM pour les emails (Brevo vous guide)

## 7️⃣ Checklist déploiement

- [ ] Compte hCaptcha créé
- [ ] Clés hCaptcha récupérées
- [ ] Compte Brevo créé
- [ ] Clé API Brevo générée
- [ ] Expéditeur Brevo vérifié
- [ ] Variables d'env configurées sur Vercel
- [ ] Domaine personnalisé configuré
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Test formulaire en production
- [ ] Google Analytics configuré

## 📞 Support

En cas de problème :
- Vérifiez les logs Vercel : **Deployments** → **Functions**
- Testez l'API directement : `curl -X POST https://votre-site.vercel.app/api/quote`
- Vérifiez les quotas Brevo : **Tableau de bord** → **Statistiques**
