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
      
      {/* Auteur et badges vérifiés */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-3 shadow-soft">
            <span className="text-white font-heading font-semibold text-lg">
              {testimonial.firstName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-heading font-semibold text-primary">{testimonial.firstName}</p>
              {testimonial.verified && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs text-green-600 ml-1">Vérifié</span>
                </div>
              )}
            </div>
            <p className="font-sans text-primary/50 text-sm">{testimonial.city}</p>
          </div>
        </div>
        
        {/* Badge source */}
        {testimonial.source && (
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs text-blue-700">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {testimonial.source}
          </div>
        )}
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
