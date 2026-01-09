import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import Home from './pages/Home';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';
import './App.css';

// Lazy loading des routes secondaires pour améliorer les performances
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Devis = lazy(() => import('./pages/Devis'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const Confidentialite = lazy(() => import('./pages/Confidentialite'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Composant principal de l'application
 * Gère le routing et la structure globale (Header/Footer)
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialisation de Google Analytics
  // Tracke automatiquement chaque changement de page
  useGoogleAnalytics();

  // Afficher le loader pendant le chargement initial
  if (isLoading) {
    return <Loader onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2FB8B3]"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/realisations" element={<Projects />} />
            <Route path="/realisations/:slug" element={<ProjectDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            {/* Route 404 - doit être en dernier */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      
      {/* Bouton retour en haut de page */}
      <ScrollToTopButton threshold={300} />
      
      {/* Vercel Speed Insights - Métriques de performance */}
      <SpeedInsights />
    </div>
  );
}

export default App;
