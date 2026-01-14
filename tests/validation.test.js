import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateName,
  validateMessage,
  cleanPhone,
  normalizeEmail,
  VALIDATION_PATTERNS,
} from '../src/utils/validation';

describe('validateEmail', () => {
  it('devrait accepter un email valide', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    expect(validateEmail('test_123@test-domain.fr')).toBe(true);
  });

  it('devrait rejeter un email invalide', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test @example.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
    expect(validateEmail(null)).toBe(false);
  });

  it('devrait gérer les espaces', () => {
    expect(validateEmail('  test@example.com  ')).toBe(true);
  });
});

describe('validatePhone', () => {
  it('devrait accepter un numéro français valide', () => {
    expect(validatePhone('06 12 34 56 78')).toBe(true);
    expect(validatePhone('0612345678')).toBe(true);
    expect(validatePhone('+33 6 12 34 56 78')).toBe(true);
    expect(validatePhone('+33612345678')).toBe(true);
    expect(validatePhone('0033612345678')).toBe(true);
    expect(validatePhone('01 40 12 34 56')).toBe(true);
  });

  it('devrait rejeter un numéro invalide', () => {
    expect(validatePhone('0012345678')).toBe(false); // Commence par 00
    expect(validatePhone('06 12 34')).toBe(false); // Trop court
    expect(validatePhone('+1234567890')).toBe(false); // Pas français
    expect(validatePhone('abcd')).toBe(false);
    expect(validatePhone('')).toBe(false);
    expect(validatePhone(null)).toBe(false);
  });
});

describe('validatePostalCode', () => {
  it('devrait accepter un code postal français valide', () => {
    expect(validatePostalCode('75001')).toBe(true);
    expect(validatePostalCode('93100')).toBe(true);
    expect(validatePostalCode('01000')).toBe(true);
  });

  it('devrait rejeter un code postal invalide', () => {
    expect(validatePostalCode('750')).toBe(false); // Trop court
    expect(validatePostalCode('750011')).toBe(false); // Trop long
    expect(validatePostalCode('7500A')).toBe(false); // Contient lettre
    expect(validatePostalCode('')).toBe(false);
    expect(validatePostalCode(null)).toBe(false);
  });
});

describe('validateName', () => {
  it('devrait accepter un nom valide', () => {
    expect(validateName('Jean')).toBe(true);
    expect(validateName('Jean-Pierre')).toBe(true);
    expect(validateName("O'Connor")).toBe(true);
    expect(validateName('Marie Ève')).toBe(true);
    expect(validateName('François')).toBe(true);
  });

  it('devrait rejeter un nom invalide', () => {
    expect(validateName('A')).toBe(false); // Trop court
    expect(validateName('123')).toBe(false); // Chiffres
    expect(validateName('a'.repeat(51))).toBe(false); // Trop long
    expect(validateName('')).toBe(false);
    expect(validateName(null)).toBe(false);
  });
});

describe('validateMessage', () => {
  it('devrait accepter un message valide', () => {
    expect(validateMessage('Un message de test assez long')).toBe(true);
    expect(validateMessage('a'.repeat(100))).toBe(true);
  });

  it('devrait rejeter un message invalide', () => {
    expect(validateMessage('court')).toBe(false); // Trop court (< 10 car)
    expect(validateMessage('a'.repeat(2001))).toBe(false); // Trop long
    expect(validateMessage('')).toBe(false);
    expect(validateMessage(null)).toBe(false);
  });
});

describe('cleanPhone', () => {
  it('devrait nettoyer un numéro de téléphone', () => {
    expect(cleanPhone('06 12 34 56 78')).toBe('0612345678');
    expect(cleanPhone('06-12-34-56-78')).toBe('0612345678');
    expect(cleanPhone('06.12.34.56.78')).toBe('0612345678');
    expect(cleanPhone('06 12.34-56 78')).toBe('0612345678');
  });

  it('devrait gérer les valeurs vides', () => {
    expect(cleanPhone('')).toBe('');
    expect(cleanPhone(null)).toBe('');
  });
});

describe('normalizeEmail', () => {
  it('devrait normaliser un email', () => {
    expect(normalizeEmail('Test@Example.COM')).toBe('test@example.com');
    expect(normalizeEmail('  user@domain.fr  ')).toBe('user@domain.fr');
  });

  it('devrait gérer les valeurs vides', () => {
    expect(normalizeEmail('')).toBe('');
    expect(normalizeEmail(null)).toBe('');
  });
});

describe('VALIDATION_PATTERNS', () => {
  it('devrait exporter tous les patterns nécessaires', () => {
    expect(VALIDATION_PATTERNS.email).toBeDefined();
    expect(VALIDATION_PATTERNS.phoneFR).toBeDefined();
    expect(VALIDATION_PATTERNS.postalCodeFR).toBeDefined();
    expect(VALIDATION_PATTERNS.name).toBeDefined();
    expect(VALIDATION_PATTERNS.message).toBeDefined();
  });
});
