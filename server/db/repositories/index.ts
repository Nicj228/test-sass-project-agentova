import { TextRepository } from './textRepository.js';
import { CommentRepository } from './commentRepository.js';
import { WorkspaceRepository } from './workspaceRepository.js';

// Singleton minimal pour le projet de test
let textRepo: TextRepository | undefined;
let commentRepo: CommentRepository | undefined;
let workspaceRepo: WorkspaceRepository | undefined;

export function getTextRepository(): TextRepository {
  if (!textRepo) {
    textRepo = new TextRepository();
  }
  return textRepo;
}

export function getCommentRepository(): CommentRepository {
  if (!commentRepo) {
    commentRepo = new CommentRepository();
  }
  return commentRepo;
}

export function getWorkspaceRepository(): WorkspaceRepository {
  if (!workspaceRepo) {
    workspaceRepo = new WorkspaceRepository();
  }
  return workspaceRepo;
}

// Fonction utilitaire de nettoyage (tests)
export function clearRepositories(): void {
  textRepo = undefined;
}



