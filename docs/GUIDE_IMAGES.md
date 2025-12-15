# Guide : Ajouter des Images Réelles au Projet

## 📸 Structure des Images

### Emplacement des images

Les images doivent être placées dans le dossier `public/images/` pour être accessibles directement.

```
public/
├── images/
│   ├── hero/
│   │   └── hero-background.jpg (1920x1080px)
│   ├── services/
│   │   ├── piscine-beton.jpg
│   │   ├── piscine-coque.jpg
│   │   ├── piscine-interieure.jpg
│   │   ├── renovation.jpg
│   │   ├── entretien.jpg
│   │   └── spa.jpg
│   ├── projects/
│   │   ├── villa-saint-germain/
│   │   │   ├── main.jpg
│   │   │   ├── gallery-1.jpg
│   │   │   ├── gallery-2.jpg
│   │   │   ├── gallery-3.jpg
│   │   │   ├── gallery-4.jpg
│   │   │   ├── gallery-5.jpg
│   │   │   ├── avant.jpg
│   │   │   └── apres.jpg
│   │   ├── residence-versailles/
│   │   │   └── ... (même structure)
│   │   └── ... (pour chaque projet)
│   ├── team/
│   │   └── team-photo.jpg
│   └── og-image.jpg (1200x630px pour réseaux sociaux)
```

---

## 🎨 Spécifications des Images

### Images Hero (Accueil)

- **Format** : JPG
- **Dimensions** : 1920x1080px (16:9)
- **Poids** : < 500 KB
- **Sujet** : Belle piscine moderne, vue aérienne ou d'ensemble

### Images Services

- **Format** : JPG
- **Dimensions** : 800x600px (4:3)
- **Poids** : < 200 KB chacune
- **Sujets** :
  - `piscine-beton.jpg` - Piscine en béton en construction ou finie
  - `piscine-coque.jpg` - Installation de coque polyester
  - `piscine-interieure.jpg` - Piscine intérieure de luxe
  - `renovation.jpg` - Avant/après d'une rénovation
  - `entretien.jpg` - Technicien entretenant une piscine
  - `spa.jpg` - Spa ou jacuzzi installé

### Images Projets

Pour chaque projet, prévoir :

1. **Image principale** (`main.jpg`)
   - Dimensions : 1200x800px
   - Poids : < 300 KB
   - La plus belle vue du projet

2. **Galerie** (5 images minimum)
   - Dimensions : 1600x1200px
   - Poids : < 400 KB chacune
   - Différents angles et détails

3. **Avant/Après**
   - Dimensions : 800x600px
   - Poids : < 200 KB chacune
   - Même cadrage si possible

### Image Open Graph

- **Nom** : `og-image.jpg`
- **Dimensions** : 1200x630px (ratio 1.91:1)
- **Poids** : < 300 KB
- **Texte** : Logo + "Piscines sur mesure en Île-de-France"

---

## 🛠️ Optimisation des Images

### Outils recommandés

1. **TinyPNG / TinyJPG**
   - URL : https://tinypng.com/
   - Compression avec perte minimale de qualité

2. **Squoosh (Google)**
   - URL : https://squoosh.app/
   - Outil en ligne pour optimiser et convertir

3. **ImageOptim (Mac) / FileOptimizer (Windows)**
   - Applications desktop pour batch processing

### Checklist d'optimisation

- [ ] Redimensionner aux dimensions exactes
- [ ] Compresser avec qualité 80-85%
- [ ] Convertir en WebP si possible (+ fallback JPG)
- [ ] Supprimer les métadonnées EXIF
- [ ] Nommer les fichiers de manière descriptive (SEO)

---

## 📝 Modification du Code

### 1. Mettre à jour `src/data/projects.js`

```javascript
export const projects = [
  {
    id: 1,
    name: 'Villa Saint-Germain',
    slug: 'villa-saint-germain',
    // ... autres propriétés
    image: '/images/projects/villa-saint-germain/main.jpg',
    images: [
      {
        src: '/images/projects/villa-saint-germain/gallery-1.jpg',
        alt: 'Vue d\'ensemble de la piscine à débordement',
        caption: 'Piscine à débordement avec vue sur le jardin'
      },
      {
        src: '/images/projects/villa-saint-germain/gallery-2.jpg',
        alt: 'Détail de la cascade',
        caption: 'Système de débordement avec cascade'
      },
      // ... autres images
    ],
    imageAvant: '/images/projects/villa-saint-germain/avant.jpg',
    imageApres: '/images/projects/villa-saint-germain/apres.jpg',
  },
  // ... autres projets
];
```

### 2. Mettre à jour `src/data/services.js`

```javascript
export const services = [
  {
    id: 1,
    title: 'Piscines béton sur mesure',
    // ... autres propriétés
    image: '/images/services/piscine-beton.jpg',
  },
  // ... autres services
];
```

### 3. Mettre à jour `src/components/Hero.jsx`

```jsx
<section 
  className="relative h-screen flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage: 'url(/images/hero/hero-background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Overlay sombre */}
  <div className="absolute inset-0 bg-black/50"></div>
  
  {/* Contenu */}
  <div className="relative z-10 text-center text-white">
    {/* ... contenu existant */}
  </div>
</section>
```

### 4. Mettre à jour `src/components/ProjectCard.jsx`

Remplacer les placeholders par :

```jsx
<div className="relative h-64 overflow-hidden rounded-t-xl">
  <img 
    src={project.image}
    alt={`Réalisation ${project.name} - ${project.type}`}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    loading="lazy"
  />
  {project.featured && (
    <span className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
      Projet phare
    </span>
  )}
</div>
```

### 5. Mettre à jour `src/pages/ProjectDetail.jsx`

Remplacer le carrousel placeholder par :

```jsx
<ImageCarousel 
  images={project.images}
  showThumbnails={true}
  autoPlay={false}
  className="mb-12"
/>
```

Et la section Avant/Après :

```jsx
<div className="grid md:grid-cols-2 gap-8">
  <div className="relative group overflow-hidden rounded-xl">
    <div className="absolute top-4 left-4 z-10 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm">
      Avant
    </div>
    <img 
      src={project.imageAvant}
      alt={`${project.name} - Avant travaux`}
      className="w-full h-64 md:h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <div className="relative group overflow-hidden rounded-xl">
    <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
      Après
    </div>
    <img 
      src={project.imageApres}
      alt={`${project.name} - Après travaux`}
      className="w-full h-64 md:h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
    />
  </div>
</div>
```

---

## 🌐 Format WebP (Optionnel mais Recommandé)

### Avantages
- Compression 25-35% meilleure que JPG
- Support navigateurs modernes : 95%+

### Utilisation avec fallback

```jsx
<picture>
  <source srcSet="/images/hero/hero-background.webp" type="image/webp" />
  <img 
    src="/images/hero/hero-background.jpg" 
    alt="Piscine moderne"
    className="w-full h-full object-cover"
  />
</picture>
```

### Conversion en WebP

Avec l'outil `cwebp` (CLI) :

```bash
cwebp -q 80 input.jpg -o output.webp
```

Ou utiliser Squoosh.app en ligne.

---

## 🚀 Créer un Composant Image Optimisé

Créer `src/components/OptimizedImage.jsx` :

```jsx
/**
 * Composant Image optimisé avec lazy loading et WebP
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  width,
  height,
  loading = 'lazy'
}) => {
  // Génère le chemin WebP (suppose que les fichiers WebP existent)
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
      />
    </picture>
  );
};

export default OptimizedImage;
```

Utilisation :

```jsx
<OptimizedImage 
  src="/images/projects/villa-saint-germain/main.jpg"
  alt="Villa Saint-Germain"
  className="w-full h-64 object-cover"
/>
```

---

## ✅ Checklist Finale

### Avant de remplacer les images

- [ ] Collecter toutes les photos nécessaires
- [ ] Redimensionner aux bonnes dimensions
- [ ] Optimiser/compresser (< 500 KB)
- [ ] Nommer correctement (sans espaces, minuscules)
- [ ] Créer la structure de dossiers dans `public/images/`

### Pendant

- [ ] Copier les images dans `public/images/`
- [ ] Mettre à jour `projects.js` avec les vrais chemins
- [ ] Mettre à jour `services.js` avec les vrais chemins
- [ ] Modifier les composants pour utiliser les vraies images

### Après

- [ ] Tester toutes les pages en local
- [ ] Vérifier le responsive (mobile/tablet/desktop)
- [ ] Vérifier la performance (Lighthouse)
- [ ] Commit et push sur Git

---

## 📊 Test de Performance

Après avoir ajouté les images, tester avec Lighthouse :

```bash
npm run build
npm run preview
```

Ouvrir DevTools > Lighthouse > Analyser

**Objectifs :**
- Performance : > 90
- Accessibilité : > 95
- Best Practices : > 90
- SEO : > 95

---

*Ce guide vous permettra d'ajouter des images professionnelles tout en maintenant d'excellentes performances.*
