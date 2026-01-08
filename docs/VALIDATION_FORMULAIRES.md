# 🛡️ VALIDATION DES FORMULAIRES - Guide Technique

## Date : 8 janvier 2026

---

## 🎯 AMÉLIORATIONS IMPLÉMENTÉES

### ✅ Validation en Temps Réel

Tous les formulaires du site BBH SERVICE ont été améliorés avec une validation stricte qui **empêche physiquement** la saisie de caractères invalides.

---

## 📋 COMPOSANTS MODIFIÉS

### 1. **ContactFormSecure.jsx**

#### Champ Téléphone
- ✅ **Blocage des lettres** : Impossible de saisir autre chose que des chiffres
- ✅ **Formatage automatique** : Transforme `0612345678` en `06 12 34 56 78`
- ✅ **Limite de 10 chiffres** : Ne peut pas dépasser 10 chiffres
- ✅ **Validation visuelle** : Bordure rouge si invalide, verte si valide

#### Fonctionnalités Ajoutées
```javascript
// Formatage automatique du téléphone
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, ''); // Supprime tout sauf chiffres
  const limited = cleaned.substring(0, 10);  // Max 10 chiffres
  const pairs = limited.match(/.{1,2}/g) || [];
  return pairs.join(' '); // Format : 06 12 34 56 78
};

// Blocage des touches non numériques
const handlePhoneKeyPress = (e) => {
  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault(); // Bloque la touche
  }
};
```

---

### 2. **QuoteWizard.jsx** (Étape 7)

#### Champ Téléphone
- ✅ Mêmes fonctionnalités que ContactFormSecure
- ✅ Aide visuelle : "Format : 06 12 34 56 78 (chiffres uniquement)"
- ✅ Attributs HTML5 optimisés : `inputMode="numeric"`, `pattern="[0-9\s]{14}"`

#### Champ Code Postal
- ✅ **Blocage des lettres** : Seuls les chiffres sont acceptés
- ✅ **Limite de 5 chiffres** : Ne peut pas dépasser 5 chiffres
- ✅ **Formatage automatique** : Supprime automatiquement les caractères invalides
- ✅ Aide visuelle : "5 chiffres uniquement"

#### Fonctionnalités Ajoutées
```javascript
// Formatage automatique du code postal
const formatPostalCode = (value) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.substring(0, 5); // Max 5 chiffres
};

// Blocage identique au téléphone
const handleNumberKeyPress = (e) => {
  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};
```

---

## 🔑 TOUCHES AUTORISÉES

Même quand le champ n'accepte que des chiffres, ces touches restent fonctionnelles :

### Touches de Navigation
- ✅ `Backspace` - Effacer caractère précédent
- ✅ `Delete` - Effacer caractère suivant
- ✅ `Tab` - Navigation entre champs
- ✅ `Escape` - Annuler
- ✅ `Enter` - Valider
- ✅ `Flèches` - Déplacer le curseur

### Raccourcis Clavier
- ✅ `Ctrl+A` - Tout sélectionner
- ✅ `Ctrl+C` - Copier
- ✅ `Ctrl+V` - Coller (filtré automatiquement)
- ✅ `Ctrl+X` - Couper
- ✅ `Cmd+...` - Équivalents Mac

---

## 📱 OPTIMISATIONS MOBILE

### Clavier Numérique Automatique

```jsx
<input
  type="tel"
  inputMode="numeric"  // 🔑 Force le clavier numérique sur mobile
  pattern="[0-9\s]{14}"
  autoComplete="tel"
/>
```

**Résultat sur mobile :**
- iOS : Clavier numérique affiché automatiquement
- Android : Clavier numérique affiché automatiquement
- Pas besoin de switcher vers le clavier alphabétique

### Code Postal

```jsx
<input
  type="text"
  inputMode="numeric"  // 🔑 Clavier numérique
  pattern="[0-9]{5}"
  maxLength="5"
  autoComplete="postal-code"
/>
```

---

## 🎨 FEEDBACK VISUEL

### États des Champs

#### Champ Valide
```css
/* Bordure verte + fond vert clair */
border-color: #10B981;
background-color: #F0FDF4;
```

#### Champ Invalide
```css
/* Bordure rouge + fond rouge clair */
border-color: #EF4444;
background-color: #FEF2F2;
```

#### Champ Neutre
```css
/* Bordure grise */
border-color: #E5E7EB;
background-color: white;
```

### Messages d'Aide

**Téléphone :**
> Format : 06 12 34 56 78 (chiffres uniquement)

**Code Postal :**
> 5 chiffres uniquement

---

## 🧪 TESTS EFFECTUÉS

### Test 1 : Saisie de Lettres dans Téléphone
```
Tentative : "abc"
Résultat : Rien ne s'affiche (bloqué) ✅
```

### Test 2 : Copier-Coller Texte avec Lettres
```
Copié : "Mon numéro est 0612345678"
Collé dans le champ
Résultat : "06 12 34 56 78" (filtré automatiquement) ✅
```

### Test 3 : Saisie de Plus de 10 Chiffres
```
Tentative : "06123456789999"
Résultat : "06 12 34 56 78" (limité à 10) ✅
```

### Test 4 : Code Postal avec Lettres
```
Tentative : "78abc"
Résultat : "78" (lettres bloquées) ✅
```

### Test 5 : Code Postal > 5 Chiffres
```
Tentative : "780001234"
Résultat : "78000" (limité à 5) ✅
```

---

## 🔒 VALIDATION SERVEUR

**Important :** La validation côté client ne suffit pas !

### Validation Côté Serveur (déjà implémentée)

**Fichier :** `api/quote.js`

```javascript
// Validation téléphone côté serveur
const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
if (!phoneRegex.test(phone)) {
  return res.status(400).json({ error: 'Numéro de téléphone invalide' });
}

// Validation email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: 'Email invalide' });
}
```

---

## 📊 COMPATIBILITÉ

### Navigateurs Desktop
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Navigateurs Mobile
- ✅ Safari iOS 14+
- ✅ Chrome Android 90+
- ✅ Samsung Internet 14+

### Accessibilité
- ✅ Screen readers : Attributs ARIA présents
- ✅ Navigation clavier : Fully functional
- ✅ Contraste : WCAG AA compliant

---

## 🎓 BONNES PRATIQUES APPLIQUÉES

### 1. Defense in Depth (Défense en Profondeur)

```
Couche 1 : HTML5 attributes (pattern, maxLength, inputMode)
Couche 2 : Validation JavaScript côté client (onKeyDown)
Couche 3 : Formatage automatique (onChange)
Couche 4 : Validation serveur (API)
```

### 2. Progressive Enhancement

```
Sans JavaScript :
- HTML5 validation fonctionne (pattern, required)

Avec JavaScript :
- Validation renforcée
- Formatage automatique
- Feedback visuel
```

### 3. Mobile-First

```
- inputMode="numeric" pour clavier mobile
- Touch targets 48x48px
- Font-size 16px (pas de zoom iOS)
- autoComplete pour suggestions
```

---

## 🚀 UTILISATION DANS D'AUTRES COMPOSANTS

### Template pour Champ Téléphone

```jsx
const [phone, setPhone] = useState('');

const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.substring(0, 10);
  if (limited.length === 0) return '';
  const pairs = limited.match(/.{1,2}/g) || [];
  return pairs.join(' ');
};

const handlePhoneKeyPress = (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
                       'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  
  if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
  
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

<input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
  onKeyDown={handlePhoneKeyPress}
  inputMode="numeric"
  pattern="[0-9\s]{14}"
  placeholder="06 12 34 56 78"
  autoComplete="tel"
  required
/>
```

### Template pour Champ Code Postal

```jsx
const [postalCode, setPostalCode] = useState('');

const formatPostalCode = (value) => {
  return value.replace(/\D/g, '').substring(0, 5);
};

const handleNumberKeyPress = (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
                       'ArrowLeft', 'ArrowRight'];
  
  if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
  
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

<input
  type="text"
  value={postalCode}
  onChange={(e) => setPostalCode(formatPostalCode(e.target.value))}
  onKeyDown={handleNumberKeyPress}
  inputMode="numeric"
  pattern="[0-9]{5}"
  maxLength="5"
  placeholder="78000"
  autoComplete="postal-code"
/>
```

---

## 🔍 DÉBOGAGE

### Vérifier le Formatage

```javascript
// Dans la console du navigateur
const test = formatPhoneNumber("abc0612def345678xyz");
console.log(test); // Devrait afficher : "06 12 34 56 78"
```

### Tester le Blocage

```javascript
// Simuler une touche bloquée
const event = new KeyboardEvent('keydown', { key: 'a' });
const input = document.querySelector('input[type="tel"]');
input.dispatchEvent(event);
// Le 'a' ne devrait pas apparaître
```

---

## ✅ CHECKLIST DE VALIDATION

Avant de déployer un nouveau formulaire :

- [ ] Champ téléphone : Blocage lettres activé
- [ ] Champ téléphone : Formatage automatique fonctionne
- [ ] Champ téléphone : Limite à 10 chiffres respectée
- [ ] Champ code postal : Blocage lettres activé
- [ ] Champ code postal : Limite à 5 chiffres respectée
- [ ] inputMode="numeric" sur tous les champs numériques
- [ ] pattern HTML5 défini
- [ ] autoComplete approprié
- [ ] Messages d'aide visibles
- [ ] Tests sur mobile iOS
- [ ] Tests sur mobile Android
- [ ] Validation serveur en place

---

## 📚 RÉFÉRENCES

### Documentation HTML5
- [input type="tel"](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/tel)
- [inputMode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
- [pattern](https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/pattern)

### Regex Téléphone Français
```regex
^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$
```

Accepte :
- `06 12 34 56 78`
- `0612345678`
- `+33612345678`
- `+33 6 12 34 56 78`

---

**Validation robuste et UX optimale pour BBH SERVICE** 🏊‍♂️
