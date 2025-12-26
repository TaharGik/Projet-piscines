import { createContext, useContext, useState } from 'react';

/**
 * Contexte pour gérer l'état du QuoteWizard globalement
 * Permet d'ouvrir le wizard depuis n'importe quel composant (Header, Hero, etc.)
 */
const QuoteWizardContext = createContext();

export const useQuoteWizard = () => {
  const context = useContext(QuoteWizardContext);
  if (!context) {
    throw new Error('useQuoteWizard doit être utilisé dans un QuoteWizardProvider');
  }
  return context;
};

export const QuoteWizardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openQuoteWizard = () => setIsOpen(true);
  const closeQuoteWizard = () => setIsOpen(false);

  return (
    <QuoteWizardContext.Provider value={{ isOpen, openQuoteWizard, closeQuoteWizard }}>
      {children}
    </QuoteWizardContext.Provider>
  );
};

export default QuoteWizardContext;
