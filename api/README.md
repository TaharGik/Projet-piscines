# API Quote - Documentation

## 🎯 Fonction

API serverless pour la gestion des demandes de devis. Déployée automatiquement sur Vercel.

## 🔒 Sécurité

### Protection implémentée

- ✅ **Rate limiting** : 5 requêtes max par IP toutes les 10 minutes
- ✅ **CAPTCHA** : Vérification hCaptcha optionnelle
- ✅ **Validation stricte** : Tous les champs validés contre des listes blanches
- ✅ **Sanitization XSS** : Échappement HTML de toutes les entrées utilisateur
- ✅ **Headers sécurité** : CSP, X-Frame-Options, X-XSS-Protection
- ✅ **CORS strict** : Origines autorisées uniquement
- ✅ **Timeout** : 10 secondes max sur les requêtes externes
- ✅ **Retry logic** : 3 tentatives sur erreurs serveur/timeout

### Variables d'environnement requises

```env
# Obligatoires
BREVO_API_KEY=your_brevo_api_key
CONTACT_EMAIL=contact@votre-domaine.com

# Optionnelles
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret  # Si CAPTCHA activé
SITE_URL=https://votre-domaine.com
ALLOWED_ORIGIN=https://votre-domaine.com
NODE_ENV=production
```

## 📧 Système d'emails

### 2 emails envoyés automatiquement

1. **Notification à l'entreprise** (priorité business)
   - Résumé du projet en une ligne
   - Coordonnées du client (tel cliquable)
   - Message mis en valeur
   - Détails techniques traduits en français
   - CTA clair : "Appeler sous 48h"

2. **Confirmation au client**
   - Accusé de réception immédiat
   - Engagement de réponse sous 48h
   - Lien vers les réalisations

### Labels traduits

Toutes les valeurs techniques sont automatiquement traduites en français lisible :

| Technique | Humain |
|-----------|--------|
| `conception-installation` | "Conception & installation complète" |
| `beton` | "Béton (structure traditionnelle)" |
| `small` | "Petite (moins de 20 m²)" |
| `flat-easy` | "✅ Terrain plat, accès facile" |
| `under15k` | "Moins de 15 000 €" |
| `urgent` | "🔴 Urgent (moins de 2 mois)" |

## 🏗️ Architecture

```
api/quote.js
├── Configuration (CONFIG)
├── Labels (LABELS)
├── Fonctions utilitaires
│   ├── sanitizeString()
│   ├── checkRateLimit()
│   ├── fetchWithTimeout()
│   ├── verifyCaptcha()
│   ├── validateFormData()
│   ├── getLabel()
│   ├── generateProjectSummary()
│   └── sendEmailViaBrevo()
├── sendEmails()
└── handler() [export default]
```

## 📝 Validation des données

### Champs obligatoires

- **name** : 2-100 caractères
- **email** : Format RFC valide, max 254 caractères
- **phone** : Format français uniquement
- **projectType** : Liste blanche (nouvelle-piscine, renovation, entretien, autre)
- **message** : 10-2000 caractères

### Données wizard (optionnelles mais validées)

- **serviceType** : Liste blanche des services
- **poolType** : Liste blanche des types de piscine
- **dimensions** : Liste blanche des tailles
- **terrain** : Liste blanche des terrains
- **budget** : Liste blanche des fourchettes
- **timeline** : Liste blanche des délais
- **postalCode** : 5 chiffres (format français)

## 🔧 Maintenance

### Ajouter un nouveau type de service

1. Ajouter dans `LABELS.serviceType`
2. Tester la validation
3. Vérifier l'email généré

### Modifier le contenu des emails

Templates HTML inline dans `sendEmails()` :
- `notificationEmail` : Email entreprise
- `confirmationEmail` : Email client

### Monitoring

Logs structurés avec émojis :
- ✅ Succès
- ⚠️ Warnings  
- ❌ Erreurs
- ℹ️ Info

```javascript
console.log('📬 Nouvelle demande de devis', { ip, timestamp, hasWizardData });
console.warn('⚠️ Rate limit dépassé:', ip);
console.error('❌ Échec envoi email');
```

## 🚀 Performance

- **Rate limiting en mémoire** : Ultra-rapide mais reset au redéploiement
  - Pour production : migrer vers Redis/Upstash
- **Promise.all** : Envoi parallèle des 2 emails
- **Retry automatique** : Fiabilité accrue
- **Timeout** : Évite les requêtes zombies
- **Cache preflight** : 24h (CORS)

## 🧪 Tests

### Test local

```bash
# Envoyer une requête test
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "0612345678",
    "city": "Versailles",
    "projectType": "nouvelle-piscine",
    "message": "Bonjour, je souhaite un devis pour une piscine."
  }'
```

### Test wizard

```bash
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marie Martin",
    "email": "marie@example.com",
    "phone": "0612345678",
    "city": "Saint-Germain-en-Laye",
    "projectType": "nouvelle-piscine",
    "message": "Demande via wizard",
    "wizardData": {
      "serviceType": "conception-installation",
      "poolType": "beton",
      "dimensions": "medium",
      "terrain": "flat-easy",
      "budget": "25to40k",
      "timeline": "normal",
      "postalCode": "78100"
    }
  }'
```

## 📊 Métriques

Indicateurs à surveiller en production :
- Taux de succès des emails
- Temps de réponse moyen
- Taux de rate limiting
- Taux d'échec CAPTCHA
- Erreurs Brevo

---

**Dernière mise à jour** : 8 janvier 2026
**Version** : 2.0.0
**Statut** : ✅ Production-ready
