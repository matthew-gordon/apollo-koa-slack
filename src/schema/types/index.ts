const RootSchema = `#graphql
  type Post {
    title: String!
    content: String!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
  }
  
  type Query {
    hello: String!
  }

  type Subscription {
    postCreated: Post!
  }
`;

export default [RootSchema];
