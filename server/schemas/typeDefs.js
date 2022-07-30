// Add typeDefs for GraphQL
const { gql } = require('apollo-server-express');

// const { dateScalar } = require('../scalars/date');

const typeDefs = gql`
  scalar dateScalar

  type User {
    _id: ID
    userType: String
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    birthday: dateScalar
    orders: [Order]
    posts: [Post]
  }

  type Post {
    _id: ID
    title: String
    description: String
    image: String
    likes: Int
    user: User
    createdBy: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Merch {
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
    merch: [Merch]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts: [Post]
    userPost: [Post]
  }

  type Mutation {
    addUser(
      userType: String!
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      birthday: dateScalar!
    ): Auth

    addPost(
      title: String
      description: String
      image: String
      createdBy: String
    ): Post

    login(email: String!, password: String!): Auth

    removePost(postId: ID!, createdBy: String): Post
  }
`;

module.exports = typeDefs;
