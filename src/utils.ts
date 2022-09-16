import type Koa from 'koa';
import { ApolloServerPlugin } from '@apollo/server';
import { compareSync } from 'bcryptjs';
import { JwtPayload, verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from './config';
import pubsub from './pubsub';
import { getSingleUserById } from './db/queries/user';

export function ApolloServerDrainSocketServer({
  serverCleanup,
}: any): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await serverCleanup.dispose();
        },
      };
    },
  };
}

export const getDynamicContext = async (ctx: Koa.Context) => {
  if (ctx.connectionParams.authorization) {
    const { sub } = await verifyToken(ctx.connectionParams.authorization);
    const user = await getSingleUserById(sub!);
    return { pubsub, user };
  }
  // Let the resolvers know we don't have a current user so they can
  // throw the appropriate error
  return { user: null };
};

export async function verifyToken(token: string): Promise<JwtPayload> {
  return (await verify(token, TOKEN_SECRET as string)) as JwtPayload;
}

export async function verifyPassword(
  userPassword: string,
  dbPassword: string
): Promise<boolean> {
  return compareSync(userPassword, dbPassword);
}
