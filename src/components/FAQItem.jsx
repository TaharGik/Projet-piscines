import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * FAQItem BBH SERVICE
 * Conforme à la charte :
 * - Design sobre, bordures fines
 * - Couleurs : #0F2A44, #F3F5F9
 * - Typographies : Montserrat (question), Lato (réponse)
 */
const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-neutral-light rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-white hover:bg-neutral-light flex justify-between items-center transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-heading font-semibold text-primary pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-secondary transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-neutral-light border-t border-neutral-light">
          <div className="font-sans text-primary/70 text-sm whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
