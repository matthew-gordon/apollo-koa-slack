import { Context } from '../../context';
import {
  getUserByEmail,
  getUserById,
  getUserWorkspacesById,
} from '../../db/queries/user';
import {
  getWorkspaceById,
  getWorkspaceChannelsById,
} from '../../db/queries/workspace';
import { AuthResponse, LoginUserInput, User } from '../../types';
import { createToken, verifyPassword } from '../../utils';

export const defaultResolvers = {
  Query: {
    me: (_: void, __: void, { user }: Context) => user,
    getWorkspaceById: async (_: void, { id }: { id: string }) => {
      return await getWorkspaceById(id);
    },
  },

  Mutation: {
    async login(
      _: void,
      { input }: { input: LoginUserInput },
    ): Promise<AuthResponse> {
      const { email, password } = input;
      if (!email || !password) {
        throw new Error('Please provide valid credentials.');
      }

      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials.');
      }

      const valid = await verifyPassword(password, user.password!);
      if (valid) {
        const token = await createToken(user);
        return {
          user,
          token,
        };
      } else {
        throw new Error('Invalid credentials.');
      }
    },
  },

  User: {
    workspaces: async ({ id }: { id: string }) => {
      return await getUserWorkspacesById(id);
    },
  },

  Workspace: {
    owner: async ({ owner_id }: { owner_id: string }) => {
      return await getUserById(owner_id);
    },
    channels: async ({ id }: { id: string }) => {
      return await getWorkspaceChannelsById(id);
    },
  },

  Channel: {
    workspace: async ({ workspace_id }: { workspace_id: string }) => {
      return await getWorkspaceById(workspace_id);
    },
  },
};

export default defaultResolvers;
