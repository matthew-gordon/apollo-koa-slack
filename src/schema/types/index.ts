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
    first_name: String!
    last_name: String!
    workspaces: [Workspace!]!
    created_at: Date!
    updated_at: Date!
  } 

  type Workspace {
    id: ID!
    name: String!
    cname: String!
    owner: User!
    channels: [Channel!]!
  }

  type Channel {
    id: ID!
    name: String!
    workspace: Workspace!
    private: Boolean!
    default: Boolean!
  }

  type Query {
    me: User
    getWorkspaceById(id: ID!): Workspace!
  }

  type Mutation {
    login(input: LoginUserInput!): AuthResponse!
  }
`;

export default [RootSchema];
