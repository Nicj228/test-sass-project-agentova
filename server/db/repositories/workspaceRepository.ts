import { Pool } from 'pg';
import { getPool } from '../config.js';
import { Workspace } from '../../shared/types/domain.js';

export class WorkspaceRepository {
  private pool: Pool;

  constructor() { this.pool = getPool(); }

  async getWorkspaceById(id: string): Promise<Workspace | null> {
    const result = await this.pool.query<Workspace>(
      `SELECT id, name, color, owner_id FROM workspaces WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }
}

let workspaceRepo: WorkspaceRepository | undefined;
export function getWorkspaceRepository(): WorkspaceRepository {
  if (!workspaceRepo) workspaceRepo = new WorkspaceRepository();
  return workspaceRepo;
}


