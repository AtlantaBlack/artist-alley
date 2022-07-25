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
    orders: [Order]
    products: [Product]
  }
`;

module.exports = typeDefs;
