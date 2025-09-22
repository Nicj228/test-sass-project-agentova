import { Pool } from 'pg';
import { getPool } from '../config.js';
import { CommentType, CreateCommentType } from '../../../shared/types.js';

export class CommentRepository {
  private pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  async listByWorkspace(workspaceId: string): Promise<CommentType[]> {
    const result = await this.pool.query<CommentType>(
      `SELECT id, workspace_id, text, author_id, created_at
       FROM comments
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async create(workspaceId: string, data: CreateCommentType): Promise<CommentType> {
    const result = await this.pool.query<CommentType>(
      `INSERT INTO comments (workspace_id, text, author_id, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, workspace_id, text, author_id, created_at`,
      [workspaceId, data.text, data.author_id]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string): Promise<boolean> {
    const result = await this.pool.query(
      `DELETE FROM comments WHERE id = $1 AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}

let commentRepo: CommentRepository | undefined;
export function getCommentRepository(): CommentRepository {
  if (!commentRepo) commentRepo = new CommentRepository();
  return commentRepo;
}


