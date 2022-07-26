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
  }

  type Post {
    _id: ID
    title: String
    description: String
    image: String
    postType: String
    likes: Int
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
    user: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Query {
    users: [User]
    user: User
  }
`;

module.exports = typeDefs;
