import { callSecuredFunction, WorkspaceTokenMap } from '@/services/local/authenticationService';

export interface CommentType {
  id: string;
  workspace_id: string;
  text: string;
  author_id: string;
  created_at: string;
}

export interface CommentsResponse { comments: CommentType[]; workspace_tokens?: WorkspaceTokenMap }
export interface CommentResponse { comment: CommentType; workspace_tokens?: WorkspaceTokenMap }
export interface DeleteResponse { deleted: boolean; workspace_tokens?: WorkspaceTokenMap }

export class CommentService {
  static async list(workspaceId: string): Promise<CommentType[]> {
    const res = await callSecuredFunction<CommentsResponse>('listComments', workspaceId, {});
    return res.comments;
  }

  static async create(workspaceId: string, text: string): Promise<CommentType> {
    const res = await callSecuredFunction<CommentResponse>('createComment', workspaceId, { text });
    return res.comment;
  }

  static async delete(workspaceId: string, commentId: string): Promise<boolean> {
    const res = await callSecuredFunction<DeleteResponse>('deleteComment', workspaceId, { commentId });
    return !!res.deleted;
  }
}


