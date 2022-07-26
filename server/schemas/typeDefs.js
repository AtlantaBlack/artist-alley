// Add typeDefs for GraphQL
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    userType: String
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    birthday: String
    # add orders in later
  }

  type Post {
    _id: ID
    title: String
    description: String
    image: String
    postType: String
    likes: Int
  }

  type Query {
    users: [User]
    user: User
  }
`;

module.exports = typeDefs;
