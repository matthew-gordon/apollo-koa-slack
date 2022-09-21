import db from '..';
import { Workspace, WorkspaceChannel } from '../../types';

export async function getWorkspaceById(id: string): Promise<Workspace> {
  const workspace = await db<Workspace>('workspaces').where({ id }).first();

  if (!workspace) {
    throw new Error('Workspace does not exist.');
  }

  return workspace;
}

export async function getWorkspaceChannelsById(
  workspace_id: string,
): Promise<WorkspaceChannel[]> {
  const channels = await db<WorkspaceChannel>('workspace_channels')
    .where({
      workspace_id,
    })
    .select();

  if (!channels.length) {
    return [];
  }

  return channels;
}
