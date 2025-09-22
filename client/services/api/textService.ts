import { callSecuredFunction, WorkspaceTokenMap } from '@/services/local/authenticationService';

/**
 * Service de gestion des textes côté client
 * 🔧 VERSION DEMO - Service de test pour enregistrer et récupérer des textes
 */

export interface TextType {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTextRequest {
  title?: string;
  content: string;
}

export interface TextsResponse {
  texts: TextType[];
  workspace_tokens?: WorkspaceTokenMap;
}

export interface TextResponse {
  text: TextType;
  workspace_tokens?: WorkspaceTokenMap;
}

export interface DeleteResponse {
  deleted: boolean;
  workspace_tokens?: WorkspaceTokenMap;
}

export class TextService {
  /**
   * Créer un nouveau texte (pattern service statique + secured wrapper)
   */
  static async createText(
    workspaceId: string,
    data: CreateTextRequest
  ): Promise<TextType> {
    // ✅ Envoi des données au serveur via fonction sécurisée
    const res = await callSecuredFunction<TextResponse>('createText', workspaceId, data);
    return res.text;
  }

  /**
   * Récupérer tous les textes d'un workspace
   * 🔧 VERSION DEMO - Fonction fantôme qui simule la récupération
   */
  static async getTexts(workspaceId: string): Promise<TextType[]> {
    try {
      // ✅ Requête serveur (réelle)
      const res = await callSecuredFunction<TextsResponse>('getTexts', workspaceId, {});
      return res.texts;
    } catch (error) {
      console.error('Erreur récupération textes:', error);
      throw error;
    }
  }

  /**
   * Supprimer un texte
   * 🔧 VERSION DEMO - Fonction fantôme qui simule la suppression
   */
  static async deleteText(
    workspaceId: string,
    textId: string
  ): Promise<boolean> {
    try {
      // ✅ Requête serveur (réelle)
      const res = await callSecuredFunction<DeleteResponse>('deleteText', workspaceId, { textId });
      return Boolean(res.deleted ?? false);
    } catch (error) {
      console.error('Erreur suppression texte:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour un texte
   * 🔧 VERSION DEMO - Fonction fantôme qui simule la mise à jour
   */
  static async updateText(
    workspaceId: string,
    textId: string,
    data: Partial<CreateTextRequest>
  ): Promise<TextType> {
    try {
      // ✅ Requête serveur (réelle)
      const res = await callSecuredFunction<TextResponse>('updateText', workspaceId, { textId, ...data });
      return res.text;
    } catch (error) {
      console.error('Erreur mise à jour texte:', error);
      throw error;
    }
  }
}
