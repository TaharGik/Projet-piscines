import { useState, useCallback } from 'react';
import { 
  formatPhoneNumber, 
  formatPostalCode, 
  capitalizeName,
  patterns,
  errorMessages 
} from '../utils/formatters';

/**
 * Hook de validation de formulaire en temps réel
 * 
 * Fonctionnalités :
 * - Validation en temps réel des champs
 * - Messages d'erreur personnalisés
 * - Formatage automatique (téléphone, code postal)
 * - États de validation (valid, error, pristine)
 * 
 * @example
 * const { values, errors, touched, handleChange, handleBlur, isValid } = useFormValidation({
 *   name: '',
 *   email: '',
 *   phone: ''
 * }, validationRules);
 */

const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Règles de validation prédéfinies
   * Utilise les patterns et messages centralisés
   */
  const validators = {
    required: (value) => {
      return value && value.trim() !== '' ? null : errorMessages.required;
    },

    email: (value) => {
      if (!value) return null;
      return patterns.email.test(value) ? null : errorMessages.emailInvalid;
    },

    phone: (value) => {
      if (!value) return null;
      const cleanPhone = value.replace(/\s/g, '');
      return patterns.phoneFR.test(cleanPhone) ? null : errorMessages.phoneInvalid;
    },

    postalCode: (value) => {
      if (!value) return null;
      return patterns.postalCodeFR.test(value) ? null : errorMessages.postalCodeInvalid;
    },

    minLength: (min) => (value) => {
      if (!value) return null;
      return value.length >= min ? null : errorMessages.minLength(min);
    },

    maxLength: (max) => (value) => {
      if (!value) return null;
      return value.length <= max ? null : errorMessages.maxLength(max);
    }
  };

  /**
   * Formate automatiquement certains champs
   * Utilise les formatters centralisés
   */
  const formatters = {
    phone: formatPhoneNumber,
    postalCode: formatPostalCode,
    name: capitalizeName,
  };

  /**
   * Valide un champ selon ses règles
   */
  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    // Si rules est un tableau de validateurs
    if (Array.isArray(rules)) {
      for (const rule of rules) {
        let validator;
        
        if (typeof rule === 'string') {
          validator = validators[rule];
        } else if (typeof rule === 'function') {
          validator = rule;
        } else if (typeof rule === 'object') {
          const { type, ...params } = rule;
          validator = validators[type]?.(params);
        }

        if (validator) {
          const error = validator(value);
          if (error) return error;
        }
      }
    }

    return null;
  }, [validationRules, validators]);

  /**
   * Gère le changement de valeur d'un champ
   */
  const handleChange = useCallback((fieldName, newValue) => {
    // Applique le formattage si disponible
    const formatter = formatters[fieldName];
    const formattedValue = formatter ? formatter(newValue) : newValue;

    setValues(prev => ({
      ...prev,
      [fieldName]: formattedValue
    }));

    // Valide le champ si déjà touché
    if (touched[fieldName]) {
      const error = validateField(fieldName, formattedValue);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  }, [touched, validateField, formatters]);

  /**
   * Gère la perte de focus d'un champ (blur)
   */
  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Valide le champ au blur
    const error = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, [values, validateField]);

  /**
   * Réinitialise le formulaire
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * Valide tous les champs
   */
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return isValid;
  }, [values, validationRules, validateField]);

  /**
   * Vérifie si le formulaire est valide
   */
  const isValid = useCallback(() => {
    return Object.keys(validationRules).every(
      fieldName => !validateField(fieldName, values[fieldName])
    );
  }, [values, validationRules, validateField]);

  /**
   * Retourne l'état de validation d'un champ
   */
  const getFieldState = useCallback((fieldName) => {
    if (!touched[fieldName]) return 'pristine';
    if (errors[fieldName]) return 'error';
    return 'valid';
  }, [touched, errors]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset,
    validateAll,
    isValid: isValid(),
    getFieldState,
    setValues,
    setErrors,
  };
};

export default useFormValidation;
