export type Workspace = {
  id: string;
  name: string;
  cname: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
};

export type WorkspaceChannel = {
  id: string;
  workspace_id: string;
  name: string;
  default: boolean;
  private: boolean;
  created_at: Date;
  updated_at: Date;
};

export type WorkspaceMember = {
  id: string;
  workspace_id: string;
  member_id: string;
  last_seen: string;
  created_at: Date;
  updated_at: Date;
};
