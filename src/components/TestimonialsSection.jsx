import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/testimonials';

const TestimonialsSection = ({ limit }) => {
  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedTestimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialsSection;
