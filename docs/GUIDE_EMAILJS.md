# Guide : Configurer EmailJS

## 📧 Qu'est-ce qu'EmailJS ?

EmailJS est un service qui permet d'envoyer des emails directement depuis le frontend sans backend. Parfait pour les formulaires de contact sur sites statiques.

**Avantages :**
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Pas besoin de backend/serveur
- ✅ Configuration simple
- ✅ Support Gmail, Outlook, Yahoo, etc.

---

## 🚀 Étape 1 : Créer un Compte EmailJS

1. Aller sur https://www.emailjs.com/
2. Cliquer sur **Sign Up** (gratuit)
3. Créer un compte avec votre email
4. Confirmer l'email de vérification

---

## 📮 Étape 2 : Ajouter un Service Email

### Option A : Gmail (Recommandé)

1. Dans le dashboard EmailJS, cliquer sur **Add New Service**
2. Choisir **Gmail**
3. Cliquer sur **Connect Account**
4. Autoriser EmailJS à accéder à votre compte Gmail
5. Votre service est créé ! Notez le **Service ID** (ex: `service_abc1234`)

### Option B : Outlook/Hotmail

1. Choisir **Outlook.com**
2. Suivre les mêmes étapes que Gmail

### Option C : SMTP Personnel

1. Choisir **Other** > **SMTP**
2. Entrer les paramètres SMTP de votre hébergeur
3. Tester la connexion

---

## 📝 Étape 3 : Créer un Template d'Email

1. Aller dans **Email Templates**
2. Cliquer sur **Create New Template**
3. Nommer le template : `aqua_prestige_contact`

### Template HTML

Copier ce code dans l'éditeur :

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .header {
      background: #0284c7;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      padding: 20px;
      background: #f9f9f9;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #0284c7;
    }
    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouvelle demande de devis - Aqua Prestige</h1>
    </div>
    
    <div class="content">
      <p>Bonjour,</p>
      <p>Vous avez reçu une nouvelle demande de devis via le site Aqua Prestige.</p>
      
      <div class="field">
        <span class="label">Nom :</span> {{from_name}}
      </div>
      
      <div class="field">
        <span class="label">Email :</span> {{from_email}}
      </div>
      
      <div class="field">
        <span class="label">Téléphone :</span> {{phone}}
      </div>
      
      <div class="field">
        <span class="label">Ville :</span> {{city}}
      </div>
      
      <div class="field">
        <span class="label">Type de projet :</span> {{project_type}}
      </div>
      
      <div class="field">
        <span class="label">Message :</span><br>
        <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 5px;">
          {{message}}
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>Cet email a été envoyé automatiquement depuis le formulaire de contact du site Aqua Prestige.</p>
      <p>Date : {{current_date}}</p>
    </div>
  </div>
</body>
</html>
```

### Paramètres du Template

- **To Email** : Votre email professionnel (ex: `contact@aqua-prestige.fr`)
- **From Name** : `Aqua Prestige - Contact`
- **Subject** : `Nouvelle demande de devis - {{from_name}}`
- **Reply To** : `{{from_email}}` (pour répondre directement au client)

### Variables à configurer

EmailJS remplacera automatiquement ces variables :

| Variable | Source | Description |
|----------|--------|-------------|
| `{{from_name}}` | Champ `name` du formulaire | Nom du client |
| `{{from_email}}` | Champ `email` | Email du client |
| `{{phone}}` | Champ `phone` | Téléphone |
| `{{city}}` | Champ `city` | Ville |
| `{{project_type}}` | Champ `projectType` | Type de projet |
| `{{message}}` | Champ `message` | Message libre |

4. Cliquer sur **Save** et notez le **Template ID** (ex: `template_xyz5678`)

---

## 🔑 Étape 4 : Récupérer la Clé Publique

1. Aller dans **Account** > **General**
2. Trouver la section **Public Key**
3. Copier la clé (ex: `abc123XYZ456`)

---

## ⚙️ Étape 5 : Configurer le Projet

### Créer le fichier `.env`

À la racine du projet `piscines-idf/`, créer un fichier `.env` :

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=abc123XYZ456

# URL du site
VITE_SITE_URL=https://www.aqua-prestige.fr

# Google Analytics (optionnel)
VITE_GA_TRACKING_ID=
```

**⚠️ Important :**
- Remplacer les valeurs par vos vraies clés EmailJS
- Ne **jamais** commiter le fichier `.env` sur Git
- Le fichier `.env` est déjà dans `.gitignore`

### Vérifier que ça fonctionne

1. Redémarrer le serveur de développement :

```bash
npm run dev
```

2. Ouvrir la console du navigateur
3. Vérifier qu'il n'y a plus le message :
   > ⚠️ EmailJS n'est pas configuré

4. Tester le formulaire de contact
5. Vérifier la réception de l'email

---

## 🧪 Test du Formulaire

### En local (développement)

```bash
# Démarrer le serveur
npm run dev

# Ouvrir http://localhost:5173/contact
# Remplir le formulaire
# Vérifier votre boîte email
```

### En production

Après déploiement, ajouter les variables d'environnement sur la plateforme :

#### Netlify

1. Aller dans **Site settings** > **Environment variables**
2. Ajouter :
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

#### Vercel

1. Aller dans **Settings** > **Environment Variables**
2. Ajouter les mêmes variables

---

## 🎨 Personnalisation Avancée

### Auto-réponse au client

Créer un deuxième template pour envoyer une confirmation au client :

1. Créer un nouveau template `aqua_prestige_auto_reply`
2. **To Email** : `{{from_email}}` (email du client)
3. **Subject** : `Votre demande a bien été reçue - Aqua Prestige`
4. Contenu :

```html
<p>Bonjour {{from_name}},</p>

<p>Nous avons bien reçu votre demande concernant : <strong>{{project_type}}</strong>.</p>

<p>Notre équipe va étudier votre projet et vous contactera sous 48 heures ouvrées.</p>

<p>En attendant, n'hésitez pas à consulter nos réalisations sur notre site.</p>

<p>Cordialement,<br>
L'équipe Aqua Prestige</p>
```

Puis modifier `ContactForm.jsx` pour envoyer 2 emails :

```javascript
// Email 1 : À l'entreprise
await emailjs.sendForm(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  formRef.current,
  EMAILJS_PUBLIC_KEY
);

// Email 2 : Auto-réponse au client
await emailjs.sendForm(
  EMAILJS_SERVICE_ID,
  'template_auto_reply_id', // Nouveau template
  formRef.current,
  EMAILJS_PUBLIC_KEY
);
```

---

## 📊 Suivi des Emails

Dans le dashboard EmailJS :
- **Email Log** : Voir tous les emails envoyés
- **Statistics** : Nombre d'emails/mois
- **Quota** : 200 emails/mois gratuits

Si besoin de plus : passer au plan payant (5$/mois pour 1000 emails).

---

## 🐛 Dépannage

### Erreur : "User is not defined"

- Vérifier que la clé publique est correcte
- Vérifier que le service est actif

### Erreur : "Template not found"

- Vérifier le Template ID
- S'assurer que le template est sauvegardé

### Emails non reçus

- Vérifier les spams
- Vérifier que le service Gmail est bien connecté
- Tester avec un autre email

### Mode démo qui persiste

- Vérifier que le fichier `.env` existe à la racine
- Redémarrer `npm run dev`
- Vérifier dans la console que les variables sont chargées

---

## ✅ Checklist Finale

- [ ] Compte EmailJS créé
- [ ] Service email connecté (Gmail/Outlook)
- [ ] Template créé et testé
- [ ] Clé publique récupérée
- [ ] Fichier `.env` créé avec les 3 clés
- [ ] Serveur dev redémarré
- [ ] Formulaire testé en local
- [ ] Email reçu avec succès
- [ ] Variables d'environnement ajoutées sur Netlify/Vercel

---

*Avec EmailJS configuré, votre formulaire de contact est 100% fonctionnel ! 🎉*
