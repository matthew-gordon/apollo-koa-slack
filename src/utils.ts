import { ApolloServerPlugin } from '@apollo/server';
import Koa from 'koa';
import pubsub from './pubsub';

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
    // const { sub } = await verifyToken(ctx.connectionParams.authorization);
    // const user = await getUserById(parseInt(sub!));
    return { pubsub };
  }
  // Let the resolvers know we don't have a current user so they can
  // throw the appropriate error
  return { user: null, pubsub: null };
};
