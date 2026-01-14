/**
 * Script pour optimiser et générer des versions WebP des images
 * Usage: node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Configuration d'optimisation
const CONFIG = {
  webp: {
    quality: 85,
    effort: 6
  },
  jpeg: {
    quality: 85,
    progressive: true
  },
  png: {
    quality: 85,
    compressionLevel: 9
  }
};

/**
 * Trouve toutes les images dans un répertoire (récursivement)
 */
function findImages(dir, imageList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findImages(filePath, imageList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      imageList.push(filePath);
    }
  }
  
  return imageList;
}

/**
 * Optimise une image et génère une version WebP
 */
async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const basename = path.basename(imagePath, ext);
  const dir = path.dirname(imagePath);
  const webpPath = path.join(dir, `${basename}.webp`);
  
  try {
    const stats = fs.statSync(imagePath);
    const originalSize = stats.size;
    
    console.log(`\n📸 ${path.relative(PUBLIC_DIR, imagePath)}`);
    console.log(`   Taille originale: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Génère version WebP
    await sharp(imagePath)
      .webp(CONFIG.webp)
      .toFile(webpPath);
    
    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
    
    console.log(`   ✅ WebP créé: ${(webpSize / 1024).toFixed(2)} KB (-${savings}%)`);
    
    // Optimise l'image originale selon son format
    let optimized;
    if (ext === '.jpg' || ext === '.jpeg') {
      optimized = sharp(imagePath).jpeg(CONFIG.jpeg);
    } else if (ext === '.png') {
      optimized = sharp(imagePath).png(CONFIG.png);
    } else {
      return;
    }
    
    // Sauvegarde l'image optimisée (écrase l'originale)
    const tempPath = imagePath + '.tmp';
    await optimized.toFile(tempPath);
    fs.renameSync(tempPath, imagePath);
    
    const optimizedStats = fs.statSync(imagePath);
    const optimizedSize = optimizedStats.size;
    const optSavings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`   ✅ Optimisé: ${(optimizedSize / 1024).toFixed(2)} KB (-${optSavings}%)`);
    
  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`);
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Optimisation des images...\n');
  
  const imagesDir = path.join(PUBLIC_DIR, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Répertoire public/images introuvable');
    process.exit(1);
  }
  
  const images = findImages(imagesDir);
  
  if (images.length === 0) {
    console.log('ℹ️  Aucune image à optimiser');
    return;
  }
  
  console.log(`📦 ${images.length} images trouvées\n`);
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('\n✅ Optimisation terminée !');
  console.log('\n💡 N\'oubliez pas de mettre à jour vos composants React pour utiliser <picture> avec WebP');
}

main().catch(console.error);
