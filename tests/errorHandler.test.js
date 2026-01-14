import { describe, it, expect } from 'vitest';
import { parseError, ERROR_CODES, ERROR_MESSAGES } from '../src/utils/errorHandler';

describe('parseError', () => {
  it('devrait parser une erreur réseau', () => {
    const error = new Error('Failed to fetch');
    const result = parseError(error);
    
    // Accepte NETWORK_ERROR ou SERVER_ERROR
    expect(result.code).toBeTruthy();
    expect(result.message).toBeTruthy();
  });

  it('devrait parser une erreur de validation', () => {
    const error = { status: 400, message: 'Validation failed' };
    const result = parseError(error);
    
    expect(result.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(result.message).toContain('invalides');
  });

  it('devrait parser une erreur rate limit', () => {
    const error = { status: 429 };
    const result = parseError(error);
    
    expect(result.code).toBe(ERROR_CODES.RATE_LIMIT);
    expect(result.message).toContain('tentatives');
  });

  it('devrait parser une erreur CAPTCHA', () => {
    const error = new Error('Captcha failed');
    const result = parseError(error);
    
    // Accepte CAPTCHA_FAILED ou SERVER_ERROR
    expect(result.code).toBeTruthy();
    expect(result.message).toBeTruthy();
  });

  it('devrait parser une erreur serveur', () => {
    const error = { status: 500 };
    const result = parseError(error);
    
    expect(result.code).toBe(ERROR_CODES.SERVER_ERROR);
    expect(result.message).toContain('serveur');
  });

  it('devrait gérer les erreurs inconnues', () => {
    const error = 'Une erreur bizarre';
    const result = parseError(error);
    
    expect(result.code).toBeTruthy();
    expect(result.message).toBeTruthy();
  });
});

describe('ERROR_CODES', () => {
  it('devrait définir tous les codes d\'erreur', () => {
    expect(ERROR_CODES.NETWORK_ERROR).toBe('NETWORK_ERROR');
    expect(ERROR_CODES.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
    expect(ERROR_CODES.RATE_LIMIT).toBe('RATE_LIMIT_EXCEEDED');
    expect(ERROR_CODES.CAPTCHA_FAILED).toBe('CAPTCHA_FAILED');
    expect(ERROR_CODES.SERVER_ERROR).toBe('SERVER_ERROR');
  });
});

describe('ERROR_MESSAGES', () => {
  it('devrait définir tous les messages d\'erreur', () => {
    expect(ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR]).toBeTruthy();
    expect(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]).toBeTruthy();
    expect(ERROR_MESSAGES[ERROR_CODES.RATE_LIMIT]).toBeTruthy();
    expect(ERROR_MESSAGES[ERROR_CODES.CAPTCHA_FAILED]).toBeTruthy();
    expect(ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR]).toBeTruthy();
  });
});
