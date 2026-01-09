/**
 * Script pour générer des versions WebP des images
 * Usage: node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToOptimize = [
  'public/images/services/gazon1.jpg',
  'public/images/services/gazon2.jpg',
  'public/images/services/piscine-beton.jpg',
  'public/images/services/petite-fille-jouant-dans-une-piscine-dans-un-jardin-d-ete.jpg',
  'public/images/services/Piscines-beton-sur-mesure.jpg'
];

console.log('📸 Script d\'optimisation d\'images');
console.log('');
console.log('Pour optimiser les images en WebP, utilisez un des outils suivants :');
console.log('');
console.log('1. **En ligne** :');
console.log('   - https://squoosh.app/ (Google)');
console.log('   - https://tinypng.com/ (supporte WebP)');
console.log('');
console.log('2. **Avec ImageMagick (Windows)** :');
console.log('   choco install imagemagick');
console.log('   magick gazon1.jpg -quality 85 gazon1.webp');
console.log('');
console.log('3. **Avec Sharp (Node)** :');
console.log('   npm install -D sharp');
console.log('   Puis utiliser sharp dans ce script');
console.log('');
console.log('Images à convertir :');
imagesToOptimize.forEach(img => {
  const exists = fs.existsSync(path.join(__dirname, '..', img));
  console.log(`  ${exists ? '✅' : '❌'} ${img}`);
});
console.log('');
console.log('💡 Conseil : Pour Vercel, les images sont automatiquement optimisées via Next.js Image Optimization.');
console.log('   Mais pour Vite, il faut les pré-optimiser ou utiliser un plugin comme vite-plugin-imagemin.');
