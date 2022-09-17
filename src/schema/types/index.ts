const RootSchema = `#graphql
  scalar Date

  input LoginUserInput {
    email: String!
    password: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String
    firstName: String!
    lastName: String!
    createdAt: Date!
    updatedAt: Date!
  } 

  type Query {
    me: User
  }

  type Mutation {
    login(input: LoginUserInput!): AuthResponse!
  }
`;

export default [RootSchema];
