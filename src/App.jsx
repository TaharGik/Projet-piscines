import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Devis from './pages/Devis';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import NotFound from './pages/NotFound';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';
import './App.css';

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
