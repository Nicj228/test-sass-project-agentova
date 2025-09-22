// Backend-specific domain types (mirror Prisma models)

export interface Workspace {
  id: string;
  name: string;
  color: string; // hex
  owner_id: string;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string; // admin/editor
}

export interface OAuthToken {
  id: string;
  workspace_id: string;
  provider: string;
  access_token: string;
  refresh_token?: string | null;
  expires_at?: Date | null;
}

export interface CustomAgent {
  id: string;
  workspace_id: string;
  name: string;
  type: string; // SAV/SALES
  description?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface WorkspaceDocument {
  id: string;
  workspace_id: string;
  type: string; // info/url/file/image
  name?: string | null;
  description?: string | null;
  url?: string | null;
  corpus_document_id?: string | null;
  created_at: Date;
}

export interface WorkspaceAutomation {
  id: string;
  workspace_id: string;
  provider: string;
  name: string;
  config: string; // JSON serialized
  created_at: Date;
}

export interface Campaign {
  id: string;
  workspace_id: string;
  title: string;
  status: string; // Draft/Published
  created_at: Date;
  updated_at: Date;
}


