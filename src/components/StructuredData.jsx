/**
 * Composants de données structurées JSON-LD pour le SEO
 * Conforme Schema.org pour améliorer le référencement Google
 * 
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { Helmet } from 'react-helmet-async';
import { CONTACT, COMPANY } from '../utils/constants';

/**
 * LocalBusiness - Données entreprise locale
 * Affiche dans Google Maps et recherche locale
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.bbh-service.fr/#organization",
    "name": COMPANY.name,
    "legalName": COMPANY.legalName,
    "description": "Expert en création de piscines sur mesure, aménagement paysager et rénovation en Île-de-France. Piscines béton, liner, entretien et spa.",
    "url": "https://www.bbh-service.fr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.bbh-service.fr/images/logo/LogoBBH.png",
      "width": 160,
      "height": 64
    },
    "image": [
      "https://www.bbh-service.fr/images/services/piscine-beton.jpg",
      "https://www.bbh-service.fr/images/projects/realisation1.png",
      "https://www.bbh-service.fr/images/services/gazon1.jpg"
    ],
    "telephone": CONTACT.phone,
    "email": CONTACT.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Île-de-France",
      "addressRegion": "IDF",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€€€",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      "geoRadius": "50000"
    },
    "sameAs": [
      "https://www.instagram.com/bbhservice",
      "https://www.facebook.com/bbhservice",
      "https://www.tiktok.com/@bbhservice"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Organization - Données organisation
 * Pour le Knowledge Graph Google
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.bbh-service.fr/#organization",
    "name": COMPANY.name,
    "legalName": COMPANY.legalName,
    "url": "https://www.bbh-service.fr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.bbh-service.fr/images/logo/LogoBBH.png",
      "width": 160,
      "height": 64
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT.phone,
      "contactType": "customer service",
      "email": CONTACT.email,
      "areaServed": "FR",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://www.instagram.com/bbhservice",
      "https://www.facebook.com/bbhservice",
      "https://www.tiktok.com/@bbhservice"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Service - Service offert
 * Pour les pages de services
 */
export function ServiceSchema({ service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY.name,
      "url": "https://www.bbh-service.fr"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      "geoRadius": "50000"
    },
    "image": service.image ? `https://www.bbh-service.fr${service.image}` : undefined
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * BreadcrumbList - Fil d'Ariane
 * Pour la navigation Google
 */
export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.bbh-service.fr${item.path}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * FAQPage - Page FAQ
 * Affiche les questions dans les résultats Google
 */
export function FAQPageSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * WebSite - Données du site web
 * Pour la recherche sur le site
 */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.bbh-service.fr",
    "name": COMPANY.name,
    "description": "Expert en création de piscines sur mesure et aménagement paysager en Île-de-France",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.bbh-service.fr/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * WebPage - Données de page web
 * Pour chaque page du site
 */
export function WebPageSchema({ title, description, url }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `https://www.bbh-service.fr${url}`,
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://www.bbh-service.fr"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
