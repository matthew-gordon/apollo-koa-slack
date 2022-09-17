import http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { koaMiddleware } from '@greenside/apollo-server-integration-koa';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Context } from './context';
import { getDynamicContext, ApolloServerDrainSocketServer } from './utils';
import auth from './middleware/auth';
import schema from './schema';

export async function startApolloServer() {
  const app = new Koa();
  const httpServer = http.createServer(app.callback());
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer(
    {
      schema,
      context: getDynamicContext,
    },
    wsServer
  );
  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerDrainSocketServer({ serverCleanup }),
    ],
  });
  await server.start();
  app.use(cors());
  app.use(bodyParser());
  app.use(auth);
  app.use(
    koaMiddleware(server, {
      context: async ({ ctx }) => ({
        user: ctx.state.user || null,
      }),
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
