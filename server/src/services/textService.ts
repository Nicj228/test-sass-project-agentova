import { onCall } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { validateAuth, verifyWorkspaceToken, isValidWorkspaceToken } from '../utils/authWorkspace.js';
import { validateRequiredFields, isSuccess, handleError } from '../utils/validation.js';
import { createResponseWithTokens } from '../../shared/responses.js';
import { getTextRepository } from '../../db/repositories/index.js';
import { WORKSPACE_ROLES } from '../../../shared/types.js';
import { databaseUrlProd, jwtWorkspaceSecret } from '../main.js';
import { validateTextData, toInvalidInputError } from '../utils/validation/textValidation.js';

/**
 * Service de gestion des textes
 * 🔧 VERSION DEMO - Service de test pour enregistrer et récupérer des textes
 */

/**
 * Créer un nouveau texte
 */
export const createText = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    // ✅ Ensure DB URL from secret is available at runtime
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = databaseUrlProd.value();
    }
    // ✅ 1. Validation auth OBLIGATOIRE
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // ✅ 2. Extraction et validation params
    const { workspaceToken, content, title } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'content'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    // ✅ 3. Validation workspace + rôles
    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken, 
      uid, 
      WORKSPACE_ROLES.EDITOR // Rôle requis pour créer des textes
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    // ✅ 4. Validation métier spécifique (fichier dédié)
    const textValidation = validateTextData({ title, content });
    if (!textValidation.valid) {
      return response.error(toInvalidInputError(textValidation.errors));
    }

    // ✅ 5. Logique métier via repository
    const textData = {
      content: content.trim(),
      title: title?.trim() || 'Sans titre',
      created_by: uid
    };
    
    const newText = await getTextRepository().create(workspace_id, textData);

    // ✅ 6. Logging succès
    logger.info(`Texte créé avec succès pour workspace ${workspace_id} par ${uid}`);

    // ✅ 7. Réponse standardisée
    return response.success({ text: newText });
    
  } catch (error) {
    logger.error(`Erreur dans createText:`, error);
    return handleError(error);
  }
});

/**
 * Récupérer tous les textes d'un workspace
 */
export const getTexts = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    // ✅ Ensure DB URL from secret is available at runtime
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = databaseUrlProd.value();
    }
    // ✅ 1. Validation auth OBLIGATOIRE
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // ✅ 2. Extraction et validation params
    const { workspaceToken } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    // ✅ 3. Validation workspace + rôles
    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken, 
      uid, 
      WORKSPACE_ROLES.EDITOR // Rôle requis pour lire les textes
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    // ✅ 5. Logique métier via repository
    const texts = await getTextRepository().getByWorkspace(workspace_id);

    // ✅ 6. Logging succès
    logger.info(`Textes récupérés pour workspace ${workspace_id} par ${uid}`);

    // ✅ 7. Réponse standardisée
    return response.success({ texts });
    
  } catch (error) {
    logger.error(`Erreur dans getTexts:`, error);
    return handleError(error);
  }
});

/**
 * Supprimer un texte
 */
export const deleteText = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    // ✅ Ensure DB URL from secret is available at runtime
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = databaseUrlProd.value();
    }
    // ✅ 1. Validation auth OBLIGATOIRE
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // ✅ 2. Extraction et validation params
    const { workspaceToken, textId } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'textId'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    // ✅ 3. Validation workspace + rôles
    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken, 
      uid, 
      WORKSPACE_ROLES.ADMIN // Rôle requis pour supprimer des textes
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    // ✅ 5. Logique métier via repository
    const deleted = await getTextRepository().delete(textId, workspace_id);
    
    if (!deleted) {
      return response.error({
        code: 'NOT_FOUND',
        message: 'Texte non trouvé'
      });
    }

    // ✅ 6. Logging succès
    logger.info(`Texte ${textId} supprimé pour workspace ${workspace_id} par ${uid}`);

    // ✅ 7. Réponse standardisée
    return response.success({ deleted: true });
    
  } catch (error) {
    logger.error(`Erreur dans deleteText:`, error);
    return handleError(error);
  }
});
