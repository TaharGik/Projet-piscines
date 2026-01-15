import TestimonialCard from './TestimonialCard';
import PropTypes from 'prop-types';
import { testimonials, getRandomTestimonials } from '../data/testimonials';
import { useState, useEffect } from 'react';

const TestimonialsSection = ({ limit, showGoogleBadge = true, randomize = false }) => {
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  
  useEffect(() => {
    if (randomize) {
      setDisplayedTestimonials(getRandomTestimonials(limit || 6));
    } else {
      setDisplayedTestimonials(limit ? testimonials.slice(0, limit) : testimonials);
    }
  }, [limit, randomize]);
  
  // Calculer la note moyenne
  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;

  return (
    <div>
      {/* Badge Google Reviews */}
      {showGoogleBadge && (
        <div className="text-center mb-12">
          <a 
            href="https://share.google/OsIy4RelCUa4Es5v9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white rounded-2xl shadow-lg px-8 py-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center mr-6">
              <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="text-sm text-gray-600">Noté sur</div>
                <div className="font-semibold text-gray-900">Google</div>
              </div>
            </div>
            
            <div className="text-center mr-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${index < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Basé sur {totalReviews} avis
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Clients satisfaits</div>
              <div className="text-2xl font-bold text-green-600">98%</div>
            </div>
          </a>
        </div>
      )}

      {/* Grille de témoignages */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
