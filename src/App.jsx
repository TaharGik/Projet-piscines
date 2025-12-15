import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';
import './App.css';

/**
 * Composant principal de l'application
 * Gère le routing et la structure globale (Header/Footer)
 */
function App() {
  // Initialisation de Google Analytics
  // Tracke automatiquement chaque changement de page
  useGoogleAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
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
          {/* Route 404 - doit être en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Bouton retour en haut de page */}
      <ScrollToTopButton threshold={300} />
    </div>
  );
}

export default App;
