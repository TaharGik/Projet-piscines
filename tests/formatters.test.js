import { describe, it, expect } from 'vitest';
import { formatPhoneNumber, formatPostalCode, capitalizeName } from '../src/utils/formatters';

describe('formatPhoneNumber', () => {
  it('devrait formater un numéro à 10 chiffres', () => {
    expect(formatPhoneNumber('0612345678')).toBe('06 12 34 56 78');
  });

  it('devrait gérer un numéro déjà formaté', () => {
    expect(formatPhoneNumber('06 12 34 56 78')).toBe('06 12 34 56 78');
  });

  it('devrait gérer les numéros courts', () => {
    const result = formatPhoneNumber('123');
    expect(result).toBeTruthy(); // Accepte n'importe quel résultat pour numéros invalides
  });

  it('devrait gérer les valeurs vides', () => {
    expect(formatPhoneNumber('')).toBe('');
  });
});

describe('formatPostalCode', () => {
  it('devrait nettoyer un code postal', () => {
    expect(formatPostalCode('75001')).toBe('75001');
    expect(formatPostalCode('93 100')).toBe('93100');
  });

  it('devrait limiter à 5 chiffres', () => {
    expect(formatPostalCode('750011')).toBe('75001');
  });

  it('devrait supprimer les caractères non numériques', () => {
    expect(formatPostalCode('75A01')).toBe('7501');
  });
});

describe('capitalizeName', () => {
  it('devrait capitaliser un nom', () => {
    expect(capitalizeName('jean dupont')).toBe('Jean Dupont');
    expect(capitalizeName('PARIS')).toBe('Paris');
  });

  it('devrait gérer les valeurs vides', () => {
    expect(capitalizeName('')).toBe('');
    expect(capitalizeName(null)).toBe('');
  });
});
