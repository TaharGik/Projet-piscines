import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import FAQItem from '../components/FAQItem';
import useSEO from '../hooks/useSEO';
import { CONTACT } from '../utils/constants';
import { FAQPageSchema, BreadcrumbSchema } from '../components/StructuredData';

/**
 * Page FAQ
 * Questions fréquentes avec accordéon interactif
 */
const FAQ = () => {
  // SEO - Meta tags pour la page FAQ
  useSEO({
    title: 'FAQ - Questions fréquentes sur la construction de piscines',
    description: 'Réponses à vos questions : délais de construction, permis de construire, garanties, budget, zone d\'intervention. Tout savoir avant de faire construire votre piscine.',
    keywords: 'FAQ piscine, délai construction piscine, permis construire piscine, garantie décennale piscine, budget piscine',
    canonicalUrl: 'https://www.bbhservice.fr/faq',
  });

  const faqs = [
    {
      question: 'Quel est le délai moyen pour construire une piscine ?',
      answer: `Le délai varie selon le type de piscine et la complexité du projet :
      - Piscine coque : 2 à 4 semaines
      - Piscine béton classique : 8 à 12 semaines
      - Piscine béton haut de gamme (débordement, forme libre) : 12 à 16 semaines
      - Piscine intérieure : 16 à 20 semaines
      
      Ces délais incluent le terrassement, la construction et la mise en eau. À cela s'ajoute le temps d'obtention des autorisations administratives (1 à 3 mois selon les communes).`
    },
    {
      question: 'Faut-il un permis de construire pour une piscine ?',
      answer: `Cela dépend de la taille de votre piscine :
      - Bassin de moins de 10m² : aucune formalité
      - Bassin de 10 à 100m² : déclaration préalable de travaux
      - Bassin de plus de 100m² : permis de construire obligatoire
      - Piscine couverte (abri de plus de 1,80m) : permis de construire
      
      Nous nous occupons de toutes les démarches administratives pour vous. Notre bureau d'études prépare les dossiers complets pour maximiser vos chances d'obtention.`
    },
    {
      question: 'Quelles garanties proposez-vous ?',
      answer: `Nous offrons des garanties complètes pour votre tranquillité :
      - Garantie décennale : couvre les dommages compromettant la solidité de l'ouvrage pendant 10 ans
      - Garantie biennale : couvre les équipements (pompe, filtre, etc.) pendant 2 ans
      - Garantie de parfait achèvement : couvre tous les défauts signalés la première année
      
      Nous sommes assurés auprès de compagnies reconnues et vous remettons les attestations dès le début du chantier.`
    },
    {
      question: 'Quelle est votre zone d\'intervention ?',
      answer: `Nous intervenons dans toute l'Île-de-France :
      - Paris (75)
      - Hauts-de-Seine (92)
      - Yvelines (78)
      - Val-de-Marne (94)
      - Essonne (91)
      - Seine-Saint-Denis (93)
      - Val-d'Oise (95)
      - Seine-et-Marne (77)
      
      Pour les projets exceptionnels, nous pouvons intervenir dans les départements limitrophes sur demande.`
    },
    {
      question: 'Quel budget prévoir pour une piscine ?',
      answer: `Le budget varie selon de nombreux critères. Voici des fourchettes indicatives :
      - Piscine coque (8x4m) : 25 000 € à 40 000 €
      - Piscine béton (10x5m) : 40 000 € à 70 000 €
      - Piscine à débordement : 60 000 € à 120 000 €
      - Piscine intérieure : 80 000 € à 150 000 €+
      
      Ces prix incluent le terrassement, la construction, la filtration et la mise en eau. Les options (chauffage, couverture, éclairage LED, domotique) sont en supplément. Nous établissons toujours un devis détaillé gratuit.`
    },
    {
      question: 'Proposez-vous des facilités de paiement ?',
      answer: `Oui, nous proposons plusieurs solutions :
      - Paiement échelonné selon l'avancement du chantier (classique)
      - Partenariat avec des organismes de crédit pour un financement adapté
      - Possibilité de payer en plusieurs fois sans frais pour certains montants
      
      Nous étudions chaque situation individuellement pour trouver la meilleure solution.`
    },
    {
      question: 'Comment entretenir ma piscine ?',
      answer: `L'entretien régulier comprend :
      - Contrôle et ajustement du pH (2 fois par semaine)
      - Nettoyage du filtre (selon le type, toutes les 1 à 4 semaines)
      - Passage du robot ou balai (1 à 2 fois par semaine)
      - Traitement de l'eau (chlore, brome ou sel selon votre installation)
      
      Nous proposons des contrats d'entretien adaptés à vos besoins pour vous libérer de ces contraintes. Nos techniciens peuvent intervenir de façon hebdomadaire, bi-mensuelle ou mensuelle.`
    },
    {
      question: 'Peut-on chauffer une piscine toute l\'année ?',
      answer: `Oui, plusieurs solutions existent :
      - Pompe à chaleur : la plus économique, efficace de avril à octobre
      - Échangeur thermique : raccordé à votre chaudière, très efficace
      - Réchauffeur électrique : simple mais plus coûteux en énergie
      - Panneaux solaires : écologique, en complément d'un autre système
      
      Pour une piscine intérieure, nous intégrons systématiquement un système de chauffage performant. Nous vous conseillons la solution la plus adaptée à votre usage et votre budget.`
    }
  ];

  return (
    <>
      {/* Structured Data pour SEO */}
      <FAQPageSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Accueil', path: '/' },
        { name: 'FAQ', path: '/faq' }
      ]} />
      
      {/* Hero FAQ */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0F2A44 50%, #0a1e30 100%)' }}
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#2FB8B3] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2FB8B3] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Questions fréquentes
            </h1>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Retrouvez les réponses aux questions les plus courantes sur nos services 
              et la construction de piscines.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordéon */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer}
                  defaultOpen={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Question non trouvée */}
      <section className="section-padding bg-[#F3F5F9]">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-[#0F2A44] mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Nous contacter
            </Link>
            <a href="tel:+33140123456" className="btn-secondary">
              Appeler le 01 40 12 34 56
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
