import { useEffect } from 'react';

/**
 * Hook personnalise pour gerer les meta tags SEO
 * 
 * Alternative a react-helmet pour React 19
 * Gere dynamiquement le title et les meta tags de la page
 * 
 * @param {Object} options - Options SEO
 * @param {string} options.title - Titre de la page
 * @param {string} options.description - Meta description
 * @param {string} options.keywords - Mots-cles (comma separated)
 * @param {string} options.ogImage - Image Open Graph pour partage social
 * @param {string} options.ogType - Type Open Graph (website, article...)
 * @param {string} options.canonicalUrl - URL canonique
 * 
 * @example
 * useSEO({
 *   title: 'Accueil',
 *   description: 'Pisciniste en Ile-de-France',
 *   keywords: 'piscine, construction, Paris'
 * });
 */
const useSEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
} = {}) => {
  
  const siteName = 'BBH SERVICE';
  const defaultDescription = 'Expert pisciniste en Ile-de-France. Conception, realisation et entretien de piscines sur mesure. Devis gratuit.';
  const defaultKeywords = 'piscine, pisciniste, construction piscine, piscine sur mesure, Ile-de-France, Paris, renovation piscine, entretien piscine';
  const baseUrl = 'https://www.bbhservice.fr';
  const defaultOgImage = `${baseUrl}/images/og-image.jpg`;

  useEffect(() => {
    // Titre de la page
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    document.title = fullTitle;

    // Helper pour creer ou mettre a jour une meta tag
    const setMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Helper pour creer ou mettre a jour un link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      
      let link = document.querySelector(`link[rel="${rel}"]`);
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Meta tags standards
    setMetaTag('description', description || defaultDescription);
    setMetaTag('keywords', keywords || defaultKeywords);
    
    // Open Graph (Facebook, LinkedIn)
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description || defaultDescription, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage || defaultOgImage, true);
    setMetaTag('og:site_name', siteName, true);
    setMetaTag('og:locale', 'fr_FR', true);
    
    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl, true);
    }

    // Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description || defaultDescription);
    setMetaTag('twitter:image', ogImage || defaultOgImage);

    // URL canonique
    if (canonicalUrl) {
      setLinkTag('canonical', canonicalUrl);
    }

    // Cleanup: restaurer le titre par defaut au demontage
    return () => {
      document.title = siteName;
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, defaultOgImage, siteName, defaultDescription, defaultKeywords]);
};

export default useSEO;
