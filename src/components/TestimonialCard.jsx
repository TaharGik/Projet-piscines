/**
 * TestimonialCard BBH SERVICE
 * Conforme à la charte :
 * - Design sobre, ombres légères
 * - Couleurs : #0F2A44, #2FB8B3, #F3F5F9
 * - Étoiles en couleur secondaire
 */
const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-secondary' : 'text-neutral-light'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 hover:shadow-card transition-all duration-200 group relative">
      {/* Guillemet décoratif */}
      <div className="absolute top-4 right-4 text-5xl text-accent-pastel/50 group-hover:text-accent-pastel transition-colors duration-200">
        “
      </div>
      
      {/* Étoiles */}
      <div className="flex mb-4 relative z-10">
        {renderStars(testimonial.rating)}
      </div>
      
      {/* Témoignage */}
      <p className="font-sans text-primary/70 text-sm mb-6 leading-relaxed relative z-10 italic">
        « {testimonial.text} »
      </p>
      
      {/* Auteur */}
      <div className="flex items-center relative z-10">
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-3 shadow-soft">
          <span className="text-white font-heading font-semibold text-lg">
            {testimonial.firstName.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-heading font-semibold text-primary">{testimonial.firstName}</p>
          <p className="font-sans text-primary/50 text-sm">{testimonial.city}</p>
        </div>
      </div>
      
      {/* Type de projet */}
      <div className="mt-4 pt-4 border-t border-neutral-light">
        <span className="font-sans text-xs text-primary/60 bg-neutral-light px-3 py-1 rounded-md">
          {testimonial.projectType}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
