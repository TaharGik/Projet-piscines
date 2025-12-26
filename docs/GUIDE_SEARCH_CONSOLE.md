# Guide : Google Search Console & Référencement

## 🔍 Qu'est-ce que Google Search Console ?

Google Search Console (GSC) est un outil gratuit de Google qui vous permet de :
- 📊 Surveiller la présence de votre site dans les résultats de recherche Google
- 🐛 Détecter et corriger les erreurs d'indexation
- 📈 Voir les mots-clés qui génèrent du trafic
- 🗺️ Soumettre votre sitemap pour une indexation rapide
- 📱 Vérifier la compatibilité mobile

---

## 🚀 Étape 1 : Ajouter Votre Site

### 1.1 Accéder à Search Console

1. Aller sur https://search.google.com/search-console/
2. Se connecter avec votre compte Google
3. Cliquer sur **Ajouter une propriété**

### 1.2 Choisir le Type de Propriété

**Option 1 : Préfixe d'URL** (Recommandé)

- Entrer : `https://www.bbhservice.fr`
- Permet de suivre uniquement ce sous-domaine

**Option 2 : Domaine**

- Entrer : `bbhservice.fr`
- Suit tous les sous-domaines (www, blog, etc.)

Cliquer sur **Continuer**

---

## ✅ Étape 2 : Vérifier la Propriété

Google propose plusieurs méthodes de vérification.

### Méthode 1 : Fichier HTML (Simple)

1. Télécharger le fichier `google[...].html`
2. Le placer dans `public/` de votre projet
3. Déployer votre site
4. Cliquer sur **Vérifier**

**Exemple :**
```
piscines-idf/
├── public/
│   ├── google1234567890abcdef.html  ← Fichier de vérification
│   └── ...
```

### Méthode 2 : Balise HTML Meta

1. Copier la balise meta fournie :
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXX" />
   ```

2. L'ajouter dans `index.html` :

```html
<head>
  <meta charset="UTF-8" />
  <meta name="google-site-verification" content="XXXXXXXXXXXXXXXX" />
  <!-- ... autres meta tags -->
</head>
```

3. Déployer et cliquer sur **Vérifier**

### Méthode 3 : Google Analytics

Si vous avez déjà configuré GA4 :
1. Sélectionner **Google Analytics**
2. Se connecter avec le même compte
3. Vérification automatique

### Méthode 4 : DNS (Pour propriété de type "Domaine")

1. Copier l'enregistrement TXT fourni
2. Aller dans les paramètres DNS de votre hébergeur
3. Ajouter un enregistrement TXT
4. Attendre la propagation (peut prendre jusqu'à 48h)
5. Cliquer sur **Vérifier**

---

## 🗺️ Étape 3 : Soumettre le Sitemap

### 3.1 Vérifier Votre Sitemap

Le fichier `public/sitemap.xml` est déjà créé dans votre projet. Vérifiez qu'il contient toutes vos pages :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.bbhservice.fr/</loc>
    <lastmod>2025-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- ... autres pages -->
</urlset>
```

### 3.2 Soumettre le Sitemap

1. Dans Google Search Console, aller dans **Sitemaps** (sidebar gauche)
2. Dans "Ajouter un sitemap", entrer : `sitemap.xml`
3. Cliquer sur **Envoyer**

Vous devriez voir :
- **État** : Réussite ✅
- **Pages découvertes** : 15 (nombre de pages)

### 3.3 Mettre à Jour le Sitemap (Quand Vous Ajoutez des Pages)

Après avoir ajouté de nouvelles pages :

1. Modifier `public/sitemap.xml`
2. Mettre à jour la date `<lastmod>`
3. Redéployer
4. Dans GSC, cliquer sur le sitemap > **Tester à nouveau**

---

## 📊 Étape 4 : Surveiller l'Indexation

### 4.1 Demander l'Indexation Immédiate

Pour indexer rapidement votre site :

1. Aller dans **Inspection de l'URL** (haut de page)
2. Entrer : `https://www.bbhservice.fr/`
3. Cliquer sur **Tester l'URL en direct**
4. Si "URL n'est pas sur Google", cliquer sur **Demander une indexation**
5. Répéter pour les pages importantes :
   - `/services`
   - `/realisations`
   - `/contact`

### 4.2 Vérifier l'État d'Indexation

**Couverture** (sidebar) :
- **Valides** : Pages indexées ✅
- **Exclues** : Pages non indexées (normal pour certaines)
- **Erreurs** : À corriger 🔴

**Objectif :** Toutes les pages principales doivent être "Valides".

---

## 🔧 Étape 5 : Optimiser pour le SEO

### 5.1 Vérifier les Core Web Vitals

1. Aller dans **Signaux Web essentiels**
2. Vérifier que vos pages sont dans la zone verte :
   - **LCP** (Largest Contentful Paint) : < 2.5s
   - **FID** (First Input Delay) : < 100ms
   - **CLS** (Cumulative Layout Shift) : < 0.1

### 5.2 Améliorer les Résultats

**Si des pages sont en orange/rouge :**

1. Aller dans **PageSpeed Insights** : https://pagespeed.web.dev/
2. Entrer l'URL de votre page
3. Suivre les recommandations :
   - Compresser les images
   - Minifier CSS/JS
   - Utiliser un CDN

### 5.3 Compatibilité Mobile

1. Aller dans **Ergonomie mobile**
2. S'assurer qu'il n'y a pas d'erreurs
3. Si erreurs :
   - Texte trop petit
   - Éléments cliquables trop proches
   - Contenu trop large

**Votre site est responsive, donc normalement aucun problème.**

---

## 📈 Étape 6 : Analyser les Performances

### 6.1 Rapport de Performances

**Performances** > **Résultats de recherche**

Vous verrez :
- **Clics totaux** : Nombre de visites depuis Google
- **Impressions** : Nombre d'apparitions dans les résultats
- **CTR moyen** : Taux de clic (objectif : > 2%)
- **Position moyenne** : Position dans les résultats (objectif : < 10)

### 6.2 Requêtes Principales

Dans le même rapport, descendez pour voir :

**Les requêtes qui génèrent du trafic :**
- "piscine sur mesure île-de-france"
- "pisciniste versailles"
- "construction piscine 78"

**Optimisation :**
- Si position > 10 : améliorer le contenu pour cette requête
- Si CTR < 2% : améliorer le titre et la meta description

### 6.3 Pages les Plus Vues

Onglet **Pages** :
- `/` : Page d'accueil
- `/realisations` : Portfolio
- `/contact` : Formulaire

**Action :** Optimiser les pages les plus vues en priorité.

---

## 🎯 Étape 7 : Optimisation Continue

### 7.1 Enrichir le Contenu

Google favorise le contenu riche et unique :

**Ajoutez sur chaque page :**
- Au moins 300 mots de texte
- Des titres H1, H2, H3 bien structurés
- Des mots-clés naturels (pas de bourrage)
- Des liens internes entre pages

**Exemple pour la page Services :**
```
Avant : "Nous proposons des piscines béton."
Après : "Nous concevons et réalisons des piscines en béton sur mesure 
         en Île-de-France depuis 2009. Nos piscines béton s'adaptent 
         à tous les terrains et styles architecturaux."
```

### 7.2 Créer des Backlinks

Les liens externes vers votre site améliorent votre référencement :

**Stratégies :**
- Inscription dans des annuaires locaux (Pages Jaunes, Yelp)
- Partenariats avec des artisans (maçons, paysagistes)
- Articles invités sur des blogs de décoration
- Profil Google My Business

### 7.3 Améliorer la Vitesse

**Objectif : < 3 secondes au chargement**

Actions :
- Optimiser les images (WebP)
- Activer le lazy loading
- Utiliser un CDN (Netlify/Vercel le font automatiquement)
- Minifier CSS/JS (déjà fait par Vite)

### 7.4 Ajouter du Contenu Régulièrement

**Créer un Blog** (évolution future) :
- "Comment entretenir sa piscine en hiver ?"
- "Piscine béton vs coque : que choisir ?"
- "Les 5 tendances piscine 2025"

Publication : 1 article/mois minimum.

---

## 🛠️ Étape 8 : Corriger les Erreurs

### 8.1 Erreurs 404

Si GSC détecte des pages 404 :

1. Aller dans **Couverture** > **Exclues**
2. Identifier les URLs 404
3. Soit :
   - Créer la page manquante
   - Rediriger vers une page existante
   - Supprimer le lien cassé

### 8.2 Contenu Dupliqué

Google pénalise le contenu dupliqué.

**Vérifier :**
- Chaque page a du contenu unique
- Utiliser des balises canonical (déjà fait dans `useSEO`)

### 8.3 Redirections

Si vous changez une URL, créer une redirection :

**Dans `netlify.toml` :**
```toml
[[redirects]]
  from = "/ancienne-page"
  to = "/nouvelle-page"
  status = 301
```

---

## 📱 Étape 9 : Google My Business

Pour le référencement local, créer un profil GMB :

1. Aller sur https://business.google.com/
2. Créer un profil d'entreprise :
   - **Nom** : BBH SERVICE
   - **Catégorie** : Entrepreneur spécialisé dans les piscines
   - **Adresse** : Votre adresse (si vous avez un local)
   - **Zone de service** : Île-de-France
3. Ajouter :
   - Logo
   - Photos de réalisations
   - Horaires
   - Téléphone
   - Site web : `https://www.bbhservice.fr`

**Avantages :**
- Apparaître dans Google Maps
- Afficher les avis clients
- Être visible dans les recherches locales ("pisciniste près de moi")

---

## 📊 KPIs SEO à Suivre

| Indicateur | Objectif | Délai |
|------------|----------|-------|
| **Pages indexées** | 15/15 | 1 semaine |
| **Position moyenne** | < 20 | 3 mois |
| **Clics organiques/mois** | > 100 | 3 mois |
| **CTR** | > 2% | 3 mois |
| **Core Web Vitals** | Tous verts | 1 mois |
| **Backlinks** | > 10 | 6 mois |

---

## 📅 Planning SEO (3 Premiers Mois)

### Mois 1 : Indexation
- ✅ Soumettre sitemap
- ✅ Demander indexation pages principales
- ✅ Corriger erreurs techniques
- ✅ Vérifier Core Web Vitals

### Mois 2 : Optimisation
- 📝 Enrichir le contenu (500+ mots par page)
- 🔗 Créer 5 backlinks
- 📱 Créer profil Google My Business
- 🖼️ Ajouter images optimisées

### Mois 3 : Expansion
- 📰 Publier 3 articles de blog
- 🔗 Créer 10 backlinks supplémentaires
- 📊 Analyser les performances
- 🎯 Cibler de nouveaux mots-clés

---

## ✅ Checklist Finale

- [ ] Compte Google Search Console créé
- [ ] Site vérifié (fichier HTML ou meta tag)
- [ ] Sitemap soumis et validé
- [ ] Pages principales indexées
- [ ] Core Web Vitals vérifiés
- [ ] Erreurs 404 corrigées
- [ ] Contenu optimisé (titres, meta, mots-clés)
- [ ] Google My Business créé
- [ ] Premiers backlinks obtenus
- [ ] Suivi mensuel programmé

---

## 🎓 Ressources Utiles

- **Google Search Console** : https://search.google.com/search-console/
- **PageSpeed Insights** : https://pagespeed.web.dev/
- **Google My Business** : https://business.google.com/
- **Guide SEO Google** : https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- **Moz - SEO Guide** : https://moz.com/beginners-guide-to-seo

---

*Avec Google Search Console et ces optimisations, votre site sera bien référencé sur Google ! 🚀*
