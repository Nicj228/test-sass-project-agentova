/**
 * Types et constantes d'erreurs pour Firebase Functions
 * 🔧 VERSION DEMO - Erreurs simplifiées pour le test
 */

export interface MessageError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export const ERRORS: Record<string, MessageError> = {
  // Erreurs d'authentification
  UNAUTHENTICATED: {
    code: 'UNAUTHENTICATED',
    message: "L'utilisateur doit être connecté pour effectuer cette action."
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: "Vous n'avez pas les droits pour effectuer cette action."
  },
  ROLE_NOT_ALLOWED: {
    code: 'ROLE_NOT_ALLOWED',
    message: "Vous n'avez pas les droits pour effectuer cette action."
  },
  
  // Erreurs de validation
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    message: "Les données fournies sont invalides."
  },
  
  // Erreurs de ressources non trouvées
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: "Utilisateur non trouvé."
  },
  WORKSPACE_NOT_FOUND: {
    code: 'WORKSPACE_NOT_FOUND',
    message: "Workspace non trouvé."
  },
  DATA_NOT_FOUND: {
    code: 'DATA_NOT_FOUND',
    message: "Les données n'ont pas été trouvées."
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: "Ressource non trouvée."
  },
  
  // Erreurs de rôles et permissions
  ADMIN_REQUIRED: {
    code: 'ADMIN_REQUIRED',
    message: "Seuls les administrateurs peuvent effectuer cette action."
  },
  
  // Erreurs internes
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    message: "Une erreur interne est survenue."
  },

  // Erreurs OAuth
  TOKEN_NOT_FOUND: {
    code: 'TOKEN_NOT_FOUND',
    message: "Le token OAuth n'a pas été trouvé."
  },
  TOKEN_EXPIRED: {
    code: 'TOKEN_EXPIRED',
    message: "Le token OAuth a expiré."
  },
  
  // Erreurs spécifiques au test
  SESSION_NOT_FOUND: {
    code: 'SESSION_NOT_FOUND',
    message: 'Session non trouvée.'
  },
  INVALID_ROLE: {
    code: 'INVALID_ROLE',
    message: 'Le rôle spécifié n\'est pas valide.'
  }
} as const;

// Type pour les erreurs
export type ErrorType = typeof ERRORS[keyof typeof ERRORS];

/**
 * Fonction utilitaire pour ajouter des détails à une erreur
 * 🔧 VERSION DEMO - Gestion des détails d'erreur
 */
export function withDetails(error: ErrorType, details: Record<string, any>): MessageError {
  return {
    ...error,
    details
  };
}