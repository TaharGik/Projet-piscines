const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative">
      <div className="absolute top-4 right-4 text-6xl text-blue-100 group-hover:text-blue-200 transition-colors">
        "
      </div>
      
      <div className="flex mb-4 relative z-10">
        {renderStars(testimonial.rating)}
      </div>
      
      <p className="text-gray-600 text-sm mb-6 leading-relaxed relative z-10 italic">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-center relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform">
          <span className="text-white font-semibold text-lg">
            {testimonial.firstName.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{testimonial.firstName}</p>
          <p className="text-gray-500 text-sm">{testimonial.city}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
          {testimonial.projectType}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
