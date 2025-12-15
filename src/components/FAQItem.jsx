import { useState } from 'react';

const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
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
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
