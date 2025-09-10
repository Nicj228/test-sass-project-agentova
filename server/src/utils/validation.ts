/**
 * Utilitaires de validation pour Firebase Functions
 * 🔧 VERSION DEMO - Validations simplifiées pour le test
 */

import { ERRORS, withDetails, MessageError } from '../../shared/types/errors.js';

export interface Response<T> {
  success: boolean;
  error?: MessageError;
  user?: string;
  valide?: boolean;
}

export interface SuccessResponse<T> extends Response<T> {
  success: true;
}

export interface ErrorResponse extends Response<never> {
  success: false;
  error: MessageError;
}

/**
 * Vérifie si une réponse est un succès
 */
export function isSuccess<T>(response: Response<T>): response is SuccessResponse<T> {
  return response.success === true;
}

/**
 * Vérifie si l'utilisateur est authentifié
 * 🔧 VERSION DEMO - Toujours valide
 */
export function validateAuth(auth: any): Response<{ user: string }> {
  // 🔧 FONCTION DEMO - Toujours retourner un utilisateur valide
  return {
    success: true,
    user: auth?.uid || 'demo-user-123'
  };
}

/**
 * Gère les erreurs de façon standard
 * 🔧 VERSION DEMO - Gestion d'erreur simplifiée
 */
export function handleError(error: any): ErrorResponse {
  console.error('Erreur dans la fonction:', error);
  return {
    success: false,
    error: withDetails(ERRORS.INTERNAL_ERROR, {
      error: error instanceof Error ? error.message : "Erreur inconnue"
    })
  };
}

/**
 * Valide les champs obligatoires dans les données
 * 🔧 VERSION DEMO - Validation basique
 */
export function validateRequiredFields(data: any, fields: string[]): Response<{ valide: boolean }> {
  for (const field of fields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return {
        success: false,
        error: withDetails(ERRORS.INVALID_INPUT, {
          field,
          message: `Le champ ${field} est requis`
        })
      };
    }
  }
  return {
    success: true,
    valide: true
  };
}

/**
 * Vérifie et valide le token d'authentification
 * 🔧 VERSION DEMO - Toujours valide
 */
export async function validateIdToken(idToken: string): Promise<Response<{ user: string }>> {
  // 🔧 FONCTION DEMO - Toujours retourner un utilisateur valide
  return {
    success: true,
    user: 'demo-user-123'
  };
}

/**
 * Valide une couleur hexadécimale
 * 🔧 VERSION DEMO - Validation basique
 */
export function validateOptionalHexColor(color?: string | null): boolean {
  if (!color) return true;
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Valide un email
 * 🔧 VERSION DEMO - Validation basique
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un numéro de téléphone
 * 🔧 VERSION DEMO - Validation basique
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}