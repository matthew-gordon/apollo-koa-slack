import { Context } from '../../start';
import pubsub from '../../pubsub';

export const defaultResolvers = {
  Query: {
    hello: () => 'world',
  },
  Mutation: {
    createPost: (
      _: void,
      { title, content }: { title: string; content: string }
    ) => {
      pubsub.publish('POST_CREATED', {
        postCreated: {
          title,
          content,
        },
      });

      return {
        title,
        content,
      };
    },
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};

export default defaultResolvers;
