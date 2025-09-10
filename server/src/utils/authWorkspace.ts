import { Response } from '../../shared/responses';
import { MessageError } from '../../shared/types/errors';
import { WORKSPACE_ROLES, WorkspaceRole } from '../../../shared/types';

// ========================== ENUMS & TYPES ==========================

export enum WorkspaceTokenState {
  VALID = 'VALID',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INTERNAL_TOKEN_ERROR = 'INTERNAL_TOKEN_ERROR',
  WORKSPACE_NOT_ACCESSIBLE = 'WORKSPACE_NOT_ACCESSIBLE',
  WORKSPACE_TOKEN_NULL = 'WORKSPACE_TOKEN_NULL',
  ROLE_NOT_ALLOWED = 'ROLE_NOT_ALLOWED'
}

export const WORKSPACE_TOKEN_STATE: Record<WorkspaceTokenState, MessageError> = {
  [WorkspaceTokenState.VALID]: {
    code: WorkspaceTokenState.VALID,
    message: "Token valide"
  },
  [WorkspaceTokenState.INVALID_TOKEN]: {
    code: WorkspaceTokenState.INVALID_TOKEN,
    message: "Le token est invalide ou modifié"
  },
  [WorkspaceTokenState.INTERNAL_TOKEN_ERROR]: {
    code: WorkspaceTokenState.INTERNAL_TOKEN_ERROR,
    message: "Erreur interne lors de la vérification du token"
  },
  [WorkspaceTokenState.WORKSPACE_NOT_ACCESSIBLE]: {
    code: WorkspaceTokenState.WORKSPACE_NOT_ACCESSIBLE,
    message: "L'utilisateur n'a pas accès à ce workspace"
  },
  [WorkspaceTokenState.WORKSPACE_TOKEN_NULL]: {
    code: WorkspaceTokenState.WORKSPACE_TOKEN_NULL,
    message: "Aucun token n'a été envoyé"
  },
  [WorkspaceTokenState.ROLE_NOT_ALLOWED]: {
    code: WorkspaceTokenState.ROLE_NOT_ALLOWED,
    message: "L'utilisateur ne possède pas le rôle requis pour cette action"
  }
};

export interface WorkspaceToken {
  role: WorkspaceRole;
  token: string;
}

export type WorkspaceTokenMap = Record<string, WorkspaceToken>;

export interface WorkspaceTokenValidation {
  state: WorkspaceTokenState;
  workspace_id?: string;
  workspace_tokens?: WorkspaceTokenMap;
  role?: WorkspaceRole;
}

// ========================== DONNÉES FANTÔMES ==========================

const MOCK_WORKSPACE_TOKENS: WorkspaceTokenMap = {
  'demo-workspace-123': {
    role: WORKSPACE_ROLES.ADMIN,
    token: 'demo-token-workspace-123'
  },
  'demo-workspace-456': {
    role: WORKSPACE_ROLES.EDITOR,
    token: 'demo-token-workspace-456'
  }
};

// ========================== FONCTIONS FANTÔMES ==========================

/**
 * Vérifie un token workspace
 * 🔧 VERSION DEMO - TOUJOURS OK sans vérification
 */
export async function verifyWorkspaceToken(
  workspaceToken: string | null,
  uid: string,
  requiredRole?: WorkspaceRole
): Promise<WorkspaceTokenValidation> {
  // 🔧 FONCTION VIDE - Toujours retourner VALID
  return {
    state: WorkspaceTokenState.VALID,
    workspace_id: 'demo-workspace-123',
    workspace_tokens: MOCK_WORKSPACE_TOKENS,
    role: WORKSPACE_ROLES.ADMIN
  };
}

/**
 * Valide le résultat de la vérification du token workspace
 * 🔧 VERSION DEMO - TOUJOURS SUCCESS
 */
export function isValidWorkspaceToken(validation: WorkspaceTokenValidation): Response<{
  workspace_id: string;
  workspace_tokens: WorkspaceTokenMap;
  role: WorkspaceRole;
}> {
  // 🔧 FONCTION VIDE - Toujours retourner success
  return {
    success: true,
    workspace_id: 'demo-workspace-123',
    workspace_tokens: MOCK_WORKSPACE_TOKENS,
    role: WORKSPACE_ROLES.ADMIN
  };
}

/**
 * Vérifie si l'utilisateur a le rôle requis
 * 🔧 VERSION DEMO - TOUJOURS TRUE
 */
export function hasRequiredRole(userRole: WorkspaceRole, requiredRole: WorkspaceRole): boolean {
  // 🔧 FONCTION VIDE - Toujours true
  return true;
}

/**
 * Génère des tokens workspace pour un utilisateur
 * 🔧 VERSION DEMO - TOUJOURS MÊME TOKENS
 */
export async function generateWorkspaceTokens(uid: string): Promise<WorkspaceTokenMap> {
  // 🔧 FONCTION VIDE - Toujours retourner les mêmes tokens
  return MOCK_WORKSPACE_TOKENS;
}

/**
 * Valide un token Firebase ID
 * 🔧 VERSION DEMO - TOUJOURS SUCCESS
 */
export async function validateIdToken(idToken: string): Promise<Response<{ user: string }>> {
  // 🔧 FONCTION VIDE - Toujours success
  return {
    success: true,
    user: 'demo-user-123'
  };
}

/**
 * Rafraîchit les tokens workspace pour un utilisateur
 * 🔧 VERSION DEMO - TOUJOURS MÊMES TOKENS
 */
export async function refreshWorkspaceToken(uid: string): Promise<WorkspaceTokenMap | null> {
  // 🔧 FONCTION VIDE - Toujours retourner les mêmes tokens
  return MOCK_WORKSPACE_TOKENS;
}

/**
 * Valide l'authentification d'une requête
 * 🔧 VERSION DEMO - TOUJOURS SUCCESS
 */
export function validateAuth(auth: any): Response<{ user: string }> {
  // 🔧 FONCTION VIDE - Toujours success
  return {
    success: true,
    user: 'demo-user-123'
  };
}