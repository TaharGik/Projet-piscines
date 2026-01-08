# 📱 STANDARDS MOBILE - BBH SERVICE

## Guide des Bonnes Pratiques Mobile

---

## 🎯 OBJECTIFS

1. ✅ Expérience tactile optimale
2. ✅ Performance sur réseaux mobiles
3. ✅ Accessibilité mobile
4. ✅ Conversions mobiles maximisées

---

## 📏 TOUCH TARGETS (Cibles Tactiles)

### Standard Apple iOS / Google Material Design
**Taille minimale : 48x48px (ou 44x44px Apple)**

### Zones Critiques Vérifiées

#### ✅ Header
```jsx
// Bouton hamburger
<button className="p-3 min-w-[48px] min-h-[48px]">
  {/* Icône menu */}
</button>

// Lien téléphone (menu mobile)
<a href="tel:..." className="py-3 min-h-[48px]">
  Appeler : 06 40 12 34 56
</a>
```

#### ✅ Formulaires
```jsx
// Tous les inputs
<input className="py-4" /> // 16px + 32px padding = 48px

// Boutons
<button className="py-3 px-6"> // Au moins 48px de hauteur
```

#### ✅ Menu Mobile
```jsx
// Items du menu
<NavLink className="py-3 min-h-[48px]">
  Accueil
</NavLink>
```

### Recommandations
- ✅ Espacement minimum de 8px entre touch targets
- ✅ Zone cliquable > zone visible (padding généreux)
- ✅ Éviter les liens/boutons trop proches

---

## 🔤 TYPOGRAPHIE MOBILE

### Tailles Minimales

```css
/* Corps de texte */
body {
  font-size: 16px; /* Évite le zoom automatique iOS */
}

/* Titres */
h1 { font-size: 28px; } /* Mobile */
h2 { font-size: 24px; }
h3 { font-size: 20px; }

/* Inputs */
input, textarea, select {
  font-size: 16px !important; /* CRITIQUE pour iOS */
}
```

### Pourquoi 16px ?
- ❌ < 16px → Zoom automatique sur iOS lors du focus
- ✅ ≥ 16px → Pas de zoom, meilleure UX

### Line Height
```css
p {
  line-height: 1.6; /* Minimum pour la lisibilité */
}

h1, h2, h3 {
  line-height: 1.2; /* Titres plus compacts */
}
```

---

## 🖼️ IMAGES OPTIMISÉES

### Format WebP avec Fallback

```jsx
<picture>
  <source 
    media="(max-width: 768px)" 
    srcSet="/images/hero-mobile.webp"
    type="image/webp"
  />
  <source 
    media="(min-width: 769px)" 
    srcSet="/images/hero-desktop.webp"
    type="image/webp"
  />
  <img 
    src="/images/hero-fallback.jpg" 
    alt="Piscine BBH Service"
    loading="lazy"
  />
</picture>
```

### Tailles Recommandées

| Device | Largeur | Poids Max |
|--------|---------|-----------|
| Mobile | 768px | 150KB |
| Tablet | 1024px | 250KB |
| Desktop | 1920px | 500KB |

### Lazy Loading
```jsx
<img loading="lazy" /> // Natif, supporté partout
```

---

## ⚡ PERFORMANCE MOBILE

### Critères Web Vitals

#### LCP (Largest Contentful Paint)
- ✅ Objectif : < 2.5s
- Hero image optimisée
- WebP utilisé
- Lazy loading sauf hero

#### FID (First Input Delay)
- ✅ Objectif : < 100ms
- Pas de JavaScript bloquant
- Event listeners optimisés

#### CLS (Cumulative Layout Shift)
- ✅ Objectif : < 0.1
- Dimensions fixes pour images
- Skeleton loaders si nécessaire

### Optimisations Appliquées

```css
/* GPU Acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

/* Animations optimisées */
.smooth-transition {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📶 RÉSEAU MOBILE

### Progressive Enhancement

```jsx
// 1. Afficher le contenu de base immédiatement
// 2. Charger les images après
// 3. Charger les fonctionnalités avancées en dernier

// Exemple : Skeleton loader
const ProjectCard = ({ project, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="h-4 bg-gray-200 mt-4"></div>
      </div>
    );
  }
  
  return <RealProjectCard project={project} />;
};
```

### Gestion de l'Offline

```jsx
// Service Worker (optionnel)
// Cache les assets critiques pour utilisation offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 🎨 DESIGN RESPONSIVE

### Breakpoints BBH SERVICE

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Container Padding

```css
.container-custom {
  padding-left: 1rem;  /* 16px mobile */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    padding-left: 1.5rem; /* 24px tablet */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    padding-left: 2rem; /* 32px desktop */
    padding-right: 2rem;
  }
}
```

### Grilles Flexibles

```jsx
// ProjectsGrid adaptatif
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 colonne mobile, 2 tablet, 3 desktop */}
</div>
```

---

## 🖱️ INTERACTIONS TACTILES

### Feedback Visuel

```css
/* Active state pour mobile */
button:active {
  transform: scale(0.98);
  opacity: 0.9;
}

/* Ripple effect */
.btn-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:active::after {
  width: 300px;
  height: 300px;
}
```

### Supprimer le Highlight iOS

```css
* {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
```

### Scroll Bounce (iOS)

```css
/* Désactiver le scroll bounce si nécessaire */
body {
  overscroll-behavior: none;
}

/* Ou garder pour un scroll naturel */
body {
  -webkit-overflow-scrolling: touch;
}
```

---

## 🔒 SAFE AREA (Notch iPhone)

### Support des Encoches

```css
@supports (padding: max(0px)) {
  body {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

### Viewport Meta Tag

```html
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

---

## 📞 LIENS CLIQUABLES MOBILE

### Téléphone

```jsx
// Avec icône et style
<a 
  href="tel:+33640123456" 
  className="flex items-center gap-2 py-3 px-4 bg-secondary text-white rounded-lg"
>
  <svg className="w-5 h-5">
    {/* Icône téléphone */}
  </svg>
  06 40 12 34 56
</a>
```

### Email

```jsx
<a 
  href="mailto:bbhservice25@gmail.com"
  className="text-secondary hover:underline"
>
  bbhservice25@gmail.com
</a>
```

### Google Maps (Itinéraire)

```jsx
<a 
  href="https://maps.google.com/?q=Île-de-France"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2"
>
  <svg>{/* Icône map */}</svg>
  Obtenir l'itinéraire
</a>
```

---

## 🎭 ANIMATIONS MOBILES

### Principes
- ✅ Durée : 200-400ms
- ✅ Easing : cubic-bezier(0.4, 0, 0.2, 1)
- ✅ GPU-accelerated (transform, opacity)
- ❌ Éviter : width, height, top, left

### Exemples

```css
/* Bon : GPU-accelerated */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
}

/* Mauvais : Pas GPU-accelerated */
.card {
  transition: top 0.3s ease; /* ❌ */
}
```

### Réduire les Animations si Préféré

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔍 SEO MOBILE

### Title Adaptatif

```jsx
import { useEffect } from 'react';

const useDocumentTitle = (title, mobileSuffix) => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    document.title = isMobile && mobileSuffix 
      ? `${title} ${mobileSuffix}` 
      : title;
  }, [title, mobileSuffix]);
};

// Usage
useDocumentTitle('BBH SERVICE', '| Piscines IDF');
```

### Meta Description

```html
<meta 
  name="description" 
  content="Piscines sur mesure en Île-de-France. Devis sous 48h. ☎️ 06 40 12 34 56"
/>
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BBH SERVICE",
  "telephone": "+33640123456",
  "areaServed": "Île-de-France",
  "priceRange": "€€€"
}
```

---

## 📊 ANALYTICS MOBILE

### Événements à Tracker

```javascript
// Clic téléphone
gtag('event', 'phone_click', {
  'event_category': 'Contact',
  'event_label': 'Mobile Header',
  'value': 1
});

// Soumission formulaire mobile
gtag('event', 'form_submit', {
  'event_category': 'Lead',
  'event_label': 'Mobile Quote Form',
  'value': 1
});

// Utilisation des filtres
gtag('event', 'filter_use', {
  'event_category': 'Engagement',
  'event_label': filter_name,
  'value': 1
});
```

---

## ✅ CHECKLIST MOBILE

### Design
- [ ] Touch targets 48x48px minimum
- [ ] Font-size ≥ 16px pour inputs
- [ ] Espacement généreux entre éléments
- [ ] Contraste texte/fond ≥ 4.5:1
- [ ] Boutons avec feedback visuel

### Performance
- [ ] Images optimisées (WebP)
- [ ] Lazy loading activé
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Animations GPU-accelerated

### UX
- [ ] Menu hamburger fluide
- [ ] Formulaires validés en temps réel
- [ ] Messages d'erreur clairs
- [ ] Loading states visibles
- [ ] Scroll horizontal évité

### Conversions
- [ ] Téléphone cliquable visible
- [ ] CTA "Devis gratuit" prominent
- [ ] Zone géographique affichée
- [ ] Formulaire court et simple
- [ ] Réassurance visible (garanties)

### Accessibilité
- [ ] Navigation au clavier
- [ ] Labels ARIA
- [ ] Focus states visibles
- [ ] Contraste suffisant
- [ ] Screen reader friendly

### Technique
- [ ] Safe area support (notch)
- [ ] Scroll bounce géré
- [ ] Highlight iOS désactivé
- [ ] Service Worker (optionnel)
- [ ] Offline ready (optionnel)

---

## 🚀 QUICK WINS MOBILE

### 1. Téléphone Cliquable (✅ Implémenté)
```jsx
<a href="tel:+33640123456">Appelez-nous</a>
```
**Impact :** Conversion +30%

### 2. WhatsApp Business (Optionnel)
```jsx
<a 
  href="https://wa.me/33640123456?text=Bonjour%2C%20je%20souhaite%20un%20devis%20piscine"
  target="_blank"
>
  <svg>{/* WhatsApp icon */}</svg>
  Contactez-nous sur WhatsApp
</a>
```
**Impact :** Engagement +25%

### 3. Sticky CTA (Optionnel)
```jsx
// Bouton flottant en bas sur mobile
<div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
  <Link 
    to="/devis"
    className="block w-full py-4 bg-secondary text-white text-center rounded-full shadow-2xl"
  >
    Devis gratuit
  </Link>
</div>
```
**Impact :** Clics CTA +40%

---

## 📚 RESSOURCES

### Documentation
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Touch Targets](https://material.io/design/usability/accessibility.html#layout-typography)

### Outils de Test
- Chrome DevTools (Device Mode)
- BrowserStack (Tests multi-devices)
- PageSpeed Insights
- Lighthouse (Audit mobile)

---

**Dernière mise à jour :** 8 janvier 2026
**Version :** 1.0
**Conforme aux standards :** BBH SERVICE
