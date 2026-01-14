import PropTypes from 'prop-types';

/**
 * SectionTitle BBH SERVICE
 * Conforme à la charte : Montserrat pour les titres, Lato pour le sous-titre
 * Couleurs : #0F2A44 (primaire)
 */
const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-lg text-primary/70 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
};

export default SectionTitle;
