/**
 * Composant d'image optimisée avec support WebP et lazy loading
 * 
 * Utilise l'élément <picture> pour servir WebP quand supporté,
 * avec fallback vers le format original (jpg/png).
 * 
 * @example
 * <OptimizedImage 
 *   src="/images/hero/piscine.jpg" 
 *   alt="Belle piscine"
 *   className="w-full h-auto"
 * />
 */

import { useState } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  onLoad,
  onError
}) {
  const [imageError, setImageError] = useState(false);
  
  // Génère le chemin WebP à partir du src original
  const getWebpSrc = (originalSrc) => {
    const ext = originalSrc.match(/\.(jpg|jpeg|png)$/i);
    if (!ext) return null;
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };
  
  const webpSrc = getWebpSrc(src);
  
  const handleError = (e) => {
    setImageError(true);
    onError?.(e);
  };
  
  const handleLoad = (e) => {
    onLoad?.(e);
  };
  
  // Si WebP n'est pas disponible ou erreur, utilise directement l'image
  if (!webpSrc || imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }
  
  return (
    <picture>
      {/* Version WebP (moderne, légère) */}
      <source 
        srcSet={webpSrc} 
        type="image/webp"
      />
      
      {/* Fallback pour navigateurs anciens */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
      />
    </picture>
  );
}
