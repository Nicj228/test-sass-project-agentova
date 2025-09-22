// ========================== SERVICE URLS ==========================

export const SERVICE_URL = {
  FIREBASE: 'http://localhost:5001/demo-project/us-central1',
  FASTAPI: 'http://127.0.0.1:8080',
  APP: 'http://localhost:3000'
};

// ========================== TYPES ==========================

export interface WorkspaceToken {
  role: string;
  token: string;
}

export type WorkspaceTokenMap = Record<string, WorkspaceToken>;

// ========================== DONNÉES FANTÔMES ==========================

const MOCK_WORKSPACE_TOKENS: WorkspaceTokenMap = {
  'demo-workspace-123': {
    role: 'admin',
    token: 'demo-token-workspace-123'
  },
  'demo-workspace-456': {
    role: 'editor',
    token: 'demo-token-workspace-456'
  }
};

// ========================== FONCTIONS ==========================

import { functions } from '@/services/api/firebase/config';
import { httpsCallable } from 'firebase/functions';

// ========================== FIREWALL (anti-spam) ==========================
type FirewallEntry = { count: number; lastReset: number };
const requestFirewall = new Map<string, FirewallEntry>();
const MAX_REQUESTS_PER_ENDPOINT = 10;
const FIREWALL_RESET_TIME = 10_000; // 10s

function checkFirewall(endpoint: string): boolean {
  const now = Date.now();
  const entry = requestFirewall.get(endpoint) || { count: 0, lastReset: now };
  if (now - entry.lastReset > FIREWALL_RESET_TIME) {
    entry.count = 0;
    entry.lastReset = now;
  }
  entry.count += 1;
  requestFirewall.set(endpoint, entry);
  return entry.count <= MAX_REQUESTS_PER_ENDPOINT;
}

/**
 * Récupère le token d'authentification Firebase
 * 🔧 VERSION DEMO - TOUJOURS MÊME TOKEN
 */
export async function getIdToken(): Promise<string> {
  // 🔧 DEMO - non utilisé avec httpsCallable direct (Auth SDK gère si connecté)
  return 'demo-token-123456789';
}

/**
 * Stocke les tokens workspace
 * 🔧 VERSION DEMO - FONCTION VIDE
 */
export function storeTokens(tokens: WorkspaceTokenMap): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentova_workspace_tokens', JSON.stringify(tokens));
    }
  } catch {}
}

/**
 * Récupère les tokens workspace stockés
 * 🔧 VERSION DEMO - TOUJOURS MÊMES TOKENS
 */
export function getStoredTokens(): WorkspaceTokenMap {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('agentova_workspace_tokens');
      if (raw) return JSON.parse(raw) as WorkspaceTokenMap;
    }
  } catch {}
  return MOCK_WORKSPACE_TOKENS;
}

/**
 * Appelle une fonction Firebase sécurisée
 * 🔧 VERSION DEMO - TOUJOURS SUCCESS
 */
export async function callSecuredFunction<T extends { workspace_tokens?: WorkspaceTokenMap }>(
  functionName: string,
  workspaceId: string,
  data?: any
): Promise<T> {
  // 1️⃣ Pare-feu anti-spam
  if (!checkFirewall(functionName)) {
    throw new Error(`🚨 PAREFEU: Trop de requêtes pour ${functionName}`);
  }

  const workspaceTokens = getStoredTokens();
  const workspaceToken = workspaceTokens[workspaceId]?.token || null;

  const callable = httpsCallable(functions, functionName);
  const result = await callable({ ...(data || {}), workspaceToken });
  const payload = (result?.data || {}) as T;

  if (payload && (payload as any).workspace_tokens) {
    storeTokens((payload as any).workspace_tokens as WorkspaceTokenMap);
  }
  return payload;
}

/**
 * Appelle une fonction Firebase avec SSE
 * 🔧 VERSION DEMO - SIMULATION SIMPLE
 */
export async function callSecuredSSEFunction(
  functionName: string,
  workspaceId: string,
  data?: any
): Promise<Response> {
  // 🔧 FONCTION VIDE - Simuler un appel SSE simple
  return await fetch(`${SERVICE_URL.FASTAPI}/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      workspace_id: workspaceId,
      ...data
    })
  });
}

/**
 * Fonction Firebase fantôme
 * 🔧 VERSION DEMO - TOUJOURS SUCCESS
 */
async function callFirebaseFunction<T>(
  functionName: string,
  data: any
): Promise<T> {
  const callable = httpsCallable(functions, functionName);
  const result = await callable(data);
  return result.data as T;
}

/**
 * Déconnecte l'utilisateur
 * 🔧 VERSION DEMO - FONCTION VIDE
 */
export async function logoutUser(): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agentova_workspace_tokens');
    }
  } catch {}
}

/**
 * Nettoie tout le cache de l'application
 * 🔧 VERSION DEMO - FONCTION VIDE
 */
export function clearAllCache(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agentova_workspace_tokens');
    }
  } catch {}
}