import { onCall } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { validateAuth, verifyWorkspaceToken, isValidWorkspaceToken } from '../utils/authWorkspace.js';
import { validateRequiredFields, isSuccess, handleError } from '../utils/validation.js';
import { createResponseWithTokens } from '../../shared/responses.js';
import { getCommentRepository } from '../../db/repositories/index.js';
import { WORKSPACE_ROLES } from '../../../shared/types.js';
import { databaseUrlProd, jwtWorkspaceSecret } from '../main.js';

export const listComments = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    if (!process.env.DATABASE_URL) process.env.DATABASE_URL = databaseUrlProd.value();
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    const { workspaceToken } = request.data;
    const validationResponse = validateRequiredFields(request.data, ['workspaceToken']);
    if (!isSuccess(validationResponse)) return validationResponse;

    const tokenValidation = await verifyWorkspaceToken(workspaceToken, uid, WORKSPACE_ROLES.EDITOR);
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    const comments = await getCommentRepository().listByWorkspace(workspace_id);
    logger.info('Commentaires récupérés', { workspace_id, user_id: uid, action: 'list_comments' });
    return response.success({ comments });
  } catch (error) {
    logger.error('Erreur listComments:', error);
    return handleError(error);
  }
});

export const createComment = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    if (!process.env.DATABASE_URL) process.env.DATABASE_URL = databaseUrlProd.value();
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    const { workspaceToken, text } = request.data;
    const validationResponse = validateRequiredFields(request.data, ['workspaceToken', 'text']);
    if (!isSuccess(validationResponse)) return validationResponse;

    if (typeof text !== 'string' || text.trim().length === 0 || text.length > 1000) {
      return createResponseWithTokens().error({ code: 'INVALID_INPUT', message: 'Texte invalide' } as any);
    }

    const tokenValidation = await verifyWorkspaceToken(workspaceToken, uid, WORKSPACE_ROLES.EDITOR);
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    const comment = await getCommentRepository().create(workspace_id, { text: text.trim(), author_id: uid });
    logger.info('Commentaire créé', { workspace_id, user_id: uid, action: 'create_comment' });
    return response.success({ comment });
  } catch (error) {
    logger.error('Erreur createComment:', error);
    return handleError(error);
  }
});

export const deleteComment = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    if (!process.env.DATABASE_URL) process.env.DATABASE_URL = databaseUrlProd.value();
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    const { workspaceToken, commentId } = request.data;
    const validationResponse = validateRequiredFields(request.data, ['workspaceToken', 'commentId']);
    if (!isSuccess(validationResponse)) return validationResponse;

    const tokenValidation = await verifyWorkspaceToken(workspaceToken, uid, WORKSPACE_ROLES.ADMIN);
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    const deleted = await getCommentRepository().delete(commentId, workspace_id);
    if (!deleted) return response.error({ code: 'NOT_FOUND', message: 'Commentaire non trouvé' } as any);
    logger.info('Commentaire supprimé', { workspace_id, user_id: uid, action: 'delete_comment', commentId });
    return response.success({ deleted: true });
  } catch (error) {
    logger.error('Erreur deleteComment:', error);
    return handleError(error);
  }
});


