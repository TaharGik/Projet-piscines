# 🔧 Guide de Dépannage - Formulaire de Contact sur Vercel

## Problème : Email non reçu après soumission du formulaire

### ✅ Checklist de Diagnostic

#### 1. Vérifier les Variables d'Environnement sur Vercel

Connectez-vous à votre dashboard Vercel :

```
https://vercel.com/votre-username/piscines-idf/settings/environment-variables
```

**Variables OBLIGATOIRES** :

| Variable | Type | Exemple | Où la trouver |
|----------|------|---------|---------------|
| `VITE_HCAPTCHA_SITE_KEY` | Public | `10000000-ffff-ffff-ffff-000000000001` | https://dashboard.hcaptcha.com/sites |
| `HCAPTCHA_SECRET_KEY` | Secret | `0x0000000000000000000000000000000000000000` | https://dashboard.hcaptcha.com/settings |
| `BREVO_API_KEY` | Secret | `xkeysib-xxx...` | https://app.brevo.com/settings/keys/api |
| `CONTACT_EMAIL` | Public | `bbhservice25@gmail.com` | Votre email |
| `ALLOWED_ORIGIN` | Public | `https://votre-site.vercel.app` | URL de votre site |
| `VITE_SITE_URL` | Public | `https://votre-site.vercel.app` | URL de votre site |

**Important** : Après avoir ajouté les variables, **redéployez le site** !

---

#### 2. Vérifier les Logs de la Function Serverless

1. Allez sur https://vercel.com/votre-username/piscines-idf
2. Cliquez sur **Deployments**
3. Cliquez sur le dernier déploiement
4. Cliquez sur **Functions** > **quote**
5. Consultez les **Logs**

**Que chercher ?**
- ❌ Erreurs 500 → Problème dans le code
- ❌ "BREVO_API_KEY is not defined" → Variable manquante
- ❌ "Unauthorized" → Clé Brevo invalide
- ✅ Status 200 → Tout fonctionne !

---

#### 3. Vérifier la Configuration Brevo

Connectez-vous à https://app.brevo.com/

**A. Vérifier la Clé API**
1. Settings > SMTP & API > API Keys
2. Vérifiez que la clé existe et est active
3. Créez-en une nouvelle si nécessaire

**B. Vérifier l'Email Expéditeur**
1. Senders > Emails
2. Vérifiez qu'un email expéditeur est validé
3. Si non validé, cliquez sur "Validate"

**C. Tester l'API Brevo**

```bash
curl -X POST https://api.brevo.com/v3/smtp/email \
  -H "api-key: VOTRE_CLE_BREVO" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": {"name": "Test", "email": "votre-expediteur@exemple.com"},
    "to": [{"email": "votre-destination@exemple.com"}],
    "subject": "Test API Brevo",
    "textContent": "Ceci est un test"
  }'
```

Si ça ne fonctionne pas, le problème vient de Brevo.

---

#### 4. Vérifier hCaptcha

1. Allez sur https://dashboard.hcaptcha.com/sites
2. Vérifiez que votre site est bien configuré
3. Vérifiez que le domaine autorisé correspond à votre URL Vercel
4. Si vous testez en local, ajoutez `localhost` aux domaines

---

#### 5. Tester Manuellement l'API

**Avec curl :**

```bash
curl -X POST https://votre-site.vercel.app/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0123456789",
    "city": "Paris",
    "projectType": "nouvelle-piscine",
    "message": "Message de test",
    "captchaToken": "test_token_manual"
  }'
```

**Réponse attendue si tout fonctionne** :
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès."
}
```

**Réponses d'erreur courantes** :

| Erreur | Cause | Solution |
|--------|-------|----------|
| 400 "Captcha token manquant" | Token absent | Vérifier le formulaire |
| 401 "Unauthorized" | Clé Brevo invalide | Vérifier BREVO_API_KEY |
| 403 "CORS error" | Origin non autorisée | Vérifier ALLOWED_ORIGIN |
| 429 "Too many requests" | Rate limiting | Attendre 10 minutes |
| 500 "Internal error" | Erreur serveur | Consulter les logs Vercel |

---

### 🛠️ Solutions aux Problèmes Courants

#### ❌ Problème 1 : "Variables d'environnement non définies"

**Symptôme** : L'email n'est pas envoyé, logs montrent "undefined"

**Solution** :
1. Vérifiez que TOUTES les variables sont dans Vercel Settings > Environment Variables
2. Cochez "Production", "Preview" et "Development"
3. **Redéployez** : Settings > Deployments > ... > Redeploy

#### ❌ Problème 2 : "Brevo API returns 401 Unauthorized"

**Symptôme** : Logs montrent "Unauthorized" ou "Invalid API key"

**Solution** :
1. Regénérez une nouvelle clé API sur Brevo
2. Copiez-la dans Vercel (BREVO_API_KEY)
3. Redéployez

#### ❌ Problème 3 : "CORS Error"

**Symptôme** : Console du navigateur montre "CORS policy blocked"

**Solution** :
1. Vérifiez que `ALLOWED_ORIGIN` contient l'URL exacte de votre site
2. Pas de slash à la fin : `https://site.vercel.app` ✅ (pas `https://site.vercel.app/` ❌)
3. Redéployez

#### ❌ Problème 4 : "hCaptcha verification failed"

**Symptôme** : Logs montrent "Captcha verification failed"

**Solution** :
1. Vérifiez `HCAPTCHA_SECRET_KEY` dans Vercel
2. Vérifiez que le domaine est autorisé dans hCaptcha dashboard
3. Redéployez

#### ❌ Problème 5 : "Email expéditeur non validé"

**Symptôme** : Brevo refuse d'envoyer

**Solution** :
1. Allez sur Brevo > Senders > Emails
2. Validez votre email expéditeur
3. Cliquez sur le lien dans l'email de validation

---

### 🔍 Commandes de Débogage

#### Vérifier le Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Vérifier les variables d'environnement
vercel env ls

# Afficher une variable spécifique
vercel env pull .env.local
cat .env.local
```

#### Tester la Function en Local

```bash
# Lancer Vercel en local
vercel dev

# Dans un autre terminal, tester
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "phone": "0123456789",
    "city": "Paris",
    "projectType": "nouvelle-piscine",
    "message": "Test local",
    "captchaToken": "test"
  }'
```

---

### 📋 Checklist Finale

Avant de contacter le support, vérifiez :

- [ ] Toutes les variables d'environnement sont sur Vercel
- [ ] Les variables sont cochées "Production"
- [ ] Le site a été redéployé après ajout des variables
- [ ] La clé API Brevo est valide (testée avec curl)
- [ ] L'email expéditeur est validé sur Brevo
- [ ] hCaptcha est configuré pour le bon domaine
- [ ] ALLOWED_ORIGIN correspond à l'URL du site
- [ ] Les logs Vercel ne montrent pas d'erreur
- [ ] Le formulaire affiche bien le hCaptcha

---

### 🆘 Obtenir de l'Aide

#### Logs Vercel
```
https://vercel.com/votre-username/piscines-idf/deployments
→ Cliquez sur le dernier déploiement
→ Functions → quote → Logs
```

#### Tester l'API Directement
```
https://votre-site.vercel.app/api/quote
```

Si l'API retourne une erreur ou ne répond pas, le problème vient de la configuration Vercel.

---

### ✅ Étapes de Résolution Rapide

**1. Première chose à faire** :
- Allez sur Vercel Dashboard
- Settings > Environment Variables
- Vérifiez que BREVO_API_KEY et HCAPTCHA_SECRET_KEY sont présentes
- Si manquantes, ajoutez-les
- **REDÉPLOYEZ** le site

**2. Deuxième chose** :
- Allez sur https://app.brevo.com/settings/keys/api
- Vérifiez que la clé existe et est active
- Testez avec curl (voir section 3)

**3. Troisième chose** :
- Consultez les logs sur Vercel
- Cherchez "error" ou "failed"
- Corrigez l'erreur spécifique

---

### 🎯 Test de Validation Final

Une fois tout configuré :

1. Allez sur votre site : https://votre-site.vercel.app/contact
2. Remplissez le formulaire
3. Validez le hCaptcha
4. Cliquez sur "Envoyer"
5. Vous devriez voir "Votre demande a été envoyée avec succès !"
6. Vérifiez votre boîte mail (CONTACT_EMAIL)
7. L'email devrait arriver dans les 2-3 minutes

Si ça ne fonctionne toujours pas, **partagez les logs Vercel** pour un diagnostic plus précis.
