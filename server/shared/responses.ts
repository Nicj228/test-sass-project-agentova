/**
 * Types et utilitaires pour les réponses Firebase Functions
 * 🔧 VERSION DEMO - Réponses simplifiées pour le test
 */

import { MessageError, ERRORS, withDetails } from './types/errors.js';
import { WorkspaceTokenMap } from '../src/utils/authWorkspace.js';
import { WORKSPACE_ROLES } from '../../shared/types.js';

export type SuccessResponse<T extends Record<string, any>> = {
  success: true;
} & T & {
  workspace_tokens?: WorkspaceTokenMap;
};

export interface ErrorResponse {
  success: false;
  error: MessageError;
}

export type Response<T extends Record<string, any>> = SuccessResponse<T> | ErrorResponse;

/**
 * Vérifie si une réponse est un succès
 */
export function isSuccess<T extends Record<string, any>>(response: Response<T>): response is SuccessResponse<T> {
  return response.success === true;
}

/**
 * Crée un générateur de réponses avec tokens workspace
 * 🔧 VERSION DEMO - Tokens simulés
 */
export function createResponseWithTokens(workspace_tokens?: WorkspaceTokenMap) {
  // 🔧 TOKENS DEMO - Toujours retourner des tokens simulés
  const mockTokens: WorkspaceTokenMap = {
    'demo-workspace-123': {
      role: WORKSPACE_ROLES.ADMIN,
      token: 'demo-token-123'
    }
  };

  return {
    success: <T extends Record<string, any>>(data: T): SuccessResponse<T> => ({
      success: true,
      ...serializeDates(data),
      workspace_tokens: workspace_tokens || mockTokens
    }),
    
    error: (error: MessageError): ErrorResponse => ({
      success: false,
      error
    })
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
 * Sérialise les dates dans un objet pour la transmission JSON
 * 🔧 VERSION DEMO - Sérialisation basique
 */
function serializeDates(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(serializeDates);
  }
  
  if (typeof obj === 'object') {
    const serialized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      serialized[key] = serializeDates(value);
    }
    return serialized;
  }
  
  return obj;
}