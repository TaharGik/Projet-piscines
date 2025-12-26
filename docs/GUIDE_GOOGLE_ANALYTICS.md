# Guide : Configurer Google Analytics 4 (GA4)

## 📊 Pourquoi Google Analytics ?

Google Analytics vous permet de :
- 📈 Mesurer le trafic de votre site
- 👥 Comprendre le comportement des visiteurs
- 📍 Savoir d'où viennent vos visiteurs
- 🎯 Mesurer l'efficacité de vos actions marketing
- 📞 Tracker les conversions (formulaires, clics téléphone)

---

## 🚀 Étape 1 : Créer un Compte Google Analytics

### 1.1 Accéder à Google Analytics

1. Aller sur https://analytics.google.com/
2. Se connecter avec votre compte Google
3. Cliquer sur **Commencer**

### 1.2 Créer un Compte

1. Cliquer sur **Créer un compte**
2. Entrer les informations :
   - **Nom du compte** : `BBH SERVICE`
   - Cocher les options de partage de données (optionnel)
3. Cliquer sur **Suivant**

### 1.3 Créer une Propriété

1. **Nom de la propriété** : `Site Web BBH SERVICE`
2. **Fuseau horaire** : `(GMT+01:00) Paris`
3. **Devise** : `EUR - Euro (€)`
4. Cliquer sur **Suivant**

### 1.4 Informations sur l'Entreprise

1. **Secteur d'activité** : Construction
2. **Taille de l'entreprise** : 1-10 employés
3. **Comment comptez-vous utiliser Google Analytics ?**
   - ✅ Examiner le comportement des clients
   - ✅ Mesurer les performances marketing
4. Cliquer sur **Créer**
5. Accepter les conditions d'utilisation

---

## 🔧 Étape 2 : Configurer le Flux de Données

### 2.1 Choisir la Plateforme

1. Sélectionner **Web**
2. Entrer les informations :
   - **URL du site Web** : `https://www.bbhservice.fr`
   - **Nom du flux** : `Site Principal`
   - ✅ Activer **Mesure améliorée**
3. Cliquer sur **Créer un flux**

### 2.2 Récupérer l'ID de Mesure

Vous verrez apparaître votre **ID de mesure** :

```
G-XXXXXXXXXX
```

**📝 Notez cet ID**, vous en aurez besoin pour la configuration.

---

## ⚙️ Étape 3 : Configurer le Projet

### 3.1 Ajouter l'ID dans `.env`

Ouvrir le fichier `.env` à la racine et ajouter :

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

Remplacer `G-XXXXXXXXXX` par votre vrai ID.

### 3.2 Redémarrer le Serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Redémarrer
npm run dev
```

### 3.3 Vérifier l'Intégration

1. Ouvrir la console du navigateur (F12)
2. Vous devriez voir :
   ```
   ✅ Google Analytics initialisé: G-XXXXXXXXXX
   📊 GA4 - Page vue: /
   ```

---

## 🧪 Étape 4 : Tester le Tracking

### 4.1 Test en Temps Réel

1. Aller sur Google Analytics
2. Cliquer sur **Rapports** (sidebar gauche)
3. Cliquer sur **Temps réel**
4. Naviguer sur votre site local (localhost:5173)
5. Vous devriez voir **1 utilisateur actif** apparaître

### 4.2 Événements à Tester

| Action | Événement GA4 | Comment tester |
|--------|---------------|----------------|
| Visiter la page d'accueil | `page_view` | Aller sur `/` |
| Cliquer "Demander un devis" | `button_click` | Cliquer sur le CTA |
| Voir un projet | `project_view` | Cliquer sur un projet |
| Soumettre le formulaire | `form_submit` | Remplir le formulaire |
| Cliquer sur le téléphone | `contact_phone` | Cliquer sur le numéro |

---

## 📈 Étape 5 : Configurer des Événements Personnalisés

Les événements sont déjà configurés dans le hook `useGoogleAnalytics.js`. Voici comment les utiliser :

### 5.1 Dans un Composant

```jsx
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

const MonComposant = () => {
  const { trackButtonClick } = useGoogleAnalytics();

  const handleClick = () => {
    trackButtonClick('Demander un devis', 'Hero');
    // ... votre logique
  };

  return (
    <button onClick={handleClick}>
      Demander un devis
    </button>
  );
};
```

### 5.2 Tracking du Formulaire

Dans `ContactForm.jsx`, ajouter après l'envoi réussi :

```jsx
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

const ContactForm = () => {
  const { trackFormSubmit } = useGoogleAnalytics();

  const handleSubmit = async (e) => {
    // ... code existant

    // Après envoi réussi
    trackFormSubmit('contact', formData.projectType);
  };

  // ...
};
```

### 5.3 Tracking des Projets

Dans `ProjectCard.jsx` :

```jsx
import { Link } from 'react-router-dom';
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';

const ProjectCard = ({ project }) => {
  const { trackProjectClick } = useGoogleAnalytics();

  const handleClick = () => {
    trackProjectClick(project.name, project.type);
  };

  return (
    <Link 
      to={`/realisations/${project.slug}`}
      onClick={handleClick}
    >
      {/* ... */}
    </Link>
  );
};
```

---

## 📊 Étape 6 : Configurer les Conversions

### 6.1 Marquer des Événements comme Conversions

1. Aller dans **Admin** (roue dentée en bas à gauche)
2. Cliquer sur **Événements** (colonne Propriété)
3. Trouver l'événement `form_submit`
4. Activer **Marquer comme conversion**

Répéter pour :
- `contact_phone`
- `contact_email`

### 6.2 Créer un Objectif

1. Aller dans **Admin** > **Conversions**
2. Cliquer sur **Nouvel événement de conversion**
3. Nom : `devis_demande`
4. Conditions : `form_submit` avec `project_type` = `nouvelle-piscine`

---

## 🎯 Étape 7 : Rapports Utiles

### 7.1 Acquisition

**Rapports** > **Acquisition** > **Aperçu**

Voir d'où viennent vos visiteurs :
- Recherche organique (Google)
- Réseaux sociaux
- Liens directs
- Référents

### 7.2 Engagement

**Rapports** > **Engagement** > **Pages et écrans**

Pages les plus visitées :
- `/` (Accueil)
- `/realisations`
- `/contact`

### 7.3 Conversions

**Rapports** > **Conversions**

Nombre de formulaires soumis, clics téléphone, etc.

### 7.4 Données Démographiques

**Rapports** > **Utilisateurs** > **Données démographiques**

- Âge
- Sexe
- Centres d'intérêt

### 7.5 Localisation

**Rapports** > **Utilisateurs** > **Technologie** > **Ville**

Voir les villes d'Île-de-France les plus représentées.

---

## 🔒 Conformité RGPD

### 7.1 Anonymisation IP

Par défaut, GA4 anonymise les IP (conforme RGPD).

### 7.2 Bannière de Cookies (Optionnel)

Pour être 100% conforme, ajouter une bannière de consentement :

**Option 1 : Simple**

Ajouter un bandeau en bas de page :

```jsx
// src/components/CookieBanner.jsx
const CookieBanner = () => {
  const [accepted, setAccepted] = useState(
    localStorage.getItem('cookies_accepted') === 'true'
  );

  if (accepted) return null;

  const handleAccept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container-custom flex justify-between items-center">
        <p className="text-sm">
          Ce site utilise des cookies pour améliorer votre expérience.
        </p>
        <button onClick={handleAccept} className="btn-primary">
          Accepter
        </button>
      </div>
    </div>
  );
};
```

**Option 2 : Avancée**

Utiliser une bibliothèque comme :
- `react-cookie-consent`
- `cookie-consent-box`

---

## 📱 Étape 8 : Déploiement en Production

### 8.1 Netlify

1. Aller dans **Site settings** > **Environment variables**
2. Ajouter `VITE_GA_TRACKING_ID` avec votre ID
3. Redéployer

### 8.2 Vercel

1. **Settings** > **Environment Variables**
2. Ajouter `VITE_GA_TRACKING_ID`
3. Redéployer

### 8.3 Vérifier en Production

1. Aller sur votre site en production
2. Ouvrir Google Analytics > Temps réel
3. Vous devriez voir l'activité

---

## 🛠️ Dépannage

### GA4 ne détecte pas les visites

- Vérifier que `VITE_GA_TRACKING_ID` est bien défini
- Vérifier dans la console : `✅ Google Analytics initialisé`
- Désactiver les bloqueurs de pub
- Attendre 24-48h pour voir les données (hors temps réel)

### Événements non trackés

- Vérifier la console : `📊 GA4 - Événement: ...`
- Aller dans GA4 > Temps réel > Événement par nom d'événement
- Les événements personnalisés peuvent prendre 24h à apparaître

### Données incohérentes

- Mode de développement compte aussi (localhost)
- Exclure votre IP dans GA4 : **Admin** > **Filtres de données**

---

## 📊 KPIs à Suivre

| KPI | Objectif | Comment mesurer |
|-----|----------|-----------------|
| **Visiteurs uniques/mois** | > 500 | Rapports > Engagement |
| **Taux de rebond** | < 50% | Rapports > Engagement > Pages |
| **Durée moyenne de session** | > 2 min | Rapports > Engagement |
| **Formulaires soumis/mois** | > 10 | Rapports > Conversions |
| **Pages vues par session** | > 3 | Rapports > Engagement |

---

## ✅ Checklist Finale

- [ ] Compte Google Analytics créé
- [ ] Propriété GA4 configurée
- [ ] ID de mesure récupéré (G-XXXXXXXXXX)
- [ ] Variable `VITE_GA_TRACKING_ID` ajoutée dans `.env`
- [ ] Serveur redémarré
- [ ] Test en temps réel : OK
- [ ] Événements personnalisés intégrés
- [ ] Conversions configurées
- [ ] Variables d'environnement en production
- [ ] Bannière cookies (optionnel)

---

*Avec Google Analytics configuré, vous pouvez maintenant mesurer le succès de votre site ! 📈*
