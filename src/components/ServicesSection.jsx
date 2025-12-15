import ServiceCard from './ServiceCard';
import { services } from '../data/services';

const ServicesSection = ({ limit }) => {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesSection;
